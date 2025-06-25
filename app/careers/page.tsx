"use client";

import React, { useState } from "react";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6 } 
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
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

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
}

export default function Careers() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Empty job postings array - no current openings
  const jobPostings: JobPosting[] = [];

  const toggleJobDetails = (jobId: string) => {
    if (selectedJobId === jobId) {
      setSelectedJobId(null);
    } else {
      setSelectedJobId(jobId);
    }
  };

  return (
    <main>
      <PageBanner 
        title="Careers at Ananta Svastha" 
        subtitle="Join our mission to bring Ayurvedic wellness to the world"
        backgroundColors={{ primary: '#815C42', secondary: '#ABB087' }}
      />
      
      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex items-center gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <h2 className="text-3xl font-semibold text-[#334036] mb-6">Join Our Growing Team</h2>
              <p className="text-gray-700 text-lg mb-6">
                At Ananta Svastha, we&apos;re on a mission to make the timeless wisdom of Ayurveda accessible in our modern world. We believe in creating technology that empowers people to understand their unique constitution and achieve balance in their lives.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Our diverse team brings together expertise in Ayurveda, technology, design, and wellness. We&apos;re looking for passionate individuals who share our vision and want to contribute to building a product that genuinely improves people&apos;s lives.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link 
                  href="#open-positions" 
                  className="bg-[#815C42] text-white py-3 px-6 rounded-md hover:bg-[#6e4f39] transition-colors"
                >
                  Open Positions
                </Link>
                <Link 
                  href="#hiring-process" 
                  className="border border-[#815C42] text-[#815C42] py-3 px-6 rounded-md hover:bg-[#f8f5f2] transition-colors"
                >
                  Hiring Process
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="lg:w-1/2"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Team collaboration" 
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section id="our-values" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#334036] mb-4">Our Values</h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Guided by Ayurvedic principles, our company culture embodies balance, mindfulness, and holistic growth
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Authenticity (Satya)</h3>
              <p className="text-gray-700">
                We honor the ancient wisdom of Ayurveda while making it relevant for today's world. We communicate transparently and strive to be authentic in all our interactions.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Balance (Sama)</h3>
              <p className="text-gray-700">
                Just as Ayurveda seeks equilibrium in health, we cultivate balance in our work environment. We encourage sustainable work practices and respect personal boundaries.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Mindfulness (Dhyana)</h3>
              <p className="text-gray-700">
                We approach our work with focus and intention. We consider the impact of our decisions and strive to create technology that genuinely serves our users' wellbeing.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Innovation (Nava)</h3>
              <p className="text-gray-700">
                While honoring tradition, we embrace creativity and innovation. We're building something new at the intersection of ancient wisdom and modern technology.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Community (Sangha)</h3>
              <p className="text-gray-700">
                We value the power of community both within our team and among our users. We support each other's growth and foster a culture of collaboration and mutual respect.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Continuous Growth (Vriddhi)</h3>
              <p className="text-gray-700">
                We embrace lifelong learning and personal development. Just as Ayurveda adapts to individual needs, we support each team member's unique path of professional growth.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Hiring Process */}
      <section id="hiring-process" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#334036] mb-4">Our Hiring Process</h2>
            <p className="text-gray-700 text-lg">
              We aim to make our hiring process transparent, respectful, and efficient
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="relative"
          >
            {/* Process timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#815C42] opacity-30"></div>
            
            {/* Step 1 */}
            <motion.div variants={fadeIn} className="relative mb-12">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                  <div className="md:text-right">
                    <h3 className="text-xl font-semibold text-[#334036] mb-2">Application Review</h3>
                    <p className="text-gray-700">
                      We carefully review each application to understand your skills, experience, and how you might contribute to our team. This typically takes 1-2 weeks.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#815C42] text-white items-center justify-center">
                  1
                </div>
                <div className="md:w-1/2 md:pl-12 md:invisible">
                  <h3 className="text-xl font-semibold text-[#334036] mb-2">Placeholder</h3>
                  <p className="text-gray-700">Placeholder</p>
                </div>
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div variants={fadeIn} className="relative mb-12">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:invisible mb-6 md:mb-0">
                  <div className="md:text-right">
                    <h3 className="text-xl font-semibold text-[#334036] mb-2">Placeholder</h3>
                    <p className="text-gray-700">Placeholder</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#815C42] text-white items-center justify-center">
                  2
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-xl font-semibold text-[#334036] mb-2">Initial Conversation</h3>
                  <p className="text-gray-700">
                    If your profile aligns with our needs, we&apos;ll schedule a 30-45 minute video call to discuss your experience, interest in Ananta Svastha, and answer any questions you have.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div variants={fadeIn} className="relative mb-12">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                  <div className="md:text-right">
                    <h3 className="text-xl font-semibold text-[#334036] mb-2">Skills Assessment</h3>
                    <p className="text-gray-700">
                      Depending on the role, we may ask you to complete a small project or task that demonstrates your skills. We design these to be relevant to the work you&apos;d be doing and respectful of your time.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#815C42] text-white items-center justify-center">
                  3
                </div>
                <div className="md:w-1/2 md:pl-12 md:invisible">
                  <h3 className="text-xl font-semibold text-[#334036] mb-2">Placeholder</h3>
                  <p className="text-gray-700">Placeholder</p>
                </div>
              </div>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div variants={fadeIn} className="relative mb-12">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:invisible mb-6 md:mb-0">
                  <div className="md:text-right">
                    <h3 className="text-xl font-semibold text-[#334036] mb-2">Placeholder</h3>
                    <p className="text-gray-700">Placeholder</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#815C42] text-white items-center justify-center">
                  4
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-xl font-semibold text-[#334036] mb-2">Team Interviews</h3>
                  <p className="text-gray-700">
                    You&apos;ll meet with several team members to discuss your expertise, approach to problem-solving, and how you&apos;d collaborate with the team. We value both technical skills and cultural alignment.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Step 5 */}
            <motion.div variants={fadeIn} className="relative">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                  <div className="md:text-right">
                    <h3 className="text-xl font-semibold text-[#334036] mb-2">Decision & Offer</h3>
                    <p className="text-gray-700">
                      After the interviews, we make decisions quickly. If we determine you&apos;re a good fit, we&apos;ll extend an offer with details about compensation, benefits, and start date. We&apos;re always available to discuss any questions about the offer.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#815C42] text-white items-center justify-center">
                  5
                </div>
                <div className="md:w-1/2 md:pl-12 md:invisible">
                  <h3 className="text-xl font-semibold text-[#334036] mb-2">Placeholder</h3>
                  <p className="text-gray-700">Placeholder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Open Positions */}
      <section id="open-positions" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#334036] mb-4">Current Opportunities</h2>
            <p className="text-gray-700 text-lg">
              Check back regularly for new openings as we continue to grow
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-lg shadow-md mb-12 overflow-hidden"
          >
            <div className="p-6 bg-[#815C42] text-white">
              <h3 className="text-xl font-semibold mb-2">Internship Opportunities</h3>
              <p>We are currently hiring interns for the following roles</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#334036] mb-4">Available Internship Roles:</h4>
                <ul className="space-y-3 list-disc pl-5 text-gray-700">
                  <li><span className="font-medium">Social Media Management:</span> Create and schedule content, analyze performance metrics, engage with followers, and help grow our online presence.</li>
                  <li><span className="font-medium">Content Writing:</span> Develop informative articles, blog posts, and educational materials about Ayurveda, wellness, and holistic health practices.</li>
                  <li><span className="font-medium">Research:</span> Conduct research on Ayurvedic practices, market trends, and user needs to inform our product development.</li>
                  <li><span className="font-medium">Client Interaction:</span> Assist with customer support, gather feedback, and help ensure a positive experience for our users.</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#F7F5EF] p-4 rounded-md">
                  <h4 className="text-md font-medium text-[#334036] mb-2">Location</h4>
                  <p className="text-gray-700">Jhotwara, Jaipur</p>
                </div>
                
                <div className="bg-[#F7F5EF] p-4 rounded-md">
                  <h4 className="text-md font-medium text-[#334036] mb-2">Duration</h4>
                  <p className="text-gray-700">3 months paid internship</p>
                </div>
              </div>
              
              <div className="bg-[#F7F5EF] p-4 rounded-md mb-6">
                <h4 className="text-md font-medium text-[#334036] mb-2">Growth Opportunity</h4>
                <p className="text-gray-700">Potential for full-time employment based on performance</p>
              </div>
              
              <div className="text-center mt-8">
                <a 
                  href="mailto:info@anantasvastha.com?subject=Internship Application"
                  className="bg-[#815C42] text-white py-3 px-6 rounded-md hover:bg-[#6e4f39] transition-colors inline-block"
                >
                  Apply for Internship
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 p-8 bg-[#334036] rounded-lg text-center text-white"
          >
            <h3 className="text-xl font-semibold mb-4">Interested in future opportunities?</h3>
            <p className="mb-6">
              We&apos;re always interested in connecting with talented individuals who are passionate about Ayurveda and technology. Send us your resume and tell us how you&apos;d like to contribute.
            </p>
            <a 
              href="mailto:info@anantasvastha.com?subject=Open Application"
              className="bg-white text-[#334036] py-3 px-6 rounded-md hover:bg-gray-100 transition-colors inline-block"
            >
              Submit Open Application
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
