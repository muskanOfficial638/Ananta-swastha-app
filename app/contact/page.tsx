"use client";

import React from "react";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaLinkedinIn, FaYoutube, FaClock, FaFacebook } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
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

export default function Contact() {
  return (
    <main>
      <PageBanner 
        title="Contact Us" 
        subtitle="Get in touch with our team"
        backgroundColors={{ primary: '#334036', secondary: '#ABB087' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {/* Contact Information */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="bg-[#F7F5EF] p-8 rounded-lg shadow-md md:w-1/2"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-semibold text-[#334036] mb-6"
            >
              Get In Touch
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-gray-700 mb-8"
            >
              Have questions about our app or Ayurvedic wellness? We&apos;re here to help. Reach out to us through any of the channels below.
            </motion.p>
            
            <div className="space-y-6">
              <motion.div variants={fadeIn} className="flex items-start">
                <div className="mt-1 bg-[#815C42] p-3 rounded-full text-white">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#334036]">Our Location</h3>
                  <p className="text-gray-700 mt-1">
                    1st Floor, SM Infinity,
                    P.No. 35-36 TILAK VIHAR B,
                    NEAR CAFE 206 GOKULPURA
                    KALWAR ROAD JHOTWARA
                    Jaipur, Rajasthan - 302012
                    India (IN)
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex items-start">
                <div className="mt-1 bg-[#815C42] p-3 rounded-full text-white">
                  <FaEnvelope size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#334036]">Email Us</h3>
                  <p className="text-gray-700 mt-1">
                    <a href="mailto:info@anantasvastha.com" className="hover:text-[#815C42] transition-colors">info@anantasvastha.com</a>
                  </p>
                </div>
              </motion.div>
                <motion.div variants={fadeIn} className="flex items-start">
                <div className="mt-1 bg-[#815C42] p-3 rounded-full text-white">
                  <FaPhone size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#334036]">Call Us</h3>
                  <p className="text-gray-700 mt-1">
                    <a href="tel:+917733993771" className="hover:text-[#815C42] transition-colors">+91 77339 93771</a>
                  </p>
                </div>
              </motion.div>
                <motion.div variants={fadeIn} className="flex items-start">
                <div className="mt-1 bg-[#815C42] p-3 rounded-full text-white">
                  <FaClock size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#334036]">Business Hours</h3>
                  <div className="text-gray-700 mt-1">
                    <p>Monday - Saturday: 9:30 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={fadeIn} className="mt-8">
              <h3 className="text-lg font-medium text-[#334036] mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/anantasvastha" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#815C42] text-white p-3 rounded-full hover:bg-[#6e4f39] transition-colors"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://linkedin.com/company/ananta-svastha" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#815C42] text-white p-3 rounded-full hover:bg-[#6e4f39] transition-colors"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a 
                  href="https://youtube.com/@ANANTASVASTHA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#815C42] text-white p-3 rounded-full hover:bg-[#6e4f39] transition-colors"
                >
                  <FaYoutube size={18} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61575706005424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#815C42] text-white p-3 rounded-full hover:bg-[#6e4f39] transition-colors"
                >
                  <FaFacebook size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* FAQ Section - Moved from below to side-by-side layout */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="md:w-1/2"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-semibold text-[#334036] mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="space-y-4">
              <motion.div variants={fadeIn} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-[#334036] mb-2">How do I download the Ananta Svastha app?</h3>
                <p className="text-gray-700">
                  The Ananta Svastha app is available for download on both iOS and Android platforms. Visit the App Store or Google Play Store and search for &quot;Ananta Svastha&quot; to download.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-[#334036] mb-2">Is my health data secure?</h3>
                <p className="text-gray-700">
                  Yes, we take data security very seriously. All health data is encrypted and stored securely. We do not share your personal information with third parties without your explicit consent.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-[#334036] mb-2">How accurate is the dosha analysis?</h3>
                <p className="text-gray-700">
                  Our dosha analysis is based on traditional Ayurvedic principles and has been developed with experienced practitioners. While it provides valuable insights, it is not meant to replace consultation with a qualified Ayurvedic practitioner.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
