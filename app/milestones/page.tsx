"use client";
import React from 'react';
import { motion } from "framer-motion";
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems, milestones } from '@/data';

const Milestones = () => {
  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-4xl pt-24 md:pt-28">
            <h1 className="text-4xl font-bold text-center mb-12">
              Mjolnir Design Studios Milestones
            </h1>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <ul className="max-w-2xl space-y-6">
                {milestones.map((milestone, index) => {
                  const [date, description] = milestone.split(': ');
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="text-lg text-gray-300 border-l-4 border-gold pl-4"
                    >
                      <span className="text-orange-500">{date}</span>: {description}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default Milestones;