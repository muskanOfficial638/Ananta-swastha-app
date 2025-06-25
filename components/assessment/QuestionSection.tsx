import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type DoshaType = "V" | "P" | "K";

type Option = {
  id: string;
  text: string;
  type: DoshaType | DoshaType[];
  image?: string;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
  bannerImage?: string;
};

interface QuestionSectionProps {
  currentQuestionIndex: number;
  questions: Question[];
  selectedOptions: Option[];
  questionsWithBanner: number[];
  questionsWithImages: number[];
  multiSelectQuestions: number[];
  handleOptionSelect: (option: Option) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  fadeInUp: any;
  staggerChildren: any;
}

// Optimized animations with shorter durations
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05  // Reduced stagger delay
    } 
  }
};

const QuestionSection: React.FC<QuestionSectionProps> = ({
  currentQuestionIndex,
  questions,
  selectedOptions,
  questionsWithBanner,
  questionsWithImages,
  multiSelectQuestions,
  handleOptionSelect,
  handleNext,
  handlePrevious
}) => {
  // Progress calculation
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-[#D7D0C0]/20 p-6 md:p-10"
    >
      {/* Enhanced Progress Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex justify-between items-center text-sm text-[#334036]/70 mb-4">
          <span className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="font-medium bg-[#F7F5EF] px-3 py-1 rounded-full">
            {progressPercentage}% Complete
          </span>
        </div>
        <div className="relative h-3 bg-[#F7F5EF] rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#815C42] via-[#9A735A] to-[#ABB087] rounded-full shadow-sm"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
        </div>
      </motion.div>

      {/* Question Section */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          {/* Question Header */}
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-[#334036] mb-4 leading-tight"
            >
              {questions[currentQuestionIndex].text}
            </motion.h2>

            {/* Multi-select hint */}
            {multiSelectQuestions.includes(questions[currentQuestionIndex].id) && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-sm text-[#334036]/60 bg-[#F7F5EF]/50 px-4 py-2 rounded-full inline-block border border-[#D7D0C0]/30"
              >
                {questions[currentQuestionIndex].id === 8 
                  ? "Select all that apply or choose \"None\" if none apply" 
                  : "Select all options that apply to you"}
              </motion.p>
            )}
            
            {/* Banner Image */}
            {questionsWithBanner.includes(questions[currentQuestionIndex].id) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg border border-[#D7D0C0]/20"
              >
                <Image
                  src={questions[currentQuestionIndex].bannerImage!}
                  alt={questions[currentQuestionIndex].text}
                  fill
                  loading="eager"
                  priority={currentQuestionIndex < 5}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            )}
          </div>
          
          {/* Options Grid */}
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className={`grid gap-4 ${
              questions[currentQuestionIndex].id === 10
                ? "grid-cols-2 sm:grid-cols-3"
                : questions[currentQuestionIndex].id === 5
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : questions[currentQuestionIndex].options.length > 4 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                    : questions[currentQuestionIndex].options.length > 2
                      ? "grid-cols-1 sm:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {questions[currentQuestionIndex].options.map((option, index) => {
              const isSelected = multiSelectQuestions.includes(questions[currentQuestionIndex].id)
                ? selectedOptions.some(o => o.id === option.id)
                : selectedOptions.length === 1 && selectedOptions[0].id === option.id;
                  
              const isNoneOption = questions[currentQuestionIndex].id === 8 && option.text === "None";
              
              return (
                <motion.div
                  key={option.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 transform border-2 ${
                    isSelected 
                      ? isNoneOption
                        ? "border-[#0a7940] bg-gradient-to-br from-[#0a7940]/10 to-[#0a7940]/5 shadow-lg" 
                        : "border-[#815C42] bg-gradient-to-br from-[#F7F5EF] to-white shadow-lg"
                      : isNoneOption
                        ? "border-dashed border-[#D7D0C0] hover:border-[#ABB087] hover:bg-gradient-to-br hover:from-[#F7F5EF]/30 hover:to-white/30" 
                        : "border-[#D7D0C0]/50 hover:border-[#815C42]/50 hover:bg-gradient-to-br hover:from-[#F7F5EF]/30 hover:to-white/30 hover:shadow-md"
                  } ${
                    isNoneOption ? "col-span-full mt-4" : ""
                  }`}
                >
                  {/* Option with Image */}
                  {questionsWithImages.includes(questions[currentQuestionIndex].id) && option.image && (
                    <div className={`
                      relative overflow-hidden rounded-xl mb-4 
                      ${questions[currentQuestionIndex].id === 5 || questions[currentQuestionIndex].id === 8
                        ? "h-28 w-full" 
                        : "h-36 w-full"}
                    `}>
                      <Image
                        src={option.image}
                        alt={option.text}
                        fill
                        loading={index < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className={`
                          object-cover transition-all duration-200
                          ${isSelected ? "brightness-110 scale-105" : "brightness-95"} 
                        `}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#815C42] rounded-full p-2 shadow-lg">
                          <FaCheck className="text-white text-sm" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Option Content */}
                  <div className="flex items-center">
                    {(!questionsWithImages.includes(questions[currentQuestionIndex].id) || !option.image) && (
                      <div className={`w-6 h-6 flex-shrink-0 border-2 rounded-full mr-4 transition-all duration-300 ${
                        isSelected 
                          ? "border-[#815C42] bg-[#815C42] shadow-sm" 
                          : "border-[#D7D0C0]"
                      }`}>
                        {isSelected && (
                          <FaCheck className="text-white text-xs m-auto mt-0.5" />
                        )}
                      </div>
                    )}
                    <span className={`transition-all duration-300 ${
                      isSelected ? "font-semibold text-[#334036]" : "text-[#334036]/80"
                    } ${
                      questionsWithImages.includes(questions[currentQuestionIndex].id) && option.image
                        ? "text-center w-full font-medium" 
                        : ""
                    }`}>
                      {option.text}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Enhanced Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex justify-between items-center mt-12 pt-8 border-t border-[#D7D0C0]/30"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#F7F5EF] to-white text-[#334036] rounded-full font-medium hover:from-[#EAE5D9] hover:to-[#F7F5EF] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-md border border-[#D7D0C0]/30"
        >
          <FaChevronLeft className="text-sm" /> 
          Previous
        </motion.button>
        
        {multiSelectQuestions.includes(questions[currentQuestionIndex].id) ? (
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#334036] to-[#2a332d] text-white rounded-full font-medium hover:from-[#2a332d] hover:to-[#1f261f] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          >
            Continue 
            <FaChevronRight className="text-sm" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#815C42] to-[#9A735A] text-white rounded-full font-medium hover:from-[#72513A] hover:to-[#8A6850] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          >
            {currentQuestionIndex === questions.length - 1 ? "Get Results" : "Next"}
            {currentQuestionIndex !== questions.length - 1 && <FaChevronRight className="text-sm" />}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionSection;
