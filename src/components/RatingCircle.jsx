// src/components/RatingCircle/RatingCircle.jsx
import React from 'react';

const RatingCircle = ({ rating, size = 60 }) => {
  const normalizedRating = Math.min(Math.max(rating, 0), 10); // Ensure rating is 0-10
  const percentage = (normalizedRating / 10) * 100;
  const circumference = 2 * Math.PI * (size / 2 - 4); // size/2 - strokeWidth
  const offset = circumference - (percentage / 100) * circumference;

  let strokeColor;
  if (percentage >= 70) {
    strokeColor = 'stroke-green-500';
  } else if (percentage >= 40) {
    strokeColor = 'stroke-yellow-500';
  } else {
    strokeColor = 'stroke-red-500';
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-700"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={size / 2 - 4}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${strokeColor} transition-all duration-500 ease-out`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={size / 2 - 4}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-sm font-bold text-white">
        {normalizedRating.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingCircle;
