import React, { useEffect, useState, useRef } from 'react'
import './ScrollController.css'

export default function ScrollController({ elements = [] }) {
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [containerHeight, setContainerHeight] = useState(window.innerHeight)
  const [containerWidth, setContainerWidth] = useState(window.innerWidth)

  const vhToPx = (vh) => (vh / 100) * containerHeight

  const maxHeightVh = elements.reduce((acc, el) => {
    if (React.isValidElement(el)) return acc
    const bottom = (el.top || 0) + (el.height || 0)
    return Math.max(acc, bottom)
  }, 0)

  const [elementsPx, setElementsPx] = useState([])

  useEffect(() => {
    const calculated = elements.map((el) => {
      if (React.isValidElement(el)) return null
      const topPx = vhToPx(el.top || 0)
      const bottomPx = topPx + vhToPx(el.height || 0)
      return { topPx, bottomPx }
    })
    setElementsPx(calculated)
  }, [elements, containerHeight])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => setScrollY(container.scrollTop)
    const handleResize = () => {
      setContainerHeight(container.offsetHeight)
      setContainerWidth(container.offsetWidth)
    }

    container.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    handleScroll()
    handleResize()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className="ScrollController"
      ref={containerRef}
      style={{ height: '100dvh', overflowY: 'auto', position: 'relative' }}
    >
      <div style={{ height: `${maxHeightVh}vh`, position: 'relative' }}>
        {elements.map((el, i) => {
          if (React.isValidElement(el)) return el

          const { topPx, bottomPx } = elementsPx[i] || { topPx: 0, bottomPx: 0 }
          const isVisible = scrollY + containerHeight > topPx && scrollY < bottomPx

          return (
            <div
              key={i}
              className={`section ${isVisible ? 'visible' : ''}`}
              style={{
                position: 'absolute',
                top: `${el.top}vh`,
                height: `${el.height}vh`,
                width: '100%',
              }}
            >
              <div className={`wrapper ${isVisible ? 'visible' : ''}`}>
                {React.cloneElement(el.component, {
                  scrollY,
                  startPx: topPx,
                  endPx: bottomPx,
                  containerHeight,
                  containerWidth,
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
