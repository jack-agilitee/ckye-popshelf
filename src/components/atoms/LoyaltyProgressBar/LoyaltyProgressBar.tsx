import React from 'react';
import styles from './LoyaltyProgressBar.module.scss';

interface LoyaltyProgressBarProps {
  /** Current loyalty points */
  points: number;
  /** Maximum points (default: 300) */
  maxPoints?: number;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

const LoyaltyProgressBar: React.FC<LoyaltyProgressBarProps> = ({
  points,
  maxPoints = 300,
  className,
  ariaLabel
}) => {
  // Calculate progress percentage
  const progress = Math.min(Math.max(0, points), maxPoints);
  const progressPercentage = (progress / maxPoints) * 100;
  
  // Determine which segment the indicator is in
  const segmentWidth = 100 / 3;
  
  // Clamp indicator position to stay within bounds (accounting for indicator size)
  // The indicator should stay within 0% to 100% but we need to account for its width
  const indicatorPosition = Math.min(Math.max(progressPercentage, 2), 98);
  
  // Calculate segment fill states
  const isFirstSegmentFilled = progressPercentage > 0;
  const isSecondSegmentFilled = progressPercentage > segmentWidth;
  const isThirdSegmentFilled = progressPercentage > segmentWidth * 2;

  return (
    <div 
      className={`${styles['loyalty-progress-bar']} ${className || ''}`}
      role="progressbar"
      aria-valuenow={points}
      aria-valuemin={0}
      aria-valuemax={maxPoints}
      aria-label={ariaLabel || `Loyalty points: ${points} out of ${maxPoints}`}
    >
      {/* Background track */}
      <div className={styles['loyalty-progress-bar__track']}>
        {/* Segments */}
        <div 
          className={`${styles['loyalty-progress-bar__segment']} ${styles['loyalty-progress-bar__segment--first']} ${
            isFirstSegmentFilled ? styles['loyalty-progress-bar__segment--filled'] : ''
          }`}
        />
        <div 
          className={`${styles['loyalty-progress-bar__segment']} ${styles['loyalty-progress-bar__segment--second']} ${
            isSecondSegmentFilled ? styles['loyalty-progress-bar__segment--filled'] : ''
          }`}
        />
        <div 
          className={`${styles['loyalty-progress-bar__segment']} ${styles['loyalty-progress-bar__segment--third']} ${
            isThirdSegmentFilled ? styles['loyalty-progress-bar__segment--filled'] : ''
          }`}
        />
        
        {/* Progress indicator */}
        <div 
          className={styles['loyalty-progress-bar__indicator']}
          style={{ left: `${indicatorPosition}%` }}
        >
          <div className={styles['loyalty-progress-bar__indicator-dot']} />
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgressBar;