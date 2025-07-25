import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCards from './ProductCards';

describe('ProductCards', () => {
  const defaultProps = {
    name: 'Test Product',
    price: 9.99,
    imageUrl: '/test-image.jpg',
    imageAlt: 'Test product image',
    onAddToCart: jest.fn(),
    onViewDetails: jest.fn(),
    onProductClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Horizontal Variant', () => {
    it('renders with required props in horizontal layout', () => {
      render(<ProductCards {...defaultProps} variant="horizontal" />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$9.99')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Test product image' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add Test Product to cart' })).toBeInTheDocument();
    });

    it('displays regular price when different from sale price', () => {
      render(<ProductCards {...defaultProps} regularPrice={19.99} variant="horizontal" />);
      
      expect(screen.getByText('$9.99')).toBeInTheDocument();
      expect(screen.getByText('reg $19.99')).toBeInTheDocument();
    });

    it('shows stock count when in stock', () => {
      render(<ProductCards {...defaultProps} stockCount={27} variant="horizontal" />);
      
      expect(screen.getByText('27 in stock at your store')).toBeInTheDocument();
    });
  });

  describe('Vertical Variant', () => {
    it('renders with required props in vertical layout', () => {
      render(<ProductCards {...defaultProps} variant="vertical" />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$9.99')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Test product image' })).toBeInTheDocument();
    });

    it('shows simplified stock text in vertical layout', () => {
      render(<ProductCards {...defaultProps} stockCount={27} variant="vertical" />);
      
      expect(screen.getByText('27 in stock')).toBeInTheDocument();
    });

    it('uses correct image dimensions for vertical layout', () => {
      render(<ProductCards {...defaultProps} variant="vertical" />);
      
      const image = screen.getByRole('img', { name: 'Test product image' });
      expect(image).toHaveAttribute('width', '140');
      expect(image).toHaveAttribute('height', '96');
    });
  });

  describe('Stock States', () => {
    it('shows ADD TO CART button when in stock', () => {
      render(<ProductCards {...defaultProps} inStock={true} />);
      
      const button = screen.getByRole('button', { name: 'Add Test Product to cart' });
      expect(button).toHaveTextContent('ADD TO CART');
    });

    it('shows VIEW DETAILS button when out of stock', () => {
      render(<ProductCards {...defaultProps} inStock={false} />);
      
      const button = screen.getByRole('button', { name: 'View details for Test Product' });
      expect(button).toHaveTextContent('VIEW DETAILS');
    });

    it('displays out of stock message', () => {
      render(<ProductCards {...defaultProps} inStock={false} />);
      
      expect(screen.getByText('Out of stock')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onAddToCart when ADD TO CART is clicked', () => {
      render(<ProductCards {...defaultProps} inStock={true} />);
      
      const button = screen.getByRole('button', { name: 'Add Test Product to cart' });
      fireEvent.click(button);
      
      expect(defaultProps.onAddToCart).toHaveBeenCalledTimes(1);
      expect(defaultProps.onViewDetails).not.toHaveBeenCalled();
    });

    it('calls onViewDetails when VIEW DETAILS is clicked', () => {
      render(<ProductCards {...defaultProps} inStock={false} />);
      
      const button = screen.getByRole('button', { name: 'View details for Test Product' });
      fireEvent.click(button);
      
      expect(defaultProps.onViewDetails).toHaveBeenCalledTimes(1);
      expect(defaultProps.onAddToCart).not.toHaveBeenCalled();
    });

    it('calls onProductClick when product name is clicked', () => {
      render(<ProductCards {...defaultProps} />);
      
      const productName = screen.getByText('Test Product');
      fireEvent.click(productName);
      
      expect(defaultProps.onProductClick).toHaveBeenCalledTimes(1);
    });

    it('calls onProductClick when Enter key is pressed on product name', () => {
      render(<ProductCards {...defaultProps} />);
      
      const productName = screen.getByText('Test Product');
      fireEvent.keyDown(productName, { key: 'Enter' });
      
      expect(defaultProps.onProductClick).toHaveBeenCalledTimes(1);
    });

    it('calls onProductClick when Space key is pressed on product name', () => {
      render(<ProductCards {...defaultProps} />);
      
      const productName = screen.getByText('Test Product');
      fireEvent.keyDown(productName, { key: ' ' });
      
      expect(defaultProps.onProductClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Additional Features', () => {
    it('displays rating and review count', () => {
      render(<ProductCards {...defaultProps} rating={4.5} reviewCount={280} />);
      
      expect(screen.getByRole('img', { name: '4.5 out of 5 stars (280 reviews)' })).toBeInTheDocument();
      expect(screen.getByText('(280)')).toBeInTheDocument();
    });

    it('shows color choices when provided', () => {
      render(<ProductCards {...defaultProps} colorChoices={4} />);
      
      expect(screen.getByText('4 color choices')).toBeInTheDocument();
    });

    it('displays fulfillment options', () => {
      render(<ProductCards {...defaultProps} fulfillments={['Pickup', 'shipping']} />);
      
      expect(screen.getByText('Pickup, shipping')).toBeInTheDocument();
    });

    it('displays custom fulfillment options', () => {
      render(<ProductCards {...defaultProps} fulfillments={['Store pickup', 'Delivery']} />);
      
      expect(screen.getByText('Store pickup, Delivery')).toBeInTheDocument();
    });

    it('does not display fulfillments when empty array', () => {
      render(<ProductCards {...defaultProps} fulfillments={[]} />);
      
      expect(screen.queryByText('Pickup, shipping')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('formats price correctly for whole numbers', () => {
      render(<ProductCards {...defaultProps} price={10} />);
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('formats price correctly for decimals', () => {
      render(<ProductCards {...defaultProps} price={10.5} />);
      expect(screen.getByText('$10.50')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ProductCards {...defaultProps} className="custom-class" />
      );
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('handles long product names with title attribute', () => {
      const longName = 'This is a very long product name that should be truncated in the display';
      render(<ProductCards {...defaultProps} name={longName} />);
      
      const nameElement = screen.getByText(longName);
      expect(nameElement).toHaveAttribute('title', longName);
    });

    it('does not make product name interactive when onProductClick is not provided', () => {
      render(<ProductCards {...defaultProps} onProductClick={undefined} />);
      
      const productName = screen.getByText('Test Product');
      expect(productName).not.toHaveAttribute('role', 'button');
      expect(productName).not.toHaveAttribute('tabIndex');
    });

    it('defaults to horizontal variant when not specified', () => {
      const { container } = render(<ProductCards {...defaultProps} />);
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('product-cards--horizontal');
    });

    it('defaults to in stock when not specified', () => {
      render(<ProductCards {...defaultProps} />);
      
      expect(screen.getByText('ADD TO CART')).toBeInTheDocument();
    });

    it('does not crash when callbacks are not provided', () => {
      render(
        <ProductCards 
          name={defaultProps.name}
          price={defaultProps.price}
          imageUrl={defaultProps.imageUrl}
          inStock={true}
        />
      );
      
      const button = screen.getByRole('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for buttons', () => {
      render(<ProductCards {...defaultProps} inStock={true} />);
      
      expect(screen.getByRole('button', { name: 'Add Test Product to cart' })).toBeInTheDocument();
    });

    it('makes product name keyboard accessible when clickable', () => {
      render(<ProductCards {...defaultProps} />);
      
      const productName = screen.getByText('Test Product');
      expect(productName).toHaveAttribute('role', 'button');
      expect(productName).toHaveAttribute('tabIndex', '0');
    });

    it('includes checkmark icon for fulfillments', () => {
      const { container } = render(
        <ProductCards {...defaultProps} fulfillments={['Pickup', 'shipping']} />
      );
      
      const checkmark = container.querySelector('img[src="/check.svg"]');
      expect(checkmark).toBeInTheDocument();
      expect(checkmark).toHaveAttribute('alt', '');
    });
  });
});