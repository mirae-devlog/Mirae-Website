"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [animationStep, setAnimationStep] = useState("loading") 

  useEffect(() => {
    // Simulasi loading (sekitar 2.5 detik total hingga 100%)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          startTransition()
          return 100
        }
        const increment = Math.random() * 5 // Kecepatan sedikit lebih lambat
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const startTransition = () => {
    setAnimationStep("wipe-brown")
    setTimeout(() => {
      setAnimationStep("wipe-white")
    }, 600)
    setTimeout(() => {
      setAnimationStep("finished")
      onComplete()
    }, 1400)
  }

  if (animationStep === "finished") return null

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none flex items-center justify-center bg-white cursor-wait">
      
      {/* === LAYER 1: KONTEN UTAMA (Teks Rata Kiri) === */}
      {/* PERUBAHAN: items-center -> items-start, text-center -> text-left, tambahkan padding kiri (pl-...) */}
      <div className="absolute inset-0 bg-white z-10 flex flex-col justify-center p-8 pl-24 md:pl-32 text-left">
         {/* Background grid subtle */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(#5a4a3a 1px, transparent 1px),
              linear-gradient(90deg, #5a4a3a 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Konten Teks Utama */}
        <div className="relative z-20 flex flex-col items-start font-sans">
          <h1 className="text-5xl md:text-7xl font-black text-[#8b6f47] tracking-tighter mb-2 leading-none">
            MUHAMAD<br />HAFIZH<br />HUSAINI
          </h1>
          <p className="text-lg md:text-xl text-[#5a4a3a] font-bold tracking-widest mb-6 uppercase">
            Industrial Informatics Engineer
          </p>
          <div className="h-1 w-24 bg-[#8b6f47]/30 mb-6" /> {/* Garis pemanis */}
          <p className="text-sm font-mono text-gray-600 max-w-md leading-relaxed">
            // Specializing in ROS 2 Architecture, IoT Systems Development, and Advanced Robotics Implementation.
          </p>
        </div>

        {/* === TAMBAHAN: LOADING SYSTEM KANAN BAWAH === */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end font-mono text-xs text-[#5a4a3a]">
          <p className="mb-2 tracking-widest uppercase">System Initialization Sequence</p>
          <div className="flex items-center gap-2">
             <span className="font-bold">{Math.floor(progress).toString().padStart(3, '0')}%</span>
             <div className="flex gap-1">
               {[0, 1, 2].map((i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b6f47] animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
               ))}
             </div>
          </div>
          <p className="mt-1 text-[10px] opacity-70">Loading core modules...</p>
        </div>
      </div>


      {/* === SIDEBAR PROGRESS BAR (Kiri) === */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 z-20 flex flex-col justify-end border-r border-[#8b6f47]/10 bg-white">
        <div 
          className="w-full bg-[#8b6f47] transition-all duration-100 ease-out relative"
          style={{ height: `${progress}%` }}
        >
           <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 shadow-[0_0_10px_rgba(139,111,71,0.5)]" />
        </div>
        {/* Teks Vertikal di sidebar */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 writing-vertical-rl text-[10px] font-mono text-[#8b6f47] tracking-[0.3em] opacity-50 uppercase">
           Loading Process //
        </div>
      </div>


      {/* === LAYER 2: BROWN SWIPE === */}
      <div 
        className={cn(
          "absolute inset-0 bg-[#8b6f47] z-30 transform -translate-x-full transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          (animationStep === "wipe-brown" || animationStep === "wipe-white") && "translate-x-0"
        )}
      />


      {/* === LAYER 3: WHITE SWIPE === */}
      <div 
        className={cn(
          "absolute inset-0 bg-white z-40 transform -translate-x-full transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          animationStep === "wipe-white" && "translate-x-0"
        )}
      />

    </div>
  )
}