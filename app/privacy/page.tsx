"use client";

import React from "react";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

export default function Privacy() {
  return (
    <main>
      <PageBanner 
        title="Privacy Policy" 
        subtitle="How we collect, use, and protect your personal information"
        backgroundColors={{ primary: '#334036', secondary: '#815C42' }}
      />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          className="prose prose-lg max-w-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              At Ananta Svastha, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
            </p>
            <p className="text-gray-700 mb-4">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our App.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect several types of information from and about users of our App, including:
            </p>
            
            <h3 className="text-xl font-semibold text-[#334036] mb-2">2.1 Personal Data</h3>
            <p className="text-gray-700 mb-4">
              When you register for an account or use certain features of our App, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Profile picture</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#334036] mb-2">2.2 Health Data</h3>
            <p className="text-gray-700 mb-4">
              To provide personalized Ayurvedic insights, our App may collect health-related information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Physical characteristics and attributes</li>
              <li>Lifestyle habits</li>
              <li>Dietary preferences</li>
              <li>Sleep patterns</li>
              <li>Health goals</li>
              <li>Responses to dosha assessment questions</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This health data is used exclusively to determine your dosha profile and provide personalized recommendations. We treat this information with the utmost confidentiality.
            </p>

            <h3 className="text-xl font-semibold text-[#334036] mb-2">2.3 Usage Data</h3>
            <p className="text-gray-700 mb-4">
              We automatically collect certain information about how you interact with our App, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Device information (device type, operating system)</li>
              <li>Log data (time and duration of use)</li>
              <li>App features you use</li>
              <li>App performance data</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>To provide and maintain our App</li>
              <li>To personalize your experience and deliver tailored Ayurvedic recommendations</li>
              <li>To improve our App based on how you use it</li>
              <li>To communicate with you, including sending notifications about updates or changes</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>For research and analytics to better understand our user base</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
            </p>
            <p className="text-gray-700 mb-4">
              We strive to use commercially acceptable means to protect your personal information, but we cannot guarantee its absolute security.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>With service providers who assist us in operating our App</li>
              <li>When required by law or to protect our rights</li>
              <li>With your consent or at your direction</li>
              <li>In the event of a merger, acquisition, or sale of all or a portion of our assets</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">6. Your Data Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>The right to access the personal information we have about you</li>
              <li>The right to correct inaccurate or incomplete information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to our processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise any of these rights, please contact us at <a href="mailto:privacy@anantasvastha.com" className="text-[#815C42] hover:underline">privacy@anantasvastha.com</a>.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">7. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us so that we can take necessary actions.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            <p className="text-gray-700 mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">9. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 mb-4">
              <a href="mailto:privacy@anantasvastha.com" className="text-[#815C42] hover:underline">privacy@anantasvastha.com</a>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Last updated: May 17, 2025
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
