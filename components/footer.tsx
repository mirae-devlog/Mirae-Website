"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, ExternalLink, ChevronUp } from "lucide-react"

const footerLinks = [
  {
    title: "PORTFOLIO",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Works", href: "#gallery" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Skills", href: "#about" },
      { label: "Technologies", href: "#projects" },
      { label: "Contact", href: "#contact" },
      { label: "Resume", href: "#" },
    ],
  },
  {
    title: "CONNECT",
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Email", href: "mailto:" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:", label: "Email" },
]

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-card ml-0 lg:ml-16 border-t border-border">
      {/* Contact CTA banner */}
      <div className="relative z-10 bg-accent bg-opacity-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-2">
                LET'S WORK<br />
                <span className="text-accent">TOGETHER</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Interested in collaborating or learning more about my work?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="mailto:" 
                className="group relative px-8 py-4 bg-accent text-accent-foreground font-bold tracking-wider overflow-hidden hover:shadow-lg transition-all"
              >
                <span className="relative z-10">GET IN TOUCH</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 flex items-center justify-center border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 border-2 border-accent flex items-center justify-center">
                <span className="text-xs font-black text-accent">MH</span>
              </div>
              <span className="text-lg font-bold tracking-wider text-foreground">HUSAINI</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-bold tracking-[0.2em] text-accent mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                      <ExternalLink
                        size={10}
                        className={cn(
                          "opacity-0 transition-opacity duration-300",
                          hoveredLink === link.label && "opacity-100"
                        )}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-muted-foreground text-xs">
              <span>© 2026 Muhamad Hafizh Husaini. All rights reserved.</span>
              <span className="hidden md:block">•</span>
              <span>Industrial Informatics Engineering Student</span>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              <span className="text-xs tracking-wider">[ BACK TO TOP ]</span>
              <div className="w-8 h-8 flex items-center justify-center border border-current">
                <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Version indicator */}
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-muted opacity-50">
        [ v1.0 ]
      </div>
    </footer>
  )
}
