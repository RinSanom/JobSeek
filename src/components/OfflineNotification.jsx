import React from 'react';
import { RiWifiOffLine } from "react-icons/ri";
import { LuRefreshCw } from "react-icons/lu";



const OfflineNotification = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex bg-white h-screen justify-center shadow-lg text-black w-full fixed inset-0 items-center opacity-95 z-80">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex flex-col justify-center gap-6 items-center md:gap-12 sm:flex-row sm:gap-8">
          {/* Logo and Message Section */}
          <div className="flex gap-3 items-center">
            <img 
              src={"public/images/picsvg_download.svg"}   
              alt="logo" 
              className="h-8 w-8 lg:h-15 lg:w-15 md:h-12 md:w-12 sm:h-10 sm:w-10"
            />
            <RiWifiOffLine 
              className="h-8 w-8 animate-pulse lg:h-15 lg:w-15 md:h-12 md:w-12 sm:h-10 sm:w-10" 
            />
            <div>
              <h3 className="flex text-base font-semibold gap-2 items-center lg:text-2xl md:text-xl sm:text-lg">
                You are offline <span className="text-yellow-300">⚠️</span>
              </h3>
              <p className="text-xs md:text-base sm:text-sm">
                Please check your internet connection
              </p>
            </div>
          </div>

          {/* Retry Button Section */}
          <div className="flex justify-center items-center">
            <button
              onClick={handleRetry}
              className="flex bg-white border border-red-600 rounded-lg text-red-600 duration-200 font-medium gap-2 hover:bg-gray-100 items-center px-3 py-1.5 sm sm:px-4 sm:py-2 transition-colors"
            >
              <LuRefreshCw className="h-4 w-4 animate-spin-slow sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Retry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineNotification;