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
  iconPath,
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
          <div className={styles['reward__percent-content']}>
            <div className={styles['reward__percent-wrapper']}>
              <span className={styles['reward__percent-number']}>{percentage}</span>
              <span className={styles['reward__percent-sign']}>%</span>
            </div>
            <span className={styles['reward__percent-off']}>OFF</span>
          </div>
        );
      
      case 'employee':
        return (
          <div className={styles['reward__percent-content']}>
            <div className={styles['reward__percent-wrapper']}>
              <span className={styles['reward__percent-number--large']}>30</span>
              <span className={styles['reward__percent-sign']}>%</span>
            </div>
            <span className={styles['reward__percent-off']}>OFF</span>
          </div>
        );
      
      case 'icon':
        return iconPath ? (
          <Image 
            src={iconPath}
            alt="Reward icon"
            width={72}
            height={72}
            className={styles['reward__icon']}
          />
        ) : null;
      
      case 'default':
      case 'expiring':
      case 'simple':
      default:
        return (
          <div className={styles['reward__amount-wrapper']}>
            <span className={styles['reward__dollar-sign']}>$</span>
            <span className={styles['reward__amount']}>{amount}</span>
          </div>
        );
    }
  };

  const renderLabel = () => {
    if (!showLabel || variant === 'simple') return null;

    if (variant === 'birthday') {
      return (
        <div className={styles['reward__label--multiline']}>
          <span>BIRTHDAY</span>
          <span>REWARD</span>
        </div>
      );
    }

    return <div className={styles['reward__label']}>REWARD</div>;
  };

  const renderExpiration = () => {
    if (!showExpiration || variant === 'simple') return null;

    if (variant === 'expiring' || isExpiring) {
      return (
        <div className={styles['reward__expiry--alert']}>
          Expiring 9/20/2024
        </div>
      );
    }

    return (
      <div className={styles['reward__expiry']}>
        {expirationDate}
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