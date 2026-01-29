"use client"

import React from "react"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Lore data
const loreItems = [
  {
    id: 1,
    title: "ORIGINIUM",
    subtitle: "ARKNIGHTS: ENDFIELD-LORE",
    description: "A mysterious crystalline substance that has fundamentally altered life on Terra. Originium is both a source of immense power and a deadly pathogen, causing the incurable disease known as Oripathy. Its origins remain shrouded in mystery, though ancient records suggest it arrived during a catastrophic event.",
    particleShape: "crystal",
    color: "#00ffff",
  },
  {
    id: 2,
    title: "ANKHOR",
    subtitle: "ARKNIGHTS: ENDFIELD-LORE",
    description: "Ankhors are mysterious constructs that trigger the formation of Aggeloi. Their origins remain unknown, and they are randomly scattered across Talos-II. Once they land, they begin drawing in nearby natural materials to continually create Aggeloi.",
    particleShape: "pillar",
    color: "#ffffff",
  },
  {
    id: 3,
    title: "TALOS-II",
    subtitle: "ARKNIGHTS: ENDFIELD-LORE",
    description: "A frontier world where humanity has established colonies after fleeing their dying homeworld. Talos-II presents both opportunity and danger, with vast resources guarded by hostile entities known as Aggeloi. The planet's mysteries continue to unfold.",
    particleShape: "sphere",
    color: "#ffd700",
  },
  {
    id: 4,
    title: "AGGELOI",
    subtitle: "ARKNIGHTS: ENDFIELD-LORE",
    description: "Hostile entities that emerge from Ankhors across Talos-II. These creatures vary greatly in form and strength, from small scouts to massive behemoths. Their purpose and intelligence remain subjects of intense study by Endfield Industries.",
    particleShape: "helix",
    color: "#ff4444",
  },
  {
    id: 5,
    title: "ENDFIELD",
    subtitle: "ARKNIGHTS: ENDFIELD-LORE",
    description: "The megacorporation that leads humanity's expansion on Talos-II. Endfield Industries provides everything from basic supplies to advanced weaponry, employing skilled Endministrators to protect settlements and explore dangerous frontiers.",
    particleShape: "cube",
    color: "#FACC15",
  },
  {
    id: 6,
    title: "ARTS",
    subtitle: "ARKNIGHTS: ENDFIELD-LORE",
    description: "The manipulation of Originium to produce supernatural effects. Arts users can channel energy through Originium to create fire, ice, healing, and countless other phenomena. This power comes at a cost - prolonged Arts usage accelerates Oripathy infection.",
    particleShape: "vortex",
    color: "#a855f7",
  },
]

// Interactive particle system component
function ParticleSystem({ shape, color, mousePos }: { shape: string; color: string; mousePos: { x: number; y: number } }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 3000
  
  const { positions, velocities, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      let x, y, z
      
      switch (shape) {
        case "crystal":
          // Crystal/diamond shape
          const t = Math.random()
          const angle = Math.random() * Math.PI * 2
          const radius = Math.sin(t * Math.PI) * 1.5
          x = Math.cos(angle) * radius * (0.3 + Math.random() * 0.2)
          y = (t - 0.5) * 6
          z = Math.sin(angle) * radius * (0.3 + Math.random() * 0.2)
          break
          
        case "pillar":
          // Vertical pillar with particles
          const pillarAngle = Math.random() * Math.PI * 2
          const pillarRadius = 0.3 + Math.random() * 0.4
          x = Math.cos(pillarAngle) * pillarRadius
          y = (Math.random() - 0.5) * 8
          z = Math.sin(pillarAngle) * pillarRadius
          break
          
        case "sphere":
          // Sphere distribution
          const phi = Math.random() * Math.PI * 2
          const theta = Math.acos(2 * Math.random() - 1)
          const r = 2 + Math.random() * 0.5
          x = r * Math.sin(theta) * Math.cos(phi)
          y = r * Math.sin(theta) * Math.sin(phi)
          z = r * Math.cos(theta)
          break
          
        case "helix":
          // Double helix
          const helixT = Math.random() * Math.PI * 4
          const helixR = 1.5
          const strand = Math.random() > 0.5 ? 0 : Math.PI
          x = Math.cos(helixT + strand) * helixR
          y = (helixT / (Math.PI * 4) - 0.5) * 6
          z = Math.sin(helixT + strand) * helixR
          break
          
        case "cube":
          // Cube outline
          const face = Math.floor(Math.random() * 6)
          const u = (Math.random() - 0.5) * 3
          const v = (Math.random() - 0.5) * 3
          if (face === 0) { x = 1.5; y = u; z = v; }
          else if (face === 1) { x = -1.5; y = u; z = v; }
          else if (face === 2) { x = u; y = 1.5; z = v; }
          else if (face === 3) { x = u; y = -1.5; z = v; }
          else if (face === 4) { x = u; y = v; z = 1.5; }
          else { x = u; y = v; z = -1.5; }
          break
          
        case "vortex":
          // Spiral vortex
          const vortexT = Math.random() * Math.PI * 6
          const vortexR = 0.5 + (vortexT / (Math.PI * 6)) * 2
          x = Math.cos(vortexT) * vortexR
          y = (vortexT / (Math.PI * 6) - 0.5) * 5
          z = Math.sin(vortexT) * vortexR
          break
          
        default:
          x = (Math.random() - 0.5) * 4
          y = (Math.random() - 0.5) * 6
          z = (Math.random() - 0.5) * 4
      }
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    return { positions, velocities, originalPositions }
  }, [shape])
  
  useFrame((state) => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Add floating motion
      positions[i3] = originalPositions[i3] + Math.sin(time + i * 0.01) * 0.1
      positions[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * 0.5 + i * 0.01) * 0.1
      positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * 0.7 + i * 0.01) * 0.1
      
      // React to mouse position
      const dx = mousePos.x * 2 - positions[i3]
      const dy = -mousePos.y * 2 - positions[i3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 2) {
        const force = (2 - dist) * 0.02
        positions[i3] -= dx * force
        positions[i3 + 1] -= dy * force
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = time * 0.1
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Circular decorations in 3D
function CircularDecorations() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <group ref={groupRef}>
      {/* Main circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 3.85, 64]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.5} />
      </mesh>
      
      {/* Inner circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 2.83, 64]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} />
      </mesh>
      
      {/* Tick marks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i / 36) * Math.PI * 2
        const isLong = i % 3 === 0
        const innerR = isLong ? 3.5 : 3.65
        const outerR = 3.8
        return (
          <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, angle]}>
            <planeGeometry args={[0.02, outerR - innerR]} />
            <meshBasicMaterial color="#666666" transparent opacity={0.5} />
          </mesh>
        )
      })}
      
      {/* Arc segments */}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, angle]} position={[0, 0, 0]}>
          <ringGeometry args={[4.2, 4.25, 16, 1, 0, 0.3]} />
          <meshBasicMaterial color="#555555" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Scene component
function Scene({ currentLore, mousePos }: { currentLore: typeof loreItems[0]; mousePos: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <CircularDecorations />
      <ParticleSystem 
        shape={currentLore.particleShape} 
        color={currentLore.color}
        mousePos={mousePos}
      />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  )
}

export function LoreShowcase() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const currentLore = loreItems[currentIndex]
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    })
  }
  
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % loreItems.length)
  }
  
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + loreItems.length) % loreItems.length)
  }
  
  return (
    <section 
      id="lore"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />
      
      {/* Lore header - top left */}
      <div className="absolute top-12 left-24 md:left-32 z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-16 h-1 bg-yellow-400" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="text-xs text-gray-500 tracking-[0.3em] mb-1">RECONNAISSANCE MODULE</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">LORE</h2>
        
        {/* Category selector */}
        <div className="mt-6 flex items-start gap-2">
          <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 via-yellow-400 to-pink-400" />
          <div className="bg-zinc-900/80 border border-zinc-700 p-3">
            <div className="grid grid-cols-3 gap-1 mb-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-zinc-600" />
              ))}
            </div>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white">
              <path d="M8 35L20 5L32 35" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 28h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* 3D Canvas - Center */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <Scene currentLore={currentLore} mousePos={mousePos} />
        </Canvas>
      </div>
      
      {/* Lore content - Right side */}
      <div className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-white" />
          <span className="text-sm text-gray-400 tracking-[0.2em]">{currentLore.subtitle}</span>
        </div>
        
        <h3 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wider transition-all duration-500"
          style={{ textShadow: `0 0 30px ${currentLore.color}40` }}
        >
          {currentLore.title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-8">
          {currentLore.description}
        </p>
        
        {/* Navigation */}
        <div className="flex items-center gap-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-1 mr-4">
            {loreItems.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-300 ${
                  i === currentIndex 
                    ? "w-8 bg-yellow-400" 
                    : i < currentIndex 
                      ? "w-4 bg-gray-500" 
                      : "w-4 bg-gray-700"
                }`}
              />
            ))}
            <span className="text-yellow-400 ml-3 text-sm font-mono">
              {currentIndex + 1}/{loreItems.length}
            </span>
          </div>
          
          {/* Nav buttons */}
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Floating tech decorations */}
      <div className="absolute bottom-8 left-24 md:left-32 text-gray-600 text-xs font-mono z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>LORE.DATABASE" CONNECTED</span>
        </div>
        <div className="mt-1 text-gray-700">
          {"// SECTOR: TALOS-II // STATUS: ACTIVE"}
        </div>
      </div>
      
      {/* Corner bracket decorations */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gray-700 z-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gray-700 z-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gray-700 z-20" />
      
      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 opacity-5"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)"
        }}
      />
    </section>
  )
}
