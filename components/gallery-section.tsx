"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const artworks = [
  { 
    id: 1, 
    title: "Mirae Nakamura", 
    category: "CHARACTER", 
    year: "2024",
    description: "Personal mascot character designed in anime style.",
    image: "/Mirae-Website/images/mirae-mascot.png" // Gambar asli 1
  },
  { 
    id: 2, 
    title: "Mascot Variation", 
    category: "ILLUSTRATION", 
    year: "2024",
    description: "Chibi/Mascot variation for branding and UI elements.",
    image: "/Mirae-Website/images/portait.jpg" // Gambar asli 2
  },
  { 
    id: 3, 
    title: "Tech-Inspired Illustration", 
    category: "CONCEPT", 
    year: "2024",
    description: "Fusion of anime aesthetics with cyberpunk elements."
  },
  { 
    id: 4, 
    title: "Character Design Sheet", 
    category: "DESIGN", 
    year: "2024",
    description: "Complete character development with multiple poses."
  },
  { 
    id: 5, 
    title: "Background Illustration", 
    category: "ENVIRONMENT", 
    year: "2024",
    description: "Urban environment design with technical aesthetic."
  },
  { 
    id: 6, 
    title: "Color Study", 
    category: "STUDY", 
    year: "2024",
    description: "Exploration of color palettes and mood setting."
  },
]

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

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
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
    setActiveIndex((prev) => Math.min(artworks.length - 1, prev + 1))
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-screen bg-background text-foreground overflow-hidden py-20 ml-0 lg:ml-16"
    >
      {/* Section number */}
      <div className="absolute top-8 left-8 text-[200px] font-black text-muted opacity-20 leading-none select-none pointer-events-none">
        05
      </div>

      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent blocks */}
      <div 
        className="absolute top-40 right-[3%] w-28 h-44 transition-transform duration-500 opacity-25"
        style={{ 
          backgroundColor: 'var(--color-chart-3)',
          transform: `translate(${-mousePos.x}px, ${mousePos.y}px)` 
        }}
      />
      <div 
        className="absolute bottom-32 left-[6%] w-36 h-28 transition-transform duration-500 opacity-20"
        style={{ 
          backgroundColor: 'var(--color-chart-4)',
          transform: `translate(${mousePos.x}px, ${-mousePos.y}px)` 
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-12 flex items-end justify-between transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <div className="text-xs tracking-[0.3em] text-accent mb-2 font-mono">[ PORTFOLIO ]</div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight">
              ILLUSTRATION<br />
              <span className="text-accent">WORKS</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 border-2 border-accent flex items-center justify-center hover:bg-accent hover:bg-opacity-20 transition-colors"
            >
              <ChevronLeft size={20} className="text-accent" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 border-2 border-accent flex items-center justify-center hover:bg-accent hover:bg-opacity-20 transition-colors"
            >
              <ChevronRight size={20} className="text-accent" />
            </button>
          </div>
        </div>

        {/* Gallery carousel */}
        <div 
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {artworks.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex-shrink-0 w-[320px] md:w-[400px] cursor-pointer group transition-all duration-500",
                index === activeIndex ? "scale-100" : "scale-95 opacity-70 hover:opacity-100"
              )}
              style={{ scrollSnapAlign: 'center' }}
            >
              <div className="relative aspect-square bg-card border-2 overflow-hidden transition-all duration-300 group-hover:border-accent"
                style={{
                  borderColor: index === activeIndex ? 'var(--color-chart-1)' : 'var(--border)',
                }}
              >
                {/* LOGIC TAMPILAN: Jika ada gambar, tampilkan. Jika tidak, tampilkan dummy angka */}
                {item.image ? (
                  <>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent from-20% via-background to-card">
                    <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          linear-gradient(0deg, var(--border) 1px, transparent 1px),
                          linear-gradient(90deg, var(--border) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="text-center z-10">
                      <div className="w-12 h-12 rounded-full border-2 border-accent border-opacity-50 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                        <span className="text-xl font-black text-accent opacity-50">{index + 1}</span>
                      </div>
                      <div className="text-xs font-mono text-accent opacity-50">[ARTWORK]</div>
                    </div>
                  </div>
                )}

                {/* Border effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                  style={{
                    backgroundColor: 'var(--color-chart-1)',
                    opacity: index === activeIndex ? 0.1 : 0,
                  }}
                />

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent opacity-50" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent opacity-50" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent opacity-50" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent opacity-50" />
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="text-lg font-black tracking-wider text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-accent font-bold tracking-wider">{item.category}</span>
                  <span className="text-xs text-muted-foreground">{item.year}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className={`mt-8 flex items-center gap-4 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <span className="text-3xl font-black text-accent">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 h-[2px] bg-border">
            <div 
              className="h-full bg-accent text-accent-foreground transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / artworks.length) * 100}%` }}
            />
          </div>
          <span className="text-muted-foreground font-bold">
            / {String(artworks.length).padStart(2, '0')}
          </span>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <button 
            onClick={scrollLeft}
            className="w-10 h-10 border-2 border-accent flex items-center justify-center hover:bg-accent hover:bg-opacity-20 transition-colors"
          >
            <ChevronLeft size={18} className="text-accent" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-10 h-10 border-2 border-accent flex items-center justify-center hover:bg-accent hover:bg-opacity-20 transition-colors"
          >
            <ChevronRight size={18} className="text-accent" />
          </button>
        </div>
      </div>
    </section>
  )
}