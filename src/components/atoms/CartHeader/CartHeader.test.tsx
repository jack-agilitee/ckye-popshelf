import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartHeader from './CartHeader';

describe('CartHeader', () => {
  const defaultProps = {
    itemCount: 3,
    totalPrice: 40.64,
  };

  it('renders with required props', () => {
    render(<CartHeader {...defaultProps} />);
    expect(screen.getByText('cart')).toBeInTheDocument();
    expect(screen.getByText('(3 items)')).toBeInTheDocument();
    expect(screen.getByText('total:')).toBeInTheDocument();
    expect(screen.getByText('$40.64')).toBeInTheDocument();
  });

  it('formats price to 2 decimal places', () => {
    render(<CartHeader itemCount={1} totalPrice={10.5} />);
    expect(screen.getByText('$10.50')).toBeInTheDocument();
  });

  it('handles single item correctly', () => {
    render(<CartHeader itemCount={1} totalPrice={10} />);
    expect(screen.getByText('(1 item)')).toBeInTheDocument();
  });

  it('handles multiple items correctly', () => {
    render(<CartHeader itemCount={5} totalPrice={50} />);
    expect(screen.getByText('(5 items)')).toBeInTheDocument();
  });

  it('handles zero items', () => {
    render(<CartHeader itemCount={0} totalPrice={0} />);
    expect(screen.getByText('(0 items)')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('uses custom currency symbol', () => {
    render(<CartHeader {...defaultProps} currencySymbol="€" />);
    expect(screen.getByText('€40.64')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CartHeader {...defaultProps} className="custom-class" />
    );
    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass('custom-class');
  });

  describe('Non-clickable variant', () => {
    it('renders as div when onClick is not provided', () => {
      render(<CartHeader {...defaultProps} />);
      const header = screen.getByRole('status');
      expect(header.tagName).toBe('DIV');
    });

    it('has correct aria-label', () => {
      render(<CartHeader {...defaultProps} />);
      const header = screen.getByRole('status');
      expect(header).toHaveAttribute('aria-label', 'Cart with 3 items, total $40.64');
    });

    it('uses custom aria-label when provided', () => {
      render(
        <CartHeader {...defaultProps} ariaLabel="Shopping cart summary" />
      );
      const header = screen.getByRole('status');
      expect(header).toHaveAttribute('aria-label', 'Shopping cart summary');
    });
  });

  describe('Clickable variant', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {
      onClickMock.mockClear();
    });

    it('renders as button when onClick is provided', () => {
      render(<CartHeader {...defaultProps} onClick={onClickMock} />);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('calls onClick when clicked', () => {
      render(<CartHeader {...defaultProps} onClick={onClickMock} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('has clickable class when onClick is provided', () => {
      render(<CartHeader {...defaultProps} onClick={onClickMock} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('cart-header--clickable');
    });

    it('has correct aria-label on button', () => {
      render(<CartHeader {...defaultProps} onClick={onClickMock} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Cart with 3 items, total $40.64');
    });

    it('uses custom aria-label on button when provided', () => {
      render(
        <CartHeader 
          {...defaultProps} 
          onClick={onClickMock}
          ariaLabel="Open shopping cart"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Open shopping cart');
    });
  });

  describe('Price formatting', () => {
    it('handles large numbers correctly', () => {
      render(<CartHeader itemCount={100} totalPrice={1234.567} />);
      expect(screen.getByText('$1234.57')).toBeInTheDocument();
    });

    it('handles negative prices', () => {
      render(<CartHeader itemCount={1} totalPrice={-10.50} />);
      expect(screen.getByText('$-10.50')).toBeInTheDocument();
    });
  });
});