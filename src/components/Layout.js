"use client"
import { createContext, useContext, useState } from "react";
import MaiNavbar from "./Navbar";
import CommandMenu from "./Main/CommandMenu";
import MobileNavMenu from "./MobileNavMenu";
import { HiMenuAlt4 } from "react-icons/hi";
import Footer from "./Footer";
import CallRequestModal from './ui/CallRequestModal';

// Create context for command menu
const CommandMenuContext = createContext();
const CallRequestModalContext = createContext();

export const useCommandMenu = () => {
  const context = useContext(CommandMenuContext);
  if (!context) {
    throw new Error("useCommandMenu must be used within a CommandMenuProvider");
  }
  return context;
};

export const useCallRequestModal = () => {
  const context = useContext(CallRequestModalContext);
  if (!context) {
    throw new Error("useCallRequestModal must be used within a CallRequestModalProvider");
  }
  return context;
};

function LayoutDef({children}) {
    const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [callModalOpen, setCallModalOpen] = useState(false);

    const openCommandMenu = () => setIsCommandMenuOpen(true);
    const closeCommandMenu = () => setIsCommandMenuOpen(false);

    const openMobileNav = () => setIsMobileNavOpen(true);
    const closeMobileNav = () => setIsMobileNavOpen(false);

    const openCallRequestModal = () => setCallModalOpen(true);
    const closeCallRequestModal = () => setCallModalOpen(false);

    return (
        <CommandMenuContext.Provider value={{ openCommandMenu, closeCommandMenu, isCommandMenuOpen }}>
        <CallRequestModalContext.Provider value={{ openCallRequestModal, closeCallRequestModal }}>
            <div className="w-full min-h-screen relative">
                {/* Mobile menu trigger, only visible on mobile */}
                <button
                  className="fixed top-4 right-4 z-[10001] text-3xl text-gray-700 lg:hidden bg-white/80 rounded-full p-2 shadow"
                  onClick={openMobileNav}
                  aria-label="Open menu"
                  style={{ display: isMobileNavOpen ? 'none' : undefined }}
                >
                  <HiMenuAlt4 />
                </button>
                <MobileNavMenu open={isMobileNavOpen} onClose={closeMobileNav} />
                <MaiNavbar />
                <main className="w-full h-full">{children}</main>
                <CommandMenu isOpen={isCommandMenuOpen} onClose={closeCommandMenu} />
                <CallRequestModal open={callModalOpen} onClose={closeCallRequestModal} />
            </div>
            <Footer />
        </CallRequestModalContext.Provider>
        </CommandMenuContext.Provider>
    );
}

export default LayoutDef;