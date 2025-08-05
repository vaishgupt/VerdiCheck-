import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  const handleStartAnalysis = () => {
    // Simple page redirect - works without any external libraries
    window.location.href = '/Main';
    

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
            Welcome to
          </h1>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent mb-12 leading-tight">
            VerdiCheck
          </h1>
        </div>

        {/* Description */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Advanced Codeforces submission analysis platform that detects suspicious patterns 
            and provides comprehensive insights into competitive programming profiles.
          </p>
        </div>

        {/* Start Analysis Button */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button 
           onClick={handleStartAnalysis}
          className="group bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2 mx-auto">
            <span>Start Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;