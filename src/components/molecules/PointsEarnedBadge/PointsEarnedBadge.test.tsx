import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsEarnedBadge from './PointsEarnedBadge';

describe('PointsEarnedBadge', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<PointsEarnedBadge />);
      expect(screen.getByText('292')).toBeInTheDocument();
      expect(screen.getByText('points')).toBeInTheDocument();
      expect(screen.getByText('points earned!')).toBeInTheDocument();
      expect(screen.getByText('Keep going to earn more points and rewards.')).toBeInTheDocument();
      expect(screen.getByText('EXPLORE REWARDS')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<PointsEarnedBadge className="custom-class" />);
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('custom-class');
      expect(component).toHaveClass('points-earned-badge');
    });
  });

  describe('State variations', () => {
    it('renders no points state', () => {
      render(<PointsEarnedBadge state="no points" />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('keep going!')).toBeInTheDocument();
      expect(screen.getByText('Keep going to earn more points and rewards.')).toBeInTheDocument();
    });

    it('renders download state', () => {
      render(<PointsEarnedBadge state="download" />);
      expect(screen.getByText('330')).toBeInTheDocument();
      expect(screen.getByText('points earned!')).toBeInTheDocument();
    });

    it('renders 800 pts state', () => {
      render(<PointsEarnedBadge state="800 pts" />);
      expect(screen.getByText('800')).toBeInTheDocument();
      expect(screen.getByText("you're so close!")).toBeInTheDocument();
      expect(screen.getByText('Just 200 points left to go to earn $5 reward')).toBeInTheDocument();
    });

    it('renders reward expiring state', () => {
      render(<PointsEarnedBadge state="reward expiring" />);
      expect(screen.getByText('reward expiring')).toBeInTheDocument();
      expect(screen.getByText("Use it soon before it's gone")).toBeInTheDocument();
      // Should show $5 reward instead of points
      expect(screen.queryByText('points')).not.toBeInTheDocument();
    });

    it('renders reward available state', () => {
      render(<PointsEarnedBadge state="reward available" />);
      expect(screen.getByText('you have a reward!')).toBeInTheDocument();
      expect(screen.getByText('You earned over 1000 points and now have a reward')).toBeInTheDocument();
      // Should show $5 reward instead of points
      expect(screen.queryByText('points')).not.toBeInTheDocument();
    });

    it('renders birthday state', () => {
      render(<PointsEarnedBadge state="birthday" />);
      expect(screen.getByText('birthday reward!')).toBeInTheDocument();
      expect(screen.getByText('Take 15% off one order during your birthday month.')).toBeInTheDocument();
      // Should show 15% OFF instead of points
      expect(screen.queryByText('points')).not.toBeInTheDocument();
    });

    it('renders employee state', () => {
      render(<PointsEarnedBadge state="employee" />);
      expect(screen.getByText('thankful for you!')).toBeInTheDocument();
      expect(screen.getByText('Take 30% off one order between January 15th - 17th.')).toBeInTheDocument();
      // Should show 30% OFF instead of points
      expect(screen.queryByText('points')).not.toBeInTheDocument();
    });
  });

  describe('Type variations', () => {
    it('renders app type with rounded button', () => {
      const { container } = render(<PointsEarnedBadge type="app" />);
      const button = container.querySelector('.points-earned-badge__button--app');
      expect(button).toBeInTheDocument();
    });

    it('renders web type with less rounded button', () => {
      const { container } = render(<PointsEarnedBadge type="web" />);
      const button = container.querySelector('.points-earned-badge__button--web');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom props', () => {
    it('renders with custom title', () => {
      render(<PointsEarnedBadge title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders with custom subtitle', () => {
      render(<PointsEarnedBadge subtitle="Custom subtitle text" />);
      expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
    });

    it('renders with custom points', () => {
      render(<PointsEarnedBadge points={500} />);
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('custom props override default values', () => {
      render(
        <PointsEarnedBadge 
          state="no points" 
          title="Override Title"
          subtitle="Override subtitle"
          points={100}
        />
      );
      expect(screen.getByText('Override Title')).toBeInTheDocument();
      expect(screen.getByText('Override subtitle')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('Visual states', () => {
    it('applies progress border for points states', () => {
      const { container } = render(<PointsEarnedBadge state="points earned" />);
      const circle = container.querySelector('.points-earned-badge__circle--progress');
      expect(circle).toBeInTheDocument();
    });

    it('applies empty border for no points state', () => {
      const { container } = render(<PointsEarnedBadge state="no points" />);
      const circle = container.querySelector('.points-earned-badge__circle--empty');
      expect(circle).toBeInTheDocument();
    });

    it('applies purple subtitle for reward expiring state', () => {
      const { container } = render(<PointsEarnedBadge state="reward expiring" />);
      const subtitle = container.querySelector('.points-earned-badge__subtitle--purple');
      expect(subtitle).toBeInTheDocument();
    });

    it('renders Reward component for reward states', () => {
      const { container } = render(<PointsEarnedBadge state="reward available" />);
      const rewardWrapper = container.querySelector('.points-earned-badge__reward-wrapper');
      expect(rewardWrapper).toBeInTheDocument();
    });
  });

  describe('Button element', () => {
    it('always shows EXPLORE REWARDS text', () => {
      const states: Array<Parameters<typeof PointsEarnedBadge>[0]['state']> = [
        'points earned', 'no points', 'reward expiring', 'download', 
        '800 pts', 'reward available', 'birthday', 'employee'
      ];
      
      states.forEach(state => {
        const { unmount } = render(<PointsEarnedBadge state={state} />);
        expect(screen.getByText('EXPLORE REWARDS')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Component structure', () => {
    it('maintains proper BEM class structure', () => {
      const { container } = render(<PointsEarnedBadge />);
      
      expect(container.querySelector('.points-earned-badge')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__circle')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__circle-content')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__points')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__label')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__content')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__title')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__subtitle')).toBeInTheDocument();
      expect(container.querySelector('.points-earned-badge__button')).toBeInTheDocument();
    });
  });
});