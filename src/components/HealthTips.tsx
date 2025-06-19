
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const HealthTips = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const tips = [
    {
      icon: "🥗",
      title: "Nutrition Guidance",
      content: "Focus on a balanced diet rich in fruits, vegetables, lean proteins, and whole grains. Portion control is key to maintaining a healthy BMI.",
      color: "from-teal-400 to-emerald-600"
    },
    {
      icon: "🏃‍♀️",
      title: "Exercise Recommendations",
      content: "Aim for 150 minutes of moderate aerobic activity weekly. Combine cardio with strength training for optimal results and muscle maintenance.",
      color: "from-teal-400 to-cyan-600"
    },
    {
      icon: "😴",
      title: "Sleep & Recovery",
      content: "Quality sleep (7-9 hours) is crucial for weight management. Poor sleep affects hormones that regulate hunger and metabolism.",
      color: "from-teal-400 to-blue-600"
    },
    {
      icon: "💧",
      title: "Hydration Tips",
      content: "Drink plenty of water throughout the day. Sometimes thirst is mistaken for hunger. Aim for 8 glasses daily for optimal health.",
      color: "from-cyan-400 to-teal-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setActiveCard((prev) => (prev + 1) % tips.length);
        setIsTyping(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={`relative bg-gray-800 rounded-xl p-6 border border-gray-700 cursor-pointer transition-all duration-500 hover:scale-105 hover:border-teal-500/50 ${
            activeCard === index 
              ? 'shadow-xl shadow-teal-500/20 border-teal-500/50' 
              : 'hover:bg-gray-700/50'
          }`}
          onClick={() => setActiveCard(index)}
        >
          {/* Glow effect for active card */}
          {activeCard === index && (
            <div className="absolute inset-0 rounded-xl bg-teal-500/10 animate-pulse" />
          )}
          
          <div className="relative z-10">
            <div className="text-4xl mb-4 text-center">{tip.icon}</div>
            
            <h3 className="text-xl font-bold mb-4 text-center text-teal-400">
              {tip.title}
            </h3>
            
            <div className="relative">
              {isTyping && activeCard === index ? (
                <div className="flex items-center text-gray-400">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed text-sm">
                  {tip.content}
                </p>
              )}
            </div>
            
            {/* AI Assistant Indicator */}
            {activeCard === index && (
              <div className="mt-4 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse mr-2" />
                <span className="text-xs text-gray-400">AI Recommended</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthTips;
