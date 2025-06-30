"use client";
import AwardSection from '@/components/Landing/AwardSection';
import TrustSection from '@/components/Landing/TrustSection';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import BrandsMarquee from '@/components/Landing/BrandsMarquee';
import Image from 'next/image';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-borderDark mb-2">About Varsha Infra</h1>
          <p className="text-lg text-gray-700">
            <b>Varsha Infra</b> is a leading real estate agency with over a decade of experience in helping families, investors, and businesses find their perfect property. Our mission is to deliver trust, transparency, and exceptional value in every transaction. With a team of seasoned professionals, a vast portfolio of properties, and a client-first approach, we have become a trusted name in the industry.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>10+ years of real estate expertise</li>
            <li>Thousands of happy clients and successful deals</li>
            <li>Specialists in residential, commercial, and land transactions</li>
            <li>Personalized service and local market knowledge</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <Image src="/assets/img/mascot.svg" alt="Varsha Infra Team" width={260} height={260} className="rounded-2xl shadow-lg bg-white p-4" />
        </div>
      </div>

      {/* Awards & Trust */}
      <div className="max-w-[95%] mx-auto px-4">
        <AwardSection />
        <TrustSection />
      </div>

      {/* Brands/Partners */}
      <div className="max-w-full mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-borderDark mb-4 text-center">Our Esteemed Partners</h2>
        <BrandsMarquee />
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-borderDark mb-4 text-center">What Our Clients Say</h2>
        <TestimonialsSection />
      </div>

      {/* Mission & Values */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-borderDark mb-4">Our Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 text-accentYellow mb-2" />
            <h3 className="font-semibold text-lg mt-3 mb-1">Trust & Integrity</h3>
            <p className="text-gray-600 text-sm">We believe in honest, transparent dealings and always put our clients interests first.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <Award className="w-12 h-12 text-accentYellow mb-2" />
            <h3 className="font-semibold text-lg mt-3 mb-1">Expertise & Results</h3>
            <p className="text-gray-600 text-sm">Our experienced team delivers results, whether youre buying, selling, or investing.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <HeartHandshake className="w-12 h-12 text-accentYellow mb-2" />
            <h3 className="font-semibold text-lg mt-3 mb-1">Care & Community</h3>
            <p className="text-gray-600 text-sm">We care about our clients and our community, supporting local causes and building lasting relationships.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-borderDark mb-4 text-center">Get in Touch</h2>
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded px-3 py-2 w-full" type="text" placeholder="Your Name" required />
              <input className="border rounded px-3 py-2 w-full" type="email" placeholder="Your Email" required />
            </div>
            <textarea className="border rounded px-3 py-2 w-full" rows={4} placeholder="Your Message" required />
            <button type="submit" className="w-full px-4 py-2 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors">Send Message</button>
          </form>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.8a1 1 0 0 0 1.24 1.24l4.8-1.32A12 12 0 1 0 20.52 3.48zm-8.52 17a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm5.29-7.71c-.26-.13-1.53-.76-1.77-.85s-.41-.13-.58.13-.67.85-.82 1c-.15.17-.3.19-.56.06a7.94 7.94 0 0 1-2.35-1.45 8.87 8.87 0 0 1-1.64-2c-.17-.29 0-.44.13-.57.13-.13.29-.34.43-.51a.5.5 0 0 0 .07-.52c-.07-.13-.58-1.39-.8-1.91-.21-.51-.43-.44-.58-.45h-.5a1 1 0 0 0-.73.34 3.06 3.06 0 0 0-.95 2.29c0 1.34.97 2.63 2.77 3.58a10.13 10.13 0 0 0 4.89 1.34c.34 0 .67 0 1-.05a3.06 3.06 0 0 0 2.29-.95 1 1 0 0 0 .34-.73v-.5c-.01-.15-.06-.37-.45-.58z"/></svg>
              WhatsApp
            </a>
            <a href="tel:+911234567890" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1z"/></svg>
              Call
            </a>
            <a href="mailto:info@varshainfra.com" className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 