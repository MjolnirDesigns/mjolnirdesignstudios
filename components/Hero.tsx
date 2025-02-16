import { FaLocationArrow } from 'react-icons/fa6'
import ShimmerButton from './ui/ShimmerButton'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/TextGenerateEffect'

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
        <div>
            <Spotlight className="-top-40 -left-10 md:-top-20 md:-left-32 h-screen" fill="white" />
            <Spotlight className="-top-10 -left-full md:-top-20 md:-left-32 h-[80vh] w-[50vw]" fill="silver" />
            <Spotlight className="top-28 left-80 md:-top-20 md:-left-32 h-[80vh] w-[50vw]" fill="gold" />
            <Spotlight className="top-50 right-80 md:-top-20 md:-right-32 h-[80vh] w-[50vw]" fill="gold" />
        </div>

        <div className="h-full w-full dark:bg-gray-900 bg-white  dark:bg-grid-white/[0.07] bg-grid-black/[0.2] 
        flex items-center justify-center absolute top-0 left-0">
        {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-900
             bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        </div>
        
            <div className="flex justify-center relative my-20 z-10">

                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col item-center justify-center" >
                    <h2 className="uppercase tracking-widest text-sms text-center text-gray-300 max-w-80">
                        Mjolnir, a mighty tool to build worthy digital design experiences!
                    </h2>
                

                    <TextGenerateEffect
                        className="text-center text-[40px] md:text-5xl lg:text-6xl"
                        words="Imagine, Design, and Mystify!"
                    />

                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-silver">
                        Our design studio is on a mission to create premium digital designs, experiences, and products!
                    </p>

                    <a href="#about">
                        <ShimmerButton
                            title="Our Projects"
                            icon={<FaLocationArrow />}
                            position='right'
                        />
                    </a>



                </div>
            </div>

        

        </div>
  )
}

export default Hero