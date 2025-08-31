// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
      <p className="text-gray-600">جاري تحميل المنتجات...</p>
    </div>
  );
};

export default LoadingSpinner;
