"use client";
import AwardSection from "@/components/Landing/AwardSection";
import TrustSection from '@/components/Landing/TrustSection';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import BrandsMarquee from '@/components/Landing/BrandsMarquee';
import Image from 'next/image';
// import Logo from '@/assets/img/logo.svg'
const logoPath = '/assets/img/logo.svg';
// import { ShieldCheck, Award, Heart } from 'lucide-react';
import { BiSolidDonateHeart, BiSolidShieldX, BiSolidTrophy } from "react-icons/bi";
import { useCallRequestModal } from '@/components/Layout';

export default function About() {
  const { openCallRequestModal } = useCallRequestModal();
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
          {/* <img src={logoPath} alt="Varsha Infra Team"className="rounded-2xl shadow-lg bg-white p-4" /> */}
        </div>
      </div>

      <div className="max-w-[95%] mx-auto px-4">
        {/* <AwardSection /> */}
        <TrustSection />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-borderDark mb-4 text-center">What Our Clients Say</h2>
        <TestimonialsSection />
      </div>

      {/* Mission & Values */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-borderDark mb-4">Our Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <BiSolidShieldX className="w-12 h-12 text-accentYellow mb-2" />
            <h3 className="font-semibold text-lg mt-3 mb-1">Trust & Integrity</h3>
            <p className="text-gray-600 text-sm">We believe in honest, transparent dealings and always put our clients interests first.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <BiSolidTrophy className="w-12 h-12 text-accentYellow mb-2" />
            <h3 className="font-semibold text-lg mt-3 mb-1">Expertise & Results</h3>
            <p className="text-gray-600 text-sm">Our experienced team delivers results, whether youre buying, selling, or investing.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <BiSolidDonateHeart className="w-12 h-12 text-accentYellow mb-2" />
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
          <div className="flex justify-center">
            <button
              type="button"
              onClick={openCallRequestModal}
              className="w-full px-4 py-2 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors text-lg max-w-xs"
            >
              Request a Call
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
} 