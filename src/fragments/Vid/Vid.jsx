import { useEffect, useState } from 'react'
import './Vid.css'

import vid_hor_short from '../../assets/videos/1121.mp4'
import vid_hor from '../../assets/videos/1121_long.mp4'
import vid_vert_short from '../../assets/videos/1121v.mp4'
import vid_vert from '../../assets/videos/1121v_long.mp4'

export default function Vid() {
  const [isVertical, setIsVertical] = useState(window.innerHeight > window.innerWidth)
  const [longLoaded, setLongLoaded] = useState(false)

  useEffect(() => {
    const onResize = () => {
      setIsVertical(window.innerHeight > window.innerWidth)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const shortSrc = isVertical ? vid_vert_short : vid_hor_short
  const longSrc = isVertical ? vid_vert : vid_hor

  return (
    <div className='Vid'>
      {!longLoaded && (
        <video
          key='short'
          src={shortSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <video
        key='long'
        src={longSrc}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLongLoaded(true)}
        style={{ display: longLoaded ? 'block' : 'none' }}
      />
    </div>
  )
}
