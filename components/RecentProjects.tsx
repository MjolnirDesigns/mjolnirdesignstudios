import { projects } from '@/data'
import React from 'react'
import { PinContainer } from './ui/3d-pin'
import { FaLocationArrow } from 'react-icons/fa6'
import Image from 'next/image'

const RecentProjects = () => {
    return (
        <div className="py-20 h-auto" id="projects">
            <h1 className="heading text-silver-100">
                Recent designs built for {' '}
                <span className="text-gold"> Asgardians!</span>
            </h1>
            <div className="flex flex-wrap sm:grid-cols-2 items-center justify-center p-4 gap-x-8 gap-y-8 mt-4 md:flex-row md:flex-wrap md:gap-x-24 md:grid-cols-2 md:gap-y-8">
                {projects.map(({
                    id,
                    title,
                    des,
                    img,
                    iconLists,
                    link,
                    imgClassName,
                }) => (
                    <div key={(id)} className="sm:h-[40rem] h-[32rem] flex items-center justify-center sm:w-[570px] w-[80vw]">
                        <PinContainer
                            title={title}
                            href={link}
                        >
                            <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-transparent items-center">
                                    <Image 
                                        src="/bg.png" 
                                        alt="bg-img"
                                        width={570}
                                        height={400}
                                        className="object-cover object-center"
                                    />
                                </div>
                                <Image 
                                    src={img}
                                    alt={title}
                                    width={570}
                                    height={400}
                                    className={imgClassName || "z-10 absolute top-1/2 -translate-y-1/2 w-full max-w-full h-auto object-contain"}
                                    priority
                                />
                            </div>
                            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 text-gold">
                                {title}
                            </h1>
                            <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2 text-silver">
                                {des}
                            </p>

                            <div className="flex items-center justify-between mt-7 mb-3">
                                <div className="flex items-center">
                                    {iconLists.map((icon, index) => (
                                        <div key={icon} className="border border-white/[0.2] rounded-full bg-shadow lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center"
                                        style={{
                                            transform:`translateX(-${5 * index * 2}px)`
                                        }}>
                                            <Image 
                                                src={icon} 
                                                alt={icon}
                                                width={32} // Adjust based on lg:w-10 lg:h-10 (40px) or w-8 h-8 (32px)
                                                height={32}
                                                className="p-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className="flex lg:text-xl md:text-xs text-sm text-silver">Open the BiFrost!</p>
                                    <FaLocationArrow className="ms-3"
                                        color="#FFCC11"
                                    />
                                </div>
                            </div>
                            
                        </PinContainer>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default RecentProjects