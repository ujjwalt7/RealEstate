'use client';

import AwardSection from "@/components/Landing/AwardSection";
import Starter from "@/components/Landing/Starter";
import TrustSection from "@/components/Landing/TrustSection";
import BrandsMarquee from "@/components/Landing/BrandsMarquee";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import MoreSections from "@/components/Landing/MoreSections";
import ServicesShowcase from "@/components/Landing/ServicesShowcase";
import StatsSection from "@/components/Landing/StatsSection";
import TeamSection from "@/components/Landing/TeamSection";
import SuccessStories from "@/components/Landing/SuccessStories";
import ProcessSection from "@/components/Landing/ProcessSection";
import { Link } from "lucide-react";
import { useCallRequestModal } from '@/components/Layout';

function Home() {
  const { openCallRequestModal } = useCallRequestModal();
  return (
    <div className="w-full rounded-t-[5rem] overflow-hidden grid grid-cols-1 gap-8">
      <Starter />
      <ServicesShowcase />
      <StatsSection />
      <ProcessSection />
      <TrustSection />
      <SuccessStories />
      <TeamSection />
      <MoreSections />
      <TestimonialsSection />
      {/* <AwardSection /> */}
      <div className="w-full flex justify-center py-12">
        <button
          type="button"
          onClick={openCallRequestModal}
          className="px-10 py-6 bg-accentBlue texta text-white font-bold rounded-2xl text-2xl shadow-lg hover:bg-blue-800 transition-colors hover:scale-105 transform"
        >
          Book a Call
        </button>
      </div>
    </div>
  );
}

export default Home;