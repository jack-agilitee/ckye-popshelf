import React from 'react';
import styles from './PerksBar.module.scss';

export enum PerksTier {
  LIKE = 'like',
  LOVE = 'love',
  OBSESSED = 'obsessed'
}

interface PerksBarProps {
  /** Currently selected/unlocked tier */
  selectedTier: PerksTier;
  /** Additional CSS classes */
  className?: string;
}

const PerksBar: React.FC<PerksBarProps> = ({
  selectedTier,
  className
}) => {
  // Calculate progress percentage based on tier
  const getProgressPercentage = () => {
    switch (selectedTier) {
      case PerksTier.LIKE:
        return 16.67; // 1/6 of the bar
      case PerksTier.LOVE:
        return 50; // 3/6 of the bar
      case PerksTier.OBSESSED:
        return 100; // Full bar
      default:
        return 0;
    }
  };

  // Determine which tiers are locked
  const isLoveLocked = selectedTier === PerksTier.LIKE;
  const isObsessedLocked = selectedTier !== PerksTier.OBSESSED;

  const progressPercentage = getProgressPercentage();

  return (
    <div className={`${styles['perks-bar']} ${className || ''}`}>
      {/* Background track */}
      <div className={styles['perks-bar__track']}>
        {/* Progress fill */}
        <div 
          className={styles['perks-bar__progress']}
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Arrow indicator */}
        <div 
          className={styles['perks-bar__indicator']}
          style={{ left: `${progressPercentage}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Tier labels */}
      <div className={styles['perks-bar__labels']}>
        {/* Like tier */}
        <div className={styles['perks-bar__label']}>
          <span className={styles['perks-bar__tier-name']}>like</span>
          <span className={styles['perks-bar__tier-perks']}>perks</span>
        </div>

        {/* Love tier */}
        <div className={`${styles['perks-bar__label']} ${isLoveLocked ? styles['perks-bar__label--locked'] : ''}`}>
          {isLoveLocked && (
            <svg 
              className={styles['perks-bar__lock-icon']}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Locked"
            >
              <path 
                d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" 
                fill="currentColor"
              />
              <path 
                d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className={styles['perks-bar__tier-name']}>love</span>
          <span className={styles['perks-bar__tier-perks']}>perks</span>
        </div>

        {/* Obsessed tier */}
        <div className={`${styles['perks-bar__label']} ${isObsessedLocked ? styles['perks-bar__label--locked'] : ''}`}>
          {isObsessedLocked && (
            <svg 
              className={styles['perks-bar__lock-icon']}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Locked"
            >
              <path 
                d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" 
                fill="currentColor"
              />
              <path 
                d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className={styles['perks-bar__tier-name']}>obsessed</span>
          <span className={styles['perks-bar__tier-perks']}>perks</span>
        </div>
      </div>
    </div>
  );
};

export default PerksBar;