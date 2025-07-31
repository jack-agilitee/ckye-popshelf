'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import styles from './PointsEarningCart.module.scss';

interface PointsEarningCartProps {
  points: number;
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onRegister?: () => void;
  className?: string;
}

const PointsEarningCart: React.FC<PointsEarningCartProps> = ({ 
  points, 
  isAuthenticated = false,
  onSignIn,
  onRegister,
  className 
}) => {
  return (
    <div className={`${styles['points-earning-cart']} ${className || ''}`}>
      <div className={styles['points-earning-cart__content']}>
        <div className={styles['points-earning-cart__logo']}>
          <Image 
            src="/logos/main-logo.svg"
            alt="PopShelf Perks"
            width={96}
            height={34}
            className={styles['points-earning-cart__logo-image']}
          />
        </div>
        
        <div className={styles['points-earning-cart__text']}>
          <p className={styles['points-earning-cart__message']}>
            Earn up to <strong className={styles['points-earning-cart__points']}>{points} points</strong>
          </p>
          <p className={styles['points-earning-cart__subtitle']}>with this order</p>
        </div>
      </div>

      {!isAuthenticated && (
        <div className={styles['points-earning-cart__actions']}>
          <Button
            variant="secondary"
            onClick={onSignIn}
            className={styles['points-earning-cart__button']}
            ariaLabel="Sign in to earn points"
          >
            SIGN IN
          </Button>
          <Button
            variant="primary"
            onClick={onRegister}
            className={styles['points-earning-cart__button']}
            ariaLabel="Register to earn points"
          >
            REGISTER
          </Button>
        </div>
      )}
    </div>
  );
};

export default PointsEarningCart;