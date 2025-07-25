'use client';

import React from 'react';
import styles from './PointsEarned.module.scss';

interface PointsEarnedProps {
  points: number;
  className?: string;
}

const PointsEarned: React.FC<PointsEarnedProps> = ({ points, className }) => {
  return (
    <div className={`${styles['points-earned']} ${className || ''}`}>
      <div className={styles['points-earned__icon-wrapper']}>
        <svg 
          className={styles['points-earned__icon']} 
          viewBox="0 0 47 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="23.4395" cy="24" rx="23.4395" ry="24" fill="#3AB44A"/>
        </svg>
        <span className={styles['points-earned__number']}>{points}</span>
      </div>
      <p className={styles['points-earned__text']}>
        points will be earned when you complete this order.
      </p>
    </div>
  );
};

export default PointsEarned;