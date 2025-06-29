import Image from "next/image";
import Logo from "@/assets/img/logo.svg";
import NavLinks from "./Main/Small/NavLinks";import { BiSolidPhoneCall } from "react-icons/bi";
import SearchBarNav from "./Main/SeachBarNav";import { HiMenuAlt4 } from "react-icons/hi";
function MaiNavbar() {
  return (
    <div className="w-full top-0 left-0 sticky flex justify-center items-center flex-col gap-1 z-[9999] bg-white/80 backdrop-blur-sm">
      <div className="w-[90%] flex lg:grid grid-cols-3 py-4">
        <div className="w-full flex items-center gap-14">
          <div className="w-fit flex items-center gap-1">
            <Image
              width={60}
              height={60}
              className="fill-black"
              alt="Logo"
              src={Logo}
            />
            <div className="w-fit flex-col leading-4.5 flex text-2xl font-medium ">
              <div className="">Varsha</div>
              <div className="">Infra</div>
            </div>
          </div>
          <div className="lg:flex hidden items-center justify-start gap-5">
            <NavLinks title={"Home"} />
            <NavLinks title={"Discover"} link="/discover" />
            <NavLinks title={"About Us"} />
          </div>
        </div>
        <div className="w-full lg:flex px-4 items-center justify-center hidden">
          <SearchBarNav />
        </div>
        <div className="w-full lg:flex items-center justify-end gap-4 hidden ">
            <div className="px-4 py-2 rounded-full bg-accentBlue border text-white flex border-borderDark text-lg items-center gap-2 hover:border-b-4 cursor-pointer">
                <span className="text-xl"><BiSolidPhoneCall /></span>
                Get a Call</div>
        </div>
      </div>
      <div className="w-[90%] mx-auto flex lg:hidden pb-4">
        <SearchBarNav />
      </div>
    </div>
  );
}

export default MaiNavbar;
