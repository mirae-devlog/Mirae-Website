"use client"

import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger fade-in saat komponen di-mount
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-center ml-0 lg:ml-16"
    >
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Accent blocks */}
      <div 
        className="absolute top-20 left-[15%] w-32 h-48 transition-transform duration-700 ease-out opacity-30"
        style={{ 
          backgroundColor: 'var(--color-chart-3)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />
      
      {/* Horizontal line accent */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-accent opacity-40" />

      {/* Mascot character image */}
      <div 
        className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden"
        style={{ 
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      >
        <img 
          src="/images/mirae-mascot.png" 
          alt="Mirae Nakamura - Personal Mascot"
          className="h-[80vh] w-auto object-contain object-right opacity-80"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(53, 81, 140, 0.3))',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 xl:ml-20">
        
        {/* Text Wrapper */}
        <div className="max-w-3xl">
          {/* Label */}
          {/* PERUBAHAN: duration-1000 menjadi duration-[2500ms] */}
          <div 
            className={`text-xs tracking-[0.3em] text-accent mb-4 transition-opacity duration-[2500ms] ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            [ PORTFOLIO ]
          </div>

          {/* Name */}
          {/* PERUBAHAN: duration-1000 menjadi duration-[2500ms] */}
          <h1 
            className={`text-5xl md:text-7xl lg:text-9xl font-black tracking-tight text-foreground mb-4 transition-opacity duration-[2500ms] delay-200 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            MUHAMAD<br />
            HAFIZH<br />
            HUSAINI
          </h1>

          {/* Subtitle */}
          {/* PERUBAHAN: duration-1000 menjadi duration-[2500ms] */}
          <p 
            className={`text-lg md:text-2xl text-muted-foreground tracking-wide mb-8 transition-opacity duration-[2500ms] delay-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            Industrial Informatics Engineering Student | ROS 2 Developer | Illustrator
          </p>

          {/* Description */}
          {/* PERUBAHAN: duration-1000 menjadi duration-[2500ms] */}
          <div 
            className={`text-sm md:text-base text-muted-foreground max-w-xl mb-12 leading-relaxed transition-opacity duration-[2500ms] delay-400 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="border-l-2 border-accent pl-4 space-y-2">
              <div>
                <span className="text-accent font-mono font-bold">[ STATUS ]</span> Intern at PT AISIN INDONESIA | Founder of Eventide Development Group
              </div>
              <div>
                <span className="text-accent font-mono font-bold">[ SKILLS ]</span> Python • C# • React • TypeScript • ROS 2 • IoT • Docker • Robotics
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          {/* PERUBAHAN: duration-1000 menjadi duration-[2500ms] */}
          <div 
            className={`flex flex-wrap items-center gap-4 transition-opacity duration-[2500ms] delay-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <a href="#projects" className="group relative px-8 py-4 bg-accent text-accent-foreground text-sm font-bold tracking-wider overflow-hidden hover:shadow-lg transition-all duration-300">
              <span className="relative z-10">VIEW PROJECTS</span>
            </a>
            <a href="#contact" className="group relative px-8 py-4 border border-accent text-accent text-sm font-bold tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <span className="relative z-10">CONTACT ME</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-xs tracking-widest text-muted-foreground">[ SCROLL ]</div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent opacity-50 animate-pulse" />
      </div>
    </section>
  )
}