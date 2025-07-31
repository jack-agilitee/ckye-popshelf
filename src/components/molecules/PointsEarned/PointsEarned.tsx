import React from 'react';
import Reward from '@/components/atoms/Reward/Reward';
import styles from './PointsEarned.module.scss';

export type PointsEarnedState = 
  | 'points earned'
  | 'no points'
  | 'reward expiring'
  | 'download'
  | '800 pts'
  | 'reward available'
  | 'birthday'
  | 'employee';

export type PointsEarnedType = 'app' | 'web';

interface PointsEarnedProps {
  /** The state/variant of the component */
  state?: PointsEarnedState;
  /** The type/platform variant */
  type?: PointsEarnedType;
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Points value to display (for points states) */
  points?: number;
  /** Additional CSS classes */
  className?: string;
}

const PointsEarned: React.FC<PointsEarnedProps> = ({
  state = 'points earned',
  type = 'app',
  title,
  subtitle,
  points,
  className
}) => {
  // Determine title based on state if not provided
  const displayTitle = title || (() => {
    switch (state) {
      case 'points earned':
      case 'download':
        return 'points earned!';
      case 'no points':
        return 'keep going!';
      case '800 pts':
        return "you're so close!";
      case 'reward expiring':
        return 'reward expiring';
      case 'reward available':
        return 'you have a reward!';
      case 'birthday':
        return 'birthday reward!';
      case 'employee':
        return 'thankful for you!';
      default:
        return 'points earned!';
    }
  })();

  // Determine subtitle based on state if not provided
  const displaySubtitle = subtitle || (() => {
    switch (state) {
      case 'points earned':
      case 'no points':
      case 'download':
        return 'Keep going to earn more points and rewards.';
      case '800 pts':
        return 'Just 200 points left to go to earn $5 reward';
      case 'reward expiring':
        return 'Use it soon before it\'s gone';
      case 'reward available':
        return 'You earned over 1000 points and now have a reward';
      case 'birthday':
        return 'Take 15% off one order during your birthday month.';
      case 'employee':
        return 'Take 30% off one order between January 15th - 17th.';
      default:
        return 'Keep going to earn more points and rewards.';
    }
  })();

  // Determine points value
  const displayPoints = points !== undefined ? points : (() => {
    switch (state) {
      case 'points earned':
        return 292;
      case 'no points':
        return 0;
      case 'download':
        return 330;
      case '800 pts':
        return 800;
      default:
        return 0;
    }
  })();

  // Determine if we should show reward instead of points
  const showReward = state === 'reward expiring' || state === 'reward available' || 
                     state === 'birthday' || state === 'employee';

  // Determine border color based on state
  const hasProgressBorder = state !== 'no points' && !showReward;

  // Determine subtitle color
  const isSubtitlePurple = state === 'reward expiring';

  return (
    <div className={`${styles['points-earned']} ${className || ''}`}>
      {showReward ? (
        <div className={styles['points-earned__reward-wrapper']}>
          <Reward
            dollar={state === 'reward expiring' || state === 'reward available' ? 5 : undefined}
            percentage={state === 'birthday' ? 15 : state === 'employee' ? 30 : undefined}
            isEmployee={state === 'employee'}
            hideLabel={true}
            hideExpiration={true}
            className={styles['points-earned__reward']}
          />
        </div>
      ) : (
        <div className={`${styles['points-earned__circle']} ${hasProgressBorder ? styles['points-earned__circle--progress'] : styles['points-earned__circle--empty']}`}>
          <div className={styles['points-earned__circle-content']}>
            <div className={styles['points-earned__points']}>{displayPoints}</div>
            <div className={styles['points-earned__label']}>points</div>
          </div>
        </div>
      )}
      
      <div className={styles['points-earned__content']}>
        <h3 className={styles['points-earned__title']}>{displayTitle}</h3>
        <p className={`${styles['points-earned__subtitle']} ${isSubtitlePurple ? styles['points-earned__subtitle--purple'] : ''}`}>
          {displaySubtitle}
        </p>
        <div className={`${styles['points-earned__button']} ${styles[`points-earned__button--${type}`]}`}>
          EXPLORE REWARDS
        </div>
      </div>
    </div>
  );
};

export default PointsEarned;