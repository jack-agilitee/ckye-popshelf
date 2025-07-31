import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reward from './Reward';

describe('Reward', () => {
  it('renders default dollar amount when no props provided', () => {
    render(<Reward />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('REWARD')).toBeInTheDocument();
  });

  it('renders with custom dollar amount', () => {
    render(<Reward dollar={10} />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders percentage display', () => {
    render(<Reward percentage={15} />);
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('OFF')).toBeInTheDocument();
  });

  it('renders employee discount with 30%', () => {
    render(<Reward isEmployee={true} />);
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('OFF')).toBeInTheDocument();
  });

  it('renders birthday reward with two-line label', () => {
    render(<Reward percentage={20} isBirthday={true} />);
    expect(screen.getByText('BIRTHDAY')).toBeInTheDocument();
    expect(screen.getByText('REWARD')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Reward icon="/loyalty/cake.svg" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', expect.stringContaining('cake.svg'));
    expect(icon).toHaveAttribute('width', '72');
    expect(icon).toHaveAttribute('height', '72');
  });

  it('renders custom label', () => {
    render(<Reward label="SPECIAL" />);
    expect(screen.getByText('SPECIAL')).toBeInTheDocument();
  });

  it('hides label when hideLabel is true', () => {
    render(<Reward hideLabel={true} />);
    expect(screen.queryByText('REWARD')).not.toBeInTheDocument();
  });

  it('shows expiration date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    render(<Reward expirationDate={futureDate} />);
    expect(screen.getByText(/Exp\./)).toBeInTheDocument();
  });

  it('shows expiring warning for dates within 5 days', () => {
    const nearDate = new Date();
    nearDate.setDate(nearDate.getDate() + 3);
    render(<Reward expirationDate={nearDate} />);
    
    const expiryText = screen.getByText(/Expiring/);
    expect(expiryText).toBeInTheDocument();
    expect(expiryText).toHaveClass('reward__expiry--alert');
  });

  it('does not show expiring warning for dates beyond 5 days', () => {
    const farDate = new Date();
    farDate.setDate(farDate.getDate() + 10);
    render(<Reward expirationDate={farDate} />);
    
    const expiryText = screen.getByText(/Exp\./);
    expect(expiryText).toBeInTheDocument();
    expect(expiryText).toHaveClass('reward__expiry');
    expect(expiryText).not.toHaveClass('reward__expiry--alert');
  });

  it('hides expiration when hideExpiration is true', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    render(<Reward expirationDate={futureDate} hideExpiration={true} />);
    expect(screen.queryByText(/Exp\./)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Reward className="custom-class" />);
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('prioritizes icon over percentage', () => {
    render(<Reward icon="/loyalty/cake.svg" percentage={15} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.queryByText('15')).not.toBeInTheDocument();
  });

  it('prioritizes percentage over dollar', () => {
    render(<Reward percentage={20} dollar={10} />);
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('formats date correctly for non-expiring', () => {
    const date = new Date('2024-12-25');
    render(<Reward expirationDate={date} />);
    expect(screen.getByText('Exp. 12/25/2024')).toBeInTheDocument();
  });

  it('formats date correctly for expiring', () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    render(<Reward expirationDate={date} />);
    expect(screen.getByText(`Expiring ${month}/${day}/${year}`)).toBeInTheDocument();
  });

  it('does not show expired dates as expiring', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    render(<Reward expirationDate={pastDate} />);
    
    const expiryText = screen.getByText(/Exp\./);
    expect(expiryText).not.toHaveClass('reward__expiry--alert');
  });
});