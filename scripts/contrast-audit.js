const fs = require('fs')
const path = require('path')

function hexToRgb(hex) {
  hex = hex.replace('#','')
  if (hex.length === 3) hex = hex.split('').map(h => h+h).join('')
  const r = parseInt(hex.slice(0,2),16)
  const g = parseInt(hex.slice(2,4),16)
  const b = parseInt(hex.slice(4,6),16)
  return { r,g,b }
}

function relativeLuminance({r,g,b}){
  const srgb = [r,g,b].map(v=>v/255).map(c=> c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4))
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2]
}

function contrastRatio(hex1, hex2){
  const L1 = relativeLuminance(hexToRgb(hex1))
  const L2 = relativeLuminance(hexToRgb(hex2))
  const lighter = Math.max(L1,L2)
  const darker = Math.min(L1,L2)
  return (lighter + 0.05) / (darker + 0.05)
}

function parseCssVars(filePath, selector){
  const content = fs.readFileSync(filePath,'utf8')
  const blocks = {}
  // crude parse: split into sections by selector names (":root", ".dark")
  const rootMatch = content.match(/:root\s*\{([\s\S]*?)\}/m)
  const darkMatch = content.match(/\.dark\s*\{([\s\S]*?)\}/m)
  if (rootMatch) blocks['root'] = rootMatch[1]
  if (darkMatch) blocks['dark'] = darkMatch[1]

  function extract(varsContent){
    const map = {}
    if (!varsContent) return map
    const re = /--([a-z0-9\-]+)\s*:\s*([^;]+);/gi
    let m
    while ((m = re.exec(varsContent)) !== null){
      map[m[1]] = m[2].trim()
    }
    return map
  }

  return { root: extract(blocks.root), dark: extract(blocks.dark) }
}

function normalizeColor(value){
  if (!value) return null
  value = value.trim()
  // handle hex
  if (value.startsWith('#')) return value
  // handle oklch or rgba - try to convert oklch by falling back to known map later
  if (value.startsWith('rgba') || value.startsWith('rgb')){
    // naive parser
    const nums = value.match(/rgba?\(([^)]+)\)/)[1].split(',').map(s=>s.trim())
    const r = parseFloat(nums[0]); const g = parseFloat(nums[1]); const b = parseFloat(nums[2])
    return '#'+((1<<24)+(Math.round(r)<<16)+(Math.round(g)<<8)+Math.round(b)).toString(16).slice(1)
  }
  // var() references
  const varMatch = value.match(/var\((--[a-z0-9\-]+)\)/i)
  if (varMatch) return varMatch[1]
  return value
}

// Main
const cssPath = path.join(__dirname, '..', 'app', 'globals.css')
const css = parseCssVars(cssPath)
const vars = (css && css.root) ? css.root : {}

// create resolved map for color tokens we care about
const tokenMap = {}
const colorKeys = ['background','foreground','card','card-foreground','popover','popover-foreground','primary','primary-foreground','secondary','secondary-foreground','muted','muted-foreground','accent','accent-foreground','border']
colorKeys.forEach(k=>{
  const v = vars[k] || vars['color-'+k] || vars['color-'+k.replace(/-/g,'')]
  tokenMap[k] = v ? normalizeColor(v) : null
})

// fallback: if tokenMap has var(--something) as value, resolve from vars
Object.keys(tokenMap).forEach(k=>{
  const v = tokenMap[k]
  if (!v) return
  if (v.startsWith('--')){
    const key = v.replace('--','')
    if (vars[key]) tokenMap[k] = normalizeColor(vars[key])
  }
})

// Known mapping for chart colors in app/globals.css
if (vars) {
  ['chart-1','chart-2','chart-3','chart-4','chart-5'].forEach(k=>{
    if (vars[k]) tokenMap[k] = normalizeColor(vars[k])
  })
}

// Convert oklch tokens to hex where possible using mapping to app/globals fallback values
// There is also styles/globals.css with oklch values - skip those and prefer app/globals.css which has hexs.

// Files to scan for suspicious combos
const files = []
function walk(dir){
  const entries = fs.readdirSync(dir,{withFileTypes:true})
  for (const e of entries){
    const p = path.join(dir,e.name)
    if (e.isDirectory()) walk(p)
    else if (e.isFile() && /\.(tsx|ts|jsx|js|css)$/.test(e.name)) files.push(p)
  }
}
walk(path.join(__dirname,'..','components'))

const issues = []
files.forEach(file => {
  const content = fs.readFileSync(file,'utf8')
  const lines = content.split(/\r?\n/)
  // find occurrences of bg-accent or backgroundColor using chart-1
  for (let i=0;i<lines.length;i++){
    if (/bg-accent/.test(lines[i]) || /background:\s*'var\(--color-chart-1\)'/.test(lines[i]) || /backgroundColor:\s*'var\(--color-chart-1\)'/.test(lines[i])){
      // inspect nearby lines for dark text usage
      const windowStart = Math.max(0, i-10)
      const windowEnd = Math.min(lines.length-1, i+20)
      const windowText = lines.slice(windowStart, windowEnd+1).join('\n')
      const hasAccentForeground = /text-accent-foreground/.test(windowText)
      const hasForeground = /text-foreground/.test(windowText)
      const hasMuted = /text-muted-foreground/.test(windowText)
      if ((hasForeground || hasMuted) && !hasAccentForeground){
        issues.push({ file: path.relative(process.cwd(), file), line: i+1, snippet: lines.slice(windowStart, windowEnd+1).join('\n').slice(0,400) })
      }
    }
  }
})

// Compute contrast numbers for combos relevant
const pairs = []
function pushPair(bgToken, fgToken){
  const bg = tokenMap[bgToken] || tokenMap['chart-1']
  const fg = tokenMap[fgToken]
  if (!bg || !fg) return
  // if value is still var(--something) we can't compute
  if (bg.startsWith('--') || fg.startsWith('--')) return
  pairs.push({ bgToken, fgToken, bg, fg, ratio: contrastRatio(bg,fg).toFixed(2) })
}
pushPair('accent','foreground')
pushPair('accent','muted-foreground')
pushPair('accent','accent-foreground')
pushPair('chart-1','foreground')
pushPair('chart-1','muted-foreground')
pushPair('chart-1','accent-foreground')

// Output summary
console.log('Contrast audit summary')
console.log('Resolved tokens (light theme):')
Object.keys(tokenMap).forEach(k=>{ if (tokenMap[k]) console.log(`  --${k}: ${tokenMap[k]}`) })

console.log('\nPotential problematic files (bg-accent with text-foreground/muted without text-accent-foreground):')
issues.forEach(i=>console.log(' -', i.file, JSON.stringify(i)))
if (issues.length===0) console.log(' - none found')

console.log('\nContrast ratios (lower is worse):')
pairs.forEach(p=>{
  console.log(` - ${p.bgToken} (${p.bg}) vs ${p.fgToken} (${p.fg}) -> ${p.ratio}:1`)
})

// Suggest fixes
console.log('\nSuggested fixes:')
if (issues.length) console.log(' - Add `text-accent-foreground` inside components that use `bg-accent` so text becomes readable on accent backgrounds.')
console.log(' - For large headings, 3:1 is acceptable; for normal text, aim for >= 4.5:1.')

process.exit(0)
