
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-black flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <img src="/DQUOTE-LOGO.svg" alt="DQUOTE-LOGO" className="h-16" />
        </div>
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-[#2563ea] mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-blue-300 dark:border-blue-800 mx-auto animate-pulse"></div>
        </div>
        <p className="text-gray-600 dark:text-white mt-4 animate-pulse">Loading your feed...</p>
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 dark:bg-[#2563ea] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-[#2563ea] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-[#2563ea] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
