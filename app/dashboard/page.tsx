'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useAuth } from '../../contexts/AuthContext';
import { useDosha } from '../../contexts/DoshaContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  // const { user, isAuthenticated } = useAuth();
  const { currentDosha } = useDosha();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingAppointment, setUpcomingAppointment] = useState<{
    doctor: string;
    date: string;
    time: string;
    type: string;
  } | null>(null);
  
  // Redirect if not logged in
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/auth/login');
  //   }
  // }, [isAuthenticated, router]);

  // Set greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateGreeting();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Simulated data - in a real app, this would come from an API
  useEffect(() => {
    // Mock data for demonstration
    const mockAppointment = {
      doctor: 'Dr. Akanksha Singh',
      date: '2023-05-30',
      time: '10:30 AM',
      type: 'Consultation'
    };
    
    setUpcomingAppointment(mockAppointment);
  }, []);

  // Format date in a readable way
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // if (!isAuthenticated) {
  //   return null; // Don't render anything while checking authentication
  // }

  const quickActions = [
    { title: 'Book Appointment', icon: '📅', link: '/appointment', color: 'bg-blue-50 text-blue-700' },
    { title: 'Chat with AI', icon: '🤖', link: '/bot', color: 'bg-green-50 text-green-700' },
    { title: 'Find a Doctor', icon: '👨‍⚕️', link: '/doctors', color: 'bg-amber-50 text-amber-700' },
    { title: 'Dosha Assessment', icon: '📋', link: '/assessment', color: 'bg-purple-50 text-purple-700' }
  ];

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#815C42] to-[#334036] rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {greeting},
                    Abhay
                     {/* {user?.name || 'there'}! */}
                  </h1>
                </div>
                <p className="text-[#F4EFEA] opacity-90">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                {currentDosha?.primaryDosha ? (
                  <div className="flex flex-col items-end">
                    <span className="text-white text-sm mb-1">Your Primary Dosha</span>
                    <div className="flex items-center bg-white/20 rounded-full px-4 py-1">
                      <Image 
                        src={`/${currentDosha.primaryDosha.toLowerCase()} icon.png`}
                        alt={currentDosha.primaryDosha}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <span className="text-white font-medium">{currentDosha.primaryDosha}</span>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href="/assessment"
                    className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Take Dosha Assessment
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link 
              key={index}
              href={action.link}
              className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${action.color} flex items-center justify-center text-2xl`}>
                {action.icon}
              </div>
              <h3 className="text-[#334036] font-medium">{action.title}</h3>
            </Link>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
              <h2 className="text-xl font-semibold text-[#334036] mb-4">Upcoming Appointment</h2>
              
              {upcomingAppointment ? (
                <div>
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-[#F4EFEA] rounded-full flex items-center justify-center text-xl text-[#8B664B] mr-4">
                      👨‍⚕️
                    </div>
                    <div>
                      <h3 className="font-medium text-[#334036]">{upcomingAppointment.doctor}</h3>
                      <p className="text-gray-600 text-sm">{upcomingAppointment.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-[#F4EFEA] rounded-lg p-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-medium text-[#334036]">
                        {formatDate(upcomingAppointment.date)}, {upcomingAppointment.time}
                      </div>
                    </div>
                    <div className="bg-[#8B664B] text-white text-xs px-2 py-1 rounded">
                      Upcoming
                    </div>
                  </div>
                    <div className="flex space-x-2">
                    <Link 
                      href="/voice"
                      className="flex-1 bg-[#334036] hover:bg-[#273028] text-white py-2 rounded-lg transition-colors duration-300 text-center"
                    >
                      Join Call
                    </Link>
                    <Link 
                      href="/reschedule"
                      className="flex-1 border border-[#334036] text-[#334036] hover:bg-[#F4EFEA] py-2 rounded-lg transition-colors duration-300 text-center"
                    >
                      Reschedule
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    📅
                  </div>
                  <p className="text-gray-600 mb-4">No upcoming appointments</p>
                  <Link 
                    href="/appointment" 
                    className="inline-block bg-[#334036] hover:bg-[#273028] text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Book Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Wellness Insights */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
              <h2 className="text-xl font-semibold text-[#334036] mb-4">Wellness Insights</h2>
              
              {currentDosha?.primaryDosha ? (
                <div>
                  <div className="bg-[#F4EFEA] rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-3">
                      <Image 
                        src={`/${currentDosha.primaryDosha.toLowerCase()} icon.png`}
                        alt={currentDosha.primaryDosha}
                        width={32}
                        height={32}
                        className="mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-[#334036]">Your Dosha Profile</h3>
                        <p className="text-sm text-gray-600">Based on your assessment</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-medium text-[#334036]">Primary</div>
                        <div className="text-[#8B664B]">{currentDosha.primaryDosha}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-medium text-[#334036]">Secondary</div>
                        <div className="text-[#8B664B]">{currentDosha.secondaryDosha || "None"}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-medium text-[#334036]">Balanced</div>
                        <div className="text-[#8B664B]">{currentDosha.balancedDosha || "None"}</div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-[#334036] mb-3">Today's Recommendations</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        🥄
                      </div>
                      <div>
                        <h4 className="font-medium text-[#334036]">Diet</h4>
                        <p className="text-sm text-gray-600">{getDietRecommendation(currentDosha.primaryDosha)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        ⏱️
                      </div>
                      <div>
                        <h4 className="font-medium text-[#334036]">Routine</h4>
                        <p className="text-sm text-gray-600">{getRoutineRecommendation(currentDosha.primaryDosha)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        🧘
                      </div>
                      <div>
                        <h4 className="font-medium text-[#334036]">Exercise</h4>
                        <p className="text-sm text-gray-600">{getExerciseRecommendation(currentDosha.primaryDosha)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/doshas"
                    className="inline-block text-[#8B664B] hover:underline text-sm mt-2"
                  >
                    View complete wellness plan →
                  </Link>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    ❓
                  </div>
                  <h3 className="text-lg font-medium text-[#334036] mb-2">Discover Your Dosha Type</h3>
                  <p className="text-gray-600 mb-4 max-w-md mx-auto">
                    Take the assessment to get personalized Ayurvedic recommendations based on your unique constitution.
                  </p>
                  <Link 
                    href="/assessment" 
                    className="inline-block bg-[#334036] hover:bg-[#273028] text-white px-6 py-3 rounded-lg transition-colors duration-300"
                  >
                    Start Assessment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper functions for dosha recommendations
function getDietRecommendation(dosha: string) {
  switch(dosha.toLowerCase()) {
    case 'vata':
      return 'Favor warm, cooked foods with healthy oils. Include sweet, sour, and salty tastes.';
    case 'pitta':
      return 'Choose cooling foods like sweet fruits, vegetables, and grains. Avoid spicy and fermented foods.';
    case 'kapha':
      return 'Opt for light, warm, and dry foods. Incorporate pungent, bitter, and astringent tastes.';
    default:
      return 'Balance your meals with a variety of fresh, seasonal foods.';
  }
}

function getRoutineRecommendation(dosha: string) {
  switch(dosha.toLowerCase()) {
    case 'vata':
      return 'Maintain a consistent daily routine. Rise and sleep at the same time each day.';
    case 'pitta':
      return 'Avoid working during the hottest part of the day. Take breaks to cool down.';
    case 'kapha':
      return 'Wake up early (before 6 AM) and stay active throughout the day to avoid sluggishness.';
    default:
      return 'Create a balanced daily routine that includes self-care and mindfulness practices.';
  }
}

function getExerciseRecommendation(dosha: string) {
  switch(dosha.toLowerCase()) {
    case 'vata':
      return 'Gentle exercises like walking, swimming, and restorative yoga are beneficial.';
    case 'pitta':
      return 'Moderate exercise during cooler times of day. Try swimming, moonlight walks, or cycling.';
    case 'kapha':
      return 'Vigorous exercise in the morning. Incorporate variety with cardio, strength training, and hot yoga.';
    default:
      return 'Balanced exercise routine including both strength and flexibility training.';
  }
}
