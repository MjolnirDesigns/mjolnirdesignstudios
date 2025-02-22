import React from 'react'
import { ColorfulText } from './ui/ColorfulText'
import { motion } from "motion/react"
import ShimmerButton from './ui/ShimmerButton';
import { FaLocationArrow } from 'react-icons/fa6';
import { socialMedia } from '@/data';

console.log("motion:", motion);

const Footer = () => {
    return (
        <footer className="w-full pt-20 pb-10" id="contact">
            <div className="w-full absolute left-0 -bottom-72 min-h-96">
                <img
                    src="/footer-grid.svg"
                    alt="grid"
                    className="w-full h-full opacity-50"
                />
            </div>

            <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[45vw] text-silver-100">
                    Summon the 
                    <ColorfulText 
                        text=" BiFrost!" 
                    />
                </h1>
                <p className="text-silver md:mt-8 my-4 text-center text-lg md:text-xl">
                    Let&apos;s connect and build a great project, For Midgard!
                </p>
                <a href="mailto:BTCWizerd@BitcoinWizerd.com">
                    <ShimmerButton
                        title="Mjolnir, To Me!"
                        icon={<FaLocationArrow 
                            position="right"
                            color="#FFCC11"
                        />}
                    />
                </a>
            </div>

            <div className="flex flex-col items-center mt-16">
                {/* Social Media Icons */}
                <div className="flex flex-row justify-center gap-4 mb-4">
                    {socialMedia.map((profile) => (
                    <div
                        key={profile.id}
                        className="w-10 h-10 cursor-pointer flex justify-center items-center bg-transparent border border-gold rounded-lg text-white"
                    >
                        <img
                        src={profile.img}
                        alt={profile.id}
                        width={25}
                        height={25}
                        />
                    </div>
                    ))}
                </div>

                {/* Copyright Text */}
                <p className="md:text-base text-sm md:font-normal font-bold text-center text-gold">
                    Copyright © 2025 Mjolnir Design Studios. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
