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
    
    // Check gradient width
    const gradient = container.querySelector('.perks-bar__gradient') as HTMLElement;
    expect(gradient).toHaveStyle({ width: '33.33%' });
    
    // Check lock overlay
    const lockOverlay = container.querySelector('.perks-bar__lock-overlay') as HTMLElement;
    expect(lockOverlay).toBeInTheDocument();
    expect(lockOverlay).toHaveStyle({ left: '33.33%', width: 'calc(100% - 33.33%)' });
  });

  it('renders with LOVE tier selected', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LOVE} />);
    
    // Check only obsessed is locked
    const lockIcons = screen.getAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(1);
    
    // Check gradient width
    const gradient = container.querySelector('.perks-bar__gradient') as HTMLElement;
    expect(gradient).toHaveStyle({ width: '66.67%' });
    
    // Check lock overlay
    const lockOverlay = container.querySelector('.perks-bar__lock-overlay') as HTMLElement;
    expect(lockOverlay).toBeInTheDocument();
    expect(lockOverlay).toHaveStyle({ left: '66.67%', width: 'calc(100% - 66.67%)' });
  });

  it('renders with OBSESSED tier selected', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.OBSESSED} />);
    
    // Check no tiers are locked
    const lockIcons = screen.queryAllByLabelText('Locked');
    expect(lockIcons).toHaveLength(0);
    
    // Check gradient width
    const gradient = container.querySelector('.perks-bar__gradient') as HTMLElement;
    expect(gradient).toHaveStyle({ width: '100%' });
    
    // Check no lock overlay
    const lockOverlay = container.querySelector('.perks-bar__lock-overlay');
    expect(lockOverlay).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PerksBar selectedTier={PerksTier.LIKE} className="custom-class" />
    );
    
    const perksBar = container.firstChild as HTMLElement;
    expect(perksBar).toHaveClass('custom-class');
  });

  it('renders three segments with dividers', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const segments = container.querySelectorAll('.perks-bar__segment');
    expect(segments).toHaveLength(3);
    
    // Check segment classes
    expect(segments[0]).toHaveClass('perks-bar__segment--like');
    expect(segments[1]).toHaveClass('perks-bar__segment--love');
    expect(segments[2]).toHaveClass('perks-bar__segment--obsessed');
    
    // Check dividers
    const dividers = container.querySelectorAll('.perks-bar__divider');
    expect(dividers).toHaveLength(2); // Two dividers between three segments
  });

  it('displays lock icons only on locked segments', () => {
    const { container, rerender } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    // LIKE selected: love and obsessed locked
    let segments = container.querySelectorAll('.perks-bar__segment');
    expect(segments[0].querySelector('.perks-bar__lock-icon')).not.toBeInTheDocument();
    expect(segments[1].querySelector('.perks-bar__lock-icon')).toBeInTheDocument();
    expect(segments[2].querySelector('.perks-bar__lock-icon')).toBeInTheDocument();
    
    // LOVE selected: only obsessed locked
    rerender(<PerksBar selectedTier={PerksTier.LOVE} />);
    segments = container.querySelectorAll('.perks-bar__segment');
    expect(segments[0].querySelector('.perks-bar__lock-icon')).not.toBeInTheDocument();
    expect(segments[1].querySelector('.perks-bar__lock-icon')).not.toBeInTheDocument();
    expect(segments[2].querySelector('.perks-bar__lock-icon')).toBeInTheDocument();
    
    // OBSESSED selected: none locked
    rerender(<PerksBar selectedTier={PerksTier.OBSESSED} />);
    segments = container.querySelectorAll('.perks-bar__segment');
    expect(segments[0].querySelector('.perks-bar__lock-icon')).not.toBeInTheDocument();
    expect(segments[1].querySelector('.perks-bar__lock-icon')).not.toBeInTheDocument();
    expect(segments[2].querySelector('.perks-bar__lock-icon')).not.toBeInTheDocument();
  });

  it('renders background bar container', () => {
    const { container } = render(<PerksBar selectedTier={PerksTier.LIKE} />);
    
    const background = container.querySelector('.perks-bar__background');
    expect(background).toBeInTheDocument();
  });

  it('handles all PerksTier enum values', () => {
    // Test each enum value
    Object.values(PerksTier).forEach(tier => {
      const { container } = render(<PerksBar selectedTier={tier} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});