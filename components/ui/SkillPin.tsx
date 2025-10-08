"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

const SkillPin = ({
  skill,
  index,
}: {
  skill: string;
  index: number;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="border border-white/[0.2] rounded-full bg-shadow w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center"
      style={{ transform: `translateX(-${index * 6}px)` }}
    >
      <Image
        src={`/${skill}.svg`}
        alt={skill}
        width={24}
        height={24}
        className="p-1"
      />
    </motion.div>
  );
};

export default SkillPin;