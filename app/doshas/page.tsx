"use client";

import { FaWind, FaFire, FaMountain } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { doshaLifestylePlans, LifestylePlan } from '@/data/doshaLifestylePlans'; // Added import
import DoshaLifestylePlanComponent from '@/components/DoshaLifestylePlan'; // Added import

// Enhanced DoshaCard Component with improved minimal design
const DoshaCard = ({ 
  title, 
  elements, 
  season, 
  description, 
  isActive, 
  onClick, 
  icon,
  iconBg
}: { 
  title: string; 
  elements: string; 
  season: string; 
  qualities: string[]; 
  description: string; 
  isActive: boolean; 
  onClick: () => void;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
}) => (
  <div 
    className={`border ${isActive ? 'border-[#815C42] bg-[#FCFAF5]' : 'border-gray-200 hover:border-gray-300 bg-white'} rounded-lg cursor-pointer transition-all duration-200 h-full`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-pressed={isActive}
    onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') onClick()}}
  >
    <div className="h-full flex flex-col p-5">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center mr-3 opacity-90" style={{ color: iconBg }}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-[#334036] mb-0.5">{title}</h3>
          <span className="text-sm text-[#815C42] font-light">{elements}</span>
        </div>
      </div>

      <p className="text-sm text-[#334036]/90 mb-4 line-clamp-3 leading-relaxed">{description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-[#334036]/80 border border-gray-100 px-2 py-0.5 rounded-full">{season}</span>
        <span className={`text-xs ${isActive ? 'text-[#815C42] font-medium' : 'text-gray-400'}`}>
          {isActive ? "Selected" : "Select"}
        </span>
      </div>
    </div>
  </div>
);

export default function Doshas() {
  const [selectedDosha, setSelectedDosha] = useState("vata");
  const [showDetails, setShowDetails] = useState(false);
  const [showLifestylePlan, setShowLifestylePlan] = useState(false);
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  
  const doshaData = {
    vata: {
      title: 'Vata', // Changed from name to title
      elements: "Air & Ether", // Added
      season: "Autumn & Early Winter", // Added
      icon: <FaWind className="text-xl" />, // Added
      color: "from-[#D7CFC2] to-[#B8A99A]", // Added
      iconBg: "#A0AEC0", // Added
      description: 'Associated with air and ether, Vata governs movement in the body and mind.',
      qualities: ['Dry', 'Light', 'Cold', 'Rough', 'Subtle', 'Mobile', 'Clear'],
      longDescription: "Vata is the principle of movement and is associated with the elements of air and ether. It governs all biological activities, including breathing, heartbeat, muscle and tissue movements, and even the blinking of eyelids. When in balance, Vata promotes creativity, flexibility, and a lively, enthusiastic nature. Vatas are often quick-witted, energetic, and enjoy new experiences. They tend to have a lean physique, dry skin and hair, and may experience variable appetite and digestion.",
      balanceTips: [
        "Maintain regular routines, especially for meals and sleep.",
        "Eat warm, nourishing, and grounding foods.",
        "Stay hydrated with warm water and herbal teas.",
        "Practice calming activities like meditation and gentle yoga.",
        "Keep warm and avoid cold, windy environments.",
        "Engage in regular, moderate exercise.",
        "Prioritize rest and avoid overstimulation."
      ],
      imbalanceSigns: [
        "Anxiety, nervousness, and fear",
        "Insomnia or restless sleep",
        "Dry skin, hair, and nails",
        "Constipation and gas",
        "Weight loss or difficulty gaining weight",
        "Aches, pains, and stiffness in joints",
        "Restlessness and difficulty concentrating",
        "Fatigue and low stamina"
      ],
      foods: {
        favor: [
          "Warm, cooked, and oily foods",
          "Sweet, sour, and salty tastes",
          "Grains like rice and wheat",
          "Cooked vegetables, especially root vegetables",
          "Dairy products (if tolerated well), like warm milk and ghee",
          "Sweet fruits like bananas, avocados, and mangoes",
          "Nuts and seeds in moderation (soaked or ground)",
          "Warming spices like ginger, cinnamon, and cumin"
        ],
        reduce: [ // Keeping 'reduce' as per previous specific update for Vata
          "Cold, dry, and light foods",
          "Pungent, bitter, and astringent tastes",
          "Raw vegetables and salads in excess",
          "Dried fruits",
          "Carbonated drinks and caffeine",
          "Highly processed and refined foods",
          "Legumes (unless well-cooked and spiced)"
        ]
      }
    },
    pitta: {
      title: "Pitta",
      elements: "Fire & Water",
      season: "Summer",
      qualities: ["Hot", "Sharp", "Light", "Liquid", "Oily", "Intense"],
      description: "Pitta controls digestion, metabolism, and energy production. It governs our ability to process everything – from food to thoughts.",
      icon: <FaFire className="text-xl" />,
      color: "from-[#C7845B] to-[#A15E39]",
      iconBg: "#E05D5D",
      longDescription: "Pitta embodies the elements of fire and water. It governs metabolism, digestion, absorption, assimilation, and body temperature. Pitta types typically have a medium build, strong appetite, and sharp intellect. When balanced, they are focused, passionate, and articulate. An imbalanced Pitta can lead to irritability, inflammatory conditions, and digestive issues like heartburn.",
      balanceTips: [
        "Favor cooling foods and avoid excessive spicy or hot foods",
        "Engage in moderate exercise, preferably during cooler parts of the day",
        "Practice relaxation techniques to manage intensity and perfectionism",
        "Maintain a cool environment, especially during sleep",
        "Moonlight walks and spending time in nature is particularly beneficial"
      ],
      imbalanceSigns: [
        "Anger, irritability, and impatience",
        "Acid reflux or heartburn",
        "Inflammation and skin rashes",
        "Excessive body heat or sweating",
        "Red complexion or eyes",
        "Sharp hunger and thirst"
      ],
      foods: {
        favor: ["Sweet fruits", "Cooling vegetables", "Grains like rice and oats", "Dairy (except sour)", "Cooling herbs"],
        avoid: ["Spicy foods", "Fermented foods", "Sour fruits", "Excessive oil", "Alcohol", "Red meat"]
      }
    },
    kapha: {
      title: "Kapha",
      elements: "Earth & Water",
      season: "Late Winter & Spring",
      qualities: ["Heavy", "Slow", "Cool", "Oily", "Smooth", "Dense", "Soft", "Stable"],
      description: "Kapha provides structure and lubrication. It governs stability, weight, immune function, and our emotional steadiness.",
      icon: <FaMountain className="text-xl" />,
      color: "from-[#8A9A5B] to-[#657A38]",
      iconBg: "#506D2F",
      longDescription: "Kapha combines the elements of earth and water, embodying qualities such as heaviness, coldness, softness, and stability. It provides structure, strength, and cohesion to the body, governing bone growth, muscle development, and fat production. Kapha types are typically strong, stable, and compassionate. When imbalanced, Kapha can lead to weight gain, lethargy, congestion, and attachment issues.",
      balanceTips: [
        "Stay active with regular, stimulating exercise",
        "Favor light, warming, and drying foods",
        "Embrace variety and new experiences to counter routine",
        "Practice energizing breathing exercises",
        "Rise early to avoid morning heaviness"
      ],
      imbalanceSigns: [
        "Weight gain and water retention",
        "Sluggishness and lethargy",
        "Excess sleep",
        "Congestion and mucus",
        "Resistance to change",
        "Emotional attachment and possessiveness"
      ],
      foods: {
        favor: ["Astringent fruits", "Leafy greens", "Legumes", "Honey", "Warming spices", "Light grains"],
        avoid: ["Excessive dairy", "Sweet foods", "Oily and fried foods", "Cold foods and drinks", "Excessive nuts", "Heavy meats"]
      }
    },
    vata_pitta: {
      title: "Vata-Pitta",
      elements: "Air, Space & Fire",
      season: "Summer to Fall",
      qualities: ["Dry", "Light", "Mobile", "Hot", "Sharp"],
      description: "The Vata-Pitta combination blends movement with transformation. People with this constitution are quick, creative, and have a sharp intellect.",
      icon: <div className="flex items-center"><FaWind className="text-xl mr-1" /><FaFire className="text-xl" /></div>,
      color: "from-[#B8A99A] to-[#C7845B]",
      iconBg: "#9E7BB5",
      longDescription: "Vata-Pitta types combine the movement of Vata with the transformation of Pitta. They typically have a slim to medium build, are mentally quick, and possess strong intellect and creativity. When balanced, they are dynamic, passionate leaders. When imbalanced, they may experience anxiety, irritability, digestive issues, and difficulty sleeping.",
      balanceTips: [
        "Balance activity with adequate rest",
        "Favor foods that balance both Vata and Pitta",
        "Maintain regular mealtimes",
        "Practice calming activities like gentle yoga",
        "Avoid excessive heat and dryness"
      ],
      imbalanceSigns: [
        "Anxiety combined with irritability",
        "Digestive sensitivity",
        "Difficulty sleeping",
        "Dry skin with occasional inflammation",
        "Fluctuating energy levels",
        "Sensitivity to both cold and heat"
      ],
      foods: {
        favor: ["Sweet fruits", "Cooked vegetables", "Grains like basmati rice", "Moderate dairy", "Cooling herbs"],
        avoid: ["Spicy foods", "Caffeine", "Raw foods", "Fermented foods", "Excessive oil"]
      }
    },
    pitta_kapha: {
      title: "Pitta-Kapha",
      elements: "Fire, Water & Earth",
      season: "Spring to Summer",
      qualities: ["Hot", "Oily", "Sharp", "Heavy", "Stable"],
      description: "The Pitta-Kapha constitution combines transformation with structure. These individuals are strong, determined, and methodical.",
      icon: <div className="flex items-center"><FaFire className="text-xl mr-1" /><FaMountain className="text-xl" /></div>,
      color: "from-[#C7845B] to-[#8A9A5B]",
      iconBg: "#BA8042",
      longDescription: "Pitta-Kapha types blend the fiery metabolism of Pitta with the structural stability of Kapha. They typically have a medium to stocky build with good strength and endurance. When balanced, they are methodical, determined, and reliable. When imbalanced, they may struggle with weight gain, inflammation, and stubbornness.",
      balanceTips: [
        "Regular, moderate exercise",
        "Favor cooling and light foods",
        "Avoid excessive oils and heavy foods",
        "Embrace variety to counter routine",
        "Balance rest with activity"
      ],
      imbalanceSigns: [
        "Weight gain with inflammation",
        "Possessiveness with irritability",
        "Resistance to change with intolerance",
        "Congestion with heat-related issues",
        "Lethargy mixed with intensity",
        "Water retention and sweating"
      ],
      foods: {
        favor: ["Bitter greens", "Astringent fruits", "Light grains", "Legumes", "Cooling herbs"],
        avoid: ["Excessive dairy", "Fried foods", "Heavy meats", "Spicy foods", "Sweet desserts"]
      }
    },
    vata_kapha: {
      title: "Vata-Kapha",
      elements: "Air, Space, Earth & Water",
      season: "Winter to Spring",
      qualities: ["Dry", "Cold", "Light", "Heavy", "Stable"],
      description: "Vata-Kapha types blend movement with structure. They often have variable energy with periods of creativity followed by steadiness.",
      icon: <div className="flex items-center"><FaWind className="text-xl mr-1" /><FaMountain className="text-xl" /></div>,
      color: "from-[#D7CFC2] to-[#8A9A5B]",
      iconBg: "#607274",
      longDescription: "Vata-Kapha types combine the airy, mobile qualities of Vata with the earthy stability of Kapha. This creates an interesting mix of creativity and reliability. When balanced, they are adaptable yet grounded. When imbalanced, they may experience both anxiety and lethargy, sometimes alternating between the two.",
      balanceTips: [
        "Warm, stimulating exercise",
        "Regular routine with some variety",
        "Warm, light foods",
        "Dry brushing and oil massage",
        "Balance activity with adequate rest"
      ],
      imbalanceSigns: [
        "Alternating anxiety and lethargy",
        "Cold sensitivity",
        "Irregular digestion with congestion",
        "Dry skin with occasional water retention",
        "Variable energy levels",
        "Emotional sensitivity with attachment"
      ],
      foods: {
        favor: ["Warming spices", "Cooked vegetables", "Light grains", "Honey", "Warming herbs"],
        avoid: ["Cold foods", "Heavy desserts", "Excessive dairy", "Raw vegetables", "Iced drinks"]
      }
    },
    tridosha: {
      title: "Tridosha",
      elements: "All Five Elements",
      season: "Transitional Periods",
      qualities: ["Balanced", "Adaptable", "Harmonious"],
      description: "Tridosha types have a relatively equal balance of all three doshas, making them adaptable and resilient when maintaining equilibrium.",
      icon: <div className="flex items-center"><FaWind className="text-sm" /><FaFire className="text-sm mx-1" /><FaMountain className="text-sm" /></div>,
      color: "from-[#9C9A97] to-[#736F6B]",
      iconBg: "#5F7A61",
      longDescription: "Tridoshic types have relatively equal amounts of Vata, Pitta, and Kapha in their constitution. This balanced nature can make them highly adaptable and resilient, but it also requires careful maintenance as they can be susceptible to imbalances in any of the three doshas depending on circumstances, seasons, and lifestyle choices.",
      balanceTips: [
        "Pay attention to seasonal changes and adapt accordingly",
        "Maintain a balanced diet with foods from all tastes",
        "Regular, moderate exercise",
        "Establish consistent daily routines",
        "Practice mindfulness to notice early signs of imbalance"
      ],
      imbalanceSigns: [
        "Various symptoms depending on which dosha becomes imbalanced",
        "Seasonal sensitivities",
        "Digestive inconsistency",
        "Fluctuating energy levels",
        "Varying emotional states",
        "Sleep disturbances"
      ],
      foods: {
        favor: ["Seasonal, local foods", "Balanced meals with all six tastes", "Freshly prepared meals", "Moderate amounts", "Foods appropriate to current imbalances"],
        avoid: ["Processed foods", "Extreme foods (very spicy, very cold, etc.)", "Eating irregularly", "Incompatible food combinations", "Foods that aggravate current imbalances"]
      }
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    } 
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const completedAssessment = localStorage.getItem('assessmentCompleted');
      if (completedAssessment === 'true' && user.dosha) {
        // If user has a dosha and completed assessment, consider setting selectedDosha and showing plan
        // For now, this just sets the flag to show the section, plan is based on 'selectedDosha'
        setShowLifestylePlan(true);
      } else {
        setShowLifestylePlan(false);
      }
    }
  }, [user]);

  if (loading || !user) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Simplified */}
      <section className="pt-24 pb-16 px-4 sm:px-6 md:px-8 bg-[#F7F5EF] relative overflow-hidden">
        {/* Simple gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" 
               style={{
                 background: `
                   radial-gradient(circle at 20% 25%, rgba(88, 168, 86, 0.25) 0%, transparent 40%),
                   radial-gradient(circle at 80% 35%, rgba(217, 131, 36, 0.22) 0%, transparent 45%),
                   radial-gradient(circle at 50% 80%, rgba(92, 127, 153, 0.25) 0%, transparent 50%)
                 `,
               }} 
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-3 bg-white/70 backdrop-blur-sm px-4 py-1 rounded-full">
              <span className="text-[#815C42] font-medium">Ayurvedic Wisdom</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#334036] mb-6">
              Understanding <span className="text-[#815C42]">Doshas</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-[#334036] mb-8">
              The three fundamental energies that govern our physical and mental constitution in Ayurveda.
            </p>
            
            <div>
              <a href="#doshas-section" className="inline-flex items-center gap-2 bg-white text-[#334036] py-2 px-5 rounded-full shadow-sm hover:shadow transition-all">
                Explore Doshas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section - Simplified */}
      <section className="py-16 px-4 sm:px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-3 bg-[#F7F5EF] px-3 py-1 rounded-full">
                <span className="text-[#815C42] font-medium text-sm">Ayurvedic Foundation</span>
              </div>
              <h2 className="text-3xl font-bold text-[#334036] mb-6">What Are Doshas?</h2>
              <p className="text-lg text-[#334036] mb-4">
                In Ayurveda, doshas are the three energies that define a person&apos;s physical, mental, and emotional makeup. They are derived from the five elements: space, air, fire, water, and earth.
              </p>
              <p className="text-lg text-[#334036] mb-4">
                Everyone has all three doshas present in their constitution, but typically one or two are more dominant, creating a unique mind-body type called your &quot;prakriti.&quot;
              </p>
              <p className="text-lg text-[#334036]">
                Understanding your dosha composition is the foundation of Ayurvedic wellness. It helps you make dietary, lifestyle, and wellness choices that support your natural constitution and prevent imbalances.
              </p>
            </div>
            
            <div className="relative flex justify-center">
              <div className="absolute -z-10 w-80 h-80 rounded-full bg-[#F7F5EF] opacity-70"></div>
              <Image 
                src="/doshas-diagram.svg" 
                alt="Doshas Diagram" 
                width={400} 
                height={400} 
                className="z-10" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Minimal Dosha Cards Section */}
      <section id="doshas-section" className="py-16 px-4 sm:px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#334036] mb-4">The Three Doshas</h2>
            <p className="text-lg text-[#334036]">
              Select a dosha to learn more about its characteristics.
            </p>
          </div>
          
          {/* Simplified selector */}
          <div className="mb-8 flex space-x-4">
            <button 
              onClick={() => setShowDetails(false)}
              className={`px-4 py-1 text-sm border-b-2 transition-colors ${!showDetails ? 'border-[#815C42] text-[#334036] font-medium' : 'border-transparent text-gray-500'}`}
            >
              Primary Doshas
            </button>
            <button 
              onClick={() => setShowDetails(true)}
              className={`px-4 py-1 text-sm border-b-2 transition-colors ${showDetails ? 'border-[#815C42] text-[#334036] font-medium' : 'border-transparent text-gray-500'}`}
            >
              Combination Types
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {!showDetails ? (
              // Primary doshas
              Object.entries(doshaData)
                .filter(([key]) => ['vata', 'pitta', 'kapha'].includes(key))
                .map(([key, dosha]) => (
                  <DoshaCard 
                    key={key}
                    title={dosha.title}
                    elements={dosha.elements}
                    season={dosha.season}
                    qualities={dosha.qualities}
                    description={dosha.description}
                    isActive={selectedDosha === key}
                    onClick={() => setSelectedDosha(key)}
                    icon={dosha.icon}
                    color={`bg-gradient-to-r ${dosha.color}`}
                    iconBg={dosha.iconBg}
                  />
                ))
            ) : (
              // Combination doshas
              Object.entries(doshaData)
                .filter(([key]) => ['vata_pitta', 'pitta_kapha', 'vata_kapha', 'tridosha'].includes(key))
                .map(([key, dosha]) => (
                  <DoshaCard 
                    key={key}
                    title={dosha.title}
                    elements={dosha.elements}
                    season={dosha.season}
                    qualities={dosha.qualities}
                    description={dosha.description}
                    isActive={selectedDosha === key}
                    onClick={() => setSelectedDosha(key)}
                    icon={dosha.icon}
                    color={`bg-gradient-to-r ${dosha.color}`}
                    iconBg={dosha.iconBg}
                  />
                ))
            )}
          </div>
          
          {/* Minimal dosha details */}
          {selectedDosha && (
            <div 
              className="border-t pt-8"
              key={selectedDosha}
            >
              <div className="flex items-center mb-5">
                <div className="mr-4 text-2xl" style={{ color: doshaData[selectedDosha as keyof typeof doshaData].iconBg }}>
                  {doshaData[selectedDosha as keyof typeof doshaData].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#334036]">
                    {doshaData[selectedDosha as keyof typeof doshaData].title} Dosha
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-sm text-[#815C42]">
                      {doshaData[selectedDosha as keyof typeof doshaData].elements}
                    </span>
                    <span className="text-sm text-[#334036]">•</span>
                    <span className="text-sm text-[#815C42]">
                      {doshaData[selectedDosha as keyof typeof doshaData].season}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[#334036] leading-relaxed">
                    {doshaData[selectedDosha as keyof typeof doshaData].longDescription}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-[#334036] mb-3">Key Qualities</h4>
                    <div className="flex flex-wrap gap-2">
                      {doshaData[selectedDosha as keyof typeof doshaData].qualities.map((quality, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-[#334036] text-xs border border-gray-200 rounded-md"
                        >
                          {quality}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-[#334036] mb-3">Balance Tips</h4>
                    <ul className="space-y-1">
                      {doshaData[selectedDosha as keyof typeof doshaData].balanceTips.slice(0, 3).map((tip, index) => (
                        <li key={index} className="text-sm text-[#334036]">• {tip}</li>
                      ))}
                      {doshaData[selectedDosha as keyof typeof doshaData].balanceTips.length > 3 && (
                        <li className="text-sm text-[#815C42] mt-1">
                          <Link href="/assessment" className="inline-flex items-center">
                            View all tips →
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-sm font-medium text-[#334036] mb-2">Common Imbalances</h4>
                    <ul className="space-y-1">
                      {doshaData[selectedDosha as keyof typeof doshaData].imbalanceSigns.slice(0, 3).map((sign, index) => (
                        <li key={index} className="text-sm text-[#334036]">• {sign}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#334036] mb-2">Favorable Foods</h4>
                    <ul className="space-y-1">
                      {doshaData[selectedDosha as keyof typeof doshaData].foods.favor.slice(0, 3).map((food, index) => (
                        <li key={index} className="text-sm text-[#334036]">• {food}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link
                    href="/assessment"
                    className="text-[#815C42] hover:text-[#6e4f39] font-medium"
                  >
                    Take the full dosha assessment →
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Lifestyle Plan Toggle Button */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowLifestylePlan(!showLifestylePlan)}
              className="flex items-center gap-2 text-[#815C42] hover:text-[#6d4e38] font-medium"
            >
              {showLifestylePlan ? 'Hide' : 'View'} Complete Lifestyle Plan
              <svg 
                className={`w-4 h-4 transition-transform ${showLifestylePlan ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {/* Lifestyle Plan Content */}
            {showLifestylePlan && (() => {
              const currentPlan = doshaLifestylePlans.find(p => p.id === selectedDosha);
              if (!currentPlan) {
                return (
                  <div className="mt-6 text-center text-gray-600">
                    <p>Detailed lifestyle plan for {doshaData[selectedDosha as keyof typeof doshaData]?.title || selectedDosha} is being prepared.</p>
                    <p>Please check back later or ensure you have completed your assessment for a personalized plan.</p>
                  </div>
                );
              }
              return (
                <div className="mt-6">
                  <DoshaLifestylePlanComponent 
                    plan={currentPlan} 
                    isAuthenticated={isAuthenticated} 
                  />
                </div>
              );
            })()}
          </div>
        </div>
      </section>
      
      {/* Simplified Call to Action */}
      <section className="py-16 px-4 sm:px-6 md:px-8 bg-[#334036] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Discover Your Unique Dosha Makeup</h2>
          <p className="text-lg mb-8 text-gray-200">
            Take our assessment to learn your constitution and receive personalized wellness recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/assessment" 
              className="bg-[#815C42] hover:bg-[#6e4f39] py-2 px-6 rounded-full font-medium transition-all flex items-center justify-center"
            >
              Take Your Free Assessment
            </Link>
            <Link 
              href="/blog" 
              className="bg-transparent border border-white hover:bg-white hover:text-[#334036] py-2 px-6 rounded-full font-medium transition-all flex items-center justify-center"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
