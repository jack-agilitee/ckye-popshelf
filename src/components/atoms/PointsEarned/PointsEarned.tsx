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
        <div className={styles['points-earned__icon']}>
          <span className={styles['points-earned__number']}>{points}</span>
        </div>
      </div>
      <p className={styles['points-earned__text']}>
        points will be earned when you complete this order.
      </p>
    </div>
  );
};

export default PointsEarned;