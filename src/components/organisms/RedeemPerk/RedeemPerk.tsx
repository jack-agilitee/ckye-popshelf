'use client';

import React from 'react';
import Image from 'next/image';
import styles from './RedeemPerk.module.scss';

interface RedeemPerkProps {
  /** Title text displayed in the header */
  title?: string;
  /** Instruction text displayed above QR code */
  instructionText?: string;
  /** Path to QR code image */
  qrCodePath: string;
  /** Callback when close button is clicked */
  onClose: () => void;
  /** Additional CSS classes */
  className?: string;
}

const RedeemPerk: React.FC<RedeemPerkProps> = ({ 
  title = '1 in store surprise',
  instructionText = 'Please find a pOpshelf® associate in the store and scan this QR code to claim your surprise',
  qrCodePath,
  onClose,
  className 
}) => {
  return (
    <div className={`${styles['redeem-perk']} ${className || ''}`}>
      {/* Purple header */}
      <div className={styles['redeem-perk__header']}>
        <h2 className={styles['redeem-perk__title']}>{title}</h2>
        <button 
          className={styles['redeem-perk__close']}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 6L6 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* White body with content */}
      <div className={styles['redeem-perk__body']}>
        <p className={styles['redeem-perk__instruction']}>
          {instructionText}
        </p>
        
        <div className={styles['redeem-perk__qr-container']}>
          <Image 
            src={qrCodePath}
            alt="QR code to scan"
            width={220}
            height={220}
            className={styles['redeem-perk__qr-code']}
          />
        </div>
      </div>
    </div>
  );
};

export default RedeemPerk;