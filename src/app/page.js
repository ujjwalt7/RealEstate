import AwardSection from "@/components/Landing/AwardSection";
import Starter from "@/components/Landing/Starter";
import TrustSection from "@/components/Landing/TrustSection";
import BrandsMarquee from "@/components/Landing/BrandsMarquee";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import MoreSections from "@/components/Landing/MoreSections";

function Home() {
  return (
    <div className="w-full rounded-t-[5rem] overflow-hidden grid grid-cols-1 gap-8">
      <Starter />
      {/* <BrandsMarquee /> */}
      <TrustSection />
      <MoreSections />
      <AwardSection />
      <TestimonialsSection />
    </div>
  );
}

export default Home;