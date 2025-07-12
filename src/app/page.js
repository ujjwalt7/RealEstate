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

function Home() {
  return (
    <div className="w-full rounded-t-[5rem] overflow-hidden grid grid-cols-1 gap-8">
      <Starter />
      <StatsSection />
      <ServicesShowcase />
      <ProcessSection />
      <TrustSection />
      <SuccessStories />
      <TeamSection />
      <MoreSections />
      <TestimonialsSection />
      {/* <AwardSection /> */}
    </div>
  );
}

export default Home;