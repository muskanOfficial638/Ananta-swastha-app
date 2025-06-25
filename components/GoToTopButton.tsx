"use client";

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Go to top"
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#815C42] text-white shadow-lg hover:bg-[#6e4f39] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#815C42]"
        >
          <FaArrowUp size={16} />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
