import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsEarned from './PointsEarned';

describe('PointsEarned', () => {
  it('renders with correct points number', () => {
    render(<PointsEarned points={100} />);
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('points will be earned when you complete this order.')).toBeInTheDocument();
  });

  it('renders with zero points', () => {
    render(<PointsEarned points={0} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders with large points number', () => {
    render(<PointsEarned points={9999} />);
    
    expect(screen.getByText('9999')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<PointsEarned points={50} className="custom-class" />);
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('renders circular icon with border', () => {
    const { container } = render(<PointsEarned points={25} />);
    
    const icon = container.querySelector('[class*="icon"]:not([class*="wrapper"])');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(expect.stringContaining('icon'));
  });

  it('has proper structure for styling', () => {
    const { container } = render(<PointsEarned points={75} />);
    
    const wrapper = container.firstChild as HTMLElement;
    const iconWrapper = wrapper.querySelector('[class*="icon-wrapper"]');
    const text = wrapper.querySelector('[class*="text"]');
    
    expect(iconWrapper).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});