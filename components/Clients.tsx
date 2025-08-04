import React from 'react'
import Image from 'next/image'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'
import { companies, testimonials } from '@/data'

const Clients = () => {
  return (
    <div className="py-20" id="testimonials">
        <h1 className="heading text-silver-100">
            Kind Words from the Halls of  {' '}
            <span className="text-gold"> Valhalla!</span>
        </h1>
        <br />
        <div className="flex flex-col items-center max-lg:mt-10">
            
            <InfiniteMovingCards
                items={ testimonials }
                direction="right"
                speed="slow"
                pauseOnHover={true}
            /><br/>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 mx:lg:mt-10">
                {companies.map(({ id, img, name, nameImg }) => (
                    <React.Fragment key={id}>
                        <Image
                           src={img}
                           alt={name}
                           className="md:w-10 w-5"
                           width={40}
                           height={40}
                        />
                        <Image
                           src={nameImg}
                           alt={name}
                           className="md:w-24 w-20"
                           width={96}
                           height={40}
                        />
                    </React.Fragment>
                ))}  
            </div>     
        </div>
        <br />
    </div>
  )
}

export default Clients
