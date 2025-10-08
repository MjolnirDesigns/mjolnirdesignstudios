"use client";
import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems } from '@/data';

const Videos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-4xl font-bold text-center mb-12">
              Video Showcase
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8">
              <p className="text-lg text-gray-300 text-center mb-8">
                Check out some of our cinematic trailers productions for ProjectMOASS! These trailers were produced to showcase the power of Mjolnir Design Studios&#39; creative vision and storytelling.
              </p>

              {/* 2024 Video Container */}
              <div className="bg-transparent rounded-lg p-6 shadow-none hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-center mb-4 text-silver-100">ProjectMOASS 2024</h2>
                <div className="aspect-video mb-4">
                  <video
                    className="w-full h-full rounded-md"
                    src="/Videos/ProjectMOASS_2024.mp4"
                    controls
                    title="ProjectMOASS 2024 Trailer"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-gray-300 text-center">
                  Dive into the origins of ProjectMOASS with this 2024 trailer, highlighting some of our creative potential. The theme centers around the corruption of the monetary system, and an epic journey.
                </p>
              </div>

              {/* 2025 Video Container */}
              <div className="bg-transparent rounded-lg p-6 shadow-none hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-center mb-4 text-silver-100">ProjectMOASS 2025</h2>
                <div className="aspect-video mb-4">
                  <video
                    className="w-full h-full rounded-md"
                    src="/Videos/ProjectMOASS_2025.mp4"
                    controls
                    title="ProjectMOASS 2025 Trailer"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-gray-300 text-center">
                  The ProjectMOASS 2025 trailer expanded on the theme of monetary system corruption, featuring evolved visuals and a new narrative taking viewers deeper into the story.
                </p>
              </div>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default Videos;