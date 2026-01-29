"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, ExternalLink } from "lucide-react"

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "WORKS", href: "#gallery" },
  { label: "UPDATES", href: "#updates" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 left-16 lg:left-16 z-40 transition-all duration-500",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 group",
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-muted-foreground hover:text-accent"
                  )}
                >
                  <span className="relative z-10">[ {item.label} ]</span>
                  <div
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-accent transition-all duration-300",
                      activeSection === item.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3 ml-auto">
              <a 
                href="#"
                className="hidden md:flex items-center gap-2 px-5 py-2 bg-accent text-accent-foreground text-xs font-bold tracking-wider hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">CONTACT</span>
                <ExternalLink size={14} className="relative z-10" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-background" />
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-foreground"
        >
          <X size={24} />
        </button>
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "text-2xl font-bold tracking-widest transition-all duration-300",
                activeSection === item.href.slice(1)
                  ? "text-accent"
                  : "text-muted-foreground hover:text-accent"
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </button>
          ))}
          <a 
            href="#"
            className="mt-8 px-8 py-3 bg-accent text-accent-foreground font-bold tracking-wider hover:shadow-lg transition-all"
            style={{
              transitionDelay: isMobileMenuOpen ? "600ms" : "0ms",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            CONTACT ME
          </a>
        </div>
      </div>
    </>
  )
}
