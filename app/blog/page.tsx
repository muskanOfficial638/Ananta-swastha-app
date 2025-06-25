"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaLongArrowAltRight, FaPencilAlt, FaLeaf } from "react-icons/fa";

// Simplified animation variants
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
      staggerChildren: 0.1
    }
  }
};

// Define the type for blog posts
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  authorImage: string;
  readTime: string;
  featured: boolean;
  tag: string;
};

// Empty blog posts array - no content available yet
const blogPosts: BlogPost[] = [];

// Simplified BlogCard component
const BlogCard = ({ 
  post,
  featured = false,
}: { 
  post: typeof blogPosts[0]; 
  featured?: boolean;
}) => {
  return (
    <motion.div 
      className={`${featured ? 'col-span-full' : 'col-span-full md:col-span-6 lg:col-span-4'}`}
      variants={fadeIn}
    >
      {featured ? (
        // Featured post design - horizontal layout with larger image
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority
              />
              <div className="absolute top-4 left-4 z-20">
                <div className={`inline-flex items-center py-1 px-3 rounded-full text-white text-xs font-medium
                            ${post.tag === 'vata' ? 'bg-[#88A886]/90' : 
                               post.tag === 'pitta' ? 'bg-[#D98324]/90' : 
                               post.tag === 'kapha' ? 'bg-[#5C7F99]/90' : 
                               'bg-[#815C42]/90'}`}>
                  {post.category}
                </div>
              </div>
            </div>
            
            <div className="p-6 md:w-1/2 flex flex-col">
              <h3 className="text-xl font-bold mb-3 text-[#334036]">{post.title}</h3>
              <p className="text-[#334036]/70 mb-4 text-sm">{post.excerpt}</p>
              
              <div className="flex items-center text-xs text-[#334036]/60 mb-4">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt size={10} /> {post.date}
                </span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image 
                      src={post.authorImage} 
                      alt={post.author} 
                      width={32} 
                      height={32} 
                      className="object-cover" 
                    />
                  </div>
                  <span className="text-xs font-medium text-[#334036]">{post.author}</span>
                </div>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-white bg-[#815C42] py-1 px-3 rounded-full hover:bg-[#815C42]/90 transition-all"
                >
                  Read Article
                  <FaLongArrowAltRight size={10} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Regular post design - simplified
        <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group relative">
          <div className="flex flex-col h-full">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover" 
              />
              
              <div className="absolute top-3 left-3 z-20">
                <div className={`inline-flex py-1 px-2 rounded-full text-white text-xs font-medium
                              ${post.tag === 'vata' ? 'bg-[#88A886]/90' : 
                                 post.tag === 'pitta' ? 'bg-[#D98324]/90' : 
                                 post.tag === 'kapha' ? 'bg-[#5C7F99]/90' : 
                                 'bg-[#815C42]/90'}`}>
                  {post.category}
                </div>
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-base font-bold text-[#334036] mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-[#334036]/70 mb-3 line-clamp-2 text-xs">{post.excerpt}</p>
              
              <div className="flex items-center text-xs text-[#334036]/60 mb-3">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt size={9} /> {post.date}
                </span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              
              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image 
                      src={post.authorImage} 
                      alt={post.author} 
                      width={24} 
                      height={24} 
                      className="object-cover" 
                    />
                  </div>
                  <span className="text-xs font-medium text-[#334036]">{post.author}</span>
                </div>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-white bg-[#815C42] text-xs font-medium py-1 px-3 rounded-full hover:bg-[#815C42]/90 transition-all flex items-center"
                >
                  Read
                  <FaLongArrowAltRight size={9} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Simplified filter component
const FilterButton = ({ 
  label, 
  active = false, 
  onClick 
}: { 
  label: string; 
  active?: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs transition-all 
        ${active 
          ? 'bg-[#334036] text-white font-medium' 
          : 'bg-[#F7F5EF] text-[#334036]/70 hover:bg-[#F7F5EF]/80 hover:text-[#334036]'}`}
    >
      {label}
    </button>
  );
};

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
                         post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || 
                           (activeCategory === "Vata" && post.tag === "vata") ||
                           (activeCategory === "Pitta" && post.tag === "pitta") ||
                           (activeCategory === "Kapha" && post.tag === "kapha") ||
                           post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Find featured post
  const featuredPost = blogPosts.find(post => post.featured);
  // Other posts (non-featured)
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero Section - Minimalist Design */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative bg-[#F7F5EF]">
        {/* Subtle background gradient similar to other pages */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" 
               style={{
                 background: `
                   radial-gradient(circle at 10% 30%, rgba(129, 92, 66, 0.1) 0%, transparent 45%),
                   radial-gradient(circle at 90% 20%, rgba(51, 64, 54, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 60% 80%, rgba(196, 185, 159, 0.15) 0%, transparent 40%)
                 `,
               }} 
          />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm">
              <span className="text-[#815C42] font-medium text-sm">Ayurvedic Wisdom</span>
            </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#334036] mb-4">
              Ancient Wisdom for <span className="text-[#815C42]">Contemporary Wellness</span>
            </h1>
            
            <p className="text-lg max-w-2xl mx-auto text-[#334036]/80 mb-8">
              Our blog is coming soon with insights on Ayurvedic principles that can transform your health through balanced living and mindful practices.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search for wisdom..."
                className="w-full py-2 px-4 pl-10 rounded-full bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#815C42]/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#815C42] text-sm" />
              
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#334036]/60 hover:text-[#334036]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section - Cleaner Design */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category filters - More minimal */}
          <div className="mb-8">            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#334036]">
                {blogPosts.length === 0 ? "Upcoming Articles" : 
                 activeCategory === "All" ? "Latest Articles" : `${activeCategory} Articles`}
              </h2>
              
              <div className="text-xs text-[#334036]/60">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </div>
            </div>
            
            <div className="flex overflow-x-auto py-1 gap-2 no-scrollbar">
              {["All", "Vata", "Pitta", "Kapha", "Nutrition", "Lifestyle", "Wellness"].map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </div>
          </div>
            
          {/* Featured post - Cleaner design */}
          {featuredPost && activeCategory === "All" && (
            <div className="mb-8">
              <BlogCard post={featuredPost} featured={true} />
            </div>
          )}
            
          {/* Regular posts - Cleaner grid */}
          <motion.div 
            className="grid grid-cols-12 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
              {/* Empty state - Enhanced design */}
          {filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F7F5EF] flex items-center justify-center text-3xl text-[#815C42]">
                <FaLeaf />
              </div>              <h3 className="text-2xl font-bold mb-3 text-[#334036]">Coming Soon</h3>
              <p className="text-[#334036]/70 mb-6 max-w-lg mx-auto">
                We're currently crafting insightful Ayurvedic wisdom to share with you. 
                Our team of experts is preparing articles on doshas, nutrition, wellness practices, 
                and holistic living.
              </p>
              
              {searchQuery || activeCategory !== "All" ? (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-[#334036]/70 text-sm mb-3">
                    Can't find what you're looking for?
                  </p>
                  <button 
                    className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-3">
                  <Link href="/doshas" className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors">
                    Learn About Doshas
                  </Link>
                  <Link href="/contact" className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/assessment" className="px-4 py-2 bg-[#F7F5EF] text-[#334036] text-sm rounded-full hover:bg-[#F7F5EF]/80 transition-colors">
                    Take Assessment
                  </Link>
                </div>              )}
            </motion.div>
          )}
          
          {/* If we have blog posts but none match the filters */}
          {blogPosts.length > 0 && filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F7F5EF] flex items-center justify-center text-xl text-[#815C42]">
                <FaSearch />
              </div>
              <h3 className="text-lg font-medium mb-2 text-[#334036]">No Articles Found</h3>
              <p className="text-[#334036]/70 mb-6 max-w-md mx-auto text-sm">
                We couldn&apos;t find any articles matching your current filters.
              </p>
              <button 
                className="px-4 py-1.5 bg-[#815C42] text-white text-xs rounded-full"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}        </div>
      </section>
    </div>
  );
}