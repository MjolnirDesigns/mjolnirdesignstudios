"use client";

import React from 'react';
import { motion } from "framer-motion";
import { socialMedia } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={twMerge("w-full pt-20 pb-10 relative bg-transparent z-[1]", className)} id="contact">
      <div className="w-full absolute left-0 top-0 bottom-0 h-full bg-transparent z-[0]">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          width={1920}
          height={400}
          className="w-full h-full opacity-50 object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 lg:hover:text-gold transition block">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 lg:hover:text-gold transition block">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 lg:hover:text-gold transition block">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 lg:hover:text-gold transition block">Contact</Link></li>
              <li><Link href="/milestones" className="text-gray-400 lg:hover:text-gold transition block">Milestones</Link></li>
              <li><Link href="/team" className="text-gray-400 lg:hover:text-gold transition block">Team</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Designs</h3>
            <ul className="space-y-2">
              <li><Link href="/animations" className="text-gray-400 lg:hover:text-gold transition block">Animations</Link></li>
              <li><Link href="/components" className="text-gray-400 lg:hover:text-gold transition block">Components</Link></li>
              <li><Link href="/icons-logos" className="text-gray-400 lg:hover:text-gold transition block">Icons/Logos</Link></li>
              <li><Link href="/images" className="text-gray-400 lg:hover:text-gold transition block">Images</Link></li>
              <li><Link href="/videos" className="text-gray-400 lg:hover:text-gold transition block">Videos</Link></li>
              <li><Link href="/websites" className="text-gray-400 lg:hover:text-gold transition block">Websites</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-gray-400 lg:hover:text-gold transition block">Community</Link></li>
              <li><Link href="/help-center" className="text-gray-400 lg:hover:text-gold transition block">Help Center</Link></li>
              <li><Link href="/email-support" className="text-gray-400 lg:hover:text-gold transition block">Email Support</Link></li>
              <li><Link href="/faq" className="text-gray-400 lg:hover:text-gold transition block">FAQ</Link></li>
              <li><Link href="/email-support" className="text-gray-400 lg:hover:text-gold transition block">Email Support</Link></li>
              <li><Link href="/web3" className="text-gray-400 lg:hover:text-gold transition block">Web3</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 lg:hover:text-gold transition block">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 lg:hover:text-gold transition block">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-400 lg:hover:text-gold transition block">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-16 relative z-[1] pb-6">
        <div className="flex flex-row justify-center gap-4 mb-4">
          {socialMedia.map((profile) => (
            <motion.div
              key={String(profile.id)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 cursor-pointer flex justify-center items-center bg-transparent border border-gold rounded-lg text-white"
            >
              <a href={profile.link} target="_blank" rel="noopener noreferrer" title={`Profile ${profile.id}`}>
                <Image
                  src={profile.img}
                  alt={`Profile ${profile.id}`}
                  width={25}
                  height={25}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
            </motion.div>
          ))}
        </div>
        <p className="md:text-lg text-base md:font-normal font-bold text-center text-gold">
          Copyright © 2025 Mjolnir Design Studios
        </p>
        <p className="md:text-lg text-base md:font-normal font-bold text-center text-gold">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;