'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Doctor {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  imageUrl: string;
  availability: {
    [key: string]: string[];
  };
}

export default function ReschedulePage() {
  const router = useRouter();
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock current appointment data
  useEffect(() => {
    const appointment = {
      id: 'apt-001',
      doctor: {
        id: "dr-akanksha-singh",
        name: "Dr. Akanksha Singh",
        credentials: "MD (Ayu.) National Institute of Ayurveda, Jaipur",
        specialties: ["Lifestyle Disorders", "Women's Health", "Panchakarma"],
        imageUrl: "",
        availability: {
          monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          saturday: [],
          sunday: []
        }
      },
      currentDate: '2024-05-30',
      currentTime: '10:30',
      consultationType: 'video',
      patientName: 'Abhay',
      reason: 'Regular consultation'
    };
    setCurrentAppointment(appointment);
  }, []);

  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const dates: Array<{
      date: string;
      display: string;
      dayName: string;
    }> = [];
    const today = new Date();
    
    if (!currentAppointment?.doctor) return dates;
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const availableSlots = currentAppointment.doctor.availability[dayName];
      
      if (availableSlots && availableSlots.length > 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          }),
          dayName
        });
      }
    }
    
    return dates;
  };

  // Generate time slots for selected date
  const generateTimeSlots = (): TimeSlot[] => {
    if (!currentAppointment?.doctor || !selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availableTimes = currentAppointment.doctor.availability[dayName] || [];
    
    return availableTimes.map(time => ({
      time,
      available: true // In a real app, you'd check against existing bookings
    }));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const formatCurrentDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  const handleConfirmReschedule = () => {
    // In a real app, you would update the appointment here
    router.push('/dashboard');
  };

  if (!currentAppointment) {
    return (
      <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="text-lg font-medium text-[#334036] mb-2">Loading appointment details...</h3>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#815C42] to-[#334036] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Reschedule Appointment</h1>
                <p className="opacity-90">Choose a new date and time for your consultation</p>
              </div>
              <Link 
                href="/dashboard"
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </Link>
            </div>
          </div>

          <div className="p-6">
            {!showConfirmation ? (
              <>
                {/* Current Appointment Details */}
                <div className="bg-[#F4EFEA] rounded-xl p-6 mb-8">
                  <h2 className="text-lg font-semibold text-[#334036] mb-4">Current Appointment</h2>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-3xl">👨‍⚕️</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#334036] mb-1">
                        {currentAppointment.doctor.name}
                      </h3>
                      <p className="text-[#8B664B] mb-3">{currentAppointment.doctor.credentials}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-[#334036]">Current Date:</span>
                          <p className="text-gray-600">{formatCurrentDate(currentAppointment.currentDate)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-[#334036]">Current Time:</span>
                          <p className="text-gray-600">{formatTime(currentAppointment.currentTime)} (Audio Call)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                      Rescheduling
                    </div>
                  </div>
                </div>

                {/* Reason for Rescheduling */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#334036] mb-3">Reason for Rescheduling</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Schedule conflict',
                      'Emergency came up',
                      'Not feeling well',
                      'Need different time',
                      'Personal reasons',
                      'Work commitment',
                      'Travel plans',
                      'Other'
                    ].map((reasonOption) => (
                      <button
                        key={reasonOption}
                        onClick={() => setReason(reasonOption)}
                        className={`p-3 text-sm border rounded-lg transition-all ${
                          reason === reasonOption
                            ? 'border-[#8B664B] bg-[#F4EFEA] text-[#334036]'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {reasonOption}
                      </button>
                    ))}
                  </div>
                  
                  {reason === 'Other' && (
                    <textarea
                      placeholder="Please specify your reason..."
                      className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      rows={3}
                    />
                  )}
                </div>

                {/* New Date Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#334036] mb-3">Select New Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {generateAvailableDates().slice(0, 12).map(dateInfo => (
                      <button
                        key={dateInfo.date}
                        onClick={() => setSelectedDate(dateInfo.date)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          selectedDate === dateInfo.date
                            ? 'border-[#8B664B] bg-[#F4EFEA] text-[#334036]'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{dateInfo.display}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* New Time Selection */}
                {selectedDate && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#334036] mb-3">Select New Time</h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {generateTimeSlots().map(slot => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            selectedTime === slot.time
                              ? 'border-[#8B664B] bg-[#F4EFEA] text-[#334036]'
                              : slot.available
                              ? 'border-gray-200 hover:border-gray-300 text-gray-700'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {formatTime(slot.time)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reschedule Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">New Appointment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-green-700">New Date:</span>
                        <p className="text-green-600">{formatCurrentDate(selectedDate)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-green-700">New Time:</span>
                        <p className="text-green-600">{formatTime(selectedTime)}</p>
                      </div>
                    </div>
                    {reason && (
                      <div className="mt-3">
                        <span className="font-medium text-green-700">Reason:</span>
                        <p className="text-green-600">{reason}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/dashboard"
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg text-center hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={handleReschedule}
                    disabled={!selectedDate || !selectedTime || !reason || isSubmitting}
                    className="flex-1 py-3 px-6 bg-[#334036] text-white rounded-lg font-semibold hover:bg-[#273028] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Rescheduling...' : 'Confirm Reschedule'}
                  </button>
                </div>
              </>
            ) : (
              // Confirmation Screen
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✅</span>
                </div>
                
                <h2 className="text-2xl font-bold text-[#334036] mb-3">Appointment Rescheduled!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your appointment has been successfully rescheduled. You will receive a confirmation email shortly.
                </p>
                
                <div className="bg-[#F4EFEA] rounded-xl p-6 mb-8 max-w-md mx-auto">
                  <h3 className="font-semibold text-[#334036] mb-3">New Appointment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{currentAppointment.doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formatCurrentDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formatTime(selectedTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">Audio Call</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleConfirmReschedule}
                  className="bg-[#334036] hover:bg-[#273028] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
