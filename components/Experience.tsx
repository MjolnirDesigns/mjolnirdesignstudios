import { workExperience } from '@/data'
import React from 'react'
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
                    borderRadius='1.75rem'
                    style={{
                        background: 'rgb(22,22,22)',
                        backgroundColor: 'linear-gradient(90deg, rgba(22,22,22,1) 0%, rgba(64,0,0,1) 70%, rgba(80,80,80,1) 100%)',
                        
                    }}
                    className="flex-1 text-white border-white[0.1] dark:border-silver-100 bg-shadow"
                >
                    <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-4">
                        <img 
                            src={card.thumbnail} 
                            alt={card.thumbnail}
                            className="lg:w-32 md:w-20 w-16" 
                        />
                            <div className="lg:ms-5">
                                <h1 className="text-start text-xl md:text-2xl font-bold text-gold">
                                    {card.title}
                                </h1>
                                <p className="text-start text-lg text-silver-100 mt-3 font-semibold">
                                    {card.desc}
                                </p>
                            </div>                         
                    </div>

                </Button>
            ))}
            
        </div>
    </div>
  )
}

export default Experience