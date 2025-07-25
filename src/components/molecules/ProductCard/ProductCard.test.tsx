import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock QuantitySelector component
interface MockQuantitySelectorProps {
  initialQuantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onDelete?: () => void;
}

jest.mock('../QuantitySelector/QuantitySelector', () => ({
  __esModule: true,
  default: ({ initialQuantity, onIncrement, onDecrement, onDelete }: MockQuantitySelectorProps) => (
    <div data-testid="quantity-selector">
      <span>{initialQuantity}</span>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

describe('ProductCard', () => {
  const defaultProps = {
    name: 'Round Gold Metal Wall Mirror',
    price: 9.00,
    stockQuantity: 15,
    onClose: jest.fn(),
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<ProductCard {...defaultProps} />);
    
    expect(screen.getByText('Round Gold Metal Wall Mirror')).toBeInTheDocument();
    expect(screen.getByText('$9.00')).toBeInTheDocument();
    expect(screen.getByText('15 in stock')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-selector')).toBeInTheDocument();
  });

  it('renders with custom image', () => {
    const customImage = '/custom-product.jpg';
    render(<ProductCard {...defaultProps} image={customImage} />);
    
    const image = screen.getByAltText('Round Gold Metal Wall Mirror');
    expect(image).toHaveAttribute('src', customImage);
  });

  it('renders with regular price', () => {
    render(<ProductCard {...defaultProps} regularPrice={11.00} />);
    
    expect(screen.getByText('reg')).toBeInTheDocument();
    expect(screen.getByText('$11.00')).toBeInTheDocument();
  });

  it('does not show regular price when equal to or less than current price', () => {
    render(<ProductCard {...defaultProps} regularPrice={9.00} />);
    
    expect(screen.queryByText('reg')).not.toBeInTheDocument();
  });

  it('renders out of stock variant', () => {
    render(<ProductCard {...defaultProps} outOfStock={true} />);
    
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    expect(screen.queryByText('15 in stock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('quantity-selector')).not.toBeInTheDocument();
    
    const image = screen.getByAltText('Round Gold Metal Wall Mirror');
    expect(image).toHaveClass('product-card__image--unavailable');
    
    const name = screen.getByText('Round Gold Metal Wall Mirror');
    expect(name).toHaveClass('product-card__name--unavailable');
  });

  it('calls onClose when close button is clicked', () => {
    render(<ProductCard {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: 'Remove product' });
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('formats prices correctly', () => {
    render(<ProductCard {...defaultProps} price={10.5} regularPrice={15} />);
    
    expect(screen.getByText('$10.50')).toBeInTheDocument();
    expect(screen.getByText('$15.00')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProductCard {...defaultProps} className="custom-class" />
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('handles long product names with truncation', () => {
    const longName = 'Very Long Product Name That Should Be Truncated After Two Lines Of Text To Prevent Layout Issues';
    render(<ProductCard {...defaultProps} name={longName} />);
    
    const nameElement = screen.getByText(longName);
    expect(nameElement).toHaveClass('product-card__name');
  });

  it('passes quantity callbacks to QuantitySelector', () => {
    render(<ProductCard {...defaultProps} initialQuantity={3} />);
    
    const quantitySelector = screen.getByTestId('quantity-selector');
    expect(quantitySelector).toHaveTextContent('3');
    
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
    
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('uses default image when not provided', () => {
    render(<ProductCard {...defaultProps} />);
    
    const productImage = screen.getByAltText('Round Gold Metal Wall Mirror');
    expect(productImage).toHaveAttribute('src', '/categories/product.png');
  });

  it('uses default quantity when not provided', () => {
    render(<ProductCard {...defaultProps} />);
    
    const quantitySelector = screen.getByTestId('quantity-selector');
    expect(quantitySelector).toHaveTextContent('1');
  });

  it('handles zero stock quantity', () => {
    render(<ProductCard {...defaultProps} stockQuantity={0} />);
    
    expect(screen.getByText('0 in stock')).toBeInTheDocument();
  });

  it('hides price section for out of stock items', () => {
    render(<ProductCard {...defaultProps} outOfStock={true} />);
    
    // Price section should be invisible but still in DOM
    const priceText = screen.getByText('$9.00');
    const priceSection = priceText.closest('div');
    expect(priceSection).toHaveClass('product-card__price-section--hidden');
  });
});