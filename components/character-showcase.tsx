"use client"

import { useRef, useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

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
      className="relative min-h-screen bg-background text-foreground overflow-hidden py-20 ml-0 lg:ml-16 flex items-center"
    >
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div 
        className="absolute top-0 right-[20%] w-64 h-64 bg-primary/20 blur-[100px] transition-transform duration-1000"
        style={{ transform: `translate(${-mousePos.x * 1.5}px, ${mousePos.y}px)` }}
      />
      <div 
        className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-primary/10 blur-[80px] transition-transform duration-1000"
        style={{ transform: `translate(${mousePos.x}px, ${-mousePos.y}px)` }}
      />

      <div className="absolute top-4 right-8 text-[120px] lg:text-[200px] font-black text-muted/30 leading-none select-none pointer-events-none z-0">
        02
      </div>

      {/* FIX: Menggunakan 'mx-auto' untuk posisi tengah yang sempurna */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className={`mb-12 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-2 mb-4">
             <div className="w-8 h-[2px] bg-primary" />
             <div className="text-xs tracking-[0.3em] text-primary font-mono font-bold">OPERATOR PROFILE</div>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.9]">
            THE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">CREATOR</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* KOLOM KIRI: Text Info */}
          <div className={`lg:col-span-7 space-y-10 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            
            {/* Identity Card */}
            <div className="relative p-6 border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground tracking-widest">REAL NAME</span>
                  <span className="text-xs font-mono text-primary font-bold">ID: 223443016</span>
                </div>
                <p className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">Muhamad Hafizh Husaini</p>
              </div>
            </div>

            {/* Data Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
               {/* Affiliation */}
               <div className="space-y-2">
                 <div className="text-xs font-bold text-primary tracking-widest flex items-center gap-2">
                   <span className="w-1 h-1 bg-primary rounded-full" /> AFFILIATION
                 </div>
                 <div className="border-l-2 border-border pl-4">
                   <p className="text-lg font-bold text-foreground">POLMAN Bandung</p>
                   <p className="text-sm text-muted-foreground">D4 Engineering Tech</p>
                 </div>
               </div>

               {/* Current Status */}
               <div className="space-y-2">
                 <div className="text-xs font-bold text-primary tracking-widest flex items-center gap-2">
                   <span className="w-1 h-1 bg-primary rounded-full" /> CURRENT STATUS
                 </div>
                 <div className="border-l-2 border-border pl-4">
                   <p className="text-lg font-bold text-foreground">Internship</p>
                   <p className="text-sm text-muted-foreground">PT AISIN INDONESIA</p>
                 </div>
               </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-primary tracking-widest mb-4 border-b border-border pb-2 inline-block">
                TECHNICAL COMPETENCIES
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "ROS 2", "IoT Architecture", "React Native", 
                  "TypeScript", "Docker", "Unity Engine", "C#", "Computer Vision"
                ].map((skill, i) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono font-bold bg-secondary text-secondary-foreground border border-border hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
             <div className="flex flex-wrap gap-4 pt-4">
                <a href="https://linkedin.com/in/hafizhhusaini" target="_blank" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={16} /> LinkedIn
                </a>
                <a href="https://github.com" target="_blank" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={16} /> GitHub
                </a>
                <a href="https://www.instagram.com/m_hafizh.h/" target="_blank" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={16} /> Instagram
                </a>
             </div>

          </div>

          {/* KOLOM KANAN: Visual / Mascot */}
          <div className={`lg:col-span-5 relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            
            <div className="relative w-full aspect-[4/5] max-w-md bg-gradient-to-b from-transparent to-primary/5 border border-primary/20 backdrop-blur-sm">
               <div className="absolute top-4 right-4 flex gap-1">
                 <div className="w-1 h-1 bg-primary" />
                 <div className="w-1 h-1 bg-primary/50" />
                 <div className="w-1 h-1 bg-primary/20" />
               </div>
               
               <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block writing-vertical text-[10px] text-primary/40 font-mono tracking-widest">
                  VISUAL_REPRESENTATION // MIRAE_NK
               </div>

               <div className="absolute inset-2 md:inset-6 overflow-hidden border border-primary/10 bg-black/5">
                 <img
                    src="/images/1000117216.png"
                    alt="Mirae Nakamura"
                    className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
                  />
               </div>

               <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center border-t border-primary/20 pt-2">
                 <span className="text-[10px] font-bold text-primary">MNK-01</span>
                 <span className="text-[10px] text-muted-foreground">ILLUSTRATION</span>
               </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}