import Image from "next/image";

function TrustCard({title="500+ Acres Sold.",src,description="Across residential, commercial, and industrial sectors."}) {
    return ( <div className="w-full p-2 rounded-xl border border-b-4 border-borderDark aspect-square flex justify-center items-center flex-col ">
        <div className="w-1/2 aspect-square rounded-xl overflow-hidden">
        <Image src={src} alt="Home" />
        </div>
        <div className="flex text-sm flex-col text-wrap px-4 justify-center items-center text-center">
          <span className="text-2xl">{title}</span>
          {description}
        </div>
        </div> );
}

export default TrustCard;