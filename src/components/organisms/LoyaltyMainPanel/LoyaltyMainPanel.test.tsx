import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoyaltyMainPanel from './LoyaltyMainPanel';

describe('LoyaltyMainPanel', () => {
  const defaultProps = {
    level: 'like',
    points: 0,
  };

  it('renders with default props', () => {
    render(<LoyaltyMainPanel />);
    
    expect(screen.getByText('Level:')).toBeInTheDocument();
    expect(screen.getByText('like')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('points')).toBeInTheDocument();
  });

  it('renders with custom level and points', () => {
    render(<LoyaltyMainPanel level="love" points={120} />);
    
    expect(screen.getByText('love')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('displays QR code with correct alt text', () => {
    render(<LoyaltyMainPanel {...defaultProps} />);
    
    const qrCode = screen.getByAltText('QR code for earning points');
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveAttribute('src', '/qr.svg');
  });

  it('displays instruction text', () => {
    render(<LoyaltyMainPanel {...defaultProps} />);
    
    expect(screen.getByText(/Scan at the in-store kiosk/)).toBeInTheDocument();
    expect(screen.getByText(/earn 1 point per \$1 spent/)).toBeInTheDocument();
  });

  it('displays earn points link text', () => {
    render(<LoyaltyMainPanel {...defaultProps} />);
    
    expect(screen.getByText('Earn points and unlock perks')).toBeInTheDocument();
  });

  it('renders LoyaltyProgressBar with correct points', () => {
    const { container } = render(<LoyaltyMainPanel points={50} />);
    
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('applies custom className', () => {
    const { container } = render(
      <LoyaltyMainPanel {...defaultProps} className="custom-class" />
    );
    
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass('custom-class');
  });

  it('handles edge cases with high point values', () => {
    render(<LoyaltyMainPanel level="platinum" points={99999} />);
    
    expect(screen.getByText('platinum')).toBeInTheDocument();
    expect(screen.getByText('99999')).toBeInTheDocument();
  });

  it('handles empty level string', () => {
    render(<LoyaltyMainPanel level="" points={0} />);
    
    expect(screen.getByText('Level:')).toBeInTheDocument();
    // The empty level value should still render (as empty text node)
    const levelValue = screen.getByText('Level:').nextSibling;
    expect(levelValue).toBeInTheDocument();
  });

  it('maintains consistent structure with different props', () => {
    const { container } = render(<LoyaltyMainPanel level="gold" points={250} />);
    
    // Check for main structural elements
    expect(container.querySelector('.loyalty-main-panel__header')).toBeInTheDocument();
    expect(container.querySelector('.loyalty-main-panel__content')).toBeInTheDocument();
    expect(container.querySelector('.loyalty-main-panel__qr-section')).toBeInTheDocument();
    expect(container.querySelector('.loyalty-main-panel__points-section')).toBeInTheDocument();
    expect(container.querySelector('.loyalty-main-panel__progress')).toBeInTheDocument();
  });
});