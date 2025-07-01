'use client'

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const brands = [
  { name: 'BigRock', logo: '/assets/img/bigrock.png' },
  { name: 'NoBroker', logo: '/assets/img/nobroker.png' },
  { name: 'Housing', logo: '/assets/img/housing.png' },
  { name: 'Airbnb', logo: '/assets/img/airbnb.png' },
  { name: 'MagicBricks', logo: '/assets/img/magicbricks.png' },
  { name: '99acres', logo: '/assets/img/99acres.png' },
  { name: 'Makaan', logo: '/assets/img/makaan.png' },
  { name: 'SquareYards', logo: '/assets/img/squareyards.png' }
];

export default function BrandsMarquee() {
  return (
    <div className="w-full py-6 bg-gray-100">
      <h3 className="text-lg font-semibold text-center mb-4 text-borderDark">Our Brand Collaborations</h3>
      <Marquee gradient={false} speed={40} pauseOnHover={true} className="px-4">
        {brands.map((b, i) => (
          <div key={i} className="inline-block mx-8">
            <Image src={b.logo} alt={b.name} width={52} height={52} className="h-12 w-auto grayscale opacity-80 hover:opacity-100 transition object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
} 