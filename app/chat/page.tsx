'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'user' | 'doctor';
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock appointment data
  const appointment = {
    doctor: 'Dr. Akanksha Singh',
    date: new Date().toLocaleDateString(),
    time: '2:30 PM',
    type: 'Chat Consultation'
  };

  useEffect(() => {
    // Simulate connecting to chat
    const timer = setTimeout(() => {
      setIsConnected(true);
      // Add initial doctor message
      const welcomeMessage: Message = {
        id: '1',
        sender: 'doctor',
        message: `Hello! I'm Dr. Akanksha Singh. I'm here to help you with your health concerns. How are you feeling today?`,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  // Auto-scroll removed for better user control
  // Function removed - auto-scroll disabled for better user control

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate doctor typing
    setIsTyping(true);
    
    // Simulate doctor response
    setTimeout(() => {
      setIsTyping(false);
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        message: getDoctorResponse(newMessage),
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000 + Math.random() * 2000);
  };

  const getDoctorResponse = (userMessage: string): string => {
    const responses = [
      "Thank you for sharing that information. Can you tell me more about when these symptoms started?",
      "I understand your concern. Based on what you've described, I'd like to ask a few more questions to better understand your condition.",
      "That's helpful information. In Ayurveda, we look at the balance of doshas. Have you noticed any patterns with your symptoms?",
      "I see. Let me suggest some natural remedies that might help. Have you tried any Ayurvedic treatments before?",
      "Based on your description, I recommend we schedule a video consultation for a more detailed assessment. In the meantime, here are some suggestions..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        message: `Shared file: ${file.name}`,
        timestamp: new Date(),
        type: 'file'
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-0">
      <div className="max-w-4xl mx-auto h-[calc(100vh-5rem)] flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard"
              className="text-[#8B664B] hover:text-[#73543C] transition-colors"
            >
              ← Back
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#F4EFEA] rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#334036]">{appointment.doctor}</h1>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">
                    {isConnected ? 'Online' : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
            <div className="flex items-center space-x-3">
            <Link 
              href="/voice"
              className="p-2 text-[#8B664B] hover:bg-[#F4EFEA] rounded-lg transition-colors"
              title="Start Voice Call"
            >
              📞
            </Link>
            <Link 
              href="/call"
              className="p-2 text-[#8B664B] hover:bg-[#F4EFEA] rounded-lg transition-colors"
              title="Start Video Call"
            >
              📹
            </Link>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white px-6 py-4 overflow-y-auto">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center mb-4 animate-pulse">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-lg font-medium text-[#334036] mb-2">Connecting to Chat</h3>
              <p className="text-gray-600">Please wait while we connect you with {appointment.doctor}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {message.sender === 'doctor' ? (
                        <span className="text-lg">👨‍⚕️</span>
                      ) : (
                        <div className="w-8 h-8 bg-[#8B664B] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">You</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-[#334036] text-white'
                        : 'bg-[#F4EFEA] text-[#334036]'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <span className={`text-xs mt-1 block ${
                        message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-lg">👨‍⚕️</span>
                    </div>
                    <div className="bg-[#F4EFEA] rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t px-6 py-4 rounded-b-2xl">
          <div className="flex items-end space-x-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-[#8B664B] hover:bg-[#F4EFEA] rounded-full transition-colors"
            >
              📎
            </button>
            
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? "Type your message..." : "Please wait..."}
                disabled={!isConnected}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-[#8B664B] focus:border-transparent disabled:bg-gray-100"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected}
              className="p-3 bg-[#334036] text-white rounded-full hover:bg-[#273028] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ➤
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>
      </div>
    </main>
  );
}
