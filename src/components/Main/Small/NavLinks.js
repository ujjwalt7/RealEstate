import Link from "next/link";

function NavLinks({title,link="/", onClick}) {
    return ( <Link href={link} className="text-[1rem] text-black hover:text-black relative group" onClick={onClick}>
            <div className="group-hover:w-full w-0 translate-all duration-200 ease-in-out h-[2px] absolute bottom-0  bg-black  rounded-full"></div>
           {title}</Link> );
}

export default NavLinks;