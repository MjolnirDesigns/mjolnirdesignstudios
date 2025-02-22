import React from 'react'
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
                    <div key={id} className="flex md:max-w-60 max-w-32 gap-2">
                        <img
                           src={img}
                           alt={name}
                           className="md:w-10 w-5"
                        />
                        <img
                           src={nameImg}
                           alt={name}
                           className="md:w-24 w-20"
                        />
                   
                    </div>
                    
                ))}  
            </div>     
        </div>
        <br />
    </div>
  )
}

export default Clients
