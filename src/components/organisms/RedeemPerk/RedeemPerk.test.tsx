import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RedeemPerk from './RedeemPerk';

describe('RedeemPerk', () => {
  const defaultProps = {
    qrCodePath: '/qr-code.svg',
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<RedeemPerk {...defaultProps} />);
    
    // Check default title
    expect(screen.getByText('1 in store surprise')).toBeInTheDocument();
    
    // Check default instruction text
    expect(screen.getByText(/Please find a pOpshelf® associate/)).toBeInTheDocument();
    
    // Check QR code
    expect(screen.getByAltText('QR code to scan')).toBeInTheDocument();
    
    // Check close button
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(
      <RedeemPerk 
        {...defaultProps} 
        title="Special Reward"
      />
    );
    
    expect(screen.getByText('Special Reward')).toBeInTheDocument();
  });

  it('renders with custom instruction text', () => {
    const customText = 'Scan this code at checkout';
    render(
      <RedeemPerk 
        {...defaultProps} 
        instructionText={customText}
      />
    );
    
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<RedeemPerk {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <RedeemPerk {...defaultProps} className="custom-class" />
    );
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('renders QR code with correct src', () => {
    const customPath = '/custom-qr.png';
    render(
      <RedeemPerk 
        {...defaultProps} 
        qrCodePath={customPath}
      />
    );
    
    const qrCode = screen.getByAltText('QR code to scan') as HTMLImageElement;
    expect(qrCode).toHaveAttribute('src', expect.stringContaining(customPath));
  });

  it('has proper accessibility attributes', () => {
    render(<RedeemPerk {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
  });

  it('renders with header and body sections', () => {
    const { container } = render(<RedeemPerk {...defaultProps} />);
    
    expect(container.querySelector('.redeem-perk__header')).toBeInTheDocument();
    expect(container.querySelector('.redeem-perk__body')).toBeInTheDocument();
  });

  it('handles keyboard navigation on close button', () => {
    render(<RedeemPerk {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close');
    
    // Test Enter key
    fireEvent.keyDown(closeButton, { key: 'Enter', code: 'Enter' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    
    jest.clearAllMocks();
    
    // Test Space key
    fireEvent.keyDown(closeButton, { key: ' ', code: 'Space' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('maintains focus states', () => {
    render(<RedeemPerk {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close');
    
    // Test focus
    fireEvent.focus(closeButton);
    expect(closeButton).toHaveFocus();
    
    // Test blur
    fireEvent.blur(closeButton);
    expect(closeButton).not.toHaveFocus();
  });
});