'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  experience: string;
  imageUrl: string;
  description: string;
  consultationFee: number;
  availability: {
    [key: string]: string[];
  };
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentData {
  doctorId: string;
  date: string;
  time: string;
  consultationType: 'video' | 'audio' | 'chat';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: string;
  gender: 'male' | 'female' | 'other';
  chiefComplaint: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
}

export default function AppointmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'doctor' | 'datetime' | 'details' | 'payment' | 'confirmation'>('doctor');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | 'chat'>('video');
  const [appointmentData, setAppointmentData] = useState<Partial<AppointmentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock doctor data
  const doctors: Doctor[] = [
    {
      id: "dr-akanksha-singh",
      name: "Dr. Akanksha Singh",
      credentials: "MD (Ayu.) National Institute of Ayurveda, Jaipur",
      specialties: ["Lifestyle Disorders", "Women's Health", "Panchakarma", "Addiction Removal"],
      experience: "10+ years",
      imageUrl: "",
      description: "Dr. Akanksha Singh has conducted groundbreaking research on hypertension at NIPER and has authored multiple research papers about Ayurveda.",
      consultationFee: 999,
      availability: {
        monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        saturday: [],
        sunday: []
      }
    }
  ];  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const dates: Array<{
      date: string;
      display: string;
      dayName: string;
    }> = [];
    const today = new Date();
    
    if (!selectedDoctor) return dates;
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const availableSlots = selectedDoctor.availability[dayName];
      
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
  };// Generate time slots for selected date
  const generateTimeSlots = (): TimeSlot[] => {
    if (!selectedDoctor || !selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availableTimes = selectedDoctor.availability?.[dayName as keyof typeof selectedDoctor.availability] || [];
    
    return availableTimes.map(time => ({
      time,
      available: true // In a real app, you'd check against existing bookings
    }));
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep('datetime');
  };

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep('details');
    }
  };

  const handlePatientDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
    setStep('confirmation');
  };

  const handleInputChange = (field: string, value: string) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const totalAmount = selectedDoctor ? selectedDoctor.consultationFee : 0;
  const processingFee = Math.round(totalAmount * 0.03); // 3% processing fee
  const finalAmount = totalAmount + processingFee;

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {['doctor', 'datetime', 'details', 'payment', 'confirmation'].map((stepName, index) => {
                const stepIndex = ['doctor', 'datetime', 'details', 'payment', 'confirmation'].indexOf(step);
                const currentIndex = index;
                const isCompleted = currentIndex < stepIndex;
                const isCurrent = currentIndex === stepIndex;
                
                return (
                  <div key={stepName} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isCurrent ? 'bg-[#334036] text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    {index < 4 && (
                      <div className={`w-12 h-0.5 ml-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Step {['doctor', 'datetime', 'details', 'payment', 'confirmation'].indexOf(step) + 1} of 5: {
              step === 'doctor' ? 'Select Doctor' :
              step === 'datetime' ? 'Choose Date & Time' :
              step === 'details' ? 'Patient Details' :
              step === 'payment' ? 'Payment' :
              'Confirmation'
            }
          </div>
        </div>

        {/* Step 1: Doctor Selection */}
        {step === 'doctor' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-[#334036] mb-6">Select a Doctor</h1>
            
            <div className="space-y-4">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-[#8B664B] hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-[#F4EFEA] rounded-full flex items-center justify-center">
                      <span className="text-3xl">👨‍⚕️</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#334036] mb-1">{doctor.name}</h3>
                      <p className="text-[#8B664B] mb-2">{doctor.credentials}</p>
                      <p className="text-gray-600 text-sm mb-3">{doctor.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {doctor.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-[#F4EFEA] text-[#8B664B] text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Experience: {doctor.experience}</span>
                        <span className="text-lg font-semibold text-[#334036]">₹{doctor.consultationFee}</span>
                      </div>
                    </div>
                    
                    <div className="text-[#334036]">
                      <span className="text-sm">Select →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 'datetime' && selectedDoctor && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#334036]">Choose Date & Time</h1>
              <button 
                onClick={() => setStep('doctor')}
                className="text-[#8B664B] hover:underline"
              >
                ← Change Doctor
              </button>
            </div>

            {/* Selected Doctor Summary */}
            <div className="bg-[#F4EFEA] rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#334036]">{selectedDoctor.name}</h3>
                  <p className="text-sm text-[#8B664B]">Consultation Fee: ₹{selectedDoctor.consultationFee}</p>
                </div>
              </div>
            </div>

            {/* Consultation Type */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#334036] mb-3">Consultation Type</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { type: 'video', label: 'Video Call', icon: '📹', description: 'Face-to-face consultation' },
                  { type: 'audio', label: 'Audio Call', icon: '📞', description: 'Voice-only consultation' },
                  { type: 'chat', label: 'Chat', icon: '💬', description: 'Text-based consultation' }
                ].map(option => (
                  <button
                    key={option.type}
                    onClick={() => setConsultationType(option.type as any)}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      consultationType === option.type
                        ? 'border-[#8B664B] bg-[#F4EFEA]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium text-[#334036]">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#334036] mb-3">Select Date</h3>
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
                    <div className="text-sm font-medium">{dateInfo.display}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#334036] mb-3">Select Time</h3>
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
                          : 'border-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {formatTime(slot.time)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="flex justify-end">
                <button
                  onClick={handleDateTimeSelect}
                  className="bg-[#334036] hover:bg-[#273028] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Continue to Patient Details
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Patient Details */}
        {step === 'details' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#334036]">Patient Details</h1>
              <button 
                onClick={() => setStep('datetime')}
                className="text-[#8B664B] hover:underline"
              >
                ← Change Date/Time
              </button>
            </div>

            {/* Appointment Summary */}
            <div className="bg-[#F4EFEA] rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-[#334036] mb-2">Appointment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Doctor:</span>
                  <div className="font-medium">{selectedDoctor?.name}</div>
                </div>
                <div>
                  <span className="text-gray-600">Date & Time:</span>
                  <div className="font-medium">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}, {formatTime(selectedTime)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <div className="font-medium capitalize">{consultationType} Consultation</div>
                </div>
              </div>
            </div>

            <form onSubmit={handlePatientDetailsSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-[#334036] mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appointmentData.patientName || ''}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={appointmentData.patientEmail || ''}
                      onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={appointmentData.patientPhone || ''}
                      onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={appointmentData.patientAge || ''}
                      onChange={(e) => handleInputChange('patientAge', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Enter your age"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <div className="flex space-x-4">
                      {['male', 'female', 'other'].map(genderOption => (
                        <label key={genderOption} className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={genderOption}
                            checked={appointmentData.gender === genderOption}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="mr-2"
                          />
                          <span className="capitalize">{genderOption}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-semibold text-[#334036] mb-4">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chief Complaint / Primary Concern *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={appointmentData.chiefComplaint || ''}
                      onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Describe your main health concern or reason for consultation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical History
                    </label>
                    <textarea
                      rows={3}
                      value={appointmentData.medicalHistory || ''}
                      onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Any previous medical conditions, surgeries, or ongoing health issues"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <textarea
                      rows={2}
                      value={appointmentData.currentMedications || ''}
                      onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="List any medications you are currently taking"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      rows={2}
                      value={appointmentData.allergies || ''}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      placeholder="Any known allergies to medications, foods, or other substances"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setStep('datetime')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#334036] hover:bg-[#273028] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 'payment' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#334036]">Payment</h1>
              <button 
                onClick={() => setStep('details')}
                className="text-[#8B664B] hover:underline"
              >
                ← Edit Details
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div>
                <h3 className="text-lg font-semibold text-[#334036] mb-4">Payment Method</h3>
                
                <div className="space-y-4 mb-6">
                  {/* Payment Options */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center">
                      <input type="radio" name="payment" value="card" defaultChecked className="mr-3" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center">
                      <input type="radio" name="payment" value="upi" className="mr-3" />
                      <span className="font-medium">UPI Payment</span>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center">
                      <input type="radio" name="payment" value="wallet" className="mr-3" />
                      <span className="font-medium">Digital Wallet</span>
                    </label>
                  </div>
                </div>

                {/* Card Details Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B664B] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold text-[#334036] mb-4">Order Summary</h3>
                
                <div className="bg-[#F4EFEA] rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨‍⚕️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#334036]">{selectedDoctor?.name}</h4>
                      <p className="text-sm text-[#8B664B]">{selectedDoctor?.credentials}</p>
                      <p className="text-sm text-gray-600 capitalize">{consultationType} Consultation</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div>
                      <strong>Time:</strong> {formatTime(selectedTime)}
                    </div>
                    <div>
                      <strong>Patient:</strong> {appointmentData.patientName}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing Fee</span>
                    <span>₹{processingFee}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={handlePaymentSubmit}
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-[#334036] hover:bg-[#273028] disabled:bg-gray-400 text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${finalAmount}`
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 'confirmation' && showConfirmation && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            
            <h1 className="text-2xl font-bold text-[#334036] mb-4">Appointment Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked. You will receive a confirmation email shortly.
            </p>

            <div className="bg-[#F4EFEA] rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-[#334036] mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Appointment ID:</strong> APT-{Date.now()}</div>
                <div><strong>Doctor:</strong> {selectedDoctor?.name}</div>
                <div><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}</div>
                <div><strong>Time:</strong> {formatTime(selectedTime)}</div>
                <div><strong>Type:</strong> {consultationType} Consultation</div>
                <div><strong>Patient:</strong> {appointmentData.patientName}</div>
                <div><strong>Amount Paid:</strong> ₹{finalAmount}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-[#334036] hover:bg-[#273028] text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => {
                    setStep('doctor');
                    setSelectedDoctor(null);
                    setSelectedDate('');
                    setSelectedTime('');
                    setAppointmentData({});
                    setShowConfirmation(false);
                  }}
                  className="border border-[#334036] text-[#334036] hover:bg-[#F4EFEA] py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
              
              <p className="text-sm text-gray-600">
                You will receive joining instructions 15 minutes before your appointment via email and SMS.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
