'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Doctor {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  experience: string;
  availability: string;
  imageUrl: string;
  description: string;
}

export default function DoctorsPage() {  // For now, we only have one doctor
  const doctors: Doctor[] = [
    {      id: "dr-akanksha-singh",
      name: "Dr. Akanksha Singh",
      credentials: "MD (Ayu.) National Institute of Ayurveda, Jaipur",
      specialties: ["Lifestyle Disorders", "Women's Health", "Panchakarma", "Addiction Removal"],
      experience: "10+ years",
      availability: "Mon-Fri: 9:00 AM - 5:00 PM",
      imageUrl: "", // Set to empty string since image doesn't exist yet
      description: "Dr. Akanksha Singh has conducted groundbreaking research on hypertension at NIPER (National Institute of Pharmaceutical Education and Research) and has authored multiple research papers about Ayurveda."
    }
  ];

  // State to track which doctor images failed to load
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#334036] mb-4">Meet Our Ayurvedic Expert</h1>
          <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
            Connect with our certified Ayurvedic physician for personalized consultations and treatments
            tailored to your unique health needs.
          </p>
        </div>

        {/* Single Doctor Featured Layout */}
        <div className="max-w-4xl mx-auto">
          {doctors.map((doctor) => {
            // Only show image if imageUrl exists and is not empty
            const shouldShowImage = doctor.imageUrl && doctor.imageUrl.trim() !== '' && !imageErrors[doctor.id];
            
            return (
              <div key={doctor.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="lg:flex">
                  {/* Doctor Image Section */}
                  <div className="lg:w-2/5">
                    <div className="h-80 lg:h-full relative">
                      {shouldShowImage ? (
                        <Image
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            // Prevent the image from trying to load again
                            e.currentTarget.style.display = 'none';
                            setImageErrors(prevErrors => ({
                              ...prevErrors,
                              [doctor.id]: true,
                            }));
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F4EFEA] to-[#E8DDD4]">
                          <div className="text-center">
                            <span className="text-8xl mb-4 block">👨‍⚕️</span>
                            <p className="text-[#8B664B] font-medium">Dr. {doctor.name.split(' ').slice(-1)[0]}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Doctor Information Section */}
                  <div className="lg:w-3/5 p-8 lg:p-12">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-[#334036] mb-3">{doctor.name}</h2>
                        <p className="text-[#8B664B] font-semibold text-lg mb-6">{doctor.credentials}</p>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-[#334036] mb-3">Specializations</h3>
                          <div className="flex flex-wrap gap-3">
                            {doctor.specialties.map((specialty, index) => (
                              <span 
                                key={index} 
                                className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-[#F4EFEA] text-[#8B664B] border border-[#E8DDD4]"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <p className="text-gray-700 leading-relaxed">{doctor.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-[#F4EFEA] p-4 rounded-xl">
                            <h4 className="font-semibold text-[#334036] mb-2">Experience</h4>
                            <p className="text-[#8B664B] font-medium">{doctor.experience}</p>
                          </div>
                          <div className="bg-[#F4EFEA] p-4 rounded-xl">
                            <h4 className="font-semibold text-[#334036] mb-2">Availability</h4>
                            <p className="text-[#8B664B] font-medium">{doctor.availability}</p>
                          </div>
                        </div>
                      </div>
                        {/* Action Button */}
                      <div className="flex justify-center">
                        <Link 
                          href={`/doctors/${doctor.id}`}
                          className="bg-[#334036] hover:bg-[#2A332D] text-white text-center py-4 px-8 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center"
                        >
                          View Full Profile
                          <span className="ml-2">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );          })}
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#F4EFEA] rounded-full flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="text-lg font-semibold text-[#334036] mb-2">Authentic Ayurveda</h3>
            <p className="text-gray-600 text-sm">Traditional practices backed by modern research and scientific approach</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#F4EFEA] rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-[#334036] mb-2">Personalized Care</h3>
            <p className="text-gray-600 text-sm">Customized treatment plans based on your unique constitution and health needs</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#F4EFEA] rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-[#334036] mb-2">Comprehensive Consultation</h3>
            <p className="text-gray-600 text-sm">Detailed assessment including pulse diagnosis and lifestyle evaluation</p>
          </div>
        </div>
      </div>
    </main>
  );
}
