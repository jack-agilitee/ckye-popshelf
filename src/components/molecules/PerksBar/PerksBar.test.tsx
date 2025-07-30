import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PerksBar, { PerksTier } from './PerksBar';

describe('PerksBar', () => {
  it('renders with LIKE tier selected', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    // Check all tiers are rendered
    expect(screen.getByText('like')).toBeInTheDocument();
    expect(screen.getByText('love')).toBeInTheDocument();
    expect(screen.getByText('obsessed')).toBeInTheDocument();
    
    // Check that all "perks" text is rendered
    const perksElements = screen.getAllByText('perks');
    expect(perksElements).toHaveLength(3);
    
    // Check that love and obsessed are locked
    const lockIcons = screen.getAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(2);
    
    // Check progress bar width (16.67%)
    const progressBar = container.querySelector('.perks-bar__progress');
    expect(progressBar).toHaveStyle({ width: '16.67%' });
  });

  it('renders with LOVE tier selected', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LOVE} />);
    
    // Check only obsessed is locked
    const lockIcons = screen.getAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(1);
    
    // Check progress bar width (50%)
    const progressBar = container.querySelector('.perks-bar__progress');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('renders with OBSESSED tier selected', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.OBSESSED} />);
    
    // Check no tiers are locked
    const lockIcons = screen.queryAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(0);
    
    // Check progress bar width (100%)
    const progressBar = container.querySelector('.perks-bar__progress');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });

  it('applies custom className', () => {
    const { container } = render(
      <PerksBar selectedTier={PerksTier.LIKE} className="custom-class" />
    );
    
    const perksBar = container.firstChild as HTMLElement;
    expect(perksBar).toHaveClass('custom-class');
  });

  it('positions indicator correctly based on tier', () => {
    const { container, rerender } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    let indicator = container.querySelector('.perks-bar__indicator');
    expect(indicator).toHaveStyle({ left: '16.67%' });
    
    rerender(<PerksBar selectedTier={PerksTier.LOVE} />);
    indicator = container.querySelector('.perks-bar__indicator');
    expect(indicator).toHaveStyle({ left: '50%' });
    
    rerender(<PerksBar selectedTier={PerksTier.OBSESSED} />);
    indicator = container.querySelector('.perks-bar__indicator');
    expect(indicator).toHaveStyle({ left: '100%' });
  });

  it('applies locked class to correct labels', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const labels = container.querySelectorAll('.perks-bar__label');
    expect(labels[0]).not.toHaveClass('perks-bar__label--locked'); // like
    expect(labels[1]).toHaveClass('perks-bar__label--locked'); // love
    expect(labels[2]).toHaveClass('perks-bar__label--locked'); // obsessed
  });

  it('renders progress bar track', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const track = container.querySelector('.perks-bar__track');
    expect(track).toBeInTheDocument();
  });

  it('indicator has aria-hidden attribute', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const indicator = container.querySelector('.perks-bar__indicator');
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
  });

  it('handles all PerksTier enum values', () => {
    // Test each enum value
    Object.values(PerksTier).forEach(tier => {
      const { container } = render(<PerksBar selectedTier={tier} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});