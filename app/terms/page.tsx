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

export default function Terms() {
  return (
    <main>
      <PageBanner 
        title="Terms & Conditions" 
        subtitle="Please read these terms carefully before using our application"
        backgroundColors={{ primary: '#815C42', secondary: '#334036' }}
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
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By downloading, installing, or using the Ananta Svastha application (&quot;App&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our App.
            </p>
            <p className="text-gray-700 mb-4">
              These Terms and Conditions constitute a legally binding agreement between you and Ananta Svastha regarding your use of the App and any services offered through the App.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">2. Use of the Application</h2>
            <p className="text-gray-700 mb-4">
              Ananta Svastha grants you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial purposes. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Use the App for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Interfere with or disrupt the operation of the App or servers</li>
              <li>Transmit viruses, worms, or any code of a destructive nature</li>
              <li>Copy, modify, distribute, sell, or lease any part of our App</li>
              <li>Reverse engineer or attempt to extract the source code of the App</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">3. Account Registration</h2>
            <p className="text-gray-700 mb-4">
              Some features of the App may require you to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="text-gray-700 mb-4">
              You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">4. Health Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              Ananta Svastha provides Ayurvedic wellness information and recommendations for educational purposes only. The App is not intended to diagnose, treat, cure, or prevent any disease or health condition.
            </p>
            <p className="text-gray-700 mb-4">
              The content provided in the App is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The App and its original content, features, and functionality are owned by Ananta Svastha and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">6. User Content</h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of any content you submit, post, or display on or through the App. By submitting content, you grant Ananta Svastha a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content.
            </p>
            <p className="text-gray-700 mb-4">
              You represent and warrant that you own or have the necessary rights to the content you submit and that the content does not violate the rights of any third party.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">7. Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              Please review our <a href="/privacy" className="text-[#815C42] hover:underline">Privacy Policy</a>, which outlines how we collect, use, and disclose information about you when you use our App. By using the App, you agree to the collection and use of information as described in our Privacy Policy.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">8. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any changes by updating the date at the top of these Terms and, in some cases, provide additional notice (such as adding a statement to our homepage or sending you an email notification).
            </p>
            <p className="text-gray-700 mb-4">
              Your continued use of the App after any such changes constitutes your acceptance of the new Terms. Please review these Terms periodically for changes.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">9. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            <p className="text-gray-700 mb-4">
              Upon termination, your right to use the App will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us at <a href="mailto:contact@anantasvastha.com" className="text-[#815C42] hover:underline">contact@anantasvastha.com</a>.
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
