"use client";

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems } from '@/data';

const Demos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-silver-100 text-4xl font-bold text-center mb-12">
              <span className="text-gold">MjolnirUI </span> Component Demos
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <p className="text-lg text-gray-300 mb-6 md:mb-8">
                Explore interactive demonstrations of MjolnirUI components, showcasing their Asgardian power and Norse-inspired styling. Components are infused with mythical themes, using a palette of gold, silver, bronze, with bold and electric blue and green hues.
              </p>
              <p className="text-lg text-gray-300 mb-6 md:mb-8">
                Below is a placeholder section for live demos. As components are developed, interactive examples will be added here to demonstrate usage, customization, and animations.
              </p>
              {/* Placeholder for component demonstrations */}
              <div className="border border-white/10 bg-black/30 backdrop-blur-md rounded-3xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gold mb-4">Demo Placeholder</h2>
                <p className="text-gray-300 mb-4">
                  Insert component demos here (e.g., Avatar, Buttons, Animations).
                </p>
                {/* Example placeholder for a demo */}
                <div className="flex justify-center items-center h-32 bg-shadow rounded-lg">
                  <span className="text-gray-400">Component Demo Coming Soon</span>
                </div>
              </div>
              <p className="text-lg text-gray-300">
                Check back for updates as we forge more components in the fires of Muspelheim!
              </p>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default Demos;