"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// This would come from your database or CMS in a real application
const getNewsItem = (id: string) => {
  const newsItems = [
    {
      id: 1,
      title: "Ananta Svastha App Reaches 100K Downloads",
      date: "May 15, 2025",
      category: "App Updates",
      image: "/App_01.PNG",      // HTML content without template literals for better rendering
      content: 
`<div class="news-content prose prose-sm md:prose-base">
<p>We are excited to announce that the Ananta Svastha app has reached a significant milestone of 100,000 downloads across iOS and Android platforms. This achievement highlights the growing interest in holistic health approaches and Ayurvedic wellness practices in the digital age.</p>

<h2>A Growing Community</h2>
<p>Since our launch, we've been dedicated to making Ayurvedic knowledge accessible to everyone through modern technology. The rapidly growing user base demonstrates that people are increasingly seeking personalized, natural approaches to health and wellbeing.</p>

<p>"We're thrilled to see how many people are embracing Ayurvedic principles in their daily lives through our platform," said our founder. "This milestone validates our mission to bridge ancient wisdom with modern technology."</p>

<h2>What Users Love</h2>
<p>Based on user feedback, the most popular features include:</p>
<ul>
  <li>Personalized dosha assessments</li>
  <li>Daily wellness routines tailored to individual constitutions</li>
  <li>Seasonal diet recommendations</li>
  <li>Guided meditation practices</li>
</ul>

<h2>Looking Forward</h2>
<p>As we celebrate this milestone, we're already working on new features that will enhance the user experience and deepen the personalization capabilities of the app. In the coming months, users can look forward to expanded recipe libraries, integration with health tracking devices, and more comprehensive seasonal guidance.</p>

<p>We extend our heartfelt gratitude to our user community, whose feedback and enthusiasm have been instrumental in shaping the evolution of Ananta Svastha.</p>
</div>`
    },
    {
      id: 2,
      title: "New Research Validates Dosha-Based Nutritional Recommendations",
      date: "May 8, 2025",
      category: "Research",      image: "/herbs-icon.svg",
      content: `<div class="news-content prose prose-sm md:prose-base">
<p>Lorem ipsum content will be replaced with actual content...</p>
</div>`
    }
    // Additional news items would be added here
  ];

  return newsItems.find(item => item.id.toString() === id) || null;
};

export default function NewsDetail({ params }: { params: { id: string } }) {
  // Access params directly
  const { id } = params;
  const newsItem = getNewsItem(id);
  
  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">News article not found</h1>
          <Link href="/news" className="mt-4 inline-block text-[#815C42] hover:underline">
            Return to News page
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto">
        {/* Back link - Simplified */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/news" className="inline-flex items-center text-[#815C42] hover:text-[#815C42]/80 mb-8 text-sm font-medium">
            <FaArrowLeft className="mr-2 text-xs" /> Back to News
          </Link>
        </motion.div>
        
        {/* Article header - Cleaner design */}
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <span className="inline-block bg-[#F7F5EF] text-[#815C42] px-3 py-1 rounded-full text-xs font-medium mb-4">
            {newsItem.category}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#334036] mb-4 leading-tight">{newsItem.title}</h1>
          <div className="flex items-center text-[#334036]/60 text-sm">
            <FaCalendarAlt className="mr-2 text-[#815C42]" size={12} />
            <span>{newsItem.date}</span>
          </div>
        </motion.div>
        
        {/* Featured image - Simplified */}
        <motion.div
          className="relative h-60 md:h-80 rounded-xl overflow-hidden mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image 
            src={newsItem.image}
            alt={newsItem.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
            {/* Article content - Improved rendering with global styles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        </motion.div>
        
        {/* Social sharing - Minimal design */}
        <motion.div 
          className="mt-10 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-sm font-medium text-[#334036] mb-4">Share this article</h3>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors text-sm">
              <FaFacebook size={14} />
            </button>
            <button className="bg-sky-500 text-white p-2.5 rounded-full hover:bg-sky-600 transition-colors text-sm">
              <FaTwitter size={14} />
            </button>
            <button className="bg-blue-800 text-white p-2.5 rounded-full hover:bg-blue-900 transition-colors text-sm">
              <FaLinkedin size={14} />
            </button>
          </div>
        </motion.div>
        
        {/* Related articles - Clean design */}
        <motion.div 
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-xl font-bold mb-6 text-[#334036]">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/news/5" className="group">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col">
                <div className="relative h-40 bg-[#F7F5EF]">
                  <Image
                    src="/App_02.PNG"
                    alt="New Seasonal Recipes Added to Premium Plan"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium text-[#334036] text-base group-hover:text-[#815C42] transition-colors line-clamp-2">New Seasonal Recipes Added to Premium Plan</h3>
                  <div className="mt-2 flex items-center text-xs text-[#334036]/60">
                    <FaCalendarAlt className="mr-1.5 text-[#815C42]" size={10} />
                    <span>April 15, 2025</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/news/7" className="group">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col">
                <div className="relative h-40 bg-[#F7F5EF]">
                  <Image
                    src="/App_03.PNG"
                    alt="Introducing Daily Dosha Tracking"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium text-[#334036] text-base group-hover:text-[#815C42] transition-colors line-clamp-2">Introducing Daily Dosha Tracking</h3>
                  <div className="mt-2 flex items-center text-xs text-[#334036]/60">
                    <FaCalendarAlt className="mr-1.5 text-[#815C42]" size={10} />
                    <span>April 1, 2025</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
