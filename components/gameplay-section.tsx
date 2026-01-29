"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "Track Ma Maney",
    category: "MOBILE APP",
    tags: ["React Native", "Expo", "Finance"],
    description: "Mobile finance application for personal expense tracking and budgeting. Built with React Native and Expo for cross-platform compatibility.",
    features: ["Real-time tracking", "Budget management", "Data visualization"],
    status: "Active Development",
  },
  {
    id: 2,
    title: "Aquaculture Automation",
    category: "IOT SYSTEM",
    tags: ["IoT", "Raspberry Pi", "Sensors"],
    description: "IoT system for automated Gourami fish farming. Monitors water quality, temperature, and feeding schedules using distributed sensor network.",
    features: ["Sensor integration", "Real-time monitoring", "Automated control"],
    status: "Prototype",
  },
  {
    id: 3,
    title: "ROS 2 Implementation",
    category: "ROBOTICS",
    tags: ["ROS 2", "Docker", "WSL", "Python"],
    description: "Complete ROS 2 robotics architecture implementation on Raspberry Pi 5. Docker containerization for seamless deployment across systems.",
    features: ["Node architecture", "Message passing", "Hardware integration"],
    status: "In Progress",
  },
  {
    id: 4,
    title: "6R Spherical Wrist",
    category: "SIMULATION",
    tags: ["Unity", "C#", "Robotics", "Physics"],
    description: "6-DOF robotic arm control simulation in Unity. Implements inverse kinematics and real-time trajectory planning for arm manipulation.",
    features: ["IK solver", "Trajectory planning", "Physics simulation"],
    status: "Active Development",
  },
]

export function GameplaySection() {
  const [activeProject, setActiveProject] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-background text-foreground overflow-hidden py-20 ml-0 lg:ml-16"
    >
      {/* Section number */}
      <div className="absolute top-8 right-8 text-[200px] font-black text-muted opacity-20 leading-none select-none pointer-events-none">
        04
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
        className="absolute top-32 left-[5%] w-24 h-40 transition-transform duration-500 opacity-25"
        style={{ 
          backgroundColor: 'oklch(0.35 0.08 250)',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` 
        }}
      />
      <div 
        className="absolute bottom-40 right-[8%] w-36 h-28 transition-transform duration-500 opacity-20"
        style={{ 
          backgroundColor: 'oklch(0.28 0.05 240)',
          transform: `translate(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px)` 
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-xs tracking-[0.3em] text-accent mb-2 font-mono">[ DEPLOYMENT ]</div>
          <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight">
            PROJECT<br />
            <span className="text-accent">ARCHIVE</span>
          </h2>
        </div>

        {/* Projects grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={cn(
                "group text-left p-6 transition-all duration-300 border cursor-pointer",
                activeProject === index 
                  ? "border-accent bg-accent bg-opacity-15" 
                  : "border-border bg-background hover:border-accent hover:bg-accent hover:bg-opacity-10"
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-xs font-bold text-accent tracking-wider mb-1">
                    [ {project.category} ]
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className={cn(
                  "w-2 h-2 flex-shrink-0 transition-all duration-300 mt-1",
                  activeProject === index ? "bg-accent scale-150" : "bg-border"
                )} />
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 text-[10px] font-bold bg-accent bg-opacity-20 text-accent border border-accent border-opacity-50 tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">{project.status}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed view */}
        {activeProject !== null && (
          <div className={`mt-16 p-8 border border-accent bg-accent bg-opacity-5 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Project info */}
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                  {projects[activeProject].title}
                </h3>
                <p className="text-sm text-accent font-mono mb-4">
                  [ {projects[activeProject].category} ]
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {projects[activeProject].description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-accent tracking-wider mb-2">[ FEATURES ]</div>
                  {projects[activeProject].features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-accent" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Technologies */}
              <div>
                <div className="text-xs font-bold text-accent tracking-wider mb-4">[ TECHNOLOGIES ]</div>
                <div className="flex flex-wrap gap-3">
                  {projects[activeProject].tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-2 text-xs font-bold bg-accent bg-opacity-20 text-accent border border-accent tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status */}
                <div className="mt-8 p-4 border border-border bg-background">
                  <div className="text-xs font-bold text-accent tracking-wider mb-2">[ STATUS ]</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm text-foreground">{projects[activeProject].status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="text-sm font-bold text-accent">
            {String(activeProject + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={cn(
                  "w-2 h-2 transition-all duration-300",
                  activeProject === index ? "w-8 bg-accent" : "bg-border hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
