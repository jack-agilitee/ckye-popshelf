import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderSummary from './OrderSummary';

describe('OrderSummary', () => {
  const defaultProps = {
    originalTotal: 7.99,
    rewards: 5.00,
    subtotal: 33.48,
    crvFeeQuantity: 3,
    crvFeePerItem: 0.10,
    bagFeeQuantity: 2,
    bagFeePerItem: 0.10,
    tax: 2.34,
    orderTotal: 12.94,
    onProceedToCheckout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with all required props', () => {
    render(<OrderSummary {...defaultProps} />);
    
    expect(screen.getByText('Will you bring your own bags?')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Original total:')).toBeInTheDocument();
    expect(screen.getByText('$7.99')).toBeInTheDocument();
    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
  });

  it('displays all line items correctly', () => {
    render(<OrderSummary {...defaultProps} />);
    
    expect(screen.getByText('Original total:')).toBeInTheDocument();
    expect(screen.getByText('$7.99')).toBeInTheDocument();
    
    expect(screen.getByText('Rewards:')).toBeInTheDocument();
    expect(screen.getByText('-$5.00')).toBeInTheDocument();
    
    expect(screen.getByText('Subtotal:')).toBeInTheDocument();
    expect(screen.getByText('$33.48')).toBeInTheDocument();
    
    expect(screen.getByText('CA CRV Fee 3 @ $0.10:')).toBeInTheDocument();
    expect(screen.getByText('$0.30')).toBeInTheDocument();
    
    expect(screen.getByText('Est Bag Fee 2 @ $0.10:')).toBeInTheDocument();
    expect(screen.getByText('$0.20')).toBeInTheDocument();
    
    expect(screen.getByText('Tax:')).toBeInTheDocument();
    expect(screen.getByText('$2.34')).toBeInTheDocument();
    
    expect(screen.getByText('Order Total:')).toBeInTheDocument();
    expect(screen.getByText('$12.94')).toBeInTheDocument();
  });

  it('handles bring own bags checkbox', () => {
    render(<OrderSummary {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /Yes, I will bring my own bags/i });
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Bag fee should be hidden when bring own bags is checked
    expect(screen.queryByText('Est Bag Fee 2 @ $0.10:')).not.toBeInTheDocument();
  });

  it('handles promo code input', () => {
    render(<OrderSummary {...defaultProps} />);
    
    const promoInput = screen.getByPlaceholderText('Promo code');
    expect(promoInput).toBeInTheDocument();
    
    fireEvent.change(promoInput, { target: { value: 'SAVE10' } });
    expect(promoInput).toHaveValue('SAVE10');
  });

  it('logs promo code when apply button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<OrderSummary {...defaultProps} />);
    
    const promoInput = screen.getByPlaceholderText('Promo code');
    const applyButton = screen.getByText('Apply');
    
    fireEvent.change(promoInput, { target: { value: 'TESTCODE' } });
    fireEvent.click(applyButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Applying promo code:', 'TESTCODE');
    consoleSpy.mockRestore();
  });

  it('calls onProceedToCheckout when proceed button is clicked', () => {
    render(<OrderSummary {...defaultProps} />);
    
    const proceedButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(proceedButton);
    
    expect(defaultProps.onProceedToCheckout).toHaveBeenCalledTimes(1);
  });

  it('hides rewards line when rewards is 0', () => {
    render(<OrderSummary {...defaultProps} rewards={0} />);
    
    expect(screen.queryByText('Rewards:')).not.toBeInTheDocument();
  });

  it('hides CRV fee when quantity is 0', () => {
    render(<OrderSummary {...defaultProps} crvFeeQuantity={0} />);
    
    expect(screen.queryByText(/CA CRV Fee/)).not.toBeInTheDocument();
  });

  it('hides bag fee when quantity is 0', () => {
    render(<OrderSummary {...defaultProps} bagFeeQuantity={0} />);
    
    expect(screen.queryByText(/Est Bag Fee/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <OrderSummary {...defaultProps} className="custom-class" />
    );
    
    const orderSummary = container.firstChild as HTMLElement;
    expect(orderSummary).toHaveClass('custom-class');
  });

  it('formats currency correctly', () => {
    render(<OrderSummary {...defaultProps} originalTotal={10.999} />);
    
    expect(screen.getByText('$11.00')).toBeInTheDocument();
  });

  it('handles missing onProceedToCheckout callback gracefully', () => {
    render(<OrderSummary {...defaultProps} onProceedToCheckout={undefined} />);
    
    const proceedButton = screen.getByText('Proceed to Checkout');
    expect(() => fireEvent.click(proceedButton)).not.toThrow();
  });

  it('displays correct fee calculations', () => {
    render(<OrderSummary {...defaultProps} />);
    
    // CRV Fee: 3 * 0.10 = 0.30
    expect(screen.getByText('$0.30')).toBeInTheDocument();
    
    // Bag Fee: 2 * 0.10 = 0.20
    expect(screen.getByText('$0.20')).toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    const minimalProps = {
      originalTotal: 10,
      subtotal: 10,
      tax: 1,
      orderTotal: 11,
    };
    
    render(<OrderSummary {...minimalProps} />);
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$11.00')).toBeInTheDocument();
  });
});