"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems, projects } from '@/data';
import SkillPin from '@/components/ui/SkillPin';

const Websites = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-4xl font-bold text-center mb-12">
              Website Showcase
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8">
              <p className="text-lg text-gray-300 text-center mb-8">
                Discover our portfolio of powerful web solutions crafted by Mjolnir Design Studios. Each project wields innovative design and cutting-edge technology to forge unforgettable digital experiences.
              </p>

              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-transparent rounded-lg p-6 shadow-none hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-300"
                >
                  <h2 className="text-2xl font-semibold text-center mb-4 text-silver-100">{project.title}</h2>
                  <div className="aspect-[4/3] mb-4">
                    <Image
                      src={project.img}
                      alt={project.title}
                      width={640}
                      height={480}
                      className="w-full h-full rounded-md object-contain"
                      priority={index < 2} // Optimize loading for first two
                    />
                  </div>
                  <p className="text-gray-300 text-center mb-4">{project.des}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {project.iconLists.map((icon, skillIndex) => (
                      <SkillPin
                        key={skillIndex}
                        skill={icon.replace(/\.svg$/, '')} // Strip .svg for skill name
                        index={skillIndex}
                      />
                    ))}
                  </div>
                  {project.link !== "N/A" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-center block"
                    >
                      Visit {project.title}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default Websites;