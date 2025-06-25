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

export default function CookiePolicy() {
  return (
    <main>
      <PageBanner 
        title="Cookie Policy" 
        subtitle="How we use cookies and similar technologies"
        backgroundColors={{ primary: '#ABB087', secondary: '#334036' }}
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
              This Cookie Policy explains how Ananta Svastha (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies when you visit our website or use our mobile application. This policy is designed to help you understand what cookies are, how we use them, and the choices you have regarding their use.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">2. What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website or use an app. They are widely used to make websites and applications work more efficiently and provide information to the owners of the site or app.
            </p>
            <p className="text-gray-700 mb-4">
              Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">3. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies for several purposes, including:
            </p>
            
            <h3 className="text-xl font-semibold text-[#334036] mb-2">3.1 Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the functioning of our website and app. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
            </p>

            <h3 className="text-xl font-semibold text-[#334036] mb-2">3.2 Performance and Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us understand how visitors interact with our website and app by collecting and reporting information anonymously. They help us improve the performance and user experience of our services.
            </p>

            <h3 className="text-xl font-semibold text-[#334036] mb-2">3.3 Functionality Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>

            <h3 className="text-xl font-semibold text-[#334036] mb-2">3.4 Targeting and Advertising Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are used to deliver relevant advertisements to you based on your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">4. Mobile Application Technologies</h2>
            <p className="text-gray-700 mb-4">
              In our mobile application, we use technologies similar to cookies, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><span className="font-semibold">Local Storage:</span> We use local storage to store certain preferences and data locally on your device.</li>
              <li><span className="font-semibold">Mobile Analytics:</span> We use mobile analytics software to allow us to better understand the functionality of our mobile app on your device.</li>
              <li><span className="font-semibold">SDKs:</span> We use software development kits (SDKs) to provide additional functions in our app and analyze how you use the app.</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">5. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              Some cookies may be set by third parties when you use our website or app. These third parties may collect information about your online activities over time and across different websites or online services. We do not control these third-party cookies and recommend reviewing the privacy policies of these third parties for more information.
            </p>
            <p className="text-gray-700 mb-4">
              Third parties that may set cookies through our services include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Analytics providers (e.g., Google Analytics)</li>
              <li>Social media platforms (e.g., Facebook, Twitter)</li>
              <li>Advertising networks</li>
              <li>Feature functionality providers</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">6. Your Cookie Choices</h2>
            <p className="text-gray-700 mb-4">
              You have several options for managing your cookie preferences:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><span className="font-semibold">Browser Settings:</span> Most web browsers allow you to control cookies through their settings. You can usually find these settings in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser.</li>
              <li><span className="font-semibold">Cookie Consent Tool:</span> When you first visit our website, you will be presented with a cookie banner that allows you to accept or reject non-essential cookies.</li>
              <li><span className="font-semibold">Mobile Device Settings:</span> You can manage app data through your mobile device settings, including the ability to reset your device advertising identifier or opt-out of personalized ads.</li>
              <li><span className="font-semibold">Third-Party Opt-Outs:</span> Many third-party advertising networks allow you to opt out of targeted advertising. You can learn more at <a href="http://www.aboutads.info/choices/" className="text-[#815C42] hover:underline" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.eu/" className="text-[#815C42] hover:underline" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.eu/</a>.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Please note that blocking all cookies may impact your experience on our website or app, as some features may not function properly.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">7. Updates to This Cookie Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#334036] mb-4">8. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us at:
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
