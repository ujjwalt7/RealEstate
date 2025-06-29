import AwardCard from "./Minor/AwardCards";

function AwardSection() {
  return (
    <div className="w-full grid grid-cols-1 gap-4 justify-center py-6 items-center">
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <div className="w-full text-4xl text-center titlefont">
          Recognized for Excellence in Land and Trust
        </div>
        <div className="w-1/2 text-wrap text-sm text-center">
          Our commitment to transparent transactions, verified properties, and
          ethical practices has earned us appreciation from industry leaders and
          community bodies alike.
        </div>
      </div>
      <div className="lg:w-2/3 mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:py-6 px-4 lg:divide-dashed lg:divide-x-1 lg:divide-y-1">
        <AwardCard title="Most Trusted Land Advisory Firm – North India" description="Real Estate India Awards 2023" />
        <AwardCard title="Excellence in Transparent Dealings" description="Indian Property Federation (IPF) – 2022" />
        <AwardCard title="Top Performer in Plot Sales – Tier 2 Cities" description="BuildIndia Summit 2023" />
        <AwardCard title="Customer Choice Award for After-Sale Support" description="PropBuyers Annual Poll – 2023" />
        <AwardCard title="Rising Star in Affordable Land Development" description="REGrowth India Forum – 2021" />
        {/* <AwardCard title="Top 10 Verified Land Brokers of India" description="National Realty Insight – 2022" /> */}
        <AwardCard title="Best Use of Digital Platform for Land Sales" description="RealtyTech Awards – 2023" />
        <AwardCard title="Outstanding Local Community Engagement" description="UrbanLand Forum – 2023" />
        <AwardCard title="Certified Safe-Deal Brokerage" description="RERA & Legal Advisor Alliance – 2022" />
        <div className="col-span-2 hidden lg:flex"></div>
      </div>
    </div>
  );
}

export default AwardSection;
