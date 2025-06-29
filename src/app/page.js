import AwardSection from "@/components/Landing/AwardSection";
import Starter from "@/components/Landing/Starter";
import TrustSection from "@/components/Landing/TrustSection";

function Home() {
  return ( <div className="w-full rounded-t-[5rem] overflow-hidden grid grid-cols-1 gap-8">
    <Starter />
    <TrustSection />
    <AwardSection />
  </div> );
}

export default Home;