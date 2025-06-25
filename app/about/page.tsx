"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaBalanceScale, FaBrain, FaLinkedinIn, FaTwitter } from "react-icons/fa";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export default function About() {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Deepak Tanwar",
      role: "Role",
      bio: "A short bio about Deepak Tanwar",
      image: "/photo",
      social: {
        linkedin: "https://linkedin.com",
      }
    },
    {
      name: "Shiva Gaur",
      role: "Legal Head & Co-Founder",
      bio: "A short bio about Shiva Gaur",
      image: "/photo",
      social: {
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "John Doe",
      role: "Role",
      bio: "A short bio about John Doe",
      image: "/photo",
      social: {
        linkedin: "https://linkedin.com",
      }
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 md:px-8 bg-[#F7F5EF] relative overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" 
               style={{
                 background: `
                   radial-gradient(circle at 10% 30%, rgba(129, 92, 66, 0.2) 0%, transparent 45%),
                   radial-gradient(circle at 90% 20%, rgba(51, 64, 54, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 60% 80%, rgba(196, 185, 159, 0.25) 0%, transparent 40%)
                 `,
               }} 
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#334036] mb-6 leading-tight">
                About <span className="text-[#815C42]">Ananta Svastha</span>
              </h1>
              <p className="text-lg text-[#334036] mb-6 leading-relaxed">
                The Ananta Svastha name blends Sanskrit and Hindi to symbolize <span className="font-medium">infinite wellness</span>. Our logo represents eternal growth, balance, and holistic well-being, with the infinity symbol merging into a tree.
              </p>
              <p className="text-lg text-[#334036] mb-6 leading-relaxed">
                We embody the essence of wellness that is natural, timeless, and ever-evolving, rooted in the ancient science of Ayurveda and adapted for modern life.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center items-center" // Added flex centering
            >
              <div className="relative p-4 sm:p-6 md:p-8"> {/* Adjusted padding */}
                <Image 
                  src="/logo-dark.png" 
                  alt="Ananta Svastha Logo" 
                  width={450} // Increased width
                  height={225} // Increased height
                  className="rounded-3xl object-contain" // Added shadow-xl and object-contain
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8 bg-[#D7D0C0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"> {/* Adjusted gap */}
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl border-l-4 border-[#815C42]" // Added left border
            >
              <h2 className="text-3xl font-bold text-[#334036] mb-6 flex items-center">
                <span className="text-[#815C42] mr-2">Our</span> Vision {/* Adjusted margin */}
              </h2>
              <p className="text-lg text-[#334036] leading-relaxed">
                To be the most trusted Ayurvedic wellness platform, empowering individuals to achieve lifelong health and balance through authentic, personalized, and holistic healing rooted in the ancient science of Ayurveda.
              </p>
            </motion.div>
            
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl border-l-4 border-[#334036]" // Added left border with different color
            >
              <h2 className="text-3xl font-bold text-[#334036] mb-6 flex items-center">
                <span className="text-[#815C42] mr-2">Our</span> Mission {/* Adjusted margin */}
              </h2>
              <p className="text-lg text-[#334036] leading-relaxed">
                Our mission is to provide accessible, authentic Ayurvedic healthcare through expert doctor consultations—helping individuals heal naturally, understand their bodies, and embrace a balanced lifestyle for long-term well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 md:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#334036] mb-6">Our Core Values</h2>
            <p className="text-lg max-w-3xl mx-auto text-[#334036]">
              These principles guide everything we do, from consultations to wellness recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <motion.div 
              className="bg-[#F7F5EF] rounded-xl p-6" 
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-lg bg-[#815C42] flex items-center justify-center text-2xl text-white mb-5">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-2">Authenticity</h3>
              <p className="text-base text-[#334036] leading-relaxed">
                We honor the ancient traditions of Ayurveda while making them accessible and relevant for modern life. Our practices and recommendations are rooted in classical Ayurvedic texts and principles.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#F7F5EF] rounded-xl p-6" 
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-lg bg-[#815C42] flex items-center justify-center text-2xl text-white mb-5">
                <FaHeart />
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-2">Holistic Healing</h3>
              <p className="text-base text-[#334036] leading-relaxed">
                We believe in treating the root cause, not just the symptoms—addressing mind, body, and spirit for complete well-being.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#F7F5EF] rounded-xl p-6" 
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-lg bg-[#815C42] flex items-center justify-center text-2xl text-white mb-5">
                <FaBalanceScale />
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-2">Personalized Care</h3>
              <p className="text-base text-[#334036] leading-relaxed">
                Every individual is unique, and so are our consultations—tailored to your body type (Prakriti) and health goals.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#F7F5EF] rounded-xl p-6" 
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-lg bg-[#815C42] flex items-center justify-center text-2xl text-white mb-5">
                <FaBrain />
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-2">Empowerment Through Knowledge</h3>
              <p className="text-base text-[#334036] leading-relaxed">
                We educate people on their own health so they can make informed, lasting lifestyle changes.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#F7F5EF] rounded-xl p-6" 
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-lg bg-[#815C42] flex items-center justify-center text-2xl text-white mb-5">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-2">Trust & Transparency</h3>
              <p className="text-base text-[#334036] leading-relaxed">
                We offer expert guidance from certified Ayurvedic doctors, with honest advice and clearly explained treatments.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#F7F5EF] rounded-xl p-6" 
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-lg bg-[#815C42] flex items-center justify-center text-2xl text-white mb-5">
                <FaHeart />
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-2">Compassion</h3>
              <p className="text-base text-[#334036] leading-relaxed">
                Healing begins with empathy. We listen, understand, and support each person&apos;s journey to better health.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Brand Identity Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8 bg-[#F7F5EF] relative overflow-hidden">
        <Image 
          src="/mandala.png" 
          alt="Mandala Pattern" 
          width={400} 
          height={400} 
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 z-0" 
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#334036] mb-6">The Essence of <span className="text-[#815C42]">Ananta Svastha</span></h2>
            <p className="text-lg max-w-3xl mx-auto text-[#334036]">
              Our brand embodies the perfect harmony of ancient wisdom and modern wellness needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-10">
            <div>
              <h3 className="text-2xl font-bold text-[#334036] mb-6">The Science of Ayurveda</h3>
              <p className="text-lg text-[#334036] mb-6 leading-relaxed">
                Ayurveda, which translates to &quot;the science of life,&quot; is one of the world&apos;s oldest holistic healing systems. Developed in India over 5,000 years ago, it&apos;s based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
              </p>
              <p className="text-lg text-[#334036] mb-6 leading-relaxed">
                The central philosophy of Ayurveda is that each person has a unique constitution or &quot;prakriti&quot; made up of three doshas: Vata, Pitta, and Kapha. These doshas represent different elements and govern various physiological and psychological functions.
              </p>
              <Link 
                href="/doshas"
                className="bg-[#815C42] hover:bg-[#6e4f39] text-white py-3 px-8 rounded-full inline-block font-bold shadow-md"
              >
                Learn About Doshas
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                <Image 
                  src="/Vata Icon.png" 
                  alt="Vata Icon" 
                  width={80} 
                  height={80} 
                  className="mr-6" 
                />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#334036]">Vata Dosha</h3>
                  <p className="text-[#334036]">Associated with air and space elements. Controls movement and is responsible for basic bodily functions. When balanced, Vata promotes creativity and flexibility.</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start mt-6">
                <Image 
                  src="/Pitta Icon.png" 
                  alt="Pitta Icon" 
                  width={80} 
                  height={80} 
                  className="mr-6" 
                />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#334036]">Pitta Dosha</h3>
                  <p className="text-[#334036]">Associated with fire and water elements. Governs digestion, metabolism, and energy production. When balanced, Pitta promotes understanding and intelligence.</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start mt-6">
                <Image 
                  src="/kapha icon.png" 
                  alt="Kapha Icon" 
                  width={80} 
                  height={80} 
                  className="mr-6" 
                />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#334036]">Kapha Dosha</h3>
                  <p className="text-[#334036]">Associated with earth and water elements. Maintains body structure, provides strength and immunity. When balanced, Kapha promotes calmness and forgiveness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 md:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#334036] mb-6">Meet Our Team</h2>
            <p className="text-lg max-w-3xl mx-auto text-[#334036]">
              Our team brings together decades of experience in Ayurvedic practice, wellness coaching, and technology development
            </p>
          </div>
          
          {/* Team Members Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-80 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#334036] mb-1">{member.name}</h3>
                  <p className="text-[#815C42] mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  {member.social && (
                    <div className="flex space-x-4">
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#334036] hover:text-[#815C42] transition-colors"
                        >
                          <FaLinkedinIn size={20} />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a 
                          href={member.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#334036] hover:text-[#815C42] transition-colors"
                        >
                          <FaTwitter size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Join Our Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-[#334036] rounded-lg overflow-hidden shadow-xl"
          >
            <div className="md:flex">
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-white mb-6">Join Our Team</h2>
                <p className="text-gray-200 mb-8">
                  We&apos;re always looking for passionate people who want to help others discover the wisdom of Ayurveda and achieve better health and balance.
                </p>
                <div>
                  <a 
                    href="/careers" 
                    className="inline-block bg-[#815C42] text-white py-3 px-6 rounded-md hover:bg-[#6e4f39] transition-colors"
                  >
                    View Open Positions
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 bg-[#F7F5EF] p-12">
                <h3 className="text-2xl font-semibold text-[#334036] mb-6">Why Work With Us</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#815C42] mr-3">✓</span>
                    <span>Make a positive impact on people&apos;s health and well-being</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#815C42] mr-3">✓</span>
                    <span>Collaborate with experts across Ayurveda and technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#815C42] mr-3">✓</span>
                    <span>Bridge ancient wisdom with modern innovation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#815C42] mr-3">✓</span>
                    <span>Flexible remote-first work environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#815C42] mr-3">✓</span>
                    <span>Wellness benefits and opportunities for growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#334036] text-white relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">FOR CHOOSING WELLNESS, THE ANANTA SVASTHA WAY</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Experience the transformative power of personalized Ayurvedic wisdom with our expert consultations and holistic approach
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/#download"
              className="bg-[#815C42] hover:bg-[#6e4f39] py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all hover:-translate-y-1"
            >
              <Image src="/App_Store.png" alt="App Store" width={24} height={24} />
              Download Our App
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white/10 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all hover:-translate-y-1"
            >
              <Image src="/google-play-store.png" alt="Google Play Store" width={24} height={24} />
              Get On Google Play
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
