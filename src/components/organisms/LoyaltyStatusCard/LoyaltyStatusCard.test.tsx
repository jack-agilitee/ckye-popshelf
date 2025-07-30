import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoyaltyStatusCard from './LoyaltyStatusCard';

describe('LoyaltyStatusCard', () => {
  describe('Authenticated State', () => {
    const authenticatedProps = {
      isAuthenticated: true,
      points: 120,
      pointsToNextTier: 80,
      currentLevel: 'love',
      onQrCodeClick: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders authenticated state with all elements', () => {
      render(<LoyaltyStatusCard {...authenticatedProps} />);
      
      expect(screen.getByAltText('popshelf')).toBeInTheDocument();
      expect(screen.getByText('peeps')).toBeInTheDocument();
      expect(screen.getByText('120')).toBeInTheDocument();
      expect(screen.getByText('points')).toBeInTheDocument();
      expect(screen.getByText('80 points to VIP+')).toBeInTheDocument();
      expect(screen.getByText('Level:')).toBeInTheDocument();
      expect(screen.getByText('love')).toBeInTheDocument();
      expect(screen.getByText('check in:')).toBeInTheDocument();
    });

    it('renders LoyaltyProgressBar with correct points', () => {
      const { container } = render(<LoyaltyStatusCard {...authenticatedProps} />);
      const progressBar = container.querySelector('[role="progressbar"]');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '120');
    });

    it('calls onQrCodeClick when QR code is clicked', () => {
      render(<LoyaltyStatusCard {...authenticatedProps} />);
      const qrButton = screen.getByRole('button', { name: 'Scan QR code to check in' });
      fireEvent.click(qrButton);
      expect(authenticatedProps.onQrCodeClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
      const { container } = render(
        <LoyaltyStatusCard {...authenticatedProps} className="custom-class" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('uses default values when optional props are not provided', () => {
      render(<LoyaltyStatusCard isAuthenticated={true} />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('80 points to VIP+')).toBeInTheDocument();
      expect(screen.getByText('love')).toBeInTheDocument();
    });
  });

  describe('Unauthenticated State', () => {
    const unauthenticatedProps = {
      isAuthenticated: false,
      onLearnMoreClick: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders unauthenticated state with all elements', () => {
      render(<LoyaltyStatusCard {...unauthenticatedProps} />);
      
      expect(screen.getByAltText('popshelf')).toBeInTheDocument();
      expect(screen.getByText('peeps')).toBeInTheDocument();
      expect(screen.getByAltText('Loyalty rewards box')).toBeInTheDocument();
      expect(screen.getByText(/earn points/)).toBeInTheDocument();
      expect(screen.getByText(/and unlock/)).toBeInTheDocument();
      expect(screen.getByText(/free perks/)).toBeInTheDocument();
      expect(screen.getByText('How does pOpshelf® peeps work?')).toBeInTheDocument();
    });

    it('does not render authenticated elements in unauthenticated state', () => {
      render(<LoyaltyStatusCard {...unauthenticatedProps} />);
      
      expect(screen.queryByText('points')).not.toBeInTheDocument();
      expect(screen.queryByText('Level:')).not.toBeInTheDocument();
      expect(screen.queryByText('check in:')).not.toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('calls onLearnMoreClick when learn more link is clicked', () => {
      render(<LoyaltyStatusCard {...unauthenticatedProps} />);
      const learnMoreButton = screen.getByText('How does pOpshelf® peeps work?');
      fireEvent.click(learnMoreButton);
      expect(unauthenticatedProps.onLearnMoreClick).toHaveBeenCalledTimes(1);
    });

    it('does not require authenticated props when isAuthenticated is false', () => {
      render(<LoyaltyStatusCard isAuthenticated={false} />);
      expect(screen.getByText('How does pOpshelf® peeps work?')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very large point values', () => {
      render(
        <LoyaltyStatusCard
          isAuthenticated={true}
          points={99999}
          pointsToNextTier={1}
        />
      );
      expect(screen.getByText('99999')).toBeInTheDocument();
      expect(screen.getByText('1 points to VIP+')).toBeInTheDocument();
    });

    it('handles zero points', () => {
      render(
        <LoyaltyStatusCard
          isAuthenticated={true}
          points={0}
          pointsToNextTier={300}
        />
      );
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('300 points to VIP+')).toBeInTheDocument();
    });

    it('handles long level names', () => {
      render(
        <LoyaltyStatusCard
          isAuthenticated={true}
          currentLevel="Super Platinum Elite Member"
        />
      );
      expect(screen.getByText('Super Platinum Elite Member')).toBeInTheDocument();
    });

    it('does not call callbacks when they are not provided', () => {
      render(<LoyaltyStatusCard isAuthenticated={true} />);
      const qrButton = screen.getByRole('button', { name: 'Scan QR code to check in' });
      fireEvent.click(qrButton); // Should not throw error
    });

    it('handles missing onLearnMoreClick callback', () => {
      render(<LoyaltyStatusCard isAuthenticated={false} />);
      const learnMoreButton = screen.getByText('How does pOpshelf® peeps work?');
      fireEvent.click(learnMoreButton); // Should not throw error
    });
  });
});