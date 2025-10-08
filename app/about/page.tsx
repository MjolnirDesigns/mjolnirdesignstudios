"use client";

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems } from '@/data';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-silver-100 text-4xl font-bold text-center mb-12">
              About Mjolnir Design Studios
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <p className="text-lg text-gray-300 mb-6 md:mb-8">
                Mjolnir Design Studios is a creative agency specializing in powerful digital designs. We forge powerful animations, icons, images, logos, videos, and websites that embody the power of Thor&apos;s hammer, Mjolnir.
              </p>
              <p className="text-lg text-gray-300 mb-6 md:mb-8">
                Our mission is to build digital masterpieces with might and precision. With a team of skilled designers and developers, we deliver high-quality, custom solutions for clients in America and worldwide.
              </p>
              <p className="text-lg text-gray-300">
                Our studio is headquartered in the fabled realm of Asgard! However we interact with the realm of Midgard with our location in Tampa, Florida. We blend ancient design inspirations with modern technology to create masterful user experiences worthy of the mighty hammer, Mjolnir!
              </p><br />
              <p className="text-lg text-center text-gold">
                Mjolnir! A Weapon to Destroy, or a Tool to Build!
              </p>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default AboutUs;