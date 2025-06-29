import React from 'react';
import User1 from '@/assets/img/testimonials/user1.jpeg'
import User2 from '@/assets/img/testimonials/user2.jpeg'
import User3 from '@/assets/img/testimonials/user3.jpeg'
import User4 from '@/assets/img/testimonials/user4.jpeg'
import Image from 'next/image';

const testimonials = [
  {
    name: 'Priya Sharma',
    image: User1,
    feedback: 'Varsha Infra made my first property purchase smooth and stress-free. Highly recommended for their professionalism and transparency!'
  },
  {
    name: 'Amit Patel',
    image: User2,
    feedback: 'I found the perfect plot for my dream home. The team was supportive throughout the process. Thank you!'
  },
  {
    name: 'Sunny Reddy',
    image: User3,
    feedback: 'Excellent service and a wide range of properties. I will definitely recommend Varsha Infra to my friends and family.'
  },
  {
    name: 'Rahul Verma',
    image: User4,
    feedback: 'The best real estate experience I have had. The team is knowledgeable and very responsive.'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-10 px-4 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-borderDark">What Our Clients Say</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <Image src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-4 grayscale-0" />
            <p className="text-gray-700 mb-3 text-sm">&quot;{t.feedback}&quot;</p>
            <span className="font-semibold text-borderDark">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 