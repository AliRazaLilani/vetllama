import React, { useState } from 'react';

export function InteractiveError({ 
  title = "Something went wrong",
  message = "We encountered an unexpected error while loading this page." 
}) {

  return (
    <div className="h-screen flex items-center justify-center">
    <div className="flex min-h-[250px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-md font-sans">
        
        {/* Warning / Error Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 stroke-red-500" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-gray-500">{message}</p>

        {/* Primary Actions */}
        <div className="flex justify-center gap-3">
          <button 
            onClick={()=> window.location.reload()}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}