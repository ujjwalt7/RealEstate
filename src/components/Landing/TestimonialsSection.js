import React from 'react';

const testimonials = [
  {
    name: 'Priya Sharma',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    feedback: 'Varsha Infra made my first property purchase smooth and stress-free. Highly recommended for their professionalism and transparency!'
  },
  {
    name: 'Amit Patel',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    feedback: 'I found the perfect plot for my dream home. The team was supportive throughout the process. Thank you!'
  },
  {
    name: 'Sunita Reddy',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    feedback: 'Excellent service and a wide range of properties. I will definitely recommend Varsha Infra to my friends and family.'
  },
  {
    name: 'Rahul Verma',
    image: 'https://randomuser.me/api/portraits/men/60.jpg',
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
            <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-4 grayscale-0" />
            <p className="text-gray-700 mb-3 text-sm">"{t.feedback}"</p>
            <span className="font-semibold text-borderDark">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 