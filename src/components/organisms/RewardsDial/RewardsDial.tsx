import React from 'react';
import styles from './RewardsDial.module.scss';

export type RewardsDialState = 
  | 'points' // Show specific points value
  | 'no-points' // 0 points state
  | 'error' // Loading error state
  | 'negative'; // Negative points state

interface RewardsDialProps {
  /** Current points value */
  points?: number;
  /** State of the dial */
  state?: RewardsDialState;
  /** Points needed for reward (default 1000) */
  rewardThreshold?: number;
  /** Additional CSS classes */
  className?: string;
}

const RewardsDial: React.FC<RewardsDialProps> = ({ 
  points = 0,
  state = 'points',
  rewardThreshold = 1000,
  className 
}) => {
  // Calculate display values
  const displayPoints = state === 'error' ? '!' : points.toString();
  const pointsAway = Math.max(rewardThreshold - points, 0);
  const hasProgress = points > 0 && state !== 'negative' && state !== 'error';
  const progressPercentage = Math.min((points / rewardThreshold) * 100, 100);

  // Calculate SVG values for progress circle
  const radius = (240 - 32) / 2; // (size - border) / 2
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className={`${styles['rewards-dial']} ${className || ''}`}>
      <div className={styles['rewards-dial__circle']}>
        {/* SVG Progress Circle */}
        <svg className={styles['rewards-dial__svg']} viewBox="0 0 240 240">
          {/* Background circle - always light purple */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#E5D4ED"
            strokeWidth="32"
          />
          {/* Progress circle - purple for actual progress */}
          {hasProgress && (
            <circle
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke="#87189D"
              strokeWidth="32"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 120 120)"
              className={styles['rewards-dial__progress']}
            />
          )}
        </svg>
        
        <div className={styles['rewards-dial__content']}>
          <div className={styles['rewards-dial__points']}>
            {displayPoints}
          </div>
          {state !== 'error' && (
            <div className={styles['rewards-dial__label']}>points</div>
          )}
        </div>
      </div>

      {state !== 'error' && (
        <>
          <div className={styles['rewards-dial__status']}>
            <p>{pointsAway} points away</p>
            <p>from a reward</p>
          </div>

          <div className={styles['rewards-dial__conversion']}>
            <span className={styles['rewards-dial__conversion-text']}>every</span>
            <span className={styles['rewards-dial__conversion-dollar']}>
              <span className={styles['rewards-dial__conversion-sign']}>$</span>
              <span className={styles['rewards-dial__conversion-amount']}>1</span>
            </span>
            <span className={styles['rewards-dial__conversion-text']}>
              = <span className={styles['rewards-dial__conversion-points']}>10</span> points
            </span>
          </div>
        </>
      )}

      {state === 'error' && (
        <div className={styles['rewards-dial__error-text']}>loading error</div>
      )}
    </div>
  );
};

export default RewardsDial;