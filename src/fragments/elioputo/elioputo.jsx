import "./elioputo.css"


//img
import elioTransparent from "../../assets/elioTransparent.png"

//social
import social_instagram from "../../assets/social/instagram.svg"
import social_youtube from "../../assets/social/youtube.svg"
import social_web from "../../assets/social/web.svg"

//brands
import brand_klinpig from "../../assets/brands/klinpig.png"
import brand_santafixie from "../../assets/brands/santafixie.png"
import brand_rockbros from "../../assets/brands/rockbros.png"
import brand_fabricbike from "../../assets/brands/fabricbike.png"  
import brand_fabricat from "../../assets/brands/fabricat.jpg"
import brand_panot from "../../assets/brands/panot.png"
import brand_stickerseeds from "../../assets/brands/stickerseeds.png"
import brand_favelaframa from "../../assets/brands/favelaframa.jpg"
import { useEffect, useRef, useState } from "react"

const brands = [
  {
    img:brand_klinpig,
    name:"Klinpig",
    bg:"#FFB1B9",
    url:"https://www.klinpig.com/",
    instagram:"https://www.instagram.com/klinpig/",
  },
  {
    img:brand_santafixie,
    name:"Santa Fixie",
    bg:"#fff",
    url:"https://www.santafixie.com/",
    instagram:"https://www.instagram.com/santafixie/",
  },
  {
    img:brand_rockbros,
    name:"RockBros",
    bg:"#419941",
    url:"https://www.rockbros.com/",
    instagram:"https://www.instagram.com/rockbros_europe/",
  },
  {
    img:brand_fabricbike,
    name:"FABRICBIKE",
    bg:"#fff",
    url:"https://fabricbike.com/",
    instagram:"https://www.instagram.com/fabricbike/",
  },
  {
    img:brand_fabricat,
    name:"FABRICAT",
    url:"https://fabri.cat/",
    instagram:"https://www.instagram.com/fabricat__/",
  },
  {
    img:brand_panot,
    name:"PANOT",
    bg:"#fff",
    url:"https://panotmobility.com/",
    instagram:"https://www.instagram.com/panotmobility/",
  },
  {
    img:brand_stickerseeds,
    name:"Sticker Seeds",
    bg:"#000",
    url:"https://stickerseeds.com/",
    instagram:"https://www.instagram.com/stickerseeds/",
  },
  {
    img:brand_favelaframa,
    name:"FAVELA FRAMA",
    youtube:"https://www.youtube.com/channel/UC1_me7dzBOpLuVB1WaGtcqA",
    instagram:"https://www.instagram.com/favelaframa/",
  },
  
]



















export function Elioputo_H1(){

  return <h1 className="Elioputo_H1">@elioputo</h1>
}









export function Elioputo_text(){

  return <div className="Elioputo_text">
    <h2>Espiritu libre</h2>
    <h2>Alma creativa</h2>
  </div>
}









export function Elioputo_transparent(){

  return <div className="Elioputo_transparent"> 
    <img src={elioTransparent} alt="Elio" />
  </div>
}









export function Elioputo_brands({scrollY, startPx, endPx, containerHeight, containerWidth }) {
  const contentRef = useRef(null)
  const [contentWidth, setContentWidth] = useState(0)


  
  const a = scrollY + containerHeight - startPx -900
  const b = endPx - startPx
  const progress = a / b * 2


  useEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.scrollWidth)
      }
    }

    measure() // medir al montar
    window.addEventListener('resize', measure) // medir si cambia tamaño ventana
    return () => window.removeEventListener('resize', measure)
  }, [])

  const visibleWidth = containerHeight || window.innerHeight
  const maxTranslateX = contentWidth - visibleWidth
  const translateX = maxTranslateX > 0 ? -progress * maxTranslateX : 0

  return (
    <div className="Elioputo_brands">
      <h1>BRANDS</h1>
      <div 
        className="brands_container" 
        ref={contentRef} 
        style={{height: contentWidth > 0 ? `${contentWidth}px` : 'auto'}}
      >
        <div className="scroller" style={{ transform: `translateX(${translateX}px)` }}>
          {brands.map((brand, index) => <Elioputo_brands_brand brand={brand} index={index} key={index} />)}
        </div>
      </div>
    </div>
  )
}




function Elioputo_brands_brand({brand,index}){

  return <div
    key={index}
    className={`brand_item_wrapper ${!brand.bg ? 'no-bg' : ''}`}
  >
    <a
      href={brand.url || "#"}
      target="_blank"
      rel="noreferrer"
      className="brand_item"
      style={{ backgroundColor: brand.bg || 'transparent' }}
    >
      <img src={brand.img} alt={brand.name} />
    </a>
    <div className="brand_overlay">
      <span className="brand_name">{brand.name}</span>
      <div className="brand_socials">
        {brand.instagram && (
          <a href={brand.instagram} target="_blank" rel="noreferrer">
            <img src={social_instagram} alt="Instagram" />
          </a>
        )}
        {brand.youtube && (
          <a href={brand.youtube} target="_blank" rel="noreferrer">
            <img src={social_youtube} alt="YouTube" />
          </a>
        )}
        {brand.url && (
          <a href={brand.url} target="_blank" rel="noreferrer">
            <img src={social_web} alt="Web" />
          </a>
        )}
      </div>
    </div>
  </div>
}