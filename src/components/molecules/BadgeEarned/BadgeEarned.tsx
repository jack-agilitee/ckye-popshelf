'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BadgeEarned.module.scss';

interface BadgeEarnedProps {
  /** Title text for the badge earned message */
  title?: string;
  /** Subtitle text for the badge earned message */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
}

const BadgeEarned: React.FC<BadgeEarnedProps> = ({ 
  title = "Congratulations Emily!", 
  subtitle = "You earned the welcome badge!",
  className 
}) => {
  return (
    <div className={`${styles['badge-earned']} ${className || ''}`}>
      <div className={styles['badge-earned__badge-container']}>
        <Image 
          src="/loyalty/background.svg"
          alt=""
          width={95}
          height={95}
          className={styles['badge-earned__burst']}
        />
        <div className={styles['badge-earned__badge']}>
          <div className={styles['badge-earned__badge-gradient']}>
            <Image 
              src="/loyalty/badge.svg"
              alt=""
              width={48}
              height={48}
              className={styles['badge-earned__icon']}
            />
          </div>
        </div>
      </div>
      <div className={styles['badge-earned__content']}>
        <h3 className={styles['badge-earned__title']}>{title}</h3>
        <p className={styles['badge-earned__subtitle']}>{subtitle}</p>
      </div>
    </div>
  );
};

export default BadgeEarned;