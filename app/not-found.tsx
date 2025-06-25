import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-40 relative overflow-hidden bg-[#F7F5EF]">
      {/* Modern decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[150%] h-[150%] -rotate-12 -left-1/4 -top-1/4 rounded-[100px] bg-gradient-to-br from-[#815C42]/3 via-transparent to-[#ABB087]/3"></div>
        <div className="absolute w-[120%] h-[120%] rotate-12 -right-1/4 -bottom-1/4 rounded-[100px] bg-gradient-to-tl from-[#C4B99F]/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Stylized circles */}
      <div className="absolute top-1/4 left-10 w-1 h-1 rounded-full bg-[#815C42]/40"></div>
      <div className="absolute top-1/3 right-24 w-2 h-2 rounded-full bg-[#ABB087]/30"></div>
      <div className="absolute bottom-1/3 left-40 w-3 h-3 rounded-full bg-[#C4B99F]/20"></div>
      <div className="absolute bottom-1/4 right-12 w-1.5 h-1.5 rounded-full bg-[#815C42]/30"></div>
      <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full border border-[#815C42]/5"></div>
      <div className="absolute bottom-1/2 right-1/4 w-40 h-40 rounded-full border border-[#ABB087]/5"></div>
      
      {/* Extra design elements for a modern look */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#815C42]/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#815C42]/10 to-transparent"></div>
      <div className="absolute inset-y-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-[#ABB087]/10 to-transparent"></div>
      <div className="absolute inset-y-0 right-20 w-px h-full bg-gradient-to-b from-transparent via-[#ABB087]/10 to-transparent"></div>
      
      {/* Content without card background */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        <div className="mb-10 text-center">
          <Image 
            src="/logo-dark.png" 
            alt="Ananta Svastha Logo" 
            width={120} 
            height={60} 
            className="mx-auto"
          />
        </div>
        
        {/* Simplified 404 with decorative elements */}
        <div className="relative">
          {/* Outline number in background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-[200px] md:text-[280px] font-extralight tracking-tight text-transparent select-none" 
                  style={{ WebkitTextStroke: '1px rgba(129, 92, 66, 0.08)' }}>
              404
            </span>
          </div>
          
          {/* Main heading - centered over the outline */}
          <div className="text-center py-10">
            <h1 className="text-[90px] md:text-[120px] font-thin tracking-tighter text-[#815C42]/90">
              404
            </h1>
            <div className="w-20 h-px bg-[#815C42]/30 mx-auto my-8"></div>
            <h2 className="text-2xl md:text-3xl font-extralight mt-2 text-[#334036] tracking-wide">
              Page Not Found
            </h2>
            
            <p className="text-base md:text-lg mt-6 text-[#334036]/70 max-w-md mx-auto font-light leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved
            </p>
          </div>
        </div>
        
        {/* Buttons with improved styling */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
          <Link 
            href="/" 
            className="group px-8 py-3 bg-[#815C42] text-white rounded-full hover:bg-[#815C42]/90 transition-all"
          >
            <span className="relative inline-flex items-center">
              <span className="mr-2">←</span>
              <span className="relative z-10">Back to Home</span>
            </span>
          </Link>
          <Link 
            href="/contact" 
            className="group px-8 py-3 border border-[#815C42]/30 text-[#815C42] rounded-full hover:border-[#815C42] transition-all"
          >
            <span className="relative inline-flex items-center">
              <span className="relative z-10">Contact Support</span>
              <span className="ml-2">→</span>
            </span>
          </Link>
        </div>
      </div>
      
      {/* Subtle mandala in background - now positioned strategically */}
      <div className="absolute -bottom-20 -right-20 z-0 opacity-[0.04] w-80 h-80">
        <Image 
          src="/mandala.png" 
          alt="Background pattern"
          width={320}
          height={320}
        />
      </div>
      <div className="absolute -top-20 -left-20 z-0 opacity-[0.03] w-64 h-64 rotate-180">
        <Image 
          src="/mandala.png" 
          alt="Background pattern"
          width={256}
          height={256}
        />
      </div>
    </div>
  );
}
