'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDosha } from "../../contexts/DoshaContext";

export default function BotPage() {
  const { currentDosha } = useDosha();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "Hello! I'm your Ayurvedic assistant. I can help with natural remedies and wellness advice based on Ayurvedic principles. How can I assist you today?", isUser: false, showOptions: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Refs to store timeout IDs for cleanup
  const thinkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSendTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const suggestedQuestions = [
    "How can I improve my digestion?",
    "Remedies for stress and anxiety?",
    "Ayurvedic solutions for skin problems?",
    "Help with joint pain and arthritis",
    "Tips for better sleep and insomnia",
    "Natural ways for weight management",
    "Remedies for cold and cough",
    "How to treat headaches naturally?",
    "Ayurvedic care for hair health",
    "Herbs for managing blood pressure"
  ];
  // Clean up all timeouts and states when component unmounts or screen loses focus
  useEffect(() => {
    // Add a forced timeout to ensure we don't get stuck in thinking or typing states
    const safetyTimeout = setTimeout(() => {
      if (isThinking || isTyping) {
        console.log("Safety timeout triggered - resetting states");
        setIsThinking(false);
        setIsTyping(false);
      }
    }, 10000); // 10 seconds safety timeout
    
    return () => {
      // Clear all timeouts
      if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current);
      if (autoSendTimeoutRef.current) clearTimeout(autoSendTimeoutRef.current);
      clearTimeout(safetyTimeout);
      
      // Reset states
      setIsThinking(false);
      setIsTyping(false);
    };
  }, []);  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Reset any existing timeouts to prevent state conflicts
    if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current);
    
    // Reset states in case we were already in thinking or typing state
    setIsThinking(false);
    setIsTyping(false);
    
    // Add user message to chat
    const userMessage = message.trim();
    setChatHistory(prev => [...prev, { id: prev.length + 1, text: userMessage, isUser: true, showOptions: false }]);
    setMessage(""); // Clear input field immediately
    
    // Scroll chat container to bottom without page scroll
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Shortened thinking/typing sequence with proper state transitions
    setTimeout(() => {
      setIsThinking(true);
      
      thinkingTimeoutRef.current = setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        
        typingTimeoutRef.current = setTimeout(() => {
          // Generate response based on user query
          let response = "";
          let showOptions = false;
          const lowercaseMsg = userMessage.toLowerCase();
          
          if (lowercaseMsg.includes("digest") || lowercaseMsg.includes("bloat") || lowercaseMsg.includes("constipation")) {
            response = "𝗗𝗶𝗴𝗲𝘀𝘁𝗶𝘃𝗲 𝗛𝗲𝗮𝗹𝘁𝗵\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nIndigestion, bloating, constipation\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Triphala (1/2 tsp) with warm water before bed\n• Ginger Tea: Fresh ginger slices boiled in water\n• Herbs: Ajwain, cumin, and fennel to enhance digestion\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Drink luke warm water throughout the day\n• Avoid heavy meals before bedtime";
          } else if (lowercaseMsg.includes("stress") || lowercaseMsg.includes("anxiety") || lowercaseMsg.includes("mental")) {
            response = "𝗦𝘁𝗿𝗲𝘀𝘀 & 𝗔𝗻𝘅𝗶𝗲𝘁𝘆\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nStress, anxiety, mental fatigue\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Ashwagandha (500 mg twice daily)\n• Brahmi or Jatamansi for calming the mind\n• Pranayama: Daily breathing exercises like Anulom Vilom\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Practice meditation for 10-15 minutes daily\n• Try tulsi tea before bed";
          } else if (lowercaseMsg.includes("skin") || lowercaseMsg.includes("acne") || lowercaseMsg.includes("eczema")) {
            response = "𝗦𝗸𝗶𝗻 𝗛𝗲𝗮𝗹𝘁𝗵\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nAcne, eczema, dry skin\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Neem + Turmeric Paste for acne\n• Aloe Vera Gel for skin hydration and soothing\n• Manjistha Powder to purify blood and enhance skin glow\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Drink water with lemon in the morning\n• Avoid excessive oily foods";
          } else if (lowercaseMsg.includes("joint") || lowercaseMsg.includes("arthritis") || lowercaseMsg.includes("pain")) {
            response = "𝗝𝗼𝗶𝗻𝘁 𝗣𝗮𝗶𝗻\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nArthritis, joint inflammation\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Turmeric & Ginger Tea for inflammation\n• Sesame Oil Massage: Warm oil massage to relieve stiffness\n• Shallaki (Boswellia) for reducing joint pain\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Keep the affected area warm and avoid cold exposure\n• Maintain a moderate exercise routine";
          } else if (lowercaseMsg.includes("sleep") || lowercaseMsg.includes("insomnia")) {
            response = "𝗜𝗻𝘀𝗼𝗺𝗻𝗶𝗮\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nTrouble sleeping, poor sleep quality\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Warm Milk + Nutmeg before bed\n• Ashwagandha for calming\n• Herbal Tea for relaxation\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Reduce screen time before bed\n• Practice light stretching or yoga";
          } else if (lowercaseMsg.includes("weight") || lowercaseMsg.includes("obesity") || lowercaseMsg.includes("fat")) {
            response = "𝗪𝗲𝗶𝗴𝗵𝘁 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nWeight loss, obesity\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Lemon + Ginger Water in the morning for metabolism\n• Triphala to improve digestion and metabolism\n• Guggulu to manage weight\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Eat smaller, balanced meals throughout the day\n• Regular physical activity";
          } else if (lowercaseMsg.includes("cold") || lowercaseMsg.includes("cough") || lowercaseMsg.includes("throat")) {
            response = "𝗖𝗼𝗹𝗱 & 𝗖𝗼𝘂𝗴𝗵\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nCommon cold, cough, sore throat\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Honey + Ginger Juice for soothing throat\n• Tulsi Tea for immunity and respiratory support\n• Licorice Root for cough relief\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Stay hydrated with warm fluids\n• Avoid cold foods and drinks";
          } else if (lowercaseMsg.includes("headache") || lowercaseMsg.includes("migraine")) {
            response = "𝗛𝗲𝗮𝗱𝗮𝗰𝗵𝗲/𝗠𝗶𝗴𝗿𝗮𝗶𝗻𝗲\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nHeadache, migraine\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Brahmi or Ashwagandha for stress-related headaches\n• Diluted Peppermint Oil massage on the temples\n• Cold Compress with sandalwood paste for relief\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Stay in a quiet, dark room\n• Stay hydrated throughout the day";
          } else if (lowercaseMsg.includes("hair") || lowercaseMsg.includes("dandruff") || lowercaseMsg.includes("bald")) {
            response = "𝗛𝗮𝗶𝗿 𝗛𝗲𝗮𝗹𝘁𝗵\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nHair fall, dandruff, dryness\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Amla Powder for strengthening hair\n• Bhringraj Oil massage for hair growth\n• Henna for scalp nourishment\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Avoid excessive heat or chemical treatments\n• Use natural oils for conditioning";
          } else if (lowercaseMsg.includes("blood pressure") || lowercaseMsg.includes("hypertension")) {
            response = "𝗛𝘆𝗽𝗲𝗿𝘁𝗲𝗻𝘀𝗶𝗼𝗻\n\n𝗣𝗿𝗼𝗯𝗹𝗲𝗺:\nHigh blood pressure\n\n𝗔𝘆𝘂𝗿𝘃𝗲𝗱𝗶𝗰 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻:\n• Ashwagandha for stress-related hypertension\n• Arjuna Bark Powder for heart health\n• Garlic or Tulsi for reducing blood pressure\n\n𝗔𝗱𝗱𝗶𝘁𝗶𝗼𝗻𝗮𝗹 𝗧𝗶𝗽𝘀:\n• Practice yoga to lower stress\n• Monitor salt intake and maintain a balanced diet";
          } else if (lowercaseMsg.includes("dosha") || lowercaseMsg.includes("vata") || lowercaseMsg.includes("pitta") || lowercaseMsg.includes("kapha")) {
            response = "In Ayurveda, your body constitution or 'dosha' guides your wellness plan. The three doshas are Vata (air/space), Pitta (fire/water), and Kapha (earth/water). Your assessment shows your primary dosha is " + (currentDosha?.primaryDosha || "not yet determined") + ". Each dosha benefits from specific diets, routines, and remedies. Would you like to know more about your dosha type?";
          } else {
            response = "I'm not able to provide specific advice for this query. For personalized guidance, you may want to consult with a qualified Ayurvedic practitioner.";
            showOptions = true; // Show the option buttons for this response
          }
            // Reset typing state before adding response
          setIsTyping(false);
          
          // Add response to chat history
          setTimeout(() => {
            setChatHistory(prev => [...prev, { 
              id: prev.length + 1, 
              text: response, 
              isUser: false, 
              showOptions: showOptions 
            }]);
            
            // Scroll chat container to bottom after adding the response
            const chatContainer = document.getElementById('chat-messages');
            if (chatContainer) {
              setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
              }, 50);
            }
          }, 50);
          
        }, 700); // Slightly longer typing time for realism
      }, 500); // Thinking time 
    }, 100);
  };
  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    // Prevent any page scrolling that might occur when clicking the button
    setTimeout(() => {
      // Make sure the focus stays in the chat area
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
      // Auto-send the question after a short delay
      autoSendTimeoutRef.current = setTimeout(() => handleSendMessage(), 100);
    }, 10);
  };
  const handleChatWithAgent = () => {
    // Add a system message to show the user their request has been registered
    setChatHistory(prev => [
      ...prev, 
      { 
        id: prev.length + 1, 
        text: "We've registered your request to speak with a human Ayurvedic expert. One of our specialists will connect with you shortly. In the meantime, feel free to continue asking other questions.", 
        isUser: false,
        showOptions: false
      }
    ]);
    
    // Scroll chat container to bottom after adding the message
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 50);
  };// Scroll to bottom of chat when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        // Find the chat messages container
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
          // Scroll the container instead of the entire page
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }
  }, [chatHistory, isThinking, isTyping]);return (
    <main className="min-h-screen bg-[#F7F5EF] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar for larger screens */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
              <h3 className="font-medium text-[#334036] mb-4">Suggested Topics</h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-[#F4EFEA] text-[#334036] transition-colors border border-transparent hover:border-[#E0D5CB]"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main chat area */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#815C42] to-[#334036] p-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">Ayurvedic Health Assistant</h1>
                <div className="hidden sm:flex items-center text-white/80 text-sm">
                  <span>AI-powered · Private · Secure</span>
                </div>
              </div>
              
              {/* Mobile suggested questions horizontal scroll */}
              <div className="lg:hidden overflow-x-auto py-3 px-4 border-b border-gray-100">
                <div className="flex space-x-2 min-w-max">
                  {suggestedQuestions.slice(0, 6).map((question, index) => (
                    <button
                      key={index}
                      className="bg-[#F4EFEA] text-[#8B664B] px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap border border-[#E0D5CB]"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
                {/* Chat container */}
              <div className="flex flex-col h-[calc(100vh-16rem)] sm:h-[500px]">
                <div className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth" id="chat-messages" style={{ overflowAnchor: 'none' }}>
                  {chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.isUser
                            ? 'bg-[#E8EDE9] text-[#334036] rounded-tr-none'
                            : 'bg-[#F4EFEA] text-[#334036] rounded-tl-none'
                        }`}
                      >
                        <div className="whitespace-pre-line text-sm sm:text-base">{msg.text}</div>
                        
                        {!msg.isUser && msg.showOptions && (
                          <div className="mt-3 pt-3 border-t border-[#E0D5CB]/50 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              className="flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-[#E0D5CB] hover:bg-[#F7F2ED] text-[#8B664B] text-sm transition-colors"
                              onClick={handleChatWithAgent}
                            >
                              <span className="mr-2">👨‍⚕️</span>
                              <span>Chat with Expert</span>
                            </button>
                            <button
                              className="flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-[#E0D5CB] hover:bg-[#F7F2ED] text-[#8B664B] text-sm transition-colors"
                              onClick={() => window.location.href = '/assessment'}
                            >
                              <span className="mr-2">📋</span>
                              <span>Take Assessment</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-[#F4EFEA] text-[#8B664B] rounded-tl-none text-sm">
                        Searching for information...
                      </div>
                    </div>
                  )}
                  
                  {isTyping && !isThinking && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl px-4 py-3 bg-[#F4EFEA] rounded-tl-none">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-[#8B664B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-[#8B664B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-[#8B664B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                    {/* This invisible div serves as a scroll target */}
                  <div ref={scrollRef} className="h-0 w-0" aria-hidden="true"></div>
                </div>
                
                {/* Input area */}
                <div className="border-t border-gray-100 p-4">
                  {(isTyping || isThinking) ? (
                    <button
                      className="w-full py-3 bg-white text-[#8B664B] font-medium rounded-lg border border-[#E0D5CB] hover:bg-[#F4EFEA] transition-colors"
                      onClick={() => {
                        if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
                        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                        if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current);
                        
                        setIsTyping(false);
                        setIsThinking(false);
                      }}
                    >
                      Stop generating
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask about Ayurvedic remedies..."
                        className="flex-grow px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#8B664B] focus:border-[#8B664B] text-[#334036]"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      <button
                        className={`p-3 rounded-lg ${
                          message.trim() === ''
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#334036] text-white hover:bg-[#283028] transition-colors'
                        }`}
                        onClick={handleSendMessage}
                        disabled={message.trim() === ''}
                        aria-label="Send message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-center text-gray-500">
                    This AI assistant provides general Ayurvedic information, not medical advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
