import React from 'react'
import '../css/Hero.css'
const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='textHero'>
        <h1>MON GATEAU</h1>
        <div>
          <p>the art of cake</p>
          <div className='ligne'>

          </div>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam omnis corrupti voluptatibus doloribus quis modi.</p>
        <button>make now</button>
      </div>
      <div className='imagesHero'>
        <img  alt="img/jpg" />
        <img  alt="img/jpg" />
        <img  alt="img/jpg" />
      </div>
    </div>
  )
}

export default Hero