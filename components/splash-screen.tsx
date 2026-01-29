'use client'

import { useEffect, useState } from 'react'

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timings = [500, 1200, 1800, 2600]
    let timeoutId: NodeJS.Timeout

    for (let i = 0; i < timings.length; i++) {
      setTimeout(() => setPhase(i + 1), timings[i])
    }

    timeoutId = setTimeout(() => {
      setIsComplete(true)
      onComplete()
    }, 3200)

    return () => clearTimeout(timeoutId)
  }, [onComplete])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-[999] bg-white overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#5a4a3a 1px, transparent 1px),
            linear-gradient(90deg, #5a4a3a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Logo/Brand text */}
        <div className={`transition-all duration-500 mb-12 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-6xl md:text-7xl font-bold text-brown-800 tracking-tighter">
            MUHAMAD<br />HAFIZH<br />HUSAINI
          </h1>
          <p className="text-center mt-4 text-brown-600 font-medium">Industrial Informatics Engineer</p>
        </div>

        {/* Subtitle/Tagline */}
        <div className={`transition-all duration-500 delay-300 mb-12 text-center max-w-lg ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg text-gray-700">
            Specializing in ROS 2, IoT Systems, and Robotics Architecture
          </p>
        </div>

        {/* Animated lines */}
        <div className="flex gap-2 items-center justify-center mb-12">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${phase >= 3 ? 'h-8 opacity-100' : 'h-0 opacity-0'}`}
              style={{ 
                transitionDelay: `${i * 100}ms`,
                backgroundColor: i % 2 === 0 ? '#8b6f47' : '#d4a574',
                width: '3px'
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className={`transition-all duration-500 delay-500 text-center ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm text-gray-600 font-mono tracking-widest">
            INITIALIZING SYSTEM...
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-brown-700 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-brown-300 opacity-50" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-brown-300 opacity-50" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-brown-300 opacity-50" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-brown-300 opacity-50" />
    </div>
  )
}
