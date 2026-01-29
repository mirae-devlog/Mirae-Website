"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, Mail, Download, Play, Apple, Gamepad, Monitor } from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Accent blocks - muted blue accent colors */}
      <div 
        className="absolute top-20 left-[15%] w-32 h-48 transition-transform duration-700 ease-out opacity-30"
        style={{ 
          backgroundColor: 'var(--color-chart-3)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />
      <div 
        className="absolute top-40 right-[10%] w-48 h-32 transition-transform duration-700 ease-out opacity-25"
        style={{ 
          backgroundColor: 'var(--color-chart-4)',
          transform: `translate(${-mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      />
      <div 
        className="absolute bottom-32 left-[20%] w-24 h-40 transition-transform duration-700 ease-out opacity-30"
        style={{ 
          backgroundColor: 'var(--color-chart-3)',
          transform: `translate(${mousePosition.x * 0.4}px, ${-mousePosition.y * 0.4}px)`,
        }}
      />
      <div 
        className="absolute bottom-20 right-[25%] w-40 h-24 transition-transform duration-700 ease-out opacity-25"
        style={{ 
          backgroundColor: 'var(--color-chart-4)',
          transform: `translate(${-mousePosition.x * 0.6}px, ${-mousePosition.y * 0.6}px)`,
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
          className="h-full w-auto object-contain object-right opacity-80"
          style={{ 
            maxHeight: '100%',
            filter: 'drop-shadow(0 20px 40px rgba(53, 81, 140, 0.3))',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-screen flex flex-col items-start justify-center px-8 ml-0 lg:ml-16 max-w-3xl">
        {/* Label */}
        <div 
          className={`text-xs tracking-[0.3em] text-accent mb-4 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          [ PORTFOLIO ]
        </div>

        {/* Name */}
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-2 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          MUHAMAD<br />
          HAFIZH<br />
          HUSAINI
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-lg md:text-xl text-muted-foreground tracking-wide mb-8 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Industrial Informatics Engineering Student | ROS 2 Developer | Illustrator
        </p>

        {/* Description */}
        <div 
          className={`text-sm md:text-base text-muted-foreground max-w-lg mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-accent font-mono">[ STATUS ]</span> Semester 5 Student at Polman Bandung | Founder of Eventide Development Group<br />
          <span className="text-accent font-mono">[ SKILLS ]</span> Python • C# • React • TypeScript • ROS 2 • IoT • Docker • Robotics
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex items-center gap-4 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a href="#projects" className="group relative px-6 py-3 bg-accent text-accent-foreground text-sm font-bold tracking-wider overflow-hidden hover:shadow-lg transition-all duration-300">
            <span className="relative z-10">VIEW PROJECTS</span>
          </a>
          <a href="#contact" className="group relative px-6 py-3 border border-accent text-accent text-sm font-bold tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-300">
            <span className="relative z-10">CONTACT ME</span>
          </a>
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
