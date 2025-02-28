"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


const Process = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading text-silver-100">
        Our Journey to Lift the Mighty{" "}
        <span className="text-gold">Mjolnir!</span>
      </h1>
      <br />
      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="my-20 flex flex-col lg:flex-row items-center justify-center bg-shadow dark:bg-shadow w-full gap-4 mx-auto px-8 text-xl">
          <Card
            title="Ideation"
            icon={<Lightning />}
            description="The first step in our journey is to ideate the project. We want to understand your vision and bring it to life."
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-shadow"
              colors={["#C0C0C0"]} // Silver
            />
          </Card>
          <Card
            title="Imagination"
            icon={<Lightning />}
            description="After the ideation process, we then design and develop your project. Our key design ideas are presented and iterated until satisfaction."
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-shadow"
              colors={["#FF9900"]} // Orange
              dotSize={2}
            />
            {/* Radial gradient for the cute fade */}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/50" />
          </Card>
          <Card
            title="Implementation"
            icon={<Lightning />}
            description="Once satisfied, we move on to implementation. We work to ensure that the project meets all expectations. Your vision turned into gold!"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-shadow"
              colors={["#FFD700"]} // Gold
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] rounded-3xl"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center text-3xl">
          {title}
        </h2>
        <h2 className="text-md dark:text-silver-100 text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center">
          {description}
        </h2>
      </div>
    </div>
  );
};

const Lightning = () => (
  <DotLottieReact
    src="https://lottie.host/a65316ec-476f-4a42-a50e-cec28afe74fa/CmhZVsmlrb.lottie"
    loop={true}
    autoplay={true}
    style={{ width: "40px", height: "40px" }} // Match the h-10 w-10 size of AceternityIcon
    className="text-white dark:text-white group-hover/canvas-card:text-white"
  />
);

interface IconProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other SVG props
}

export const Icon = ({ className, ...rest }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Process;

