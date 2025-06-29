'use client'

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import BigRock from '@/assets/img/bigrock.png';
import NoBroker from '@/assets/img/nobroker.png';
import Housing from '@/assets/img/housing.png';
import Airbnb from '@/assets/img/airbnb.png';
import MagicBricks from '@/assets/img/magicbricks.png';
import nineacres from '@/assets/img/99acres.png';
import Makaan from '@/assets/img/makaan.png';
import SquareYards from '@/assets/img/squareyards.png';

const brands = [
  { name: 'BigRock', logo: BigRock },
  { name: 'NoBroker', logo: NoBroker },
  { name: 'Housing', logo: Housing },
  { name: 'Airbnb', logo: Airbnb },
  { name: 'MagicBricks', logo: MagicBricks },
  { name: '99acres', logo: nineacres },
  { name: 'Makaan', logo: Makaan },
  { name: 'SquareYards', logo: SquareYards }
];

export default function BrandsMarquee() {
  return (
    <section className="w-full py-6 bg-gray-100">
      <h3 className="text-lg font-semibold text-center mb-4 text-borderDark">Our Brand Collaborations</h3>
      <Marquee gradient={false} speed={40} pauseOnHover={true} className="px-4">
        {brands.map((b, i) => (
          <div key={i} className="inline-block mx-8">
            <Image src={b.logo} alt={b.name} height={52} className="h-12 w-auto grayscale opacity-80 hover:opacity-100 transition object-contain" />
          </div>
        ))}
      </Marquee>
    </section>
  );
} 