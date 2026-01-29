"use client"

import { useRef, useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CharacterShowcase } from "@/components/character-showcase"
import { WorldSection } from "@/components/world-section"
import { GameplaySection } from "@/components/gameplay-section"

import { GallerySection } from "@/components/gallery-section"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"
import { ProgressSidebar } from "@/components/progress-sidebar"
import { CursorFollower } from "@/components/cursor-follower"
import { SplashScreen } from "@/components/splash-screen"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(progress)
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
      document.documentElement.style.setProperty('--scroll-progress', `${progress}`)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative bg-background text-foreground overflow-x-hidden cursor-none md:cursor-none">
      {/* Splash screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {/* Custom cursor */}
      <CursorFollower />
      
      {/* Progress sidebar */}
      <ProgressSidebar />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        <HeroSection />
        <CharacterShowcase />
        <WorldSection />
        <GameplaySection />
        <GallerySection />
        <NewsSection />
      </main>
      
      <Footer />

      {/* Global scroll progress indicator - top of page */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-border z-[100]">
        <div 
          className="h-full bg-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  )
}
