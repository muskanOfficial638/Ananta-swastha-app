'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  MicrophoneIcon, 
  SpeakerWaveIcon, 
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { 
  PhoneIcon as PhoneIconSolid,
  MicrophoneIcon as MicrophoneIconSolid,
  SpeakerWaveIcon as SpeakerWaveIconSolid 
} from '@heroicons/react/24/solid';

export default function VoiceClient() {
  const router = useRouter();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnSpeaker, setIsOnSpeaker] = useState(false);
  const [callQuality, setCallQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [showEndCallConfirm, setShowEndCallConfirm] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [networkSpeed, setNetworkSpeed] = useState<'high' | 'medium' | 'low'>('high');
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  // Mock appointment data
  const appointment = {
    doctor: 'Dr. Akanksha Singh',
    specialty: 'Ayurvedic Medicine Specialist',
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: '2:30 PM',
    duration: '30 minutes',
    type: 'Audio Consultation',
    avatar: '👩‍⚕️'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
        // Simulate call quality changes based on network conditions
        if (Math.random() > 0.97) {
          const qualities: ('excellent' | 'good' | 'poor')[] = ['excellent', 'good', 'poor'];
          const speeds: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
          setCallQuality(qualities[Math.floor(Math.random() * qualities.length)]);
          setNetworkSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Simulate network monitoring
  useEffect(() => {
    const checkNetwork = () => {
       // if (navigator.onLine) {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          if (effectiveType === '4g') setNetworkSpeed('high');
          else if (effectiveType === '3g') setNetworkSpeed('medium');
          else setNetworkSpeed('low');
        }
      }
    };

    checkNetwork();
    window.addEventListener('online', checkNetwork);
    window.addEventListener('offline', () => setConnectionError('Network disconnected'));

    return () => {
      window.removeEventListener('online', checkNetwork);
      window.removeEventListener('offline', () => {});
    };
  }, []);
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinCall = async () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Check for microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: false, 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Simulate WebRTC connection process
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve(true);
          } else {
            reject(new Error('Connection failed'));
          }
        }, 2000 + Math.random() * 2000); // 2-4 second connection time
      });
      
      setIsConnecting(false);
      setIsCallActive(true);
      
      // Start with optimal audio settings
      if (audioRef.current) {
        audioRef.current.volume = isOnSpeaker ? 0.8 : 0.6;
      }
      
    } catch (error) {
      console.error('Error joining call:', error);
      setIsConnecting(false);
      setConnectionError(
        error instanceof Error && error.message.includes('Permission denied') 
          ? 'Microphone access denied. Please allow microphone access and try again.'
          : 'Failed to connect to the call. Please check your internet connection and try again.'
      );
    }
  };
  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    setIsConnecting(false);
    setShowEndCallConfirm(false);
    setConnectionError(null);
    setNotes('');
    setShowNotes(false);
    
    // Stop any active audio streams
    if (audioRef.current?.srcObject) {
      const stream = audioRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    router.push('/dashboard');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In real app, you would mute/unmute the audio track
    if (audioRef.current?.srcObject) {
      const stream = audioRef.current.srcObject as MediaStream;
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted; // Toggle enabled state
      });
    }
  };

  const toggleSpeaker = () => {
    setIsOnSpeaker(!isOnSpeaker);
    // In real app, you would switch audio output device
    if (audioRef.current) {
      audioRef.current.volume = !isOnSpeaker ? 0.8 : 0.6;
    }
  };

  const retryConnection = () => {
    setConnectionError(null);
    handleJoinCall();
  };
  const getCallQualityInfo = () => {
    switch (callQuality) {
      case 'excellent': 
        return { 
          color: 'text-green-500', 
          bgColor: 'bg-green-500/20', 
          icon: <CheckCircleIcon className="w-4 h-4" />,
          text: 'Excellent',
          bars: 4
        };
      case 'good': 
        return { 
          color: 'text-yellow-500', 
          bgColor: 'bg-yellow-500/20', 
          icon: <SignalIcon className="w-4 h-4" />,
          text: 'Good',
          bars: 3
        };
      case 'poor': 
        return { 
          color: 'text-red-500', 
          bgColor: 'bg-red-500/20', 
          icon: <ExclamationTriangleIcon className="w-4 h-4" />,
          text: 'Poor',
          bars: 1
        };
      default: 
        return { 
          color: 'text-green-500', 
          bgColor: 'bg-green-500/20', 
          icon: <CheckCircleIcon className="w-4 h-4" />,
          text: 'Excellent',
          bars: 4
        };
    }
  };

  const getNetworkSpeedInfo = () => {
    switch (networkSpeed) {
      case 'high': return { color: 'text-green-500', text: 'High Speed' };
      case 'medium': return { color: 'text-yellow-500', text: 'Medium Speed' };
      case 'low': return { color: 'text-red-500', text: 'Low Speed' };
      default: return { color: 'text-green-500', text: 'High Speed' };
    }
  };

  const renderSignalBars = (activeCount: number) => {
    return (
      <div className="flex items-end space-x-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1 rounded-sm transition-colors ${
              bar <= activeCount ? 'bg-current' : 'bg-white/30'
            }`}
            style={{ height: `${bar * 3 + 6}px` }}
          />
        ))}
      </div>
    );
  };
  const callQualityInfo = getCallQualityInfo();
  const networkInfo = getNetworkSpeedInfo();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#334036] via-[#2A5A31] to-[#815C42] text-white overflow-hidden">
      <audio ref={audioRef} autoPlay />
      
      {/* Connection Error Banner */}
      {connectionError && (
        <div className="absolute top-0 left-0 right-0 bg-red-500/90 backdrop-blur-sm text-white p-4 z-50">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{connectionError}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={retryConnection}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => setConnectionError(null)}
                className="text-white/80 hover:text-white"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!isCallActive && !isConnecting ? (
        // Pre-call lobby with modern design
        <div className="min-h-screen flex items-center justify-center p-4 pt-16">
          <div className="max-w-lg w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl text-gray-900 overflow-hidden border border-white/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#815C42] to-[#334036] p-8 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MicrophoneIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Voice Consultation</h1>
                <p className="opacity-90 text-sm">High-quality audio consultation</p>
              </div>
            </div>
            
            <div className="p-8">
              {/* Doctor Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F4EFEA] to-[#E8DDD4] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">{appointment.avatar}</span>
                </div>
                <h2 className="text-xl font-bold text-[#334036] mb-1">{appointment.doctor}</h2>
                <p className="text-sm text-[#815C42] font-medium mb-2">{appointment.specialty}</p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                  <span>{appointment.date}</span>
                  <span>•</span>
                  <span>{appointment.time}</span>
                  <span>•</span>
                  <span>{appointment.duration}</span>
                </div>
              </div>
              
              {/* Network Status */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#334036] text-sm">Connection Status</h3>
                  <div className={`flex items-center space-x-1 ${networkInfo.color}`}>
                    {renderSignalBars(networkSpeed === 'high' ? 4 : networkSpeed === 'medium' ? 3 : 1)}
                    <span className="text-xs font-medium">{networkInfo.text}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  {navigator.onLine ? 'Connected to internet' : 'No internet connection'}
                </div>
              </div>
              
              {/* Audio Settings */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-[#334036] mb-4 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Audio Settings
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={toggleMute}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                      !isMuted 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                        : 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                    }`}
                  >
                    {!isMuted ? <MicrophoneIconSolid className="w-4 h-4" /> : <SpeakerXMarkIcon className="w-4 h-4" />}
                    <span>{!isMuted ? 'Mic On' : 'Mic Off'}</span>
                  </button>
                  <button
                    onClick={toggleSpeaker}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                      isOnSpeaker 
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-gray-500 text-white shadow-lg shadow-gray-500/25'
                    }`}
                  >
                    <SpeakerWaveIconSolid className="w-4 h-4" />
                    <span>{isOnSpeaker ? 'Speaker' : 'Earpiece'}</span>
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleJoinCall}
                  disabled={!navigator.onLine}
                  className="w-full bg-gradient-to-r from-[#334036] to-[#273028] hover:from-[#273028] hover:to-[#1a1e1b] text-white py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#334036]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <PhoneIconSolid className="w-5 h-5" />
                    <span>Join Voice Call</span>
                  </span>
                </button>
                <Link
                  href="/dashboard"
                  className="block w-full text-center py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
                >
                  Cancel Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : isConnecting ? (
        // Enhanced connecting state
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            {/* Animated Connection Visual */}
            <div className="relative mb-8">
              <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-ping">
                  <PhoneIconSolid className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Connecting...</h2>
            <p className="text-white/80 mb-8 text-lg">
              Establishing secure connection with<br />
              <span className="font-semibold text-white">{appointment.doctor}</span>
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-white/70 mb-4">
                Setting up encrypted audio channel...
              </div>
              <button
                onClick={() => {
                  setIsConnecting(false);
                  setConnectionError(null);
                  router.push('/dashboard');
                }}
                className="px-8 py-3 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium"
              >
                Cancel Connection
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Modern active call interface
        <div className="min-h-screen flex flex-col">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-black/30 to-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="font-bold text-lg">{formatDuration(callDuration)}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/20"></div>
                <div className="hidden sm:flex items-center space-x-3">
                  <span className="text-white/80">Connected with</span>
                  <span className="font-semibold">{appointment.doctor}</span>
                </div>
              </div>
              
              {/* Call Quality Indicator */}
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${callQualityInfo.bgColor} ${callQualityInfo.color}`}>
                  {callQualityInfo.icon}
                  <span className="text-sm font-medium">{callQualityInfo.text}</span>
                  {renderSignalBars(callQualityInfo.bars)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Call Area */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              {/* Doctor Avatar with Audio Visualizer */}
              <div className="relative mb-8">
                <div className="w-64 h-64 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/20 backdrop-blur-sm border border-white/10">
                  <div className="w-56 h-56 bg-gradient-to-br from-white/10 to-transparent rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-8xl drop-shadow-lg">{appointment.avatar}</span>
                  </div>
                </div>
                
                {/* Audio Wave Animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-end space-x-1 opacity-60">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-green-400 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${0.5 + Math.random() * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2 drop-shadow-sm">{appointment.doctor}</h1>
              <p className="text-white/80 text-lg mb-6">{appointment.specialty}</p>
              
              {/* Status Indicators */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className={`flex items-center space-x-2 ${callQualityInfo.color}`}>
                  {callQualityInfo.icon}
                  <span className="text-sm font-medium">{callQualityInfo.text} Audio</span>
                </div>
                <div className={`flex items-center space-x-2 ${networkInfo.color}`}>
                  <SignalIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{networkInfo.text}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Controls */}
          <div className="bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-lg p-6">
            <div className="max-w-2xl mx-auto">
              {/* Primary Controls */}
              <div className="flex items-center justify-center space-x-8 mb-6">
                <button
                  onClick={toggleMute}
                  className={`group w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg ${
                    isMuted 
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                      : 'bg-white/20 hover:bg-white/30 shadow-white/20'
                  }`}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-7 h-7 text-white drop-shadow-sm" />
                  ) : (
                    <MicrophoneIconSolid className="w-7 h-7 text-white drop-shadow-sm" />
                  )}
                </button>
                
                <button
                  onClick={toggleSpeaker}
                  className={`group w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg ${
                    isOnSpeaker 
                      ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30' 
                      : 'bg-white/20 hover:bg-white/30 shadow-white/20'
                  }`}
                >
                  <SpeakerWaveIconSolid className="w-7 h-7 text-white drop-shadow-sm" />
                </button>
                
                <button
                  onClick={() => setShowEndCallConfirm(true)}
                  className="group w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-xl shadow-red-500/30"
                >
                  <PhoneIcon className="w-8 h-8 text-white drop-shadow-sm transform rotate-[135deg]" />
                </button>
              </div>
              
              {/* Secondary Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Link 
                  href="/chat"
                  className="group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-white/10"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Chat</span>
                </Link>
                
                <button 
                  onClick={() => setShowNotes(!showNotes)}
                  className="group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-white/10"
                >
                  <ClipboardDocumentListIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Notes Modal */}
      {showNotes && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full text-gray-900 shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#334036]">Session Notes</h3>
                <button
                  onClick={() => setShowNotes(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during your consultation..."
                className="w-full h-40 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#334036] focus:border-transparent"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowNotes(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Save notes logic
                    setShowNotes(false);
                  }}
                  className="flex-1 py-2 bg-[#334036] text-white rounded-lg hover:bg-[#273028] transition-colors font-medium"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced End Call Modal */}
      {showEndCallConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full text-gray-900 shadow-2xl">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-8 h-8 text-red-500 transform rotate-[135deg]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">End Consultation?</h3>
                <p className="text-gray-600">Are you sure you want to end this voice consultation with {appointment.doctor}?</p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleEndCall}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  End Call
                </button>
                <button
                  onClick={() => setShowEndCallConfirm(false)}
                  className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
