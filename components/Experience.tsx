import { workExperience } from '@/data';
import React from 'react';
import Image from 'next/image';
import { Button } from './ui/MovingBorders';

const Experience = () => {
  return (
    <div className="py-20 xl:mt-12" id="experience">
      <h1 className="heading text-silver-100">
        Experience Sharpened with Iron and Forged with{' '}
        <span className="text-gold">Uru!</span>
      </h1>
      <br />
      <div className="w-full md:w-3/4 mx-auto mt-12 grid lg:grid-cols-4 grid-cols-1 gap-8 px-4 md:px-8">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 1000) + 2500}
            borderRadius="1.75rem"
            style={{
              background: 'rgb(22,22,22)',
              backgroundImage:
                'linear-gradient(90deg, rgba(216, 122, 0, 1) 0%, rgba(192, 192, 192, 1) 50%, rgba(255, 215, 0, 1) 100%)',
              minHeight: '250px',
              maxHeight: '300px',
              borderRadius: '1.75rem',
            }}
            className="flex-1 text-white border-none dark:border-none bg-shadow flex items-center p-4"
          >
            <Image
              src={card.thumbnail}
              alt={card.title}
              width={96}
              height={96}
              className="lg:w-24 md:w-20 w-16 object-cover rounded-lg"
            />
            <div className="ms-4 flex-1">
              <h1 className="text-start text-xl md:text-2xl font-bold text-gold">
                {card.title}
              </h1>
              <p className="text-start text-sm md:text-base text-silver-100 mt-2 font-semibold line-clamp-3">
                {card.desc}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;