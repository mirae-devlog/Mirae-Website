"use client"

import { useEffect, useState, useRef } from "react"

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: string }>>([])
  const trailIdRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add trail particle with unique timestamp-based ID
      const uniqueId = `${Date.now()}-${Math.random()}`
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: uniqueId }]
        return newTrail.slice(-8)
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])



  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] hidden md:block"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: 'oklch(0.55 0.15 250 / 0.5)',
              opacity: (index + 1) / trail.length * 0.5,
              transform: `scale(${(index + 1) / trail.length})`,
            }}
          />
        </div>
      ))}
      
      {/* Main cursor */}
      <div 
        className="fixed pointer-events-none z-[9999] hidden md:block transition-transform duration-75"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
        }}
      >
        {/* Outer ring */}
        <div 
          className={`absolute -inset-4 border-2 rounded-full transition-all duration-300 scale-100 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
          style={{
            borderColor: isHovering ? 'oklch(0.55 0.15 250)' : 'oklch(0.2 0 0 / 0.3)',
          }}
        />
        {/* Inner dot */}
        <div 
          className="w-2 h-2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: isHovering ? 'oklch(0.55 0.15 250)' : 'oklch(0.95 0 0)',
          }}
        />
      </div>
    </>
  )
}
