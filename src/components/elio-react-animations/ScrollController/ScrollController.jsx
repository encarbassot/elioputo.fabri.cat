// ScrollController.jsx
import React, { useEffect, useState, useRef } from 'react'
import './ScrollController.css'

export default function ScrollController({ elements = [] }) {
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [visibleIndices, setVisibleIndices] = useState([])

  // convertir vh a px
  const vhToPx = (vh) => (vh / 100) * window.innerHeight

  // calcular maxHeight en vh
  const maxHeight = elements.reduce((acc, el) => {
    if (React.isValidElement(el)) return acc
    const elBottom = (el.top || 0) + (el.height || 0)
    return Math.max(acc, elBottom)
  }, 0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const y = container.scrollTop
      setScrollY(y)

      const newVisible = elements.map((el) => {
        if (React.isValidElement(el)) return true

        const elHeightVh = el.height || maxHeight
        const elTopVh = el.fromBottom ? maxHeight - elHeightVh : el.top || 0

        const topPx = vhToPx(elTopVh)
        const bottomPx = topPx + vhToPx(elHeightVh)
        return y >= topPx && y <= bottomPx
      })

      setVisibleIndices(newVisible)
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll() // inicializar al cargar
    return () => container.removeEventListener('scroll', handleScroll)
  }, [elements, maxHeight])

  return (
    <div
      className="ScrollController"
      ref={containerRef}
      style={{ height: '100dvh', overflowY: 'auto', position: 'relative' }}
    >
      <div style={{ height: `${maxHeight}vh`, position: 'relative' }}>
        {elements.map((el, i) => {
          let top = 0
          let height = maxHeight
          let component = el

          if (!React.isValidElement(el)) {
            component = el.component
            height = el.height || maxHeight
            top = el.fromBottom ? maxHeight - height : el.top || 0
          }

          const isVisible = visibleIndices[i]

          return (
            <div
              key={i}
              className={`section ${isVisible ? 'visible' : ''}`}
              style={{
                position: 'absolute',
                top: `${top}vh`,
                height: `${height}vh`,
                width: '100%',
              }}
            >
              <div className={`wrapper ${isVisible ? 'visible' : ''}`}>
                {component}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
  