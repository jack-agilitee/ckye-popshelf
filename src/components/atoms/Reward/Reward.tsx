'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Reward.module.scss';

export type RewardVariant = 'default' | 'percent' | 'employee' | 'birthday' | 'icon' | 'expiring' | 'simple';

interface RewardProps {
  /** The variant of the reward badge */
  variant?: RewardVariant;
  /** Dollar amount (for default, expiring, simple variants) */
  amount?: number;
  /** Percentage value (for percent, employee, birthday variants) */
  percentage?: number;
  /** Icon path (for icon variant) */
  iconPath?: string;
  /** Whether to show the "REWARD" label */
  showLabel?: boolean;
  /** Whether to show expiration date */
  showExpiration?: boolean;
  /** Expiration date text */
  expirationDate?: string;
  /** Whether this is expiring soon (shows red text) */
  isExpiring?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const Reward: React.FC<RewardProps> = ({ 
  variant = 'default',
  amount = 5,
  percentage = 15,
  iconPath = '/loyalty/cake.svg',
  showLabel = true,
  showExpiration = true,
  expirationDate = 'Exp. 12/10/2024',
  isExpiring = false,
  className 
}) => {
  const renderBadgeContent = () => {
    switch (variant) {
      case 'percent':
      case 'birthday':
        return (
          <>
            <div className={styles['reward__percent-line']}>
              <span className={styles['reward__percent-number']}>{percentage}</span>
              <span className={styles['reward__percent-sign']}>%</span>
            </div>
            <div className={styles['reward__off-text']}>OFF</div>
          </>
        );
      
      case 'employee':
        return (
          <>
            <div className={styles['reward__percent-line']}>
              <span className={styles['reward__percent-number--employee']}>30</span>
              <span className={styles['reward__percent-sign']}>%</span>
            </div>
            <div className={styles['reward__off-text']}>OFF</div>
          </>
        );
      
      case 'icon':
        return (
          <Image 
            src={iconPath}
            alt="Reward icon"
            width={72}
            height={72}
            className={styles['reward__icon']}
          />
        );
      
      case 'default':
      case 'expiring':
      case 'simple':
      default:
        return (
          <div className={styles['reward__dollar-line']}>
            <span className={styles['reward__dollar-sign']}>$</span>
            <span className={styles['reward__dollar-amount']}>{amount}</span>
          </div>
        );
    }
  };

  const renderLabel = () => {
    if (!showLabel || variant === 'simple') return null;

    if (variant === 'birthday') {
      return (
        <div className={styles['reward__label']}>
          BIRTHDAY<br />REWARD
        </div>
      );
    }

    return <div className={styles['reward__label']}>REWARD</div>;
  };

  const renderExpiration = () => {
    if (!showExpiration || variant === 'simple') return null;

    const isExpiringVariant = variant === 'expiring' || isExpiring;
    
    return (
      <div className={isExpiringVariant ? styles['reward__expiry--alert'] : styles['reward__expiry']}>
        {isExpiringVariant ? 'Expiring 9/20/2024' : expirationDate}
      </div>
    );
  };

  return (
    <div className={`${styles.reward} ${className || ''}`}>
      <div className={styles['reward__badge']}>
        {renderBadgeContent()}
      </div>
      {renderLabel()}
      {renderExpiration()}
    </div>
  );
};

export default Reward;