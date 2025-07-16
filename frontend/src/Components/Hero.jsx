import React from 'react'
import './Hero.css'
import board from '../assets/board.jpg'

const Hero = () => {
  return (
    <div className='hero-section'>
        <div className='text-side'>
            <h1>TaskFlow:</h1>
            <h2>Work Together in Real-Time</h2>
        </div>
        <div className='image'>
            <img src={board} alt="" />
        </div>
    </div>
  )
}

export default Hero
