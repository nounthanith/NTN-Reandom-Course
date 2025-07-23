// LoadingCard.jsx
import React from "react";

function LoadingCard() {
  return (
    <div className="w-full max-w-sm p-4 bg-base-100 border border-base-300 rounded-xl shadow animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-base-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-3 bg-base-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-base-200 rounded w-full"></div>
        <div className="text-center font-bold text-2xl text-base-content">
          Wait...<span className="loading loading-bars loading-xs"></span>
        </div>
        <div className="h-3 bg-base-200 rounded w-2/3"></div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-8 w-20 bg-base-300 rounded"></div>
        <div className="h-8 w-20 bg-base-300 rounded"></div>
      </div>
    </div>
  );
}

export default LoadingCard;
