import React from 'react';
import Image from 'next/image';
import LoyaltyProgressBar from '@/components/atoms/LoyaltyProgressBar/LoyaltyProgressBar';
import styles from './LoyaltyMainPanel.module.scss';

interface LoyaltyMainPanelProps {
  /** Current loyalty level */
  level?: string;
  /** Current points balance */
  points?: number;
  /** Additional CSS classes */
  className?: string;
}

const LoyaltyMainPanel: React.FC<LoyaltyMainPanelProps> = ({
  level = 'like',
  points = 0,
  className
}) => {
  return (
    <div className={`${styles['loyalty-main-panel']} ${className || ''}`}>
      <div className={styles['loyalty-main-panel__header']}>
        <span className={styles['loyalty-main-panel__level-label']}>Level:</span>
        <span className={styles['loyalty-main-panel__level-value']}>{level}</span>
      </div>
      
      <div className={styles['loyalty-main-panel__divider']} />
      
      <div className={styles['loyalty-main-panel__content']}>
        <div className={styles['loyalty-main-panel__qr-section']}>
          <Image
            src="/qr.svg"
            alt="QR code for earning points"
            width={160}
            height={160}
            className={styles['loyalty-main-panel__qr-code']}
          />
          <p className={styles['loyalty-main-panel__instructions']}>
            Scan at the in-store kiosk to earn points and at the checkout to earn 1 point per $1 spent.
          </p>
        </div>
        
        <div className={styles['loyalty-main-panel__points-section']}>
          <div className={styles['loyalty-main-panel__points-circle']}>
            <span className={styles['loyalty-main-panel__points-value']}>{points}</span>
          </div>
          <span className={styles['loyalty-main-panel__points-label']}>points</span>
          <span className={styles['loyalty-main-panel__earn-link']}>
            Earn points and unlock perks
          </span>
        </div>
      </div>
      
      <div className={styles['loyalty-main-panel__divider-bottom']} />
      
      <div className={styles['loyalty-main-panel__progress']}>
        <LoyaltyProgressBar points={points} />
      </div>
    </div>
  );
};

export default LoyaltyMainPanel;