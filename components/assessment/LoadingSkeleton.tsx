import React from "react";
import { motion } from "framer-motion";

const LoadingSkeleton = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-[#D7D0C0]/20 p-6 md:p-10 animate-pulse">
      {/* Progress bar skeleton */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
      </div>

      {/* Question header skeleton */}
      <div className="text-center mb-10">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        
        {/* Banner image skeleton */}
        <div className="mt-6 h-48 md:h-64 bg-gray-200 rounded-2xl"></div>
      </div>
      
      {/* Options grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="h-20 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
      
      {/* Navigation skeleton */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#D7D0C0]/30">
        <div className="h-12 bg-gray-200 rounded-full w-28"></div>
        <div className="h-12 bg-gray-200 rounded-full w-28"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
