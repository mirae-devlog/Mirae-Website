"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const timeline = [
  {
    id: 1,
    type: "experience",
    title: "Eventide Development Group",
    role: "Founder",
    period: "August 2025 - Present",
    description: "Leading development of innovative IoT and robotics solutions. Managing team of developers focused on practical engineering implementations.",
    details: ["IoT System Development", "Team Leadership", "Project Coordination"],
  },
  {
    id: 2,
    type: "education",
    title: "Politeknik Manufaktur Bandung",
    role: "D4 Engineering Technology Student",
    period: "Currently Enrolled",
    description: "Semester 5 | Industrial Informatics specialization. Maintaining strong academic performance with focus on robotics and embedded systems.",
    details: ["ROS 2 Implementation", "Embedded Systems", "IoT Architecture"],
  },
  {
    id: 3,
    type: "internship",
    title: "Internship Candidate",
    role: "Targeting Major Organizations",
    period: "Seeking Opportunities",
    description: "Actively seeking internship positions at PT Semen Jawa or PT Angkasa Pura 2 to apply practical engineering skills in industrial environments.",
    details: ["Industrial Experience", "Cross-functional Collaboration", "Real-world Projects"],
  },
]

export function WorldSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCard, setActiveCard] = useState(0)
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
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-background text-foreground overflow-hidden ml-0 lg:ml-16"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden py-20">
        {/* Section number */}
        <div className="absolute top-8 right-8 text-[200px] font-black text-muted opacity-20 leading-none select-none pointer-events-none">
          03
        </div>

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent blocks */}
        <div 
          className="absolute top-20 left-[8%] w-24 h-36 transition-transform duration-500 z-0 opacity-25"
          style={{ 
            backgroundColor: 'var(--color-chart-3)',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` 
          }}
        />
        <div 
          className="absolute bottom-32 right-[5%] w-32 h-24 transition-transform duration-500 z-0 opacity-20"
          style={{ 
            backgroundColor: 'var(--color-chart-4)',
            transform: `translate(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px)` 
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Timeline */}
              <div className="space-y-6">
                {/* Header */}
                <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                  <div className="text-xs tracking-[0.3em] text-accent mb-2 font-mono">[ EXPERIENCE ]</div>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground">
                    CAREER<br />
                    <span className="text-accent">TIMELINE</span>
                  </h2>
                </div>

                {/* Timeline items */}
                <div className="space-y-4 pt-8">
                  {timeline.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveCard(index)}
                      className={cn(
                        "w-full text-left p-4 transition-all duration-300 group border",
                        activeCard === index 
                          ? "bg-accent bg-opacity-20 border-accent text-accent-foreground" 
                          : "bg-background border-border hover:border-accent hover:bg-accent hover:bg-opacity-10"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-xs font-bold text-accent tracking-wider mb-1">
                            {item.type.toUpperCase()}
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{item.role}</p>
                        </div>
                        <div className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300 mt-1",
                          activeCard === index ? "bg-accent scale-150" : "bg-border"
                        )} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Detail view */}
              <div className="relative h-[400px] lg:h-[500px] flex items-center">
                {timeline.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 flex flex-col justify-center",
                      activeCard === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}
                  >
                    {/* Frame */}
                    <div className="relative border border-accent bg-accent bg-opacity-10 p-8 text-accent-foreground">
                      {/* Period */}
                      <div className="text-xs font-mono text-accent mb-2 tracking-wider">
                        [ {item.period} ]
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-black text-accent-foreground mb-2">
                        {item.title}
                      </h3>

                      {/* Role */}
                      <p className="text-sm font-bold text-accent-foreground mb-4 tracking-wide">
                        {item.role}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-accent-foreground mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-2">
                        {item.details.map((detail) => (
                          <div key={detail} className="flex items-center gap-2 text-xs text-accent-foreground">
                            <span className="w-1.5 h-1.5 bg-accent" />
                            {detail}
                          </div>
                        ))}
                      </div>

                      {/* Corner brackets */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent opacity-50" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent opacity-50" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent opacity-50" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent opacity-50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-sm font-bold text-accent-foreground">
            {String(activeCard + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {timeline.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={cn(
                  "w-2 h-2 transition-all duration-300",
                  activeCard === index ? "w-8 bg-accent" : "bg-border hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            / {String(timeline.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
