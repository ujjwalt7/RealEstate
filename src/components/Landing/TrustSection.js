import TrustCard from "./Minor/TrustCard";

import FirstSvg from "@/assets/img/small/1.svg";
import SecSvg from "@/assets/img/small/2.svg";
import ThirdSvg from "@/assets/img/small/3.svg";
import FourSvg from "@/assets/img/small/4.svg";
function TrustSection() {
    return ( <div className="w-full flex flex-col justify-center items-center py-14 gap-8">
      <div className="titlefont lg:text-4xl px-2 text-3xl text-wrap text-center">Building Trust, One Plot at a Time.</div>
      <div className="w-[80%] mx-auto grid lg:grid-cols-4 grid-cols-2 gap-4">
      <TrustCard src={FirstSvg} title="500+ Acres Sold" description="Across residential, commercial, and industrial sectors."/>
      <TrustCard src={SecSvg} title=" 1000+ Happy Clients" description="From first-time buyers to large-scale developers."/>
      <TrustCard src={ThirdSvg} title=" 100% Verified Listings" description=" Legally cleared and ready-to-register lands."/>
      <TrustCard src={FourSvg} title=" 10+ Years of Experience" description="A trusted name in land development and consulting."/>
        </div>
    </div> );
}

export default TrustSection;