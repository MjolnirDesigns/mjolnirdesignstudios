import React from 'react'

const ShimmerButton = ({
    title, icon, position, handleClick, otherClasses
}: {
    title: string,
    icon?: React.ReactNode,
    position?: string,
    handleClick?: () => void,
    otherClasses?: string
}
) => {
  return (
    
    // Button code
    <div className="justify-center items-center flex flex-col">
        <button className="relative inline-flex h-12 animate-shimmer items-center justify-center rounded-md border
            border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            px-7 font-medium text-slate-400 transition-colors focus:outline-none md:w-60 md:mt-10" onClick={handleClick}>
                <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center gap-2
                    ${otherClasses}`}>
                        {position === 'left' && icon}
                        {title}
                        {position === 'right' && icon}
                </span>
        </button>
    </div>

      
  )
}

export default ShimmerButton