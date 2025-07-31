import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BadgeEarned from './BadgeEarned';

describe('BadgeEarned', () => {
  it('renders with default props', () => {
    render(<BadgeEarned />);
    expect(screen.getByText('Congratulations Emily!')).toBeInTheDocument();
    expect(screen.getByText('You earned the welcome badge!')).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    render(
      <BadgeEarned 
        title="Great job John!"
        subtitle="You completed your first order!"
      />
    );
    expect(screen.getByText('Great job John!')).toBeInTheDocument();
    expect(screen.getByText('You completed your first order!')).toBeInTheDocument();
  });

  it('renders images correctly', () => {
    render(<BadgeEarned />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    
    // Check star burst image
    const burstImage = images[0];
    expect(burstImage).toHaveAttribute('src');
    expect(burstImage).toHaveAttribute('width', '95');
    expect(burstImage).toHaveAttribute('height', '95');
    
    // Check badge icon
    const badgeIcon = images[1];
    expect(badgeIcon).toHaveAttribute('src');
    expect(badgeIcon).toHaveAttribute('width', '48');
    expect(badgeIcon).toHaveAttribute('height', '48');
  });

  it('applies custom className', () => {
    const { container } = render(<BadgeEarned className="custom-class" />);
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
    expect(component).toHaveClass('badge-earned');
  });

  it('uses heading element for title', () => {
    render(<BadgeEarned title="Test Title" />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Title');
  });

  it('handles empty strings', () => {
    render(<BadgeEarned title="" subtitle="" />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');
  });

  it('handles long text gracefully', () => {
    const longTitle = 'This is a very long congratulations message that might wrap';
    const longSubtitle = 'This is a very long subtitle that explains what badge the user earned';
    
    render(<BadgeEarned title={longTitle} subtitle={longSubtitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longSubtitle)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<BadgeEarned />);
    // Images should have empty alt text as they are decorative
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt', '');
    });
  });

  it('maintains proper structure', () => {
    const { container } = render(<BadgeEarned />);
    const badgeContainer = container.querySelector('.badge-earned__badge-container');
    const content = container.querySelector('.badge-earned__content');
    
    expect(badgeContainer).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('renders with proper BEM classes', () => {
    const { container } = render(<BadgeEarned />);
    
    expect(container.querySelector('.badge-earned')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__badge-container')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__burst')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__badge')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__badge-gradient')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__icon')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__content')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__title')).toBeInTheDocument();
    expect(container.querySelector('.badge-earned__subtitle')).toBeInTheDocument();
  });
});