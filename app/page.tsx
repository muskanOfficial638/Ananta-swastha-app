"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaAppleAlt, FaYinYang, FaArrowRight } from "react-icons/fa";
import React from "react";

// Define the animation variants for elements
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Add mobile dot indicator animation
const dotIndicator = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2 
    } 
  }
};

// Animation for individual app screens
const appScreenVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
};

// Updated Testimonial component with cleaner design
const Testimonial = ({ name, quote, avatar, role = "Ananta Svastha User" }: { name: string; quote: string; avatar: string; role?: string }) => (
  <motion.div 
    className="bg-white p-8 rounded-3xl border border-[#D7D0C0]/20 shadow-sm hover:shadow-lg transition-all duration-300"
    variants={fadeInUp}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-full bg-[#815C42]/10 flex items-center justify-center mr-4">
        <span className="text-[#815C42] text-lg font-bold">{name.charAt(0)}</span>
      </div>
      <div>
        <p className="font-bold text-[#334036]">{name}</p>
        <p className="text-sm text-[#334036]/60">{role}</p>
      </div>
    </div>
    <p className="text-[#334036]/80 leading-relaxed">&ldquo;{quote}&rdquo;</p>
  </motion.div>
);

// Benefits component
const Benefit = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    className="flex gap-4 items-start"
    variants={fadeInUp}
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F7F5EF] flex items-center justify-center text-xl text-[#815C42]">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold mb-2 text-[#334036]">{title}</h3>
      <p className="text-[#334036]">{description}</p>
    </div>
  </motion.div>
);

export default function Home() {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = React.useState(0);
  
  // Monitor scroll position to update active dot
  React.useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const slideWidth = carouselRef.current.offsetWidth;
        const newActiveSlide = Math.round(scrollPosition / slideWidth);
        setActiveSlide(newActiveSlide);
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Function to scroll to a specific slide
  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* Hero Section - Clean & Modern */}
      <motion.section 
        id="hero" 
        className="min-h-screen pt-20 flex flex-col items-center justify-center relative bg-gradient-to-br from-[#F7F5EF] to-white"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        {/* Subtle geometric background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#D7D0C0]/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-[#C4B99F]/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-[#815C42]/10 rounded-full blur-lg"></div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center relative z-10 mb-16 mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#815C42] py-2 px-4 rounded-full mb-8 shadow-sm border border-[#D7D0C0]/30">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#815C42] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#815C42]"></span>
              </span>
              <span className="text-sm font-medium">Join the wellness revolution</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#334036] mb-6 leading-[1.1] tracking-tight">
              Discover Your 
              <span className="block text-[#815C42] mt-2">Perfect Balance</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-[#334036]/80 leading-relaxed font-light">
              Personalized Ayurvedic wisdom tailored to your unique constitution. 
              Experience optimal health, vibrant energy, and lasting well-being.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/assessment" 
                className="bg-[#815C42] text-white hover:bg-[#6a4a34] py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center min-w-[200px]"
              >
                Start Free Assessment
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-white text-[#334036] hover:bg-gray-50 py-4 px-8 rounded-2xl font-semibold text-lg border-2 border-[#D7D0C0] transition-all duration-300 hover:border-[#C4B99F] inline-flex items-center justify-center min-w-[200px]"
              >
                Sign Up Free
              </Link>
            </div>
          </motion.div>
          
          {/* App Screenshots - Cleaner Layout */}
          <motion.div 
            variants={staggerChildren} 
            className="flex justify-center items-center relative z-10 mb-16"
          >
            <div className="flex items-end gap-6 max-w-4xl">
              {/* Left Phone */}
              <motion.div
                variants={appScreenVariant}
                className="hidden sm:block relative"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-56 h-auto bg-white rounded-[2.5rem] p-2 shadow-xl">
                  <Image 
                    src="/app1.png" 
                    alt="Ananta Svastha App Screen 1" 
                    width={240} 
                    height={480} 
                    className="rounded-[2rem] w-full h-auto object-cover"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Center Phone (Featured) */}
              <motion.div
                variants={appScreenVariant}
                className="relative z-10" 
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-72 h-auto bg-white rounded-[2.5rem] p-2 shadow-2xl">
                  <Image 
                    src="/app2.png" 
                    alt="Ananta Svastha App Screen 2" 
                    width={280} 
                    height={560} 
                    className="rounded-[2rem] w-full h-auto object-cover"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Right Phone */}
              <motion.div
                variants={appScreenVariant}
                className="hidden sm:block relative"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-56 h-auto bg-white rounded-[2.5rem] p-2 shadow-xl">
                  <Image 
                    src="/app3.png" 
                    alt="Ananta Svastha App Screen 3" 
                    width={240} 
                    height={480} 
                    className="rounded-[2rem] w-full h-auto object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Download Buttons - Modern Style */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 relative z-10 justify-center w-full max-w-md mx-auto">
            <Link 
              href="/download" 
              className="group bg-black text-white hover:bg-gray-900 py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full"
            >
              <Image src="/App_Store.png" alt="App Store" width={32} height={32} className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs opacity-70">Download on the</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </Link>
            <Link 
              href="/download" 
              className="group bg-black text-white hover:bg-gray-900 py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full"
            >
              <Image src="/google-play-store.png" alt="Google Play" width={32} height={32} className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs opacity-70">GET IT ON</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section - Clean & Minimal */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#F7F5EF] text-[#815C42] py-2 px-4 rounded-full text-sm font-medium">
                  <FaLeaf className="text-[#815C42]" />
                  Ancient Wisdom, Modern Science
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#334036] leading-tight">
                  Personalized wellness designed for 
                  <span className="text-[#815C42] block">your unique constitution</span>
                </h2>
                
                <p className="text-lg text-[#334036]/80 leading-relaxed">
                  Ananta Svastha combines 5,000-year-old Ayurvedic principles with modern science 
                  to deliver truly personalized wellness recommendations based on your unique dosha.
                </p>
              </div>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#F7F5EF]/50 rounded-2xl border border-[#D7D0C0]/30">
                  <div className="w-12 h-12 bg-[#815C42]/10 rounded-xl flex items-center justify-center mb-4">
                    <FaHeart className="text-[#815C42] text-xl" />
                  </div>
                  <h3 className="font-bold text-[#334036] mb-2">Deeply Personal</h3>
                  <p className="text-[#334036]/70 text-sm">Protocols tailored to your unique constitution, not generic advice</p>
                </div>
                
                <div className="p-6 bg-[#F7F5EF]/50 rounded-2xl border border-[#D7D0C0]/30">
                  <div className="w-12 h-12 bg-[#815C42]/10 rounded-xl flex items-center justify-center mb-4">
                    <FaYinYang className="text-[#815C42] text-xl" />
                  </div>
                  <h3 className="font-bold text-[#334036] mb-2">Holistic Balance</h3>
                  <p className="text-[#334036]/70 text-sm">Integrate mind, body, and spirit for complete wellness</p>
                </div>
                
                <div className="p-6 bg-[#F7F5EF]/50 rounded-2xl border border-[#D7D0C0]/30">
                  <div className="w-12 h-12 bg-[#815C42]/10 rounded-xl flex items-center justify-center mb-4">
                    <FaAppleAlt className="text-[#815C42] text-xl" />
                  </div>
                  <h3 className="font-bold text-[#334036] mb-2">Root-Cause Focus</h3>
                  <p className="text-[#334036]/70 text-sm">Address imbalances at their source, not just symptoms</p>
                </div>
                
                <div className="p-6 bg-[#F7F5EF]/50 rounded-2xl border border-[#D7D0C0]/30">
                  <div className="w-12 h-12 bg-[#815C42]/10 rounded-xl flex items-center justify-center mb-4">
                    <FaLeaf className="text-[#815C42] text-xl" />
                  </div>
                  <h3 className="font-bold text-[#334036] mb-2">Adaptive Wisdom</h3>
                  <p className="text-[#334036]/70 text-sm">Guidance that evolves with seasons and your changing needs</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  href="/doshas" 
                  className="inline-flex items-center gap-2 bg-[#815C42] text-white hover:bg-[#6a4a34] py-4 px-8 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  Discover Your Constitution
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#815C42]/5 to-[#D7D0C0]/10 rounded-3xl blur-3xl transform scale-110"></div>
                <Image 
                  src="/body.png" 
                  alt="Ayurvedic Constitution" 
                  width={400} 
                  height={400} 
                  className="relative z-10 rounded-3xl hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern & Clean */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#334036]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Journey to <span className="text-[#C4B99F]">Wellness</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Four simple steps to unlock your body's natural intelligence and achieve lasting balance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Discover",
                description: "Complete our comprehensive assessment to uncover your unique dosha profile and constitutional type"
              },
              {
                number: "02", 
                title: "Understand",
                description: "Learn how your constitution influences your health, energy, and well-being patterns"
              },
              {
                number: "03",
                title: "Transform",
                description: "Follow personalized nutrition, lifestyle, and mindfulness protocols designed for your type"
              },
              {
                number: "04",
                title: "Thrive",
                description: "Experience sustained energy, mental clarity, and optimal health as your natural state"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-[#815C42] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                    {step.number}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-[#C4B99F]/30"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/assessment" 
              className="inline-flex items-center gap-2 bg-[#815C42] text-white hover:bg-[#6a4a34] py-4 px-8 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              Start Your Assessment
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Clean & Modern */}
      <motion.section 
        id="testimonials" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#815C42] py-2 px-4 rounded-full text-sm font-medium mb-6">
              <FaHeart className="text-[#815C42]" />
              Real Stories, Real Results
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#334036] mb-6">
              Transformed Lives Through 
              <span className="text-[#815C42] block">Ancient Wisdom</span>
            </h2>
            <p className="text-lg text-[#334036]/80 max-w-2xl mx-auto">
              Discover how personalized Ayurvedic guidance has helped thousands achieve breakthrough wellness results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Testimonial 
              name="Priya S."
              role="Yoga Instructor"
              quote="After struggling with chronic insomnia and digestive issues for years, I discovered my Vata imbalance through Ananta Svastha. Within 21 days of following my personalized protocol, I'm sleeping soundly and my digestion has completely normalized."
              avatar=""
            />
            <Testimonial 
              name="Michael T."
              role="Software Engineer"
              quote="My intense Pitta constitution led to constant acid reflux and burnout cycles. The app's cooling dietary protocols and mindfulness practices reduced my symptoms by 80% in just four weeks while doubling my productivity."
              avatar=""
            />
            <Testimonial 
              name="Sarah L."
              role="Healthcare Professional"
              quote="Despite eating 'healthy' and exercising regularly, I battled persistent fatigue. Learning about my Kapha dominance was revelatory. The energizing practices helped me shed 12 pounds effortlessly and maintain consistent energy."
              avatar=""
            />
          </div>
          
          {/* CTA Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#D7D0C0]/20 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-[#334036] mb-4">
                  Ready to discover your unique path to wellness?
                </h3>
                <p className="text-[#334036]/80 text-lg">
                  Discover your unique path to wellness through personalized Ayurvedic wisdom. 
                  Begin your journey with our free constitutional assessment.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/assessment" 
                  className="bg-[#815C42] text-white hover:bg-[#6a4a34] py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 whitespace-nowrap"
                >
                  Start Free Assessment
                </Link>
                <Link 
                  href="/download" 
                  className="bg-white text-[#334036] text-center hover:bg-gray-50 py-4 px-8 rounded-2xl font-semibold text-lg border-2 border-[#D7D0C0] transition-all duration-300 hover:border-[#C4B99F] whitespace-nowrap"
                >
                  Download App
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Download Section - Clean & Modern */}
      <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#334036] to-[#2a332d]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white py-2 px-4 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#C4B99F] rounded-full"></span>
                Start Your Wellness Journey Today
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Transform Your Health with 
                <span className="text-[#C4B99F] block">Ancient Wisdom</span>
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                Download Ananta Svastha and discover your unique path to optimal health, 
                sustained energy, and profound well-being through personalized Ayurvedic guidance.
              </p>
            </div>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                href="/download" 
                className="group bg-black hover:bg-gray-900 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-w-[200px]"
              >
                <Image src="/App_Store.png" alt="App Store" width={32} height={32} className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on the</div>
                  <div className="text-base font-bold">App Store</div>
                </div>
              </Link>
              <Link 
                href="/download" 
                className="group bg-black hover:bg-gray-900 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-w-[200px]"
              >
                <Image src="/google-play-store.png" alt="Google Play" width={32} height={32} className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs opacity-70">GET IT ON</div>
                  <div className="text-base font-bold">Google Play</div>
                </div>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C4B99F] mb-2">Coming Soon</div>
                <div className="text-white/70">Community Launch</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C4B99F] mb-2">Ancient</div>
                <div className="text-white/70">Wisdom Traditions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C4B99F] mb-2">5,000+</div>
                <div className="text-white/70">Years of Wisdom</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}