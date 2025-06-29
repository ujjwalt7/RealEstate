"use client"
import Image from "next/image";
import BgLanding from '@/assets/img/bg.svg';
import SearchBarNav from "../Main/SeachBarNav";
import { useState, useEffect } from "react";
import Mascot from "../Main/Mascot";

const words = ["Home", "Office", "Investment", "Future", "Dream","Plot","Business Space","Future Asset"];

function Typewriter({ words, speed = 120, pause = 1200 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  return (
    <span className=" relative ">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-2 h-16 bg-borderDark align-middle animate-pulse ml-0.5 rounded-xl" style={{verticalAlign: 'middle'}}></span>
    </span>
  );
}

function Starter() {
    return ( <div className="w-full lg:h-[85vh] h-[80vh] relative bg-[#F9F7EB] z-0 overflow-hidden">
        <Image src={BgLanding} alt="landing" className="object-cover" />
        <div className="w-full h-full absolute top-0 left-0 z-[1] flex justify-center">
            <div className="lg:w-[70%] w-full h-full items-center flex relative">
                <div className="lg:w-3/4 w-full flex flex-col gap-4">
                    <div className="w-full text-wrap lg:text-6xl text-4xl titlefont text-center lg:text-left">
                    Get yourself a <br/>New {" "}
                    <Typewriter words={words} />.
                    </div>
                    <div className="w-2/3 mx-auto lg:mx-0 text-sm text-wrap">
                    From peaceful countryside plots to prime commercial land, we help you secure spaces that grow in value and purpose. Trusted by hundreds of developers, investors, and first-time buyers across the nation.
                    </div>
                <div className="lg:w-3/5 w-full px-6">
                <SearchBarNav/>
                </div>
                </div>
                <div className="w-3/12 aspect-square flex justify-end items-end -scale-x-100 absolute bottom-0 right-0">
                    <Mascot />
                </div>
            </div>
        </div>
    </div> );
    
}

export default Starter;