'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'about' | 'specialties' | 'education'>('about');
  
  // Unwrap the params Promise using React.use()
  const { id } = use(params);
  
  // This doctor data would typically come from an API call using the ID parameter
  // For now, we'll hardcode the information from the attachment
  const doctor = {    id: 'dr-akanksha-singh',
    name: 'Dr. Akanksha Singh',
    credentials: 'MD (Ayu.) National Institute of Ayurveda, Jaipur',
    imageUrl: '', // Disabled image loading until actual images are available
    about: 'Dr. Akanksha Singh is a highly qualified Ayurvedic physician with extensive experience in treating lifestyle disorders and providing personalized wellness plans. She has conducted groundbreaking research on hypertension at NIPER (National Institute of Pharmaceutical Education and Research) and authored multiple research papers about Ayurveda.',
    education: [
      'MD (Ayu.) - National Institute of Ayurveda, Jaipur',
      'Research experience at NIPER (National Institute of Pharmaceutical Education and Research)',
      'Contributed to Ayurvedic research under CCRAS, Ministry of AYUSH'
    ],
    specialties: [
      {
        name: 'Lifestyle Disorders',
        description: 'Expertise in diabetes, heart health, hypertension, liver & kidney care.'
      },
      {
        name: 'Authentic Panchakarma',
        description: 'Rejuvenate, detox, and restore balance with personalized Panchakarma therapies.'
      },
      {
        name: 'Precise Diagnosis',
        description: 'Nadi Parikshan (pulse diagnosis) to create customized treatment plans for your specific needs.'
      },
      {
        name: 'Innovative Therapies',
        description: 'Marma Stimulation to activate energy channels, Agni Karma to treat chronic pain, and Jalouka Therapy (Leech Therapy) to detoxify and purify your body naturally.'
      },
      {
        name: 'Addiction Removal',
        description: 'Holistic therapies to help you break free from addiction and reclaim your health.'
      },
      {
        name: 'Women\'s Health',
        description: 'Specialized care for menstrual health, hormonal balance, and skin & hair wellness.'
      },
      {
        name: 'Personalized Wellness Plans',
        description: 'Tailored to your Prakriti (body type) and Ritucharya (seasonal care) for overall wellness year-round.'
      }
    ],
    availability: 'Mon-Fri: 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi'],  };

  // If the doctor ID doesn't match our data, redirect to the doctors page
  if (id !== doctor.id) {
    router.push('/doctors');
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#815C42] to-[#334036] p-8">            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                {/* Only show image if imageUrl exists and is not empty, otherwise always show placeholder */}
                {doctor.imageUrl && doctor.imageUrl.trim() !== '' ? (
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    style={{ objectFit: 'cover' }}                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <span className="text-6xl">👨‍⚕️</span>
                  </div>
                )}
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-lg opacity-90 mb-4">{doctor.credentials}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {doctor.languages.map((language, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-auto mt-6 md:mt-0">
                <Link 
                  href="/appointment"
                  className="inline-block px-6 py-3 bg-[#8B664B] hover:bg-[#73543C] text-white font-medium rounded-full transition-colors duration-300"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'about'
                    ? 'border-b-2 border-[#8B664B] text-[#8B664B]'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('specialties')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'specialties'
                    ? 'border-b-2 border-[#8B664B] text-[#8B664B]'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specialties
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'education'
                    ? 'border-b-2 border-[#8B664B] text-[#8B664B]'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Education & Experience
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-semibold text-[#334036] mb-4">About Dr. Akanksha Singh</h2>
                <p className="text-gray-700 mb-6">{doctor.about}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-[#F4EFEA] p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-[#334036] mb-3">Availability</h3>
                    <p className="text-[#8B664B] font-medium">{doctor.availability}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'specialties' && (
              <div>
                <h2 className="text-2xl font-semibold text-[#334036] mb-6">Areas of Expertise</h2>
                <div className="space-y-6">
                  {doctor.specialties.map((specialty, index) => (
                    <div key={index} className="border-b border-gray-200 pb-5 last:border-0">
                      <h3 className="text-lg font-medium text-[#8B664B] mb-2">{specialty.name}</h3>
                      <p className="text-gray-700">{specialty.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'education' && (
              <div>
                <h2 className="text-2xl font-semibold text-[#334036] mb-6">Education & Research</h2>
                <ul className="space-y-4 list-disc list-inside text-gray-700 pl-4">
                  {doctor.education.map((item, index) => (
                    <li key={index} className="pl-2">{item}</li>
                  ))}
                </ul>
                
                <div className="mt-8 p-5 bg-[#F4EFEA] rounded-xl">
                  <h3 className="text-lg font-semibold text-[#334036] mb-3">Research Highlights</h3>
                  <p className="text-gray-700">
                    Conducted groundbreaking research on hypertension at NIPER (National Institute of Pharmaceutical Education and Research) and authored multiple research papers about Ayurveda. Contributed to Ayurvedic research under the Ministry of AYUSH, advancing wellness through scientific Ayurveda.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/doctors"
            className="inline-flex items-center text-[#8B664B] hover:text-[#73543C] font-medium"
          >
            <span className="mr-2">←</span> Back to Doctors
          </Link>
        </div>
      </div>
    </main>
  );
}
