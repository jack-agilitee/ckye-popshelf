'use client';

import React from 'react';
import styles from './ReviewStars.module.scss';

interface ReviewStarsProps {
  rating: number;
  showCount?: boolean;
  reviewCount?: number;
  className?: string;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({
  rating,
  showCount = false,
  reviewCount = 0,
  className
}) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));
  
  // Generate unique ID for gradient to avoid conflicts when multiple instances exist
  const gradientId = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;

  // Calculate the fill percentage
  const fillPercentage = (clampedRating / 5) * 100;

  return (
    <div 
      className={`${styles['review-stars']} ${className || ''}`}
      role="img"
      aria-label={`${clampedRating} out of 5 stars${showCount ? ` (${reviewCount} reviews)` : ''}`}
    >
      <div className={styles['review-stars__container']}>
        {/* SVG with gradient definition */}
        <svg 
          className={styles['review-stars__svg']}
          width="0" 
          height="0"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId}>
              <stop offset={`${fillPercentage}%`} stopColor="#FFC700" />
              <stop offset={`${fillPercentage}%`} stopColor="#A3A3A3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Stars */}
        <div className={styles['review-stars__stars']}>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={styles['review-stars__star']}
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04944 0.271151C6.13442 0.105206 6.30943 0 6.5007 0C6.69197 0 6.86754 0.105206 6.95196 0.271151L8.57048 3.44226C8.64368 3.58569 8.7856 3.68521 8.94966 3.70825L12.5695 4.21666C12.7591 4.24323 12.9162 4.37176 12.9754 4.54774C13.0345 4.72371 12.9852 4.91732 12.848 5.04638L10.2291 7.51494C10.1105 7.62665 10.0566 7.78771 10.0841 7.94552L10.7022 11.4312C10.7345 11.6139 10.6571 11.7983 10.5017 11.9073C10.3466 12.0158 10.1416 12.0301 9.97165 11.9445L6.73404 10.2986C6.58764 10.224 6.41236 10.224 6.26568 10.2986L3.02807 11.9442C2.85867 12.0301 2.65309 12.016 2.498 11.9073C2.34291 11.7986 2.2655 11.6139 2.29775 11.4312L2.91588 7.94552C2.94393 7.78771 2.88952 7.62665 2.77088 7.51494L0.151964 5.04638C0.01482 4.91704 -0.0345407 4.72371 0.024636 4.54774C0.0838128 4.37176 0.24115 4.24323 0.43102 4.21666L4.05118 3.70825C4.21497 3.68521 4.35688 3.58569 4.43008 3.44198L6.04944 0.271151Z"
                fill={`url(#${gradientId})`}
              />
            </svg>
          ))}
        </div>
      </div>

      {showCount && (
        <span className={styles['review-stars__count']}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default ReviewStars;