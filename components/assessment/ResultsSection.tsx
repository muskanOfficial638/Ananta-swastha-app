import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight, FaCheck } from "react-icons/fa";

type DoshaType = "V" | "P" | "K";

interface ResultsSectionProps {
  results: Record<string, number>;
  getDominantDosha: () => DoshaType;
  calculateDoshaPercentage: (doshaType: DoshaType) => number;
  getDoshaInsight: () => string;
  getDietRecommendation: () => string;
  getExerciseRecommendation: () => string;
}

// Dosha properties
const doshaProperties = {
  V: {
    name: "Vata",
    color: "#D7CFC2",
    icon: "/Vata Icon.png",
    description: "Vata is composed of air and space elements. It governs movement and is associated with qualities like dry, light, cold, and mobile."
  },
  P: {
    name: "Pitta",
    color: "#E4B17D",
    icon: "/Pitta Icon.png",
    description: "Pitta is composed of fire and water elements. It governs metabolism and transformation and is associated with qualities like hot, sharp, and intense."
  },
  K: {
    name: "Kapha",
    color: "#ABB087",
    icon: "/kapha icon.png",
    description: "Kapha is composed of earth and water elements. It provides structure and cohesion and is associated with qualities like heavy, slow, cold, and stable."
  }
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  getDominantDosha,
  calculateDoshaPercentage,
  getDoshaInsight,
  getDietRecommendation,
  getExerciseRecommendation
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-[#D7D0C0]/20 p-8 md:p-12"
    >
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#334036] mb-4"
        >
          Your Ayurvedic Constitution
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg text-[#334036]/70"
        >
          Based on your responses, here's your personalized dosha profile
        </motion.p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
        {/* Dominant Dosha Display */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#F7F5EF] to-white flex items-center justify-center shadow-lg border border-[#D7D0C0]/30">
              <Image 
                src={doshaProperties[getDominantDosha()].icon} 
                width={80} 
                height={80} 
                alt={`${doshaProperties[getDominantDosha()].name} Dosha`} 
                priority
                className="object-contain"
              />
            </div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#815C42]/20 to-[#ABB087]/20 -z-10 animate-pulse"></div>
          </div>
          
          <h3 className="text-xl font-medium text-[#334036]/80 mb-2">
            Your Primary Dosha
          </h3>
          <h4 className="text-3xl md:text-4xl font-bold text-[#815C42] mb-4">
            {doshaProperties[getDominantDosha()].name}
          </h4>
          <p className="text-[#334036]/70 leading-relaxed max-w-sm mx-auto">
            {doshaProperties[getDominantDosha()].description}
          </p>
        </motion.div>
        
        {/* Dosha Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-[#F7F5EF]/50 to-white/50 rounded-2xl p-6 border border-[#D7D0C0]/20"
        >
          <h3 className="text-xl font-bold text-[#334036] mb-6 text-center">
            Dosha Distribution
          </h3>
          
          <div className="space-y-6">
            {/* Vata */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Image 
                      src="/Vata Icon.png" 
                      width={20} 
                      height={20} 
                      alt="Vata" 
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-[#334036]">Vata</span>
                </div>
                <span className="font-bold text-[#334036] text-lg">
                  {Math.round(calculateDoshaPercentage("V"))}%
                </span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateDoshaPercentage("V")}%` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#D7CFC2] to-[#C4B99F] rounded-full"
                ></motion.div>
              </div>
            </div>
            
            {/* Pitta */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Image 
                      src="/Pitta Icon.png" 
                      width={20} 
                      height={20} 
                      alt="Pitta" 
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-[#334036]">Pitta</span>
                </div>
                <span className="font-bold text-[#334036] text-lg">
                  {Math.round(calculateDoshaPercentage("P"))}%
                </span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateDoshaPercentage("P")}%` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-[#E4B17D] to-[#D4A574] rounded-full"
                ></motion.div>
              </div>
            </div>
            
            {/* Kapha */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Image 
                      src="/kapha icon.png" 
                      width={20} 
                      height={20} 
                      alt="Kapha" 
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-[#334036]">Kapha</span>
                </div>
                <span className="font-bold text-[#334036] text-lg">
                  {Math.round(calculateDoshaPercentage("K"))}%
                </span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateDoshaPercentage("K")}%` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#ABB087] to-[#9BA077] rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Recommendations Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-8"
      >
        <div className="bg-gradient-to-br from-[#F7F5EF]/70 to-white/70 rounded-2xl p-6 border border-[#D7D0C0]/20">
          <h3 className="text-xl font-bold text-[#334036] mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#815C42] flex items-center justify-center">
              <FaCheck className="text-white text-xs" />
            </div>
            Personal Insights
          </h3>
          <p className="text-[#334036]/80 leading-relaxed">{getDoshaInsight()}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white/70 to-[#F7F5EF]/70 rounded-2xl p-6 border border-[#D7D0C0]/20">
            <h4 className="text-lg font-bold text-[#334036] mb-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ABB087] flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
              Dietary Guidance
            </h4>
            <p className="text-[#334036]/80 text-sm leading-relaxed">{getDietRecommendation()}</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/70 to-[#F7F5EF]/70 rounded-2xl p-6 border border-[#D7D0C0]/20">
            <h4 className="text-lg font-bold text-[#334036] mb-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ABB087] flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
              Exercise Recommendations
            </h4>
            <p className="text-[#334036]/80 text-sm leading-relaxed">{getExerciseRecommendation()}</p>
          </div>
        </div>

        <div className="text-center pt-6">
          <Link 
            href="/doshas" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#815C42] to-[#9A735A] text-white rounded-full font-medium hover:from-[#72513A] hover:to-[#8A6850] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore Dosha Types
            <FaChevronRight className="text-sm" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsSection;
