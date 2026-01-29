"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// small helper to pick readable text color over a background hex
function getContrastColor(hex: string) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0,2), 16)
  const g = parseInt(h.substring(2,4), 16)
  const b = parseInt(h.substring(4,6), 16)
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return lum > 0.55 ? '#1a1a1a' : '#ffffff'
}

const newsCategories = ["ALL", "UPDATE", "PROJECT", "LEARNING"]

const newsItems = [
  {
    id: 1,
    category: "UPDATE",
    date: "2026.01.30",
    title: "Portfolio Website Launch",
    description: "Deployed new tech-industrial portfolio featuring project archive and experience timeline.",
    featured: true,
    color: "#8b6f47", // chart-1 / primary
  },
  {
    id: 2,
    category: "PROJECT",
    date: "2026.01.25",
    title: "ROS 2 Architecture Complete",
    description: "Successfully implemented complete ROS 2 robotics architecture on Raspberry Pi 5 with Docker containerization.",
    featured: false,
    color: "#d4a574", // chart-2 / secondary
  },
  {
    id: 3,
    category: "LEARNING",
    date: "2026.01.20",
    title: "IoT Sensor Integration Mastered",
    description: "Completed advanced IoT sensor integration for aquaculture automation project with real-time monitoring.",
    featured: false,
    color: "#c9975f", // chart-3
  },
  {
    id: 4,
    category: "UPDATE",
    date: "2026.01.15",
    title: "Eventide Development Group Founded",
    description: "Officially launched Eventide Development Group focused on innovative IoT and robotics solutions.",
    featured: false,
    color: "#a08668", // chart-4
  },
  {
    id: 5,
    category: "PROJECT",
    date: "2026.01.10",
    title: "Track Ma Maney Mobile App Beta",
    description: "Released beta version of Track Ma Maney finance tracking app on iOS and Android platforms.",
    featured: false,
    color: "#5a4a3a", // chart-5 / accent
  },
]

export function NewsSection() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const filteredNews = activeCategory === "ALL" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory)

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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      })
    }
  }

  return (
    <section 
      id="updates" 
      ref={sectionRef}
      className="relative min-h-screen bg-background text-foreground py-20 overflow-hidden ml-0 lg:ml-16"
    >
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
        className="absolute top-32 right-[4%] w-28 h-40 transition-transform duration-500 opacity-25"
        style={{ 
          backgroundColor: 'var(--color-chart-3)',
          transform: `translate(${-mousePos.x}px, ${mousePos.y}px)` 
        }}
      />
      <div 
        className="absolute bottom-40 left-[6%] w-36 h-28 transition-transform duration-500 opacity-20"
        style={{ 
          backgroundColor: 'var(--color-chart-4)',
          transform: `translate(${mousePos.x}px, ${-mousePos.y}px)` 
        }}
      />

      {/* Section number */}
      <div className="absolute top-8 left-8 text-[200px] font-black text-muted opacity-20 leading-none select-none pointer-events-none">
        06
      </div>

      {/* FIX UTAMA: 
         Membungkus SEMUA konten dalam container 'max-w-7xl mx-auto'
         agar Header, Featured News, dan Carousel memiliki lebar dan margin yang sama.
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="text-xs tracking-[0.3em] text-accent mb-2 font-mono">[ UPDATES ]</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
                LATEST<br />
                <span className="text-accent">ACTIVITY</span>
              </h2>
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {newsCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 border",
                    activeCategory === category
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-background text-foreground border-border hover:border-accent"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured news */}
        {activeCategory === "ALL" && (
          <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div
              className="relative h-[350px] md:h-[450px] overflow-hidden border-2 border-accent group cursor-pointer"
              onMouseEnter={() => setHoveredCard(-1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-card bg-gradient-to-br from-accent from-20% via-background to-card" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(var(--border) 1px, transparent 1px),
                    linear-gradient(90deg, var(--border) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-xs font-bold tracking-wider bg-accent text-accent-foreground">
                    {newsItems[0].category}
                  </span>
                  <div className="flex items-center gap-2 text-foreground text-sm">
                    <Calendar size={14} />
                    {newsItems[0].date}
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-wider text-foreground mb-4 max-w-3xl">
                  {newsItems[0].title}
                </h3>

                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-6">
                  {newsItems[0].description}
                </p>

                <button className="group/btn flex items-center gap-2 text-sm font-bold tracking-wider text-accent hover:text-foreground transition-colors w-fit">
                  READ MORE
                  <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* FEATURED badge */}
              <div className="absolute top-8 right-8 px-4 py-2 bg-accent text-accent-foreground text-xs font-bold tracking-widest">
                FEATURED
              </div>
            </div>
          </div>
        )}

        {/* News cards carousel */}
        <div className="relative">
          {/* Navigation buttons - Posisinya sekarang relatif terhadap container 7xl */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-20 hidden md:block">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 bg-background border-2 border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-20 hidden md:block">
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 bg-background border-2 border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Cards container */}
          {/* Menghapus padding horizontal berlebih agar rata kiri dengan judul */}
          <div
            ref={scrollRef}
            className={`flex gap-6 overflow-x-auto pb-6 scrollbar-hide transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {filteredNews.slice(activeCategory === "ALL" ? 1 : 0).map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[300px] md:w-[350px] group cursor-pointer"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative border-2 border-border overflow-hidden transition-all duration-300 hover:border-accent bg-card h-full">
                  {/* Top accent bar */}
                  <div 
                    className="h-1 transition-all duration-300" 
                    style={{ 
                      backgroundColor: hoveredCard === item.id ? item.color : 'var(--border)' 
                    }} 
                  />

                  {/* Content */}
                  <div className="p-6 min-h-[280px] flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold tracking-wider"
                        style={{ backgroundColor: item.color, color: getContrastColor(item.color) }}
                      >
                        {item.category}
                      </span>
                      <span className="text-muted-foreground text-xs">{item.date}</span>
                    </div>

                    <h4 className="text-lg font-bold tracking-wider text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                      {item.description}
                    </p>

                    <button
                      className="flex items-center gap-2 text-xs font-bold tracking-wider transition-all duration-300 text-muted-foreground group-hover:text-accent mt-auto"
                    >
                      READ MORE
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Index */}
                  <div className="absolute top-4 right-4">
                    <span className="text-5xl font-black text-muted opacity-10 group-hover:opacity-30 transition-opacity">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <button className="group px-8 py-4 bg-accent text-accent-foreground font-bold tracking-wider hover:shadow-lg transition-all">
            <span className="flex items-center gap-2 justify-center">
              VIEW ALL UPDATES
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}