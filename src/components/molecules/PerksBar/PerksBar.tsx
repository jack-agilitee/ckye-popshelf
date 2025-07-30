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
  return (
    <div className={`${styles['perks-bar']} ${className || ''}`}>
      {/* Background gray bar */}
      <div className={styles['perks-bar__track']}>
        {/* Purple gradient fill based on selected tier */}
        <div 
          className={styles['perks-bar__fill']}
          data-tier={selectedTier}
        />
        
        {/* Like section */}
        <div className={styles['perks-bar__section']}>
          <span className={styles['perks-bar__label']}>like</span>
          <span className={styles['perks-bar__sublabel']}>perks</span>
        </div>
        
        {/* White divider */}
        <div className={styles['perks-bar__divider']} />
        
        {/* Love section */}
        <div className={styles['perks-bar__section']}>
          {selectedTier === PerksTier.LIKE && (
            <svg 
              className={styles['perks-bar__lock']}
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              aria-label="Locked"
            >
              <path d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>
              <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
          <span className={styles['perks-bar__label']}>love</span>
          <span className={styles['perks-bar__sublabel']}>perks</span>
        </div>
        
        {/* White divider */}
        <div className={styles['perks-bar__divider']} />
        
        {/* Obsessed section */}
        <div className={styles['perks-bar__section']}>
          {(selectedTier === PerksTier.LIKE || selectedTier === PerksTier.LOVE) && (
            <svg 
              className={styles['perks-bar__lock']}
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              aria-label="Locked"
            >
              <path d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>
              <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
          <span className={styles['perks-bar__label']}>obsessed</span>
          <span className={styles['perks-bar__sublabel']}>perks</span>
        </div>
      </div>
    </div>
  );
};

export default PerksBar;