import './Vid.css'

import vid from "../../assets/videos/1121.mp4"


export default function Vid() {
  return (
    <div className='Vid'>
      <video
        src={vid}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  )
}
