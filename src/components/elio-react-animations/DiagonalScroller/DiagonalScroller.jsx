import { useRef, useState, useEffect } from 'react'

export function DiagonalScroller({ children }) {
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    const updateHeight = () => {
      const child = containerRef.current.firstElementChild
      if (child) {
        setHeight(child.scrollWidth)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [children])

  return (
    <div
      ref={containerRef}
      style={{ height, overflowX: 'auto', overflowY: 'hidden' }}
    >
      {children}
    </div>
  )
}
