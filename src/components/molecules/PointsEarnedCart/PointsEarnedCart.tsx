'use client';

import React from 'react';
import styles from './PointsEarnedCart.module.scss';

interface PointsEarnedCartProps {
  points: number;
  className?: string;
}

const PointsEarnedCart: React.FC<PointsEarnedCartProps> = ({ 
  points, 
  className 
}) => {
  return (
    <div className={`${styles['points-earned-cart']} ${className || ''}`}>
      <p className={styles['points-earned-cart__text']}>
        You earned <strong className={styles['points-earned-cart__points']}>{points} points</strong> with this order
      </p>
    </div>
  );
};

export default PointsEarnedCart;