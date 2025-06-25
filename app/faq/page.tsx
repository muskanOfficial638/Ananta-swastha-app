"use client";

import React, { useState } from "react";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

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

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function FAQ() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "What is Ananta Svastha?",
      answer: "Ananta Svastha is an Ayurvedic wellness app that helps you discover your dosha type and achieve balance through personalized Ayurvedic recommendations. The app combines ancient Ayurvedic wisdom with modern technology to provide you with insights and guidance tailored to your unique constitution.",
      isOpen: false
    },
    {
      question: "What are doshas?",
      answer: "Doshas are the three energies that define your physiological and psychological constitution according to Ayurveda. The three doshas are Vata (air and space), Pitta (fire and water), and Kapha (water and earth). Everyone has all three doshas, but usually one or two are predominant in a person's constitution.",
      isOpen: false
    },
    {
      question: "How accurate is the dosha assessment?",
      answer: "Our dosha assessment is based on traditional Ayurvedic principles and has been developed with experienced Ayurvedic practitioners. While it provides valuable insights into your constitution, it's important to remember that a complete Ayurvedic evaluation typically includes pulse diagnosis and other assessments that can only be performed in person by a qualified practitioner.",
      isOpen: false
    },
    {
      question: "Is the app free to use?",
      answer: "Ananta Svastha offers both free and premium features. The basic dosha assessment and some general recommendations are available for free. Premium features include detailed personalized recommendations, daily routines, meal plans, and more advanced tracking capabilities.",
      isOpen: false
    },
    {
      question: "How do I get started with the app?",
      answer: "To get started, download the Ananta Svastha app from the App Store or Google Play Store. Create an account and complete the dosha assessment questionnaire. Based on your responses, the app will determine your dosha profile and provide appropriate recommendations to help balance your constitution.",
      isOpen: false
    },
    {
      question: "Can I change my responses to the dosha assessment?",
      answer: "Yes, you can retake the dosha assessment at any time. Your body constitution can change over time due to factors like age, diet, lifestyle, and environment, so it's beneficial to reassess periodically.",
      isOpen: false
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we take data security very seriously. All health data is encrypted and stored securely. We do not share your personal information with third parties without your explicit consent. For more details, please refer to our Privacy Policy.",
      isOpen: false
    },
    {
      question: "Can the app help with specific health conditions?",
      answer: "Ananta Svastha provides general wellness recommendations based on Ayurvedic principles. While these recommendations may support overall health, the app is not designed to diagnose, treat, cure, or prevent any disease. If you have specific health concerns, we recommend consulting with a qualified healthcare professional.",
      isOpen: false
    },
    {
      question: "How often should I follow the recommendations?",
      answer: "For best results, try to incorporate the recommendations into your daily routine consistently. Ayurveda emphasizes the importance of regular habits and routines for maintaining balance. However, start at your own pace and gradually integrate more practices as they become comfortable.",
      isOpen: false
    },
    {
      question: "Can I use Ananta Svastha alongside other health apps or treatments?",
      answer: "Yes, Ananta Svastha can complement other wellness approaches. However, if you are undergoing medical treatment, we recommend consulting with your healthcare provider before implementing any new health regimen.",
      isOpen: false
    },
  ]);

  const toggleFAQ = (index: number) => {
    setFaqItems(faqItems.map((item, i) => {
      if (i === index) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    }));
  };

  return (
    <main>
      <PageBanner 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about Ananta Svastha"
        backgroundColors={{ primary: '#815C42', secondary: '#ABB087' }}
      />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-gray-700 text-lg text-center mb-12"
          >
            Can&apos;t find the answer you&apos;re looking for? Contact our support team through our{" "}
            <a href="/contact" className="text-[#815C42] hover:underline">Contact page</a>.
          </motion.p>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="space-y-4"
          >
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-[#334036]">{faq.question}</h3>
                  <span className="text-[#815C42] ml-4">
                    {faq.isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                  </span>
                </button>
                
                <div 
                  className={`bg-white px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    faq.isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Additional Support Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#334036]">Need More Help?</h2>
            <p className="text-gray-600 mt-2">We&apos;re here to support your Ayurvedic wellness journey</p>
          </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-[#ABB087] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Knowledge Base</h3>
              <p className="text-gray-700 mb-6">
                Explore our comprehensive library of articles on Ayurvedic principles, doshas, and wellness practices.
              </p>
              <a href="/blog" className="inline-flex items-center text-[#815C42] hover:underline">
                Visit Knowledge Base
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-[#815C42] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#334036] mb-4">Contact Support</h3>
              <p className="text-gray-700 mb-6">
                Our support team is ready to assist you with any questions or technical issues you may encounter.
              </p>
              <a href="/contact" className="inline-flex items-center text-[#815C42] hover:underline">
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
