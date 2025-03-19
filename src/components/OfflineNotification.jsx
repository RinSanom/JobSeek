import React from 'react';
import { CiWifiOff } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu"; // Using react-icons for WiFi and refresh icons

const OfflineNotification = () => {
  const handleRetry = () => {
    window.location.reload(); // Simple retry mechanism
  };

  return (
    <div className="fixed  top-0 left-0 right-0 z-80 w-full bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Left Section: Icon and Message */}
        <div className="flex items-center gap-3">
          <CiWifiOff className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
          <div>
            <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
              You are offline <span className="text-yellow-300">⚠️</span>
            </h3>
            <p className="text-sm md:text-base">Please check your internet connection</p>
          </div>
        </div>

        {/* Right Section: Retry Form/Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            <LuRefreshCw className="w-5 h-5 animate-spin-slow" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineNotification;