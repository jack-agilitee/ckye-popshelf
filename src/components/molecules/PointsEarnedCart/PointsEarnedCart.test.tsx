import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsEarnedCart from './PointsEarnedCart';

describe('PointsEarnedCart', () => {
  const defaultProps = {
    points: 180,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<PointsEarnedCart {...defaultProps} />);
    expect(screen.getByText(/You earned/)).toBeInTheDocument();
    expect(screen.getByText('180 points')).toBeInTheDocument();
    expect(screen.getByText(/with this order/)).toBeInTheDocument();
  });

  it('displays the correct points number', () => {
    render(<PointsEarnedCart points={250} />);
    expect(screen.getByText('250 points')).toBeInTheDocument();
  });

  it('handles zero points', () => {
    render(<PointsEarnedCart points={0} />);
    expect(screen.getByText('0 points')).toBeInTheDocument();
  });

  it('handles large point values', () => {
    render(<PointsEarnedCart points={9999} />);
    expect(screen.getByText('9999 points')).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    const { container } = render(<PointsEarnedCart {...defaultProps} />);
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('points-earned-cart');
  });

  it('applies custom className', () => {
    const { container } = render(
      <PointsEarnedCart {...defaultProps} className="custom-class" />
    );
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
    expect(component).toHaveClass('points-earned-cart');
  });

  it('has proper text structure', () => {
    render(<PointsEarnedCart {...defaultProps} />);
    const text = screen.getByText(/You earned/);
    expect(text).toHaveTextContent('You earned 180 points with this order');
  });

  it('renders points text with proper styling class', () => {
    render(<PointsEarnedCart {...defaultProps} />);
    const pointsElement = screen.getByText('180 points');
    expect(pointsElement).toHaveClass('points-earned-cart__points');
  });

  it('renders the main text container with proper styling class', () => {
    const { container } = render(<PointsEarnedCart {...defaultProps} />);
    const textElement = container.querySelector('.points-earned-cart__text');
    expect(textElement).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<PointsEarnedCart {...defaultProps} />);
    const component = screen.getByText(/You earned/);
    expect(component.tagName).toBe('P');
  });

  describe('Edge cases', () => {
    it('handles negative points gracefully', () => {
      render(<PointsEarnedCart points={-10} />);
      expect(screen.getByText('-10 points')).toBeInTheDocument();
    });

    it('handles decimal points', () => {
      render(<PointsEarnedCart points={180.5} />);
      expect(screen.getByText('180.5 points')).toBeInTheDocument();
    });
  });
});