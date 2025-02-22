import React from 'react'
import { Spotlight } from './ui/Spotlight-New';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import ShimmerButton from './ui/ShimmerButton';



const Hero = () => {
  return (
    <div className="pb-20 pt-36">
        <div>
            <Spotlight />
        
            <div className="h-screen w-full dark:bg-shadow bg-white bg-grid-white/[0.07] flex items-center justify-center absolute top-0 left-0">
      
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-shadow bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <div className="flex justify-center relative my-20 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">

                    <h1 className="uppercase tracking-widest text-4xl font-bold text-center text-silver-100">
                        Whosoever holds this hammer...
                    </h1>

                    <TextGenerateEffect 
                        className="uppercase text-center text-5xl lg:text-6xl"
                        words="if he be worthy, shall possess the power of Thor!"
                    />

                    <p className="text-center md:tracking-wider mb-4 text-lg md:text-xl lg:text-2xl text-silver-100">
                        Mjolnir, forged in the heart of a dying star.. A weapon to destroy, or a tool to build! 
                    </p>

                    <a href="#projects">
                        <ShimmerButton 
                            title="Our Designs!"
                        />
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero;