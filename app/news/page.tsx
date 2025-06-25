"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaNewspaper, FaVideo, FaPodcast, FaArrowRight, FaSearch } from "react-icons/fa";
import PageBanner from "@/components/PageBanner";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
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

// Define the type for news/media items
type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  type: "news" | "media" | "update";
};

// Empty news/media array - no content available yet
const newsItems: NewsItem[] = [];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter news based on active filter and search query
  const filteredNews = newsItems.filter(item => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>      <PageBanner 
        title="News & Media" 
        subtitle="Coming soon! Stay tuned for the latest announcements, media coverage, and app updates"
        backgroundColors={{ primary: '#815C42', secondary: '#334036', tertiary: '#ABB087' }}
      />

      {/* Filters and Search - More minimal */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {/* Filter buttons - More minimal */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all
                ${activeFilter === "all" 
                  ? "bg-[#815C42] text-white" 
                  : "bg-[#F7F5EF] text-[#334036]/70 hover:text-[#334036]"}`}
            >
              All Updates
            </button>
            <button 
              onClick={() => setActiveFilter("news")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5
                ${activeFilter === "news" 
                  ? "bg-[#815C42] text-white" 
                  : "bg-[#F7F5EF] text-[#334036]/70 hover:text-[#334036]"}`}
            >
              <FaNewspaper size={10} /> News
            </button>
            <button 
              onClick={() => setActiveFilter("media")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5
                ${activeFilter === "media" 
                  ? "bg-[#815C42] text-white" 
                  : "bg-[#F7F5EF] text-[#334036]/70 hover:text-[#334036]"}`}
            >
              <FaVideo size={10} /> Media
            </button>
            <button 
              onClick={() => setActiveFilter("update")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5
                ${activeFilter === "update" 
                  ? "bg-[#815C42] text-white" 
                  : "bg-[#F7F5EF] text-[#334036]/70 hover:text-[#334036]"}`}
            >
              <FaPodcast size={10} /> Updates
            </button>
          </div>
          
          {/* Search bar - More minimal */}
          <div className="w-full md:w-64 relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-[#E9E5DC] rounded-full focus:outline-none focus:ring-1 focus:ring-[#815C42]/30 focus:border-[#815C42]/30 bg-[#F7F5EF]/50 text-sm"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#815C42] text-xs" />
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#334036]/60 hover:text-[#334036]"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* News Grid - Cleaner design */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeIn}
              className="bg-white rounded-xl overflow-hidden border border-[#E9E5DC]/60 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-48 bg-[#F7F5EF]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#815C42]/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-2 text-xs text-[#334036]/60">
                  <FaCalendarAlt className="mr-1.5 text-[#815C42]" size={10} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#334036] line-clamp-2">{item.title}</h3>
                <p className="text-[#334036]/70 mb-4 leading-relaxed text-sm line-clamp-3">{item.excerpt}</p>
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <Link 
                    href={`/news/${item.id}`} 
                    className="inline-flex items-center text-white bg-[#815C42] hover:bg-[#815C42]/90 transition-colors py-1 px-3 rounded-full text-xs font-medium"
                  >
                    Read more
                    <FaArrowRight className="ml-1.5" size={9} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
          {/* Empty state - Coming Soon */}
        {filteredNews.length === 0 && (
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl border border-[#E9E5DC]/60 p-12 text-center my-10"
          >
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-[#F7F5EF] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[#815C42]">
                <FaNewspaper size={32} />
              </div>
            </div>
              <h3 className="text-2xl font-bold text-[#334036] mb-4">News & Media Coming Soon</h3>
            <p className="text-[#334036]/70 mb-6 max-w-lg mx-auto">
              We're currently preparing exciting news updates, media coverage, and announcements about our Ayurvedic wellness journey. 
              Stay tuned for upcoming content!
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/doshas" className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors">
                Learn About Doshas
              </Link>
              <Link href="/blog" className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors">
                Visit Our Blog
              </Link>
              <Link href="/assessment" className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors">
                Take Assessment
              </Link>
            </div>          </motion.div>
        )}
      </section>
    </>
  );
}
