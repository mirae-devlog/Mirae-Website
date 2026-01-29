"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Home, 
  User, 
  Briefcase, 
  Folder, 
  ImageIcon, 
  Newspaper,
  Mail,
} from "lucide-react"

const sections = [
  { id: "home", icon: Home, label: "HOME" },
  { id: "about", icon: User, label: "ABOUT" },
  { id: "experience", icon: Briefcase, label: "EXPERIENCE" },
  { id: "projects", icon: Folder, label: "PROJECTS" },
  { id: "gallery", icon: ImageIcon, label: "WORKS" },
  { id: "updates", icon: Newspaper, label: "UPDATES" },
]

export function ProgressSidebar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(progress)

      // Determine active section
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed left-0 top-0 h-screen z-50 hidden lg:flex flex-col items-center py-8 w-16 bg-card border-r border-border">
      {/* Logo at top */}
      <div className="mb-8">
        <div className="w-8 h-8 border-2 border-accent flex items-center justify-center">
          <div className="text-[8px] font-black leading-none text-accent">
            <div>MH</div>
          </div>
        </div>
      </div>

      {/* Navigation icons with progress line */}
      <div className="flex-1 flex flex-col items-center relative">
        {/* Background line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border" />
        
        {/* Progress line */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] transition-all duration-300"
          style={{ 
            height: `${scrollProgress}%`,
            background: 'linear-gradient(to bottom, oklch(0.55 0.15 250), oklch(0.45 0.12 260))',
          }}
        />

        {/* Section icons */}
        <div className="relative flex flex-col items-center gap-6 py-4">
          {sections.map((section, index) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            const sectionProgress = (index / (sections.length - 1)) * 100
            const isPassed = scrollProgress >= sectionProgress

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={cn(
                  "relative w-10 h-10 flex items-center justify-center transition-all duration-300 group",
                  isActive ? "scale-110" : "scale-100 hover:scale-110"
                )}
              >
                {/* Background */}
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    backgroundColor: isActive 
                      ? 'oklch(0.55 0.15 250)' 
                      : isPassed 
                        ? 'oklch(0.2 0 0 / 0.1)' 
                        : 'oklch(0.15 0 0)',
                  }}
                />
                
                {/* Icon */}
                <Icon 
                  size={18} 
                  className="relative z-10 transition-colors duration-300"
                  style={{
                    color: isActive 
                      ? 'oklch(0.08 0 0)' 
                      : isPassed 
                        ? 'oklch(0.65 0 0)' 
                        : 'oklch(0.4 0 0)',
                  }}
                />

                {/* Label tooltip */}
                <div 
                  className="absolute left-full ml-3 px-3 py-1 text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 border"
                  style={{
                    backgroundColor: 'oklch(0.12 0 0)',
                    color: 'oklch(0.95 0 0)',
                    borderColor: 'oklch(0.55 0.15 250)',
                    opacity: hoveredSection === section.id ? 1 : 0,
                    transform: hoveredSection === section.id ? 'translateX(0)' : 'translateX(-8px)',
                    pointerEvents: hoveredSection === section.id ? 'auto' : 'none',
                  }}
                >
                  {section.label}
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45" 
                    style={{ backgroundColor: 'oklch(0.12 0 0)', borderLeft: '1px solid oklch(0.55 0.15 250)', borderTop: '1px solid oklch(0.55 0.15 250)' }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="mt-auto flex flex-col items-center gap-2">
        <div className="text-[10px] font-medium text-muted-foreground [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </div>
        <div className="text-xs font-bold text-accent">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  )
}
