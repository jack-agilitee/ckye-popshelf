import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RewardsDial from './RewardsDial';

describe('RewardsDial', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<RewardsDial />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('points')).toBeInTheDocument();
      expect(screen.getByText('1000 points away')).toBeInTheDocument();
      expect(screen.getByText('from a reward')).toBeInTheDocument();
      expect(screen.getByText('every')).toBeInTheDocument();
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText(/= .* points/)).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<RewardsDial className="custom-class" />);
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('custom-class');
      expect(component).toHaveClass('rewards-dial');
    });
  });

  describe('Points states', () => {
    it('renders with 50 points', () => {
      render(<RewardsDial points={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('950 points away')).toBeInTheDocument();
    });

    it('renders with 150 points', () => {
      render(<RewardsDial points={150} />);
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('850 points away')).toBeInTheDocument();
    });

    it('renders with 250 points', () => {
      render(<RewardsDial points={250} />);
      expect(screen.getByText('250')).toBeInTheDocument();
      expect(screen.getByText('750 points away')).toBeInTheDocument();
    });

    it('renders with 292 points', () => {
      render(<RewardsDial points={292} />);
      expect(screen.getByText('292')).toBeInTheDocument();
      expect(screen.getByText('708 points away')).toBeInTheDocument();
    });

    it('renders with 330 points', () => {
      render(<RewardsDial points={330} />);
      expect(screen.getByText('330')).toBeInTheDocument();
      expect(screen.getByText('670 points away')).toBeInTheDocument();
    });

    it('renders with 827 points', () => {
      render(<RewardsDial points={827} />);
      expect(screen.getByText('827')).toBeInTheDocument();
      expect(screen.getByText('173 points away')).toBeInTheDocument();
    });

    it('renders with points exceeding threshold', () => {
      render(<RewardsDial points={1200} />);
      expect(screen.getByText('1200')).toBeInTheDocument();
      expect(screen.getByText('0 points away')).toBeInTheDocument();
    });
  });

  describe('Special states', () => {
    it('renders no points state', () => {
      render(<RewardsDial state="no-points" />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('points')).toBeInTheDocument();
      expect(screen.getByText('1000 points away')).toBeInTheDocument();
    });

    it('renders error state', () => {
      render(<RewardsDial state="error" />);
      expect(screen.getByText('!')).toBeInTheDocument();
      expect(screen.queryByText('points')).not.toBeInTheDocument();
      expect(screen.getByText('loading error')).toBeInTheDocument();
      expect(screen.queryByText('points away')).not.toBeInTheDocument();
      expect(screen.queryByText('every')).not.toBeInTheDocument();
    });

    it('renders negative points state', () => {
      render(<RewardsDial points={-15} state="negative" />);
      expect(screen.getByText('-15')).toBeInTheDocument();
      expect(screen.getByText('points')).toBeInTheDocument();
      expect(screen.getByText('1015 points away')).toBeInTheDocument();
    });
  });

  describe('Custom threshold', () => {
    it('calculates points away with custom threshold', () => {
      render(<RewardsDial points={300} rewardThreshold={500} />);
      expect(screen.getByText('300')).toBeInTheDocument();
      expect(screen.getByText('200 points away')).toBeInTheDocument();
    });

    it('handles points exceeding custom threshold', () => {
      render(<RewardsDial points={600} rewardThreshold={500} />);
      expect(screen.getByText('600')).toBeInTheDocument();
      expect(screen.getByText('0 points away')).toBeInTheDocument();
    });
  });

  describe('Progress visualization', () => {
    it('renders progress circle for positive points', () => {
      const { container } = render(<RewardsDial points={500} />);
      const progressCircles = container.querySelectorAll('circle');
      expect(progressCircles).toHaveLength(2); // Background + progress
      expect(progressCircles[0]).toHaveAttribute('stroke', '#E5D4ED'); // Background always light purple
      expect(progressCircles[1]).toHaveAttribute('stroke', '#87189D'); // Progress is purple
    });

    it('renders only background circle for no points', () => {
      const { container } = render(<RewardsDial state="no-points" />);
      const progressCircles = container.querySelectorAll('circle');
      expect(progressCircles).toHaveLength(1); // Only background
      expect(progressCircles[0]).toHaveAttribute('stroke', '#E5D4ED');
    });

    it('renders only background circle for negative points', () => {
      const { container } = render(<RewardsDial points={-10} state="negative" />);
      const progressCircles = container.querySelectorAll('circle');
      expect(progressCircles).toHaveLength(1); // Only background
      expect(progressCircles[0]).toHaveAttribute('stroke', '#E5D4ED');
    });

    it('renders full progress at 100%', () => {
      const { container } = render(<RewardsDial points={1000} />);
      const progressCircles = container.querySelectorAll('circle');
      expect(progressCircles).toHaveLength(2); // Background + full progress
      expect(progressCircles[0]).toHaveAttribute('stroke', '#E5D4ED');
      expect(progressCircles[1]).toHaveAttribute('stroke', '#87189D');
    });
  });

  describe('Conversion rate display', () => {
    it('always shows $1 = 10 points conversion', () => {
      render(<RewardsDial />);
      const conversionText = screen.getByText(/= .* points/);
      expect(conversionText.textContent).toContain('10');
    });
  });

  describe('Component structure', () => {
    it('maintains proper BEM class structure', () => {
      const { container } = render(<RewardsDial points={100} />);
      
      expect(container.querySelector('.rewards-dial')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__circle')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__svg')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__content')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__points')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__label')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__status')).toBeInTheDocument();
      expect(container.querySelector('.rewards-dial__conversion')).toBeInTheDocument();
    });
  });
});