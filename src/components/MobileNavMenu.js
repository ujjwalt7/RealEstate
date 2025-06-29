import React from "react";
import Image from "next/image";
import Logo from "@/assets/img/logo.svg";
import NavLinks from "./Main/Small/NavLinks";
import { HiX } from "react-icons/hi";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FiMail } from "react-icons/fi";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Discover", link: "/discover" },
  { title: "About Us", link: "/about" },
];

export default function MobileNavMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[10000] transition-all duration-300 ${open ? "translate-x-0" : "translate-x-full"} bg-white flex flex-col h-screen w-screen top-0 left-0`}
      style={{ pointerEvents: open ? "auto" : "none" }}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        style={{ zIndex: 1 }}
      />
      {/* Menu */}
      <div className="relative z-10 flex flex-col h-full w-full bg-white px-6 pt-8 pb-6">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-3xl text-gray-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close menu"
        >
          <HiX />
        </button>
        {/* Brand/Logo at top center */}
        <div className="flex flex-col items-center justify-center gap-2 mb-10 mt-2">
          <div className="flex items-center gap-1">
            <Image
              width={60}
              height={60}
              className="fill-black"
              alt="Logo"
              src={Logo}
            />
            <div className="flex flex-col leading-4.5 text-2xl font-medium text-center">
              <div>Varsha</div>
              <div>Infra</div>
            </div>
          </div>
        </div>
        {/* Nav links */}
        <nav className="flex flex-col gap-6 items-start w-full px-2 mb-10">
          {navItems.map((item) => (
            <NavLinks
              key={item.title}
              title={item.title}
              link={item.link}
              onClick={onClose}
            />
          ))}
        </nav>
        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />
        {/* Action buttons */}
        <div className="flex flex-col gap-4 w-full items-stretch">
          <button
            className="px-4 py-3 rounded-full bg-accentBlue border text-white flex border-borderDark text-lg items-center gap-2 hover:border-b-4 transition-all duration-150 justify-center"
            onClick={onClose}
          >
            <span className="text-xl"><BiSolidPhoneCall /></span>
            Book a Call
          </button>
          <button
            className="px-4 py-3 rounded-full bg-gray-900 text-white flex text-lg items-center gap-2 hover:bg-gray-800 transition-all duration-150 justify-center"
            onClick={onClose}
          >
            Login
          </button>
          <button
            className="px-4 py-3 rounded-full bg-white border border-gray-300 text-gray-900 flex text-lg items-center gap-2 hover:bg-gray-100 transition-all duration-150 justify-center"
            onClick={onClose}
          >
            <span className="text-xl"><FiMail /></span>
            Email
          </button>
        </div>
      </div>
    </div>
  );
} 