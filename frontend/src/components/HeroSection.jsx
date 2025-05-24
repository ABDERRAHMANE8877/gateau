import React from 'react'
import WeddingCake from '../components/WeddingCake'
import Hero from '../components/Hero'
import '../css/HeroSection.css'

const HeroSection = () => {
  return (
    <div className='home-container'>
        <Hero></Hero>
        <WeddingCake></WeddingCake>    
    </div>
  )
}

export default HeroSection