import Image from "next/image";
import AwardImg from '@/assets/img/award.png'

function AwardCard({title,description}) {
    return ( <div className="grow flex gap-8">
            <div className="min-w-32 max-w-32 aspect-square overflow-hidden justify-center flex items-center">
                <Image src={AwardImg} alt="AwardImg" />
            </div>
            <div className="grow flex flex-col justify-center items-center text-center px-2">
                <div className="text-2xl font-medium">{title}</div>
                <div className="text-lg">{description}</div>
            </div>
        </div> );
}

export default AwardCard;