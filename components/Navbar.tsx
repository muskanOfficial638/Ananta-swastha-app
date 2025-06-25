"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();
  
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = isActive(href);
    
    return (
      <Link 
        href={href} 
        className={`transition-all duration-300 font-medium relative group ${
          active 
            ? 'text-[#815C42] font-semibold' 
            : 'text-[#334036] hover:text-[#815C42]'
        }`}
      >
        <span className="relative">
          {children}
          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#815C42] transform origin-left transition-transform duration-300 ease-out ${
            active ? 'scale-x-100' : 'scale-x-0'
          } group-hover:scale-x-100`} />
        </span>
      </Link>
    );
  };
  return (    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 ${
      scrollPosition > 50 
        ? 'bg-white/30 shadow-sm backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <Image 
              src="/logo-dark.png" 
              alt="Ananta Svastha" 
              width={120} 
              height={40} 
              className="h-20 w-auto"
              priority
            />
          </Link>
            {/* Desktop Navigation */}          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/doshas">Doshas</NavLink>
            <NavLink href="/doctors">Doctors</NavLink>
            <NavLink href="/appointment">Book Appointment</NavLink>
            <NavLink href="#">AI Assistant</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/news">News</NavLink>
            <Link 
              href="/auth/login" 
              className="px-6 py-2.5 rounded-full font-medium border-2 border-[#815C42] text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-300 hover:shadow-md"
            >
              Login
            </Link>
            <Link 
              href="/auth/signup" 
              className={`bg-gradient-to-r from-[#815C42] to-[#6a4a34] text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
                scrollPosition > 50 ? 'shadow-md' : 'shadow-lg'
              }`}
            >
              Get Started Free
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}          <button 
            className="md:hidden text-[#334036] focus:outline-none transition-transform duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenuAlt3 className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
        {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/90 backdrop-blur-lg border-t border-white/20 shadow-md"
          >
            <div className="px-6 py-4 space-y-2 max-w-7xl mx-auto">              <Link 
                href="/about" 
                className={`block py-2.5 font-medium ${
                  isActive('/about') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/doshas" 
                className={`block py-2.5 font-medium ${
                  isActive('/doshas') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Doshas
              </Link>              <Link 
                href="/doctors" 
                className={`block py-2.5 font-medium ${
                  isActive('/doctors') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Doctors
              </Link>
              <Link 
                href="/appointment" 
                className={`block py-2.5 font-medium ${
                  isActive('/appointment') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
              <Link 
                href="/bot" 
                className={`block py-2.5 font-medium ${
                  isActive('/bot') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                AI Assistant
              </Link>
              <Link 
                href="/blog" 
                className={`block py-2.5 font-medium ${
                  isActive('/blog') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link><Link 
                href="/news" 
                className={`block py-2.5 font-medium ${
                  isActive('/news') ? 'text-[#815C42]' : 'text-[#334036]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>              <Link 
                href="/auth/login" 
                className="block py-3 px-6 mt-4 border-2 border-[#815C42] text-[#815C42] rounded-full font-medium text-center transition-all duration-300 hover:bg-[#815C42] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="mt-3 block py-4 px-6 bg-gradient-to-r from-[#815C42] to-[#6a4a34] text-white rounded-full font-semibold text-center shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                🚀 Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
