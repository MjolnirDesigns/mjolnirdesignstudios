import React from 'react'

const ShimmerButton = ({
    title,
    icon,
    position,
    handleClick,
    otherClasses,
}: {
    title: string;
    icon?: React.ReactNode;
    position?: string;
    handleClick?: any;
    otherClasses?: string;
}) => {
  return (
    
    // Button code
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none md:w-60 md:mt-10" onClick={handleClick}>
        <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-lg font-medium text-white backdrop-blue-3xl ${otherClasses}`}>
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
        </span>
    </button>

      
  )
}

export default ShimmerButton