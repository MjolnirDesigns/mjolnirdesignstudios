"use client";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBG";
import { GlobeDemo } from "./GridGlobe";
import { useState } from "react";
import  animationData  from "@/data/confetti.json";
import Lottie from "react-lottie";
import ShimmerButton from "./ShimmerButton";
import { IoCopyOutline } from "react-icons/io5";
import Image from "next/image";



export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md-grid-row-7 gap-8 mx-auto px-10 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    id,
    img,
    imgClassName,
    titleClassName,
    spareImg,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    id?: number;
    img?: string,
    imgClassName?: string,
    titleClassName?: string,
    spareImg?: string,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('contact@mjolnirdesignstudios.com');
        setCopied(true);
    }

    return (
    <div
        className={cn(
            "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 border border-white/[0.1]",
            className
        )}
        style={{
            background: 'rgb(22,22,22)',
            backgroundColor: 'linear-gradient(90deg, rgba(22,22,22,1) 0%, rgba(64,0,0,1) 70%, rgba(80,80,80,1) 100%)',
        }}
    >
    <div className={`${id === 6 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
            {img && (
                <Image
                    src={img}
                    alt={img || "grid-item"}
                    width={500}
                    height={500}
                    className={cn(imgClassName, "object-cover, object-center")}
                />
            )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-8"}`}>
            {spareImg && (
                <Image
                    src={spareImg}
                    alt={spareImg || "spare-item"}
                    width={500}
                    height={500}
                    className={"object-cover, object-center w-full h-full"}
                />
            )}
        </div>

        {id === 6 && (
            <BackgroundGradientAnimation>
                <div className="absolute z-50 flex items-center justify-center text-white font-bold" />
            </BackgroundGradientAnimation>
        )}

        <div className={cn(
            titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 text-white/[0.5]'
        )}>
            <div className="font-sans font-bold text-lg lg:text-3xl max-2-96 z-10">
                {title}
            </div>
            <div className="font-sans font-extralight text-gold text-sm md:text-xs lg:text-base z-10">
                {description}
            </div>
            
        

            {id === 2 && <GlobeDemo />}

             
            {id === 3 && (

                <div className="flex gap-1 lg:gap-4 w-fit absolute -right-3 lg:-right-2">

                    <div className="flex flex-col gap-2 lg:gap-4">
                        {['ExpressJS','NextJS', 'ReactJS', 'TypeScript'].map
                        ((item) => (
                            <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#C0C0C0]">
                                {item}
                            </span>
                        ))}
                        <span className="py-4 px-3 rounded-lg text-center bg-[#C0C0C0]" />
                    </div>

                    <div className="flex flex-col gap-2 lg:gap-4">
                        <span className="py-4 px-3 rounded-lg text-center bg-[#C0C0C0]" />
                        {['Angular', 'Framer', 'Material UI', 'MongoDB'].map
                        ((item) => (
                            <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#48494B]">
                                {item}
                            </span>
                        ))}
                    </div>

                </div>
            )}

            {id === 6 && (
                <div className="mt-5 relative">
                    <div className={`absolute -bottom-5 right-0`}>
                        <Lottie options={{
                            loop: copied,
                            autoplay: copied,
                            animationData: animationData,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            } 
                        }} />
                    </div>

                    <ShimmerButton 
                        title={copied ? 'Email copied' : 'Copy Email'}
                        icon={<IoCopyOutline />}
                        position="left"
                        otherClasses=""
                        handleClick={handleCopy}
                        />
                </div>
            )}

            </div>
        </div>
    </div>
    );
};
