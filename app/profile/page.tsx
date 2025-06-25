'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth';

interface UserData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  joinedDate: string;
  dominantDosha: string;
  profileImage?: string;
}

interface EditingField {
  field: keyof UserData;
  value: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    name: 'Abhay Singh Rathore',
    email: 'abhay.rathore@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    location: 'Mumbai, Maharashtra',
    joinedDate: '2024-01-15',
    dominantDosha: 'Vata',
  });

  const [activeTab, setActiveTab] = useState<'personal' | 'preferences'>('personal');
  const [isEditing, setIsEditing] = useState<EditingField | null>(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    // In a real app, you would fetch user data from an API
    // This is placeholder data for demonstration
  }, []);
  const handleEdit = (field: keyof UserData) => {
    const value = userData[field] || '';
    setIsEditing({ field, value });
    setTempValue(value);
  };

  const handleSave = () => {
    if (isEditing) {
      setUserData(prev => ({
        ...prev,
        [isEditing.field]: tempValue
      }));
      setIsEditing(null);
      setTempValue('');
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue('');
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/auth/login';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pitta': return 'bg-red-100 text-red-800 border-red-200';
      case 'kapha': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatJoinedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '📝' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
  ];  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#D7D0C0]/20 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#815C42] to-[#334036] px-8 py-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white/30">
                  {getInitials(userData.name)}
                </div>                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#ABB087] hover:bg-[#9a9e78] rounded-full flex items-center justify-center text-white text-sm transition-colors leading-none">
                  <span className="flex items-center justify-center w-full h-full text-center" style={{ transform: 'translateY(-2px)' }}>📷</span>
                </button>
              </div>
              
              {/* Profile Info */}
              <div className="text-center md:text-left text-white flex-1">
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-white/80 mb-3">{userData.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDoshaColor(userData.dominantDosha)}`}>
                    {userData.dominantDosha} Dominant
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30">
                    Member since {formatJoinedDate(userData.joinedDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-[#D7D0C0]/30">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#815C42] text-[#815C42]'
                      : 'border-transparent text-[#334036]/60 hover:text-[#334036] hover:border-[#D7D0C0]'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'personal' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#D7D0C0]/20">
                <h3 className="text-lg font-semibold text-[#334036] mb-6">Personal Information</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Full Name', field: 'name' as keyof UserData, value: userData.name },
                    { label: 'Email Address', field: 'email' as keyof UserData, value: userData.email },
                    { label: 'Phone Number', field: 'phone' as keyof UserData, value: userData.phone },
                    { label: 'Date of Birth', field: 'dateOfBirth' as keyof UserData, value: userData.dateOfBirth, type: 'date' },
                    { label: 'Gender', field: 'gender' as keyof UserData, value: userData.gender },
                    { label: 'Location', field: 'location' as keyof UserData, value: userData.location },
                  ].map((item) => (
                    <div key={item.field} className="flex items-center justify-between py-3 border-b border-[#D7D0C0]/20">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-[#334036]/70">{item.label}</label>
                        {isEditing?.field === item.field ? (
                          <input
                            type={item.type || 'text'}
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="block w-full mt-1 px-3 py-2 border border-[#D7D0C0] rounded-lg focus:ring-[#815C42] focus:border-[#815C42]"
                          />
                        ) : (
                          <p className="text-[#334036] mt-1">{item.value}</p>
                        )}
                      </div>
                      <div className="ml-4 flex space-x-2">
                        {isEditing?.field === item.field ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-[#815C42] hover:text-[#6e4f39] text-sm font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-[#334036]/50 hover:text-[#334036] text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEdit(item.field)}
                            className="text-[#815C42] hover:text-[#6e4f39] text-sm font-medium"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}          {activeTab === 'preferences' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#D7D0C0]/20">
                <h3 className="text-lg font-semibold text-[#334036] mb-6">Account Preferences</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-[#F7F5EF] rounded-lg">
                    <h4 className="font-medium text-[#334036] mb-3">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-[#D7D0C0] text-[#815C42] focus:ring-[#815C42]" defaultChecked />
                        <span className="ml-3 text-[#334036]">Email notifications for new recommendations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-[#D7D0C0] text-[#815C42] focus:ring-[#815C42]" />
                        <span className="ml-3 text-[#334036]">SMS notifications for important updates</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#D7D0C0]/20">
              <h3 className="text-lg font-semibold text-[#334036] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary py-3 rounded-lg">
                  Take Assessment
                </button>
                <button className="w-full btn-secondary py-3 rounded-lg">
                  View Recommendations
                </button>
                <button className="w-full btn-outline py-3 rounded-lg">
                  Download Report
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#D7D0C0]/20">
              <h3 className="text-lg font-semibold text-[#334036] mb-4">Account</h3>              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 text-[#334036] hover:bg-[#F7F5EF] rounded-lg transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-2 text-[#334036] hover:bg-[#F7F5EF] rounded-lg transition-colors">
                  Account Settings
                </button>
                <hr className="border-[#D7D0C0]/30" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-[#815C42] to-[#334036] rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-white/80 text-sm mb-4">
                Our support team is here to assist you with any questions.
              </p>
              <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 py-2 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}