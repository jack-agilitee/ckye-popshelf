'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Reward.module.scss';

interface RewardProps {
  /** Dollar amount to display (e.g., 5 for $5) */
  dollar?: number;
  /** Percentage to display (e.g., 15 for 15% OFF) */
  percentage?: number;
  /** Path to icon image */
  icon?: string;
  /** Label text (defaults to "REWARD") */
  label?: string;
  /** Whether this is a birthday reward (shows "BIRTHDAY REWARD" on two lines) */
  isBirthday?: boolean;
  /** Whether this is an employee discount (shows 30% OFF) */
  isEmployee?: boolean;
  /** Expiration date (will automatically show in red if within 5 days) */
  expirationDate?: Date;
  /** Whether to hide the label */
  hideLabel?: boolean;
  /** Whether to hide the expiration date */
  hideExpiration?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const Reward: React.FC<RewardProps> = ({
  dollar,
  percentage,
  icon,
  label = 'REWARD',
  isBirthday = false,
  isEmployee = false,
  expirationDate,
  hideLabel = false,
  hideExpiration = false,
  className
}) => {
  // Calculate if expiration is within 5 days
  const isExpiring = React.useMemo(() => {
    if (!expirationDate) return false;
    
    const now = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 5 && diffDays >= 0;
  }, [expirationDate]);

  // Format expiration date
  const formattedExpiration = React.useMemo(() => {
    if (!expirationDate) return null;
    
    const expiry = new Date(expirationDate);
    const month = expiry.getMonth() + 1;
    const day = expiry.getDate();
    const year = expiry.getFullYear();
    
    if (isExpiring) {
      return `Expiring ${month}/${day}/${year}`;
    }
    return `Exp. ${month}/${day}/${year}`;
  }, [expirationDate, isExpiring]);

  // Determine what to display in the badge
  const renderBadgeContent = () => {
    // Icon takes priority
    if (icon) {
      return (
        <Image
          src={icon}
          alt=""
          width={72}
          height={72}
          className={styles['reward__icon']}
        />
      );
    }
    
    // Employee discount is always 30%
    if (isEmployee) {
      return (
        <>
          <div className={styles['reward__percent-line']}>
            <span className={`${styles['reward__percent-number']} ${styles['reward__percent-number--employee']}`}>30</span>
            <span className={styles['reward__percent-sign']}>%</span>
          </div>
          <div className={styles['reward__off-text']}>OFF</div>
        </>
      );
    }
    
    // Percentage display
    if (percentage !== undefined) {
      return (
        <>
          <div className={styles['reward__percent-line']}>
            <span className={styles['reward__percent-number']}>{percentage}</span>
            <span className={styles['reward__percent-sign']}>%</span>
          </div>
          <div className={styles['reward__off-text']}>OFF</div>
        </>
      );
    }
    
    // Dollar display (default)
    if (dollar !== undefined) {
      return (
        <div className={styles['reward__dollar-line']}>
          <span className={styles['reward__dollar-sign']}>$</span>
          <span className={styles['reward__dollar-amount']}>{dollar}</span>
        </div>
      );
    }
    
    // Fallback to $5 if nothing specified
    return (
      <div className={styles['reward__dollar-line']}>
        <span className={styles['reward__dollar-sign']}>$</span>
        <span className={styles['reward__dollar-amount']}>5</span>
      </div>
    );
  };

  // Determine label to display
  const renderLabel = () => {
    if (hideLabel) return null;
    
    if (isBirthday) {
      return (
        <div className={styles['reward__label--birthday']}>
          <span>BIRTHDAY</span>
          <span>REWARD</span>
        </div>
      );
    }
    
    return <div className={styles['reward__label']}>{label}</div>;
  };

  return (
    <div className={`${styles.reward} ${className || ''}`}>
      <div className={`${styles['reward__badge']} ${icon ? styles['reward__badge--icon'] : ''}`}>
        {renderBadgeContent()}
      </div>
      {renderLabel()}
      {!hideExpiration && formattedExpiration && (
        <div className={isExpiring ? styles['reward__expiry--alert'] : styles['reward__expiry']}>
          {formattedExpiration}
        </div>
      )}
    </div>
  );
};

export default Reward;