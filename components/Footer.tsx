"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-4 sm:px-6 md:px-8 bg-[#F7F5EF] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F7F5EF] z-0">
        <div className="absolute inset-0" 
             style={{
               background: `
                 radial-gradient(circle at 70% 10%, rgba(215, 208, 192, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 30% 80%, rgba(196, 185, 159, 0.2) 0%, transparent 40%)
               `,
               filter: 'blur(60px)',
             }} 
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-10 mb-12">
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="block mb-6 transition-transform duration-300 hover:scale-105">
              <Image 
                src="/logo-dark.png" 
                alt="Ananta Svastha" 
                width={160} 
                height={50}
                className="h-12 w-auto" 
              />
            </Link>
            <p className="text-[#334036] mb-6 max-w-md leading-relaxed">
              Ananta Svastha combines ancient Ayurvedic wisdom with modern technology 
              to help you achieve optimal health and balance based on your unique constitution.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                <FaFacebookF size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Connect with us on LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                <FaLinkedinIn size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Watch our YouTube channel" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-[#334036] mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 rounded bg-[#815C42]"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/doshas" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Dosha Types
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-[#334036] mb-5 relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 rounded bg-[#815C42]"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#334036] hover:text-[#815C42] transition-colors hover:translate-x-1 inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-[#815C42] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#D7D0C0] pt-8 text-center">
          <p className="text-[#334036]">© {currentYear} Ananta Svastha. All rights reserved.</p>
          <p className="text-[#334036] text-sm mt-2 opacity-70">
            Ananta Svastha is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
