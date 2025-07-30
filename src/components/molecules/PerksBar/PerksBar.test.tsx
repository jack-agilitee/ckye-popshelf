import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PerksBar, { PerksTier } from './PerksBar';

describe('PerksBar', () => {
  it('renders with LIKE tier selected', () => {
    render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
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
  });

  it('renders with LOVE tier selected', () => {
    render(<PerksBar selectedTier={PerksTier.LOVE} />);
    
    // Check only obsessed is locked
    const lockIcons = screen.getAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(1);
  });

  it('renders with OBSESSED tier selected', () => {
    render(<PerksBar selectedTier={PerksTier.OBSESSED} />);
    
    // Check no tiers are locked
    const lockIcons = screen.queryAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <PerksBar selectedTier={PerksTier.LIKE} className="custom-class" />
    );
    
    const perksBar = container.firstChild as HTMLElement;
    expect(perksBar).toHaveClass('custom-class');
  });

  it('applies active class to selected tier', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LOVE} />);
    
    // Find the love tier element
    const loveTier = container.querySelector('.perks-bar__tier--love');
    expect(loveTier).toHaveClass('perks-bar__tier--active');
    
    // Check other tiers don't have active class
    const likeTier = container.querySelector('.perks-bar__tier--like');
    const obsessedTier = container.querySelector('.perks-bar__tier--obsessed');
    expect(likeTier).not.toHaveClass('perks-bar__tier--active');
    expect(obsessedTier).not.toHaveClass('perks-bar__tier--active');
  });

  it('applies locked class to locked tiers', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    // Check love and obsessed have locked class
    const loveTier = container.querySelector('.perks-bar__tier--love');
    const obsessedTier = container.querySelector('.perks-bar__tier--obsessed');
    expect(loveTier).toHaveClass('perks-bar__tier--locked');
    expect(obsessedTier).toHaveClass('perks-bar__tier--locked');
    
    // Check like doesn't have locked class
    const likeTier = container.querySelector('.perks-bar__tier--like');
    expect(likeTier).not.toHaveClass('perks-bar__tier--locked');
  });

  it('renders divider lines', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const dividerFirst = container.querySelector('.perks-bar__divider-first');
    const dividerSecond = container.querySelector('.perks-bar__divider-second');
    
    expect(dividerFirst).toBeInTheDocument();
    expect(dividerSecond).toBeInTheDocument();
    expect(dividerFirst).toHaveAttribute('aria-hidden', 'true');
    expect(dividerSecond).toHaveAttribute('aria-hidden', 'true');
  });

  it('maintains correct tier order', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const tiers = container.querySelectorAll('.perks-bar__tier');
    expect(tiers).toHaveLength(3);
    
    // Check order
    expect(tiers[0]).toHaveClass('perks-bar__tier--like');
    expect(tiers[1]).toHaveClass('perks-bar__tier--love');
    expect(tiers[2]).toHaveClass('perks-bar__tier--obsessed');
  });

  it('handles all PerksTier enum values', () => {
    // Test each enum value
    Object.values(PerksTier).forEach(tier => {
      const { container } = render(<PerksBar selectedTier={tier} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});