"use client"

import { useRef, useEffect, useState } from "react"

export function CharacterShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 40,
          y: (e.clientY - rect.top - rect.height / 2) / 40,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-background text-foreground overflow-hidden py-20 ml-0 lg:ml-16"
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent blocks */}
      <div 
        className="absolute top-0 right-[20%] w-48 h-64 transition-transform duration-700 ease-out opacity-25"
        style={{ 
          backgroundColor: 'oklch(0.35 0.08 250)',
          transform: `translate(${-mousePos.x * 1.5}px, ${mousePos.y}px)` 
        }}
      />
      <div 
        className="absolute top-[30%] right-[5%] w-24 h-32 transition-transform duration-700 ease-out opacity-20"
        style={{ 
          backgroundColor: 'oklch(0.28 0.05 240)',
          transform: `translate(${-mousePos.x}px, ${mousePos.y * 0.5}px)` 
        }}
      />
      <div 
        className="absolute bottom-[20%] left-[15%] w-32 h-48 transition-transform duration-700 ease-out opacity-25"
        style={{ 
          backgroundColor: 'oklch(0.35 0.08 250)',
          transform: `translate(${mousePos.x}px, ${-mousePos.y}px)` 
        }}
      />

      {/* Section number */}
      <div className="absolute top-8 right-8 text-[150px] font-black text-muted opacity-20 leading-none select-none pointer-events-none">
        02
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-xs tracking-[0.3em] text-accent mb-2 font-mono">[ ABOUT ]</div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight">
            THE<br />
            <span className="text-accent">CREATOR</span>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            {/* Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent">[</span>
                <span className="text-sm font-bold text-accent tracking-wider">ID</span>
                <span className="text-xs font-mono text-accent">]</span>
              </div>
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-black text-foreground">Muhamad Hafizh Husaini</p>
                <p className="text-sm text-muted-foreground">Student ID: 223443016</p>
              </div>
            </div>

            {/* Affiliation */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent">[</span>
                <span className="text-sm font-bold text-accent tracking-wider">AFFILIATION</span>
                <span className="text-xs font-mono text-accent">]</span>
              </div>
              <p className="text-lg font-bold text-foreground">Politeknik Manufaktur Bandung</p>
              <p className="text-sm text-muted-foreground">D4 Engineering Technology | Semester 5</p>
            </div>

            {/* Status */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent">[</span>
                <span className="text-sm font-bold text-accent tracking-wider">STATUS</span>
                <span className="text-xs font-mono text-accent">]</span>
              </div>
              <p className="text-lg font-bold text-foreground">Active Developer</p>
              <p className="text-sm text-muted-foreground">Founder of Eventide Development Group (Aug 2025)</p>
            </div>

            {/* Skills */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent">[</span>
                <span className="text-sm font-bold text-accent tracking-wider">SKILLS</span>
                <span className="text-xs font-mono text-accent">]</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Python", "C#", "React", "TypeScript", "ROS 2", "IoT", "Docker", "Raspberry Pi", "Unity", "Illustration"].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-xs font-bold tracking-wider bg-accent bg-opacity-20 text-accent border border-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Mascot showcase */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative w-full aspect-square max-w-md">
              {/* Background frame */}
              <div className="absolute inset-0 border-2 border-accent opacity-50" />
              <div className="absolute inset-4 border border-border opacity-30" />
              
              {/* Mascot image */}
              <img
                src="/images/mirae-mascot.png"
                alt="Mirae Nakamura"
                className="absolute inset-0 w-full h-full object-contain p-8"
              />
              
              {/* Corner details */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent opacity-50" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent opacity-50" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent opacity-50" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
