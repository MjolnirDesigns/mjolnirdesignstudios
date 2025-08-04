"use client"; // Add this to fix the RSC bundler error

import React from 'react';
import { motion } from "framer-motion";
import { socialMedia } from '@/data';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          width={1920}
          height={400}
          className="w-full h-full opacity-50"
        />
      </div>

      {/* Links Section with 4 Columns */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Column */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Milestones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Team</a></li>
            </ul>
          </div>

          {/* Designs Column */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Designs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Animations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Components</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Icons/Logos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Images</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Videos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Websites</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Email Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Web3</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition block">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-12">
        {/* Social Media Icons with responsive size and grow animation */}
        <div className="flex flex-row justify-center gap-4 mb-4">
          {socialMedia.map((profile) => (
            <motion.div
              key={String(profile.id)}
              whileHover={{ scale: 1.1 }} // Grow on hover
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 cursor-pointer flex justify-center items-center bg-transparent border border-gold rounded-lg text-white" // Responsive sizes
            >
              <Image
                src={profile.img}
                alt={`Profile ${profile.id}`}
                width={25}
                height={25}
                className="w-6 h-6 md:w-8 md:h-8" // Scale image inside responsively
              />
            </motion.div>
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