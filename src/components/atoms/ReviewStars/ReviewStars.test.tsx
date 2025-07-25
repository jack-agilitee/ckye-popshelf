import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewStars from './ReviewStars';

describe('ReviewStars', () => {
  it('renders with 0 rating', () => {
    render(<ReviewStars rating={0} />);
    const stars = screen.getByRole('img', { name: '0 out of 5 stars' });
    expect(stars).toBeInTheDocument();
  });

  it('renders with integer rating', () => {
    render(<ReviewStars rating={3} />);
    const stars = screen.getByRole('img', { name: '3 out of 5 stars' });
    expect(stars).toBeInTheDocument();
  });

  it('renders with decimal rating', () => {
    render(<ReviewStars rating={4.5} />);
    const stars = screen.getByRole('img', { name: '4.5 out of 5 stars' });
    expect(stars).toBeInTheDocument();
  });

  it('clamps rating above 5 to 5', () => {
    render(<ReviewStars rating={10} />);
    const stars = screen.getByRole('img', { name: '5 out of 5 stars' });
    expect(stars).toBeInTheDocument();
  });

  it('clamps negative rating to 0', () => {
    render(<ReviewStars rating={-2} />);
    const stars = screen.getByRole('img', { name: '0 out of 5 stars' });
    expect(stars).toBeInTheDocument();
  });

  it('renders review count when showCount is true', () => {
    render(<ReviewStars rating={4} showCount={true} reviewCount={280} />);
    expect(screen.getByText('(280)')).toBeInTheDocument();
    const stars = screen.getByRole('img', { name: '4 out of 5 stars (280 reviews)' });
    expect(stars).toBeInTheDocument();
  });

  it('does not render review count when showCount is false', () => {
    render(<ReviewStars rating={4} showCount={false} reviewCount={280} />);
    expect(screen.queryByText('(280)')).not.toBeInTheDocument();
  });

  it('renders with default review count of 0', () => {
    render(<ReviewStars rating={4} showCount={true} />);
    expect(screen.getByText('(0)')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ReviewStars rating={3.5} className="custom-class" />
    );
    
    const reviewStars = container.firstChild as HTMLElement;
    expect(reviewStars).toHaveClass('custom-class');
  });

  it('renders exactly 5 star SVGs', () => {
    const { container } = render(<ReviewStars rating={3} />);
    const starSvgs = container.querySelectorAll('svg[width="13"][height="12"]');
    expect(starSvgs).toHaveLength(5);
  });

  it('creates unique gradient IDs for multiple instances', () => {
    const { container: container1 } = render(<ReviewStars rating={3} />);
    const { container: container2 } = render(<ReviewStars rating={4} />);
    
    const gradientId1 = container1.querySelector('linearGradient')?.getAttribute('id');
    const gradientId2 = container2.querySelector('linearGradient')?.getAttribute('id');
    
    expect(gradientId1).toBeTruthy();
    expect(gradientId2).toBeTruthy();
    expect(gradientId1).not.toBe(gradientId2);
  });

  it('calculates correct fill percentage for gradient', () => {
    const testCases = [
      { rating: 0, expectedPercentage: '0%' },
      { rating: 1, expectedPercentage: '20%' },
      { rating: 2.5, expectedPercentage: '50%' },
      { rating: 4, expectedPercentage: '80%' },
      { rating: 5, expectedPercentage: '100%' },
    ];

    testCases.forEach(({ rating, expectedPercentage }) => {
      const { container } = render(<ReviewStars rating={rating} />);
      const stopElements = container.querySelectorAll('linearGradient stop');
      
      expect(stopElements[0]).toHaveAttribute('offset', expectedPercentage);
      expect(stopElements[1]).toHaveAttribute('offset', expectedPercentage);
    });
  });

  it('uses correct colors in gradient', () => {
    const { container } = render(<ReviewStars rating={3} />);
    const stopElements = container.querySelectorAll('linearGradient stop');
    
    expect(stopElements[0]).toHaveAttribute('stop-color', '#FFC700'); // Yellow for filled
    expect(stopElements[1]).toHaveAttribute('stop-color', '#A3A3A3'); // Gray for empty
  });

  it('applies gradient to all star paths', () => {
    const { container } = render(<ReviewStars rating={3} />);
    const gradientId = container.querySelector('linearGradient')?.getAttribute('id');
    const starPaths = container.querySelectorAll('path[fill-rule="evenodd"]');
    
    starPaths.forEach((path) => {
      expect(path).toHaveAttribute('fill', `url(#${gradientId})`);
    });
  });

  it('has correct accessibility attributes', () => {
    render(<ReviewStars rating={3.5} showCount={true} reviewCount={150} />);
    
    const stars = screen.getByRole('img', { 
      name: '3.5 out of 5 stars (150 reviews)' 
    });
    expect(stars).toBeInTheDocument();
    
    // Check that the gradient SVG is hidden from screen readers
    const gradientSvg = document.querySelector('svg[aria-hidden="true"]');
    expect(gradientSvg).toBeInTheDocument();
  });
});