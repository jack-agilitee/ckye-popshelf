import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reward, { RewardVariant } from './Reward';

describe('Reward', () => {
  it('renders default variant with dollar amount', () => {
    render(<Reward />);
    
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('REWARD')).toBeInTheDocument();
    expect(screen.getByText('Exp. 12/10/2024')).toBeInTheDocument();
  });

  it('renders with custom dollar amount', () => {
    render(<Reward amount={10} />);
    
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders percent variant', () => {
    render(<Reward variant="percent" />);
    
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('OFF')).toBeInTheDocument();
    expect(screen.getByText('REWARD')).toBeInTheDocument();
  });

  it('renders with custom percentage', () => {
    render(<Reward variant="percent" percentage={20} />);
    
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('renders employee variant with 30% off', () => {
    render(<Reward variant="employee" />);
    
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('OFF')).toBeInTheDocument();
  });

  it('renders birthday variant with multi-line label', () => {
    render(<Reward variant="birthday" />);
    
    expect(screen.getByText('BIRTHDAY')).toBeInTheDocument();
    expect(screen.getByText('REWARD')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('OFF')).toBeInTheDocument();
  });

  it('renders icon variant with provided icon', () => {
    render(<Reward variant="icon" iconPath="/loyalty/cake.svg" />);
    
    const icon = screen.getByAltText('Reward icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', expect.stringContaining('/loyalty/cake.svg'));
  });

  it('renders expiring variant with red expiration text', () => {
    render(<Reward variant="expiring" />);
    
    expect(screen.getByText('Expiring 9/20/2024')).toBeInTheDocument();
    expect(screen.getByText('Expiring 9/20/2024')).toHaveClass('reward__expiry--alert');
  });

  it('renders simple variant without label or expiration', () => {
    render(<Reward variant="simple" />);
    
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('REWARD')).not.toBeInTheDocument();
    expect(screen.queryByText(/Exp\./)).not.toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<Reward showLabel={false} />);
    
    expect(screen.queryByText('REWARD')).not.toBeInTheDocument();
  });

  it('hides expiration when showExpiration is false', () => {
    render(<Reward showExpiration={false} />);
    
    expect(screen.queryByText(/Exp\./)).not.toBeInTheDocument();
  });

  it('shows custom expiration date', () => {
    render(<Reward expirationDate="Exp. 01/15/2025" />);
    
    expect(screen.getByText('Exp. 01/15/2025')).toBeInTheDocument();
  });

  it('shows expiring alert when isExpiring is true', () => {
    render(<Reward isExpiring={true} />);
    
    expect(screen.getByText('Expiring 9/20/2024')).toBeInTheDocument();
    expect(screen.getByText('Expiring 9/20/2024')).toHaveClass('reward__expiry--alert');
  });

  it('applies custom className', () => {
    const { container } = render(<Reward className="custom-class" />);
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('renders all text elements correctly for each variant', () => {
    const variants: Array<{ variant: RewardVariant; expectedTexts: string[] }> = [
      { variant: 'default', expectedTexts: ['$', '5', 'REWARD', 'Exp. 12/10/2024'] },
      { variant: 'percent', expectedTexts: ['15', '%', 'OFF', 'REWARD'] },
      { variant: 'employee', expectedTexts: ['30', '%', 'OFF', 'REWARD'] },
      { variant: 'birthday', expectedTexts: ['15', '%', 'OFF', 'BIRTHDAY', 'REWARD'] },
      { variant: 'expiring', expectedTexts: ['$', '5', 'REWARD', 'Expiring 9/20/2024'] },
      { variant: 'simple', expectedTexts: ['$', '5'] },
    ];

    variants.forEach(({ variant, expectedTexts }) => {
      const { unmount } = render(<Reward variant={variant} />);
      
      expectedTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
      
      unmount();
    });
  });
});