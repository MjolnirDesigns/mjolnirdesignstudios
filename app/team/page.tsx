"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems, teamMembers } from '@/data';
import SkillPin from '@/components/ui/SkillPin';

const Team = () => {
  // Split into executives (first 2) and seniors (next 3)
  const executives = teamMembers.slice(0, 2);
  const seniors = teamMembers.slice(2, 5);

  useGSAP(() => {
    // GSAP hover animation for cards
    (gsap.utils.toArray('.team-card') as HTMLElement[]).forEach((card) => {
      gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
      const mouseEnterHandler = () => {
        gsap.to(card, {
          rotationX: 8,
          rotationY: 8,
          scale: 1.05,
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
          duration: 0.4,
          ease: 'power3.out',
        });
      };
      const mouseLeaveHandler = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          boxShadow: '0 0 0 rgba(255, 215, 0, 0)',
          duration: 0.4,
          ease: 'power3.in',
        });
      };
      card.addEventListener('mouseenter', mouseEnterHandler);
      card.addEventListener('mouseleave', mouseLeaveHandler);
      // Cleanup event listeners on component unmount
      return () => {
        card.removeEventListener('mouseenter', mouseEnterHandler);
        card.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <div>
        <FloatingNav navItems={navItems} />
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center mx-auto px-4 sm:px-2 relative z-10">
          <div className="max-w-6xl pt-32 sm:pt-36 md:pt-40">
            <h1 className="text-4xl font-bold text-center mb-6 text-silver-100">
              Our Team of <span className="text-gold">Asgardians</span> at Mjolnir Design Studios
            </h1>
            <p className="text-lg text-gray-300 text-center mb-12 px-4">
              Meet the warriors forging the future of design. From visionary leaders to skilled artisans, our team wields the power of innovation for Midgard and beyond.
            </p>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
              
              {/* Executives Section: 2 cards in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {executives.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="team-card bg-transparent rounded-lg p-6 border-2 border-silver-300 shadow-none transition-all duration-300 text-center"
                  >
                    <div className="mx-auto mb-4">
                      <Image
                        src={member.avatar}
                        alt={`${member.name}'s avatar`}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-600"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-silver-100 mb-2">{member.name}</h2>
                    <h3 className="text-lg font-semibold text-gold mb-4">{member.role}</h3>
                    {member.experience && (
                      <p className="text-sm text-gray-400 mb-4 italic">{member.experience}</p>
                    )}
                    <p className="text-gray-300 mb-6 leading-relaxed">{member.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill: string, skillIndex: number) => (
                        <SkillPin key={skillIndex} skill={skill} index={skillIndex} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Seniors Section: 3 cards in a row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {seniors.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                    className="team-card bg-transparent rounded-lg p-6 border-2 border-silver-300 shadow-none transition-all duration-300 text-center"
                  >
                    <div className="mx-auto mb-4">
                      <Image
                        src={member.avatar}
                        alt={`${member.name}'s avatar`}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-600"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-silver-100 mb-2">{member.name}</h2>
                    <h3 className="text-lg font-semibold text-gold mb-4">{member.role}</h3>
                    {member.experience && (
                      <p className="text-sm text-gray-400 mb-4 italic">{member.experience}</p>
                    )}
                    <p className="text-gray-300 mb-6 leading-relaxed">{member.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill: string, skillIndex: number) => (
                        <SkillPin key={skillIndex} skill={skill} index={skillIndex} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <Footer className="mt-auto" />
        </main>
      </div>
    </div>
  );
};

export default Team;