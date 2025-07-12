"use client"
import { IoSearchOutline } from "react-icons/io5";
import { useCommandMenu } from "../Layout";

function SearchBarNav() {
    const { openCommandMenu } = useCommandMenu();

    const handleClick = () => {
        openCommandMenu();
    };

    return (
        <div 
            className="w-full rounded-xl border border-borderDark flex overflow-hidden border-b-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleClick}
        >
            <div className="w-12 h-12 flex items-center justify-center px-1">
              {/* Removed Mascot widget */}
            </div>
            <input
              type="text"
              name="search"
              id="search"
                className="grow outline-none px-2 text-[1rem] pointer-events-none"
              placeholder="Enter an address, location, city or pincode....."
                readOnly
            />
            <div className="px-4 py-2 text-2xl flex justify-center items-center bg-accentYellow text-borderDark border-l border-borderDark">
              <IoSearchOutline />
            </div>
        </div>
    );
}

export default SearchBarNav;