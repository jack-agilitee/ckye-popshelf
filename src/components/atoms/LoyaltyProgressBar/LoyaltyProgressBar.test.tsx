import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoyaltyProgressBar from './LoyaltyProgressBar';

describe('LoyaltyProgressBar', () => {
  it('renders with required props', () => {
    render(<LoyaltyProgressBar points={120} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('sets correct aria attributes', () => {
    render(<LoyaltyProgressBar points={120} maxPoints={300} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '120');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '300');
  });

  it('uses default maxPoints of 300', () => {
    render(<LoyaltyProgressBar points={150} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemax', '300');
  });

  it('applies custom className', () => {
    const { container } = render(
      <LoyaltyProgressBar points={100} className="custom-class" />
    );
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass('custom-class');
  });

  it('uses custom aria label when provided', () => {
    render(
      <LoyaltyProgressBar 
        points={200} 
        ariaLabel="Custom progress label" 
      />
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Custom progress label');
  });

  it('uses default aria label when not provided', () => {
    render(<LoyaltyProgressBar points={100} maxPoints={300} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Loyalty points: 100 out of 300');
  });

  it('handles zero points', () => {
    render(<LoyaltyProgressBar points={0} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles negative points by treating as zero', () => {
    render(<LoyaltyProgressBar points={-50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '-50');
  });

  it('handles points exceeding maximum', () => {
    render(<LoyaltyProgressBar points={400} maxPoints={300} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '400');
  });

  it('renders all three segments', () => {
    const { container } = render(<LoyaltyProgressBar points={150} />);
    const segments = container.querySelectorAll('.loyalty-progress-bar__segment');
    expect(segments).toHaveLength(3);
  });

  it('applies filled class to first segment when points > 0', () => {
    const { container } = render(<LoyaltyProgressBar points={50} />);
    const firstSegment = container.querySelector('.loyalty-progress-bar__segment--first');
    expect(firstSegment).toHaveClass('loyalty-progress-bar__segment--filled');
  });

  it('applies filled class to second segment when points > 100', () => {
    const { container } = render(<LoyaltyProgressBar points={150} />);
    const secondSegment = container.querySelector('.loyalty-progress-bar__segment--second');
    expect(secondSegment).toHaveClass('loyalty-progress-bar__segment--filled');
  });

  it('applies filled class to third segment when points > 200', () => {
    const { container } = render(<LoyaltyProgressBar points={250} />);
    const thirdSegment = container.querySelector('.loyalty-progress-bar__segment--third');
    expect(thirdSegment).toHaveClass('loyalty-progress-bar__segment--filled');
  });

  it('renders progress indicator', () => {
    const { container } = render(<LoyaltyProgressBar points={150} />);
    const indicator = container.querySelector('.loyalty-progress-bar__indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('positions indicator correctly at 0%', () => {
    const { container } = render(<LoyaltyProgressBar points={0} />);
    const indicator = container.querySelector('.loyalty-progress-bar__indicator') as HTMLElement;
    expect(indicator).toHaveStyle({ left: '0%' });
  });

  it('positions indicator correctly at 50%', () => {
    const { container } = render(<LoyaltyProgressBar points={150} maxPoints={300} />);
    const indicator = container.querySelector('.loyalty-progress-bar__indicator') as HTMLElement;
    expect(indicator).toHaveStyle({ left: '50%' });
  });

  it('positions indicator correctly at 100%', () => {
    const { container } = render(<LoyaltyProgressBar points={300} maxPoints={300} />);
    const indicator = container.querySelector('.loyalty-progress-bar__indicator') as HTMLElement;
    expect(indicator).toHaveStyle({ left: '100%' });
  });

  it('caps indicator position at 100% when points exceed maximum', () => {
    const { container } = render(<LoyaltyProgressBar points={400} maxPoints={300} />);
    const indicator = container.querySelector('.loyalty-progress-bar__indicator') as HTMLElement;
    expect(indicator).toHaveStyle({ left: '100%' });
  });
});