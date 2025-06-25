import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronRight, FaInfoCircle, FaCalendarAlt, FaUtensils, FaLeaf, FaOilCan } from 'react-icons/fa';
import { LifestylePlan } from '@/data/doshaLifestylePlans'; // Updated import
import { assessmentService } from '@/services/assessment';

interface DoshaLifestylePlanProps {
  plan: LifestylePlan; // Changed to accept the whole plan object
  isAuthenticated: boolean; // Kept for consistency, though direct usage might change based on page logic
}

// Component to display a section header
const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center mb-3 text-[#815C42]">
    <div className="mr-2">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

// Content tabs component
const ContentTabs = ({ activeTab, setActiveTab }: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void 
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'daily', label: 'Daily Routine' },
    { id: 'diet', label: 'Diet' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'seasonal', label: 'Seasonal' },
    { id: 'herbs', label: 'Herbs & Oils' }
  ];

  return (
    <div className="flex overflow-x-auto pb-2 mb-6 border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 mr-2 whitespace-nowrap transition-colors ${
            activeTab === tab.id 
              ? 'text-[#815C42] border-b-2 border-[#815C42] font-medium' 
              : 'text-gray-500 hover:text-[#334036]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Authentication prompt component (can be kept if used elsewhere or for a different logic flow)
const AuthPrompt = () => (
  <div className="bg-[#F7F5EF] p-6 rounded-lg mb-8">
    <div className="flex items-start">
      <FaInfoCircle className="text-[#815C42] mt-1 mr-3 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-[#334036] mb-2">Sign in to view your complete lifestyle plan</h3>
        <p className="text-[#334036]/80 text-sm mb-4">
          Create a free account or sign in to access your personalized Ayurvedic lifestyle plan, including diet, daily routines, and seasonal recommendations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/auth/login" 
            className="bg-[#815C42] hover:bg-[#6d4e38] text-white px-4 py-2 rounded-md text-sm"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/signup" 
            className="bg-white border border-[#815C42] text-[#815C42] hover:bg-[#F7F5EF] px-4 py-2 rounded-md text-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// Assessment prompt component
const AssessmentPrompt = () => (
  <div className="bg-[#F7F5EF] p-6 rounded-lg mb-8">
    <div className="flex items-start">
      <FaInfoCircle className="text-[#815C42] mt-1 mr-3 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-[#334036] mb-2">Take the Dosha Assessment</h3>
        <p className="text-[#334036]/80 text-sm mb-4">
          Complete your dosha assessment to receive a personalized Ayurvedic lifestyle plan tailored to your unique constitution.
        </p>
        <Link 
          href="/assessment" 
          className="bg-[#815C42] hover:bg-[#6d4e38] text-white px-4 py-2 rounded-md text-sm inline-flex items-center"
        >
          Take Assessment <FaChevronRight className="ml-1 text-xs" />
        </Link>
      </div>
    </div>
  </div>
);

export default function DoshaLifestylePlanComponent({ plan, isAuthenticated }: DoshaLifestylePlanProps) { // Renamed to avoid conflict if this file is also named DoshaLifestylePlan
  const [activeTab, setActiveTab] = useState('overview');
  // No need to fetch hasCompletedAssessment here as the parent page (doshas/page.tsx) handles it.
  // The plan is directly passed as a prop.

  // If the plan is not available (e.g., dosha not found), this component might not even be rendered by the parent.
  // However, a fallback or loading state could be added if necessary.
  if (!plan) {
    return <div>Loading plan or plan not available...</div>; // Or a more specific message
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#334036] mb-4">{plan.name}</h2>
        
        <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'overview' && (
          <div>
            <SectionHeader icon={<FaInfoCircle />} title="Basic Overview" />
            <div className="bg-[#F7F5EF]/50 rounded-lg p-4 mb-6">
              <table className="w-full text-sm">
                <tbody>
                  {plan.overviewCharacteristics.map((item) => (
                    <tr key={item.characteristic} className="border-b border-gray-200 last:border-0">
                      <td className="py-2 font-medium text-[#334036] w-1/3">{item.characteristic}</td>
                      <td className="py-2 text-[#334036]/80">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'daily' && (
          <div>
            <SectionHeader icon={<FaCalendarAlt />} title="Daily Routine (Dinacharya)" />
            <div className="bg-[#F7F5EF]/50 rounded-lg p-4 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-medium text-[#334036] w-1/4">Time</th>
                    <th className="py-2 text-left font-medium text-[#334036] w-1/4">Activity</th>
                    <th className="py-2 text-left font-medium text-[#334036]">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.dailyRoutine.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      <td className="py-2 text-[#334036]">{item.time}</td>
                      <td className="py-2 text-[#334036]">{item.activity}</td>
                      <td className="py-2 text-[#334036]/80">{item.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'diet' && (
          <div>
            <SectionHeader icon={<FaUtensils />} title="Diet Guidelines" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F7F5EF]/50 rounded-lg p-4">
                <h4 className="font-medium text-[#334036] mb-3">{plan.dietRecommendedTitle || 'Recommended'}</h4>
                <ul className="space-y-1">
                  {plan.dietRecommended.map((item, index) => (
                    <li key={index} className="text-sm text-[#334036]/80 flex items-start">
                      <span className="text-[#815C42] mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F7F5EF]/50 rounded-lg p-4">
                <h4 className="font-medium text-[#334036] mb-3">{plan.dietAvoidTitle || 'To Avoid'}</h4>
                <ul className="space-y-1">
                  {plan.dietAvoid.map((item, index) => (
                    <li key={index} className="text-sm text-[#334036]/80 flex items-start">
                      <span className="text-[#815C42] mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'lifestyle' && (
          <div>
            <SectionHeader icon={<FaLeaf />} title={plan.lifestyleTipsTitle || "Lifestyle Tips"} />
            <div className="bg-[#F7F5EF]/50 rounded-lg p-4 mb-6">
              <table className="w-full text-sm">
                <tbody>
                  {plan.lifestyleTips.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      <td className="py-2 font-medium text-[#334036] w-1/3">{item.categoryOrAspect}</td>
                      <td className="py-2 text-[#334036]/80">{item.recommendationOrSuggestion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'seasonal' && (
          <div>
            <SectionHeader icon={<FaCalendarAlt />} title={plan.ritucharyaTitle || "Seasonal Guidelines (Ritucharya)"} />
            <div className="bg-[#F7F5EF]/50 rounded-lg p-4 mb-6">
              {plan.ritucharyaSpecialCaution && (
                <p className="text-sm text-[#334036]/80 mb-4">
                  <strong>Special Caution in:</strong> {plan.ritucharyaSpecialCaution}
                </p>
              )}
              <table className="w-full text-sm">
                <tbody>
                  {plan.ritucharyaDetails.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      <td className="py-2 font-medium text-[#334036] w-1/3">{item.season}</td>
                      <td className="py-2 text-[#334036]/80">{item.keyTips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'herbs' && (
          <div>
            <div className="mb-6">
              <SectionHeader icon={<FaLeaf />} title={plan.supportiveHerbsTitle || "Supportive Herbs"} />
              <div className="bg-[#F7F5EF]/50 rounded-lg p-4 mb-6">
                <table className="w-full text-sm">
                  <tbody>
                    {plan.supportiveHerbs.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="py-2 font-medium text-[#334036] w-1/3">{item.herb}</td>
                        <td className="py-2 text-[#334036]/80">{item.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <SectionHeader icon={<FaOilCan />} title={plan.recommendedOilsTitle || "Recommended Oils & Therapies"} />
              <div className="bg-[#F7F5EF]/50 rounded-lg p-4">
                <ul className="space-y-1">
                  {plan.recommendedOils.map((item, index) => {
                    const parts = item.split(':');
                    const oilName = parts[0];
                    const oilDesc = parts.length > 1 ? parts.slice(1).join(':') : '';
                    return (
                      <li key={index} className="text-sm text-[#334036]/80 flex items-start">
                        <span className="text-[#815C42] mr-2">•</span>
                        {oilDesc ? (
                          <>
                            <strong>{oilName}:</strong>{oilDesc}
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Removed the local getDoshaContent function as data is passed via props.

