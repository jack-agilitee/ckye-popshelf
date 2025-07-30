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
  // Determine which tiers are locked based on selection
  const isLoveLocked = selectedTier === PerksTier.LIKE;
  const isObsessedLocked = selectedTier === PerksTier.LIKE || selectedTier === PerksTier.LOVE;

  return (
    <div className={`${styles['perks-bar']} ${className || ''}`}>
      <div className={styles['perks-bar__progress']}>
        {/* Like tier - always unlocked */}
        <div 
          className={`${styles['perks-bar__tier']} ${styles['perks-bar__tier--like']} ${
            selectedTier === PerksTier.LIKE ? styles['perks-bar__tier--active'] : ''
          }`}
        >
          <div className={styles['perks-bar__tier-content']}>
            <span className={styles['perks-bar__tier-name']}>like</span>
            <span className={styles['perks-bar__tier-perks']}>perks</span>
          </div>
        </div>

        {/* Love tier */}
        <div 
          className={`${styles['perks-bar__tier']} ${styles['perks-bar__tier--love']} ${
            selectedTier === PerksTier.LOVE ? styles['perks-bar__tier--active'] : ''
          } ${isLoveLocked ? styles['perks-bar__tier--locked'] : ''}`}
        >
          <div className={styles['perks-bar__tier-content']}>
            <span className={styles['perks-bar__tier-name']}>love</span>
            <span className={styles['perks-bar__tier-perks']}>perks</span>
          </div>
          {isLoveLocked && (
            <div className={styles['perks-bar__lock-overlay']}>
              <div className={styles['perks-bar__lock-icon']}>
                <svg 
                  width="24" 
                  height="24" 
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
              </div>
            </div>
          )}
        </div>

        {/* Obsessed tier */}
        <div 
          className={`${styles['perks-bar__tier']} ${styles['perks-bar__tier--obsessed']} ${
            selectedTier === PerksTier.OBSESSED ? styles['perks-bar__tier--active'] : ''
          } ${isObsessedLocked ? styles['perks-bar__tier--locked'] : ''}`}
        >
          <div className={styles['perks-bar__tier-content']}>
            <span className={styles['perks-bar__tier-name']}>obsessed</span>
            <span className={styles['perks-bar__tier-perks']}>perks</span>
          </div>
          {isObsessedLocked && (
            <div className={styles['perks-bar__lock-overlay']}>
              <div className={styles['perks-bar__lock-icon']}>
                <svg 
                  width="24" 
                  height="24" 
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider lines */}
      <div className={styles['perks-bar__divider-first']} aria-hidden="true" />
      <div className={styles['perks-bar__divider-second']} aria-hidden="true" />
    </div>
  );
};

export default PerksBar;