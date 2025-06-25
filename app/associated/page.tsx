"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaLeaf, 
  FaUsers,
  FaGlobe,
  FaExternalLinkAlt,
  FaPhone,
  FaEnvelope,
  FaBrain,
  FaHeart,
  FaCalendarAlt,
  FaHandshake,
  FaHospital,
  FaCertificate,
  FaStar,
  FaAward,
  FaCheckCircle,
  FaQuoteLeft,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaStore,
  FaCheck,
  FaSeedling,
  FaShoppingCart
} from "react-icons/fa";
import PageBanner from "@/components/PageBanner";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5 } 
  }
};

// Brand interface
interface Brand {
  name: string;
  category: 'ayurveda' | 'wellness' | 'organic' | 'lifestyle' | 'technology' | 'healthcare';
  description: string;
  logo?: string;
  website?: string;
  association_type: string;
  founded?: string;
  headquarters?: string;
  products?: string[];
  certifications?: string[];
  keyFeatures?: string[];
  phone?: string;
  email?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  partnership_benefits?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

export default function Associated() {  // Associated Brands data
  const brands: Brand[] = [
    {
      name: "Nutriorg",
      category: "organic",
      description: "Premium organic food and wellness brand committed to providing pure, natural products that promote holistic health. As our nutrition and wellness partner, Nutriorg integrates our Ayurvedic assessments to offer personalized nutrition guidance and curated organic products tailored to individual dosha profiles.",
      founded: "2014",
      headquarters: "Rajasthan, India",
      association_type: "Nutrition & Wellness Partner",
      website: "https://nutriorg.com",
      products: [
        "Organic Superfoods",
        "Healthy Drinks",
        "Healthy Breakfast",
        "Cold-Pressed Oils",
        "Organic Spices",
        "Health Supplements",
        "Salts & Sweeteners",
      ],
      certifications: [
        "USDA Organic Certified",
        "India Organic (NPOP)",
        "FSSAI Licensed",
        "GMP Certified"
      ],
      keyFeatures: [
        "Organic & Natural Products",
        "Lab-Tested for Purity",
        "Sustainable & Eco-Friendly Packaging",
        "Direct Farm-to-Table Sourcing",
      ],
      socialMedia: {
        instagram: "https://instagram.com/nutriorgorganic",
        linkedin: "https://linkedin.com/company/nutriorg"
      },
      partnership_benefits: [
        "Personalized nutrition based on Ananta Svastha assessments",
        "Exclusive discounts for Ananta Svastha users",
        "Custom product bundles for different dosha types",
        "Priority access to new organic products",
        "Joint wellness workshops and events",
        "Expert nutritional guidance integration"
      ],
      testimonial: {
        text: "Our partnership with Ananta Svastha has revolutionized how we approach personalized nutrition. The integration of Ayurvedic assessments with our organic products creates a truly holistic wellness experience for our customers.",
        author: "Karan Singh Tomar",
        position: "Co-Founder & CEO, Nutriorg"
      }
    }
  ];

  const getBrandIcon = (category: Brand['category']) => {
    switch (category) {
      case 'ayurveda': return <FaLeaf className="text-[#815C42]" />;
      case 'wellness': return <FaHeart className="text-[#815C42]" />;
      case 'organic': return (
        <div className="relative w-28 h-16">
          <Image 
            src="/nutriorg-logo.png" 
            alt="Nutriorg Logo" 
            fill 
            style={{ objectFit: 'contain' }} 
            className="rounded-none"
          />
        </div>
      );
      case 'lifestyle': return <FaUsers className="text-[#815C42]" />;
      case 'technology': return <FaBrain className="text-[#815C42]" />;
      case 'healthcare': return <FaHospital className="text-[#815C42]" />;
      default: return <FaHandshake className="text-[#815C42]" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] to-[#E8E4DF]">      {/* Page Banner */}
      <PageBanner
        title="Associated Brands"
        subtitle="Trusted brands that integrate our Ayurvedic wisdom and digital assessments into their wellness offerings"
        backgroundColors={{
          primary: '#815C42',
          secondary: '#334036',
          tertiary: '#ABB087'
        }}
      />      {/* Associated Brands Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl border border-[#D7D0C0]/20 shadow-xl overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {/* Brand Header */}
              <div className="bg-[#334036] p-8 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mr-6 shadow-lg">
                      {getBrandIcon(brand.category)}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">{brand.name}</h2>
                      <p className="text-white/90 text-lg mb-1 capitalize">{brand.category} Brand</p>
                      <p className="text-white/80">{brand.association_type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Content */}
              <div className="p-8">
                {/* Description */}
                <div className="mb-8">
                  <p className="text-[#334036]/80 text-lg leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                {/* Brand Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-[#F5F3F0] rounded-2xl">
                    <FaCalendarAlt className="text-[#815C42] text-2xl mx-auto mb-2" />
                    <p className="text-[#334036]/60 text-sm">Founded</p>
                    <p className="text-[#334036] font-semibold">{brand.founded}</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F3F0] rounded-2xl">
                    <FaGlobe className="text-[#815C42] text-2xl mx-auto mb-2" />
                    <p className="text-[#334036]/60 text-sm">Headquarters</p>
                    <p className="text-[#334036] font-semibold">{brand.headquarters}</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F3F0] rounded-2xl">
                    <FaStore className="text-[#815C42] text-2xl mx-auto mb-2" />
                    <p className="text-[#334036]/60 text-sm">Products</p>
                    <p className="text-[#334036] font-semibold">100+ SKUs</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F3F0] rounded-2xl">
                    <FaAward className="text-[#815C42] text-2xl mx-auto mb-2" />
                    <p className="text-[#334036]/60 text-sm">Certifications</p>
                    <p className="text-[#334036] font-semibold">{brand.certifications?.length} Active</p>
                  </div>
                </div>

                {/* Features, Products, and Certifications */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Key Features */}
                  {brand.keyFeatures && (
                    <div>
                      <h3 className="text-xl font-bold text-[#334036] mb-4 flex items-center">
                        <FaCheckCircle className="text-[#815C42] mr-2" />
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {brand.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <FaCheck className="text-[#815C42] mt-1 mr-3 flex-shrink-0" size={12} />
                            <span className="text-[#334036]/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Product Categories */}
                  {brand.products && (
                    <div>
                      <h3 className="text-xl font-bold text-[#334036] mb-4 flex items-center">
                        <FaSeedling className="text-[#815C42] mr-2" />
                        Product Categories
                      </h3>
                      <ul className="space-y-2">
                        {brand.products.map((product, idx) => (
                          <li key={idx} className="flex items-start">
                            <FaShoppingCart className="text-[#815C42] mt-1 mr-3 flex-shrink-0" size={12} />
                            <span className="text-[#334036]/80 text-sm">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Certifications */}
                  {brand.certifications && (
                    <div>
                      <h3 className="text-xl font-bold text-[#334036] mb-4 flex items-center">
                        <FaCertificate className="text-[#815C42] mr-2" />
                        Certifications
                      </h3>
                      <ul className="space-y-2">
                        {brand.certifications.map((cert, idx) => (
                          <li key={idx} className="flex items-start">
                            <FaAward className="text-[#815C42] mt-1 mr-3 flex-shrink-0" size={12} />
                            <span className="text-[#334036]/80 text-sm">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Partnership Benefits */}
                {brand.partnership_benefits && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-[#815C42]/5 to-[#334036]/5 rounded-2xl">
                    <h3 className="text-xl font-bold text-[#334036] mb-4 flex items-center">
                      <FaHandshake className="text-[#815C42] mr-2" />
                      Partnership Benefits for Ananta Svastha Users
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {brand.partnership_benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start">
                          <FaCheck className="text-[#815C42] mt-1 mr-3 flex-shrink-0" />
                          <span className="text-[#334036]/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {brand.testimonial && (
                  <div className="mb-8 p-6 bg-white border-l-4 border-[#815C42] rounded-r-2xl shadow-sm">
                    <FaQuoteLeft className="text-[#815C42] text-2xl mb-4" />
                    <p className="text-[#334036]/80 italic text-lg mb-4 leading-relaxed">
                      "{brand.testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-[#815C42]/10 flex items-center justify-center mr-4">
                        <FaUsers className="text-[#815C42]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#334036]">{brand.testimonial.author}</p>
                        <p className="text-[#334036]/60 text-sm">{brand.testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact and Social Links */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex flex-wrap gap-4">
                    {brand.website && (
                      <Link
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-[#815C42] text-white rounded-full font-semibold hover:bg-[#334036] transition-all duration-200 shadow-lg"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Visit Website
                      </Link>
                    )}
                  </div>

                  {/* Social Media Links */}
                  {brand.socialMedia && (
                    <div className="flex space-x-3">
                      {brand.socialMedia.instagram && (
                        <a
                          href={brand.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#815C42]/10 flex items-center justify-center text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-200"
                        >
                          <FaInstagram />
                        </a>
                      )}
                      {brand.socialMedia.facebook && (
                        <a
                          href={brand.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#815C42]/10 flex items-center justify-center text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-200"
                        >
                          <FaFacebookF />
                        </a>
                      )}
                      {brand.socialMedia.twitter && (
                        <a
                          href={brand.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#815C42]/10 flex items-center justify-center text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-200"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {brand.socialMedia.linkedin && (
                        <a
                          href={brand.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#815C42]/10 flex items-center justify-center text-[#815C42] hover:bg-[#815C42] hover:text-white transition-all duration-200"
                        >
                          <FaLinkedinIn />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#815C42] to-[#334036]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <FaHandshake className="text-white text-2xl" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Partner with Ananta Svastha
            </h3>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Ananta Svastha is seeking partnerships with brands, institutions, and organizations that share our vision for holistic wellness. 
              If you're interested in integrating our Ayurvedic assessments and wellness solutions into your offerings, we'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Contact Ananta Svastha
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}