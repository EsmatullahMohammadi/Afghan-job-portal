import React from 'react';

// Skeleton Component
const Skeleton = () => {
  return (
    <div className="space-y-4">
      <h1>Loading...</h1>
      {/* Repeat the Skeleton five times */}
      {[...Array(5)].map((_, index) => (
        <section
          key={index}
          className="card p-4 border border-gray-200 rounded-lg shadow-md animate-pulse"
        >
          <div className="flex gap-4 flex-col sm:flex-row items-start">
            {/* Skeleton for Image */}
            <div className="w-36 h-56 bg-gray-300 rounded-sm"></div>

            {/* Skeleton for Text Content */}
            <div className="flex-1 space-y-3">
              {/* Skeleton for Company Name */}
              <div className="h-4 bg-gray-300 rounded w-32"></div>

              {/* Skeleton for Job Title */}
              <div className="h-6 bg-gray-300 rounded w-40"></div>

              {/* Skeleton for Job Details */}
              <div className="flex flex-wrap gap-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-28"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>

              {/* Skeleton for Description */}
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Skeleton;
