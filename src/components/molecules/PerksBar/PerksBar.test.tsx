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
    
    // Check that love and obsessed have lock icons
    const lockIcons = screen.getAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(2);
    
    // Check fill width
    const fill = container.querySelector('.perks-bar__fill') as HTMLElement;
    expect(fill).toHaveAttribute('data-tier', 'like');
  });

  it('renders with LOVE tier selected', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LOVE} />);
    
    // Check only obsessed has lock icon
    const lockIcons = screen.getAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(1);
    
    // Check fill width
    const fill = container.querySelector('.perks-bar__fill') as HTMLElement;
    expect(fill).toHaveAttribute('data-tier', 'love');
  });

  it('renders with OBSESSED tier selected', () => {
    render(<PerksBar selectedTier={PerksTier.OBSESSED} />);
    
    // Check no lock icons
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

  it('renders dividers between sections', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const dividers = container.querySelectorAll('.perks-bar__divider');
    expect(dividers).toHaveLength(2);
  });

  it('renders track container', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const track = container.querySelector('.perks-bar__track');
    expect(track).toBeInTheDocument();
  });

  it('handles all PerksTier enum values', () => {
    Object.values(PerksTier).forEach(tier => {
      const { container } = render(<PerksBar selectedTier={tier} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});