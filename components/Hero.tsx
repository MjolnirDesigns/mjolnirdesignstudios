import React from 'react';
import { Spotlight } from './ui/Spotlight-New';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import ShimmerButton from './ui/ShimmerButton';

const Hero = () => {
  return (
    <div className="pb-20 pt-4">
      <div>
        <Spotlight />
        
        <div className="min-h-screen w-full dark:bg-shadow bg-white bg-grid-white/[0.07] flex items-center justify-center absolute top-0 left-0 md:h-screen max-h-[100vh] sm:max-h-[90vh]">
          {/* Constrain height on small screens, full height on md+ */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-shadow bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="flex justify-center relative my-4 z-10">
          <div className="max-w-[90vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center px-4">
            <h1 className="uppercase tracking-widest text-center text-silver-100 font-bold text-3xl sm:text-4xl md:text-4xl lg:text-4xl break-words hyphens-auto leading-tight pt-24 sm:pt-16 md:pt-0">
              {/* pt-24 for <=480px, pt-16 for 481-640px, none for md+ */}
              Whosoever holds this hammer...
            </h1>

            <TextGenerateEffect 
              className="uppercase text-center text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight pt-6 sm:pt-4 md:pt-0"
              words="if he be worthy, shall possess the power of Thor!"
            />

            <p className="text-center md:tracking-wider mb-4 text-base sm:text-lg md:text-xl lg:text-2xl text-silver-100 pt-6 sm:pt-4 md:pt-0">
              Mjolnir, forged in the heart of a dying star.. A weapon to destroy, or a tool to build! 
            </p>

            <a 
              href="#projects"
              aria-label="View our designs"
              className="mt-4 sm:mt-6 md:mt-8"
            >
              <ShimmerButton 
                title="Our Designs!"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;