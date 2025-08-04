import { workExperience } from '@/data'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/MovingBorders'

const Experience = () => {
  return (
    <div className="py-20" id="experience">
        <h1 className="heading text-silver-100">
            Experience Sharpened with Iron and Forged with {' '}
            <span className="text-gold"> Uru!</span>
        </h1>
        <br />
        <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-4 px-4 md:px-8">
            {workExperience.map((card) => (
                <Button
                    key={card.id}
                    duration={Math.floor(Math.random() * 1000) + 2500}
                    borderRadius='1.75rem' // Increased border radius for rounder edges
                    style={{
                        background: 'rgb(22,22,22)',
                        backgroundImage: 'linear-gradient(90deg, rgba(216, 122, 0, 1) 0%, rgba(192, 192, 192, 1) 50%, rgba(255, 215, 0, 1) 100%)', // Orange/Bronze to Silver to Gold
                        minHeight: '250px', // Uniform height for all viewports
                        maxHeight: '300px', // Cap height for consistency
                        borderRadius: '1.75rem', // Ensure consistent rounding with Button component
                    }}
                    className="flex-1 text-white border-none dark:border-none bg-shadow flex items-center p-4" // Removed border
                >
                        <Image
                            src={card.thumbnail}
                            alt={card.title}
                            width={96} // Reduced size for better fit
                            height={96} // Reduced size for better fit
                            className="lg:w-24 md:w-20 w-16 object-cover rounded-lg" // Rounded image to match container
                        />
                        <div className="ms-4 flex-1">
                            <h1 className="text-start text-xl md:text-2xl font-bold text-gold">
                                {card.title}
                            </h1>
                            <p className="text-start text-sm md:text-base text-silver-100 mt-2 font-semibold line-clamp-3">
                                {card.desc}
                            </p>
                        </div>                         
                </Button>
            ))}
        </div>
    </div>
  )
}

export default Experience