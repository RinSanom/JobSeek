import React from 'react';
import { RiWifiOffLine } from "react-icons/ri";
import { LuRefreshCw } from "react-icons/lu";



const OfflineNotification = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-80 w-full h-screen bg-white opacity-95 text-black shadow-lg flex items-center justify-center">
      <div className="w-full max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
          {/* Logo and Message Section */}
          <div className="flex items-center gap-3">
            <img 
              src={"/images/smallLogo.png"}   
              alt="logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-15 lg:w-15"
            />
            <RiWifiOffLine 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 animate-pulse" 
            />
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                You are offline <span className="text-yellow-300">⚠️</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base">
                Please check your internet connection
              </p>
            </div>
          </div>

          {/* Retry Button Section */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm  sm:py-2 bg-white text-red-600 rounded-lg font-medium border border-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <LuRefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
              <span className="text-sm sm:text-base">Retry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineNotification;