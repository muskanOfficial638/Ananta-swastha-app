"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaCheck, FaSpinner, FaStar } from "react-icons/fa";
import { assessmentService } from "@/services/assessment";
import dynamic from "next/dynamic";

// Dynamic import of results section for code splitting
const ResultsSection = dynamic(() => import('@/components/assessment/ResultsSection'), {
  loading: () => <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-2xl text-[#815C42]" /></div>,
  ssr: false
});

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

// Define multi-select questions explicitly by ID
const multiSelectQuestions = [5, 8, 10];

// Questions with images 
const questionsWithImages = [1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 18, 19];

// Define questions that should display a banner image
const questionsWithBanner = [7, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

// Types
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

// Questions Array - defined outside the component to avoid initialization issues
const questions: Question[] = [
    {
      id: 1,
      text: "Body frame?",
      options: [
        { id: "1a", text: "Thin/narrow", type: "V", image: "/images/Thin.jpg" },
        { id: "1b", text: "Medium", type: "P", image: "/images/medium.jpg" },
        { id: "1c", text: "Broad", type: "K", image: "/images/broad.jpg" },
      ],
    },
    {
      id: 2,
      text: "Forehead length?",
      options: [
        { id: "2a", text: "Long & Broad", type: "K", image: "/images/forehead-broad.jpg" },
        { id: "2b", text: "Medium", type: "P", image: "/images/forehead-medium.jpg" },
        { id: "2c", text: "Short", type: "V", image: "/images/forehead-short.jpg" },
      ],
    },
    {
      id: 3,
      text: "Lips Size?",
      options: [
        { id: "3a", text: "Thin", type: "V", image: "/images/lips-thin.jpg" },
        { id: "3b", text: "Medium", type: "P", image: "/images/lips-medium.jpg" },
        { id: "3c", text: "Broad", type: "K", image: "/images/lips-broad.jpg" },
      ],
    },
    {
      id: 4,
      text: "Nails Size?",
      options: [
        { id: "4a", text: "Small", type: "V", image: "/images/nails-small.jpg" },
        { id: "4b", text: "Medium", type: "P", image: "/images/nails-medium.jpg" },
        { id: "4c", text: "Large", type: "K", image: "/images/nails-large.jpg" },
      ]
    },
    {
      id: 5,
      text: "Skin Appearance",
      options: [
        { id: "5a", text: "Cracked", type: "V", image: "/images/cracked.jpg" },
        { id: "5b", text: "Lustrous", type: "K", image: "/images/Lustrous.jpg" },
        { id: "5c", text: "Pimples", type: "P", image: "/images/Pimples.jpg" },
        { id: "5d", text: "Moles", type: "P", image: "/images/Moles.jpg" },
        { id: "5e", text: "Freckles", type: "P", image: "/images/Freckles.jpg" },
        { id: "5f", text: "Wrinkles", type: "V", image: "/images/Wrinkles.jpg" },
        { id: "5g", text: "Prominent veins", type: "V", image: "/images/Veins.jpg" },
        { id: "5h", text: "Clear skin", type: "K", image: "/images/Clear Skin.jpg" },
      ]
    },
    {
      id: 6,
      text: "Skin colour",
      options: [
        { id: "6a", text: "Dark & Dusky complexion", type: "V", image: "/images/Dark &amp; Dusky complexion.jpg" },
        { id: "6b", text: "Fair complexion with reddish tint", type: "P", image: "/images/Fair complexion with reddish tint.jpg" },
        { id: "6c", text: "Fair complexion with Yellowish tint", type: "P", image: "/images/Fair complexion with Yellowish tint.jpg" },
        { id: "6d", text: "Fair complexion with Pink tint", type: "K", image: "/images/Fair complexion with Pink tint.jpg" },
      ]
    },
    {
      id: 7,
      text: "Nature of Hair",
      bannerImage: "/banners/Nature of Hair Banner.jpg",
      options: [
        { id: "7a", text: "Rough, dry, less", type: "V" },
        { id: "7b", text: "Scanty, grey, Balding", type: "P" },
        { id: "7c", text: "Thick, strong, and healthy", type: "K" },
      ]
    },
    {
      id: 8,
      text: "Hairs prone to",
      options: [
        { id: "8a", text: "Greying", type: "P", image: "/images/Greying.jpg" }, 
        { id: "8b", text: "Split ends", type: "V", image: "/images/Split ends.jpg" }, 
        { id: "8c", text: "Hair fall", type: "V", image: "/images/Hair Fall.jpg" },
        { id: "8d", text: "Breaking", type: "V", image: "/images/Breaking.jpg" },
        { id: "8e", text: "None", type: "K"},
      ]
    },
    {
      id: 9,
      text: "Frequency of appetite",
      options: [
        { id: "9a", text: "Scanty & Variable", type: "V", image: "/images/Scanty & Variable.jpg" },
        { id: "9b", text: "Strong & Sharp", type: "P", image: "/images/Strong & Sharp.jpg" },
        { id: "9c", text: "Constant & Less", type: "K", image: "/images/Constant & Less.jpg" },
      ]
    },
    {
      id: 10,
      text: "Preference of taste in food",
      bannerImage: "/banners/Preference of taste in food Banner.jpg",
      options: [
        { id: "10a", text: "Sweet", type: ["V", "P"] },
        { id: "10b", text: "Sour", type: "V"},
        { id: "10c", text: "Salty", type: "V" },
        { id: "10d", text: "Bitter", type: "K"},
        { id: "10e", text: "Astringent", type: ["P", "K"]},
        { id: "10f", text: "Pungent", type: ["P", "K"]},
      ]
    },
    {
      id: 11,
      text: "Teeth Size",
      options: [
        { id: "11a", text: "Large", type: "K", image: "/images/teeth-large.jpg" },
        { id: "11b", text: "Medium", type: "P", image: "/banners/teeth-normal.png" },
        { id: "11c", text: "Too Small", type: "V", image: "/banners/teeth-small.jpg" },
      ]
    },
    {
      id: 12,
      text: "Body weight",
      options: [
        { id: "12a", text: "Low body wt.", type: "V", image: "/images/Low body wt.jpg" },
        { id: "12b", text: "Medium body wt.", type: "P", image: "/images/Medium body wt.jpg" },
        { id: "12c", text: "Excess body wt.", type: "K", image: "/images/Excess body wt.jpg" },
      ]
    },
    {
      id: 13,
      text: "Changes in Body Wt.",
      bannerImage: "/banners/Changes in Body Wt. banner.jpg",
      options: [
        { id: "13a", text: "Gain and loose easily", type: "V" },
        { id: "13b", text: "Difficulty in wt. gain", type: "P" },
        { id: "13c", text: "Gain easily but loose with difficulty", type: "K" },
      ]
    },
    {
      id: 14,
      text: "Sleep Quality",
      bannerImage: "/banners/Sleep Quality Banner.jpg",
      options: [
        { id: "14a", text: "Shallow and easily disturbed (Approx.less than 6 hrs)", type: "V" },
        { id: "14b", text: "Moderate (Approx. 6-8 hrs)", type: "P" },
        { id: "14c", text: "Heavy and sleepy (Approx.more than 8 hrs)", type: "K" },
      ]
    },
    {
      id: 15,
      text: "Body temperature",
      bannerImage: "/banners/Body temperature Banner.jpg",
      options: [
        { id: "15a", text: "Feel colder than other people", type: "V" },
        { id: "15b", text: "Feel warmer than other people", type: "P" },
        { id: "15c", text: "Feel comfortable, neither too warm or too cold", type: "K" },
      ]
    },
    {
      id: 16,
      text: "Body perspiration",
      bannerImage: "/banners/Body perspiration.jpg",
      options: [
        { id: "16a", text: "Not specific", type: "V" },
        { id: "16b", text: "Profuse, bad smell", type: "P" },
        { id: "16c", text: "Constant less", type: "K" },
      ]
    },
    {
      id: 17,
      text: "Bowel movements",
      bannerImage: "/banners/Bowel movements Banner.jpg",
      options: [
        { id: "17a", text: "Hard, scanty & dry stool, usually feeling constipated", type: "V" },
        { id: "17b", text: "Yellowish, loose/ soft & semisolid stools with sometimes loose motions", type: "P" },
        { id: "17c", text: "Heavy, sticky and formed stools", type: "K" },
      ]
    },
    {
      id: 18,
      text: "Physical activity",
      options: [
        { id: "18a", text: "Very active", type: "V", image: "/images/Very Active.jpg" },
        { id: "18b", text: "Moderate as per need", type: "P", image: "/images/Moderate as per need.jpg" },
        { id: "18c", text: "Less active", type: "K", image: "/images/Less active.jpg" },
      ]
    },
    {
      id: 19,
      text: "Physical exertion",
      options: [
        { id: "19a", text: "Poor endurance", type: "V", image: "/images/Poor endurance.jpg" },
        { id: "19b", text: "Medium", type: "P", image: "/images/Medium endurance.jpg" },
        { id: "19c", text: "Good endurance", type: "K", image: "/images/Good endurance.jpg" },
      ]
    },
    {
      id: 20,
      text: "Mental strength",
      bannerImage: "/banners/Mental strength banner.jpg",
      options: [
        { id: "20a", text: "Get stressed easily", type: "V" },
        { id: "20b", text: "Stressed easily but overcome on its own", type: "P" },
        { id: "20c", text: "Get stressed with difficulty and can overcome on its own", type: "K" },
      ]
    },
    {
      id: 21,
      text: "Disease resistance",
      bannerImage: "/banners/Disease resistance banner.jpg",
      options: [
        { id: "21a", text: "Falling ill easily and frequently", type: "V" },
        { id: "21b", text: "Falling ill occasionally and moderately", type: "P" },
        { id: "21c", text: "Falling ill rarely", type: "K" },
      ]
    },
    {
      id: 22,
      text: "Speech & Voice",
      bannerImage: "/banners/Speech & Voice Banner.jpg",
      options: [
        { id: "22a", text: "Quick, talkative & Speech is not clear", type: "V" },
        { id: "22b", text: "Argumentative with good convincing power", type: "P" },
        { id: "22c", text: "Slow, not talkative, authoritative and firm", type: "K" },
      ]
    },
    {
      id: 23,
      text: "Movements at rest- Hand movements",
      bannerImage: "/banners/Movements at rest- Hand movements banner.jpg",
      options: [
        { id: "23a", text: "High", type: "V" },
        { id: "23b", text: "Moderate", type: "P" },
        { id: "23c", text: "Less", type: "K" },
      ]
    },
    {
      id: 24,
      text: "Movements at rest- legs movements",
      bannerImage: "/banners/Movements at rest- legs movements Banner.jpg",
      options: [
        { id: "24a", text: "High", type: "V" },
        { id: "24b", text: "Moderate", type: "P" },
        { id: "24c", text: "Less", type: "K" },
      ]
    },
    {
      id: 25,
      text: "Walking speed",
      bannerImage: "/banners/Walking speed Banner.jpg",
      options: [
        { id: "25a", text: "Quick/fast/brisk walking", type: "V" },
        { id: "25b", text: "Medium", type: "P" },
        { id: "25c", text: "Slow", type: "K" },
      ]
    },
    {
      id: 26,
      text: "Memory power",
      bannerImage: "/banners/Memory power Banner.jpg",
      options: [
        { id: "26a", text: "Poor", type: "V" },
        { id: "26b", text: "Medium", type: "P" },
        { id: "26c", text: "Good", type: "K" },
      ]
    },
    {
      id: 27,
      text: "Receptive memory",
      bannerImage: "/banners/Receptive memory Banner.jpg",
      options: [
        { id: "27a", text: "Short term", type: "V" },
        { id: "27b", text: "Average", type: "P" },
        { id: "27c", text: "Long term", type: "K" },
      ]
    },
    {
      id: 28,
      text: "Working quality",
      bannerImage: "/banners/Working quality banner.jpg",
      options: [
        { id: "28a", text: "Wavering and easily deviated", type: "V" },
        { id: "28b", text: "Sharp/ accurate and spontaneous", type: "P" },
        { id: "28c", text: "Well thought of", type: "K" },
      ]
    },
    {
      id: 29,
      text: "Working speed",
      bannerImage: "/banners/working speed Banner.jpg",
      options: [
        { id: "29a", text: "Quick", type: "V" },
        { id: "29b", text: "Medium", type: "P" },
        { id: "29c", text: "Slow", type: "K" },
      ]
    },
    {
      id: 30,
      text: "Work planning and execution quality",
      bannerImage: "/banners/Work planning and execution quality Banner.jpg",
      options: [
        { id: "30a", text: "Plans a work but fails in initiation", type: "V" },
        { id: "30b", text: "Plans a work but fails mid-way", type: "P" },
        { id: "30c", text: "Plans a work and doesn't stops until completion", type: "K" },
      ]
    }  ];

  export default function AssessmentPage() {
    // State variables
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [answers, setAnswers] = useState<{[key: number]: Option[]}>({});
    const [results, setResults] = useState<{V: number; P: number; K: number}>({V: 0, P: 0, K: 0});
    const [showResults, setShowResults] = useState(false);
    
    // Handle option selection
    const handleOptionSelect = (option: Option) => {
      if (multiSelectQuestions.includes(questions[currentQuestionIndex].id)) {
        // For multi-select questions
        const isSelected = selectedOptions.some(item => item.id === option.id);
        // Special handling for "None" option in question 8 (Hairs prone to)
        if (questions[currentQuestionIndex].id === 8) {
          if (option.text === "None") {
            // If "None" is selected, clear all other selections
            if (!isSelected) {
              setSelectedOptions([option]);
            } else {
              // If None is being deselected, just remove it
              setSelectedOptions(selectedOptions.filter(item => item.id !== option.id));
            }
            return;
          } else {
            // If any other option is selected, remove "None" from selections
            if (!isSelected) {
              setSelectedOptions([
                ...selectedOptions.filter(item => item.text !== "None"),
                option
              ]);
            } else {
              // Remove the option if it's already selected
              setSelectedOptions(selectedOptions.filter(item => item.id !== option.id));
            }
            return;
          }
        }
        
        // Normal multi-select behavior for other questions
        if (isSelected) {
          // Remove option if already selected
          setSelectedOptions(selectedOptions.filter(item => item.id !== option.id));
        } else {
          // Add option if not already selected
          setSelectedOptions([...selectedOptions, option]);
        }
      } else {
        // For single-select questions, just set the selection
        setSelectedOptions([option]);
      }
    };

    // Handle next question or complete assessment
    const handleNext = () => {
      // Save current answer
      const newAnswers = {...answers};
      newAnswers[questions[currentQuestionIndex].id] = selectedOptions;
      setAnswers(newAnswers);

      // Move to next question or finish assessment
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptions([]);
      } else {
        calculateResults();
      }
    };
    
    // Go to previous question
    const handlePrevious = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        // Restore previous answer if it exists
        const previousQuestionId = questions[currentQuestionIndex - 1].id;
        if (answers[previousQuestionId]) {
          setSelectedOptions(answers[previousQuestionId]);
        } else {
          setSelectedOptions([]);
        }
      }
    };

  // Calculate results
  const calculateResults = () => {
    const newResults = { V: 0, P: 0, K: 0 };
    
    // Process each answer
    Object.entries(answers).forEach(([questionId, options]) => {
      options.forEach((option: Option) => {
        if (Array.isArray(option.type)) {
          option.type.forEach(type => {
            newResults[type]++;
          });
        } else {
          newResults[option.type]++;
        }
      });
    });
    
    console.log("Final results:", newResults);
    setResults(newResults);
    
    // Save assessment results
    const dominantDosha = getDominantDoshaName(newResults);
    assessmentService.saveResults({
      vata: newResults.V,
      pitta: newResults.P,
      kapha: newResults.K,
      dominantDosha: dominantDosha
    });
    
    setShowResults(true);
  };

  // Get dominant dosha name for storage
  const getDominantDoshaName = (results: { V: number; P: number; K: number }): string => {
    if (results.V > results.P && results.V > results.K) return "vata";
    if (results.P > results.V && results.P > results.K) return "pitta";
    if (results.K > results.V && results.K > results.P) return "kapha";
    
    // For dual dominance
    if (results.V === results.P && results.V > results.K) return "vata_pitta";
    if (results.V === results.K && results.V > results.P) return "vata_kapha";
    if (results.P === results.K && results.P > results.V) return "pitta_kapha";
    
    // For tridosha
    return "tridosha";
  };

  // Get dominant dosha
  const getDominantDosha = (): DoshaType => {
    if (results.V > results.P && results.V > results.K) return "V";
    if (results.P > results.V && results.P > results.K) return "P";
    if (results.K > results.V && results.K > results.P) return "K";
    
    // If there's a tie, prioritize: Vata > Pitta > Kapha
    if (results.V === results.P && results.V > results.K) return "V";
    if (results.V === results.K && results.V > results.P) return "V";
    if (results.P === results.K && results.P > results.V) return "P";
    
    // If all equal
    return "V";
  };

  // Calculate dosha percentages
  const calculateDoshaPercentage = (doshaType: DoshaType) => {
    const total = results.V + results.P + results.K;
    if (total === 0) return 0;
    
    return (results[doshaType] / total) * 100;
  };

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

  // Get insight based on dominant dosha
  const getDoshaInsight = () => {
    const dominantDosha = getDominantDosha();
    
    switch(dominantDosha) {
      case "V":
        return "Your Vata constitution means you're naturally creative, quick, and adaptable. You tend to be enthusiastic and energetic when in balance.";
      case "P":
        return "Your Pitta constitution gives you natural leadership abilities, intelligence, and focus. You're efficient, precise, and sharp-minded when in balance.";
      case "K":
        return "Your Kapha constitution provides you with natural stability, endurance, and compassion. You're calm, grounded, and loyal when in balance.";
      default:
        return "";
    }
  };

  // Get diet recommendation based on dominant dosha
  const getDietRecommendation = () => {
    const dominantDosha = getDominantDosha();
    
    switch(dominantDosha) {
      case "V":
        return "Focus on warm, cooked, and nourishing foods. Favor sweet, sour, and salty tastes. Limit raw foods, caffeine, and irregular eating patterns.";
      case "P":
        return "Favor cooling foods and moderate portions. Emphasize sweet, bitter, and astringent tastes. Limit spicy, oily, and fermented foods.";
      case "K":
        return "Focus on light, warm, and spicy foods. Favor pungent, bitter, and astringent tastes. Limit heavy, cold, and oily foods.";
      default:
        return "";
    }
  };

  // Get exercise recommendation based on dominant dosha
  const getExerciseRecommendation = () => {
    const dominantDosha = getDominantDosha();
    
    switch(dominantDosha) {
      case "V":
        return "Practice gentle, grounding exercises like walking, yoga, and tai chi. Maintain consistency and avoid excessive exertion.";
      case "P":
        return "Engage in moderate exercise like swimming, cycling, or hiking. Exercise during cooler parts of the day to prevent overheating.";
      case "K":
        return "Incorporate vigorous exercise like HIIT, running, or aerobics. Maintain consistency and intensity to stimulate metabolism.";
      default:
        return "";
    }
  };
  
    return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5EF] to-white overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D7D0C0]/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#C4B99F]/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-[#815C42]/10 rounded-full blur-lg"></div>
        <div className="absolute top-60 right-1/3 w-16 h-16 bg-[#ABB087]/20 rounded-full blur-lg"></div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[#334036] mb-6 leading-tight">
              Dosha Assessment
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#334036]/80 leading-relaxed">
              Discover your unique Ayurvedic constitution through our comprehensive assessment. 
              Get personalized insights based on ancient wisdom and modern understanding.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center items-center gap-8 text-sm text-[#334036]/60"
          >
            <div className="flex items-center gap-2">
              <FaStar className="text-[#815C42]" />
              <span>30 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-[#815C42]" />
              <span>5-10 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-[#815C42]" />
              <span>Personalized Results</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {showResults ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-[#D7D0C0]/20 p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-[#334036] mb-4"
                >
                  Your Ayurvedic Constitution
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
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
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="relative inline-block mb-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#F7F5EF] to-white flex items-center justify-center shadow-lg border border-[#D7D0C0]/30">
                      <Image 
                        src={doshaProperties[getDominantDosha()].icon} 
                        width={80} 
                        height={80} 
                        alt={`${doshaProperties[getDominantDosha()].name} Dosha`} 
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
                  transition={{ duration: 0.6, delay: 0.5 }}
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
                      <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">                        <motion.div 
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
                      <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">                        <motion.div 
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
                      <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">                        <motion.div 
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
                transition={{ duration: 0.6, delay: 1.2 }}
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
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-[#D7D0C0]/20 p-6 md:p-10"
            >
              {/* Enhanced Progress Indicator */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="flex justify-between items-center text-sm text-[#334036]/70 mb-4">
                  <span className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="font-medium bg-[#F7F5EF] px-3 py-1 rounded-full">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="relative h-3 bg-[#F7F5EF] rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
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
                  transition={{ duration: 0.4 }}
                  className="mb-10"
                >
                  {/* Question Header */}
                  <div className="text-center mb-8">
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-2xl md:text-3xl font-bold text-[#334036] mb-4 leading-tight"
                    >
                      {questions[currentQuestionIndex].text}
                    </motion.h2>

                    {/* Multi-select hint */}
                    {multiSelectQuestions.includes(questions[currentQuestionIndex].id) && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
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
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg border border-[#D7D0C0]/20"
                      >                        <Image
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
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Option with Image */}
                          {questionsWithImages.includes(questions[currentQuestionIndex].id) && option.image && (
                            <div className={`
                              relative overflow-hidden rounded-xl mb-4 
                              ${questions[currentQuestionIndex].id === 5 || questions[currentQuestionIndex].id === 8
                                ? "h-28 w-full" 
                                : "h-36 w-full"}
                            `}>                              <Image
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
                transition={{ duration: 0.5, delay: 0.3 }}
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
          )}
        </div>
      </section>
    </div>
  );
}