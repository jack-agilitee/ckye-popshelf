'use client';

import React from 'react';
import Image from 'next/image';
import LoyaltyProgressBar from '@/components/atoms/LoyaltyProgressBar/LoyaltyProgressBar';
import styles from './LoyaltyStatusCard.module.scss';

interface LoyaltyStatusCardProps {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Current loyalty points (for authenticated state) */
  points?: number;
  /** Points needed for next tier (for authenticated state) */
  pointsToNextTier?: number;
  /** Current tier/level name (for authenticated state) */
  currentLevel?: string;
  /** Callback when QR code is clicked (for authenticated state) */
  onQrCodeClick?: () => void;
  /** Callback when "How does it work?" link is clicked (for unauthenticated state) */
  onLearnMoreClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const LoyaltyStatusCard: React.FC<LoyaltyStatusCardProps> = ({
  isAuthenticated,
  points = 0,
  pointsToNextTier = 80,
  currentLevel = 'love',
  onQrCodeClick,
  onLearnMoreClick,
  className
}) => {
  if (!isAuthenticated) {
    return (
      <div className={`${styles['loyalty-status-card']} ${className || ''}`}>
        <div className={styles['loyalty-status-card__header']}>
          <Image
            src="/logos/main-logo.svg"
            alt="popshelf"
            width={100}
            height={25}
            className={styles['loyalty-status-card__logo']}
          />
          <span className={styles['loyalty-status-card__peeps']}>peeps</span>
        </div>
        <div className={styles['loyalty-status-card__divider']} />
        <div className={styles['loyalty-status-card__unauth-content']}>
          <div className={styles['loyalty-status-card__box-wrapper']}>
            <Image
              src="/loyalty/box.png"
              alt="Loyalty rewards box"
              width={157}
              height={106}
              className={styles['loyalty-status-card__box-image']}
            />
          </div>
          <div className={styles['loyalty-status-card__unauth-text']}>
            <p className={styles['loyalty-status-card__unauth-message']}>
              earn points and unlock free perks
            </p>
          </div>
        </div>
        <button
          className={styles['loyalty-status-card__learn-more']}
          onClick={onLearnMoreClick}
          type="button"
        >
          How does pOpshelf® peeps work?
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles['loyalty-status-card']} ${className || ''}`}>
      <div className={styles['loyalty-status-card__header']}>
        <Image
          src="/logos/main-logo.svg"
          alt="popshelf"
          width={100}
          height={25}
          className={styles['loyalty-status-card__logo']}
        />
        <span className={styles['loyalty-status-card__peeps']}>peeps</span>
      </div>
      <div className={styles['loyalty-status-card__divider']} />
      <div className={styles['loyalty-status-card__content']}>
        <div className={styles['loyalty-status-card__points-section']}>
          <div className={styles['loyalty-status-card__points-ring']}>
            <span className={styles['loyalty-status-card__points-value']}>
              {points}
            </span>
          </div>
          <span className={styles['loyalty-status-card__points-label']}>points</span>
        </div>
        <div className={styles['loyalty-status-card__status-section']}>
          <span className={styles['loyalty-status-card__next-tier']}>
            {pointsToNextTier} points to VIP+
          </span>
        </div>
      </div>
      <div className={styles['loyalty-status-card__progress-section']}>
        <LoyaltyProgressBar points={points} />
      </div>
      <div className={styles['loyalty-status-card__footer']}>
        <div className={styles['loyalty-status-card__level']}>
          <span className={styles['loyalty-status-card__level-label']}>Level:</span>
          <span className={styles['loyalty-status-card__level-value']}>{currentLevel}</span>
        </div>
        <div className={styles['loyalty-status-card__checkin']}>
          <span className={styles['loyalty-status-card__checkin-label']}>check in:</span>
          <button
            className={styles['loyalty-status-card__qr-button']}
            onClick={onQrCodeClick}
            type="button"
            aria-label="Scan QR code to check in"
          >
            <Image
              src="/qr.svg"
              alt=""
              width={30}
              height={30}
              className={styles['loyalty-status-card__qr-code']}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyStatusCard;