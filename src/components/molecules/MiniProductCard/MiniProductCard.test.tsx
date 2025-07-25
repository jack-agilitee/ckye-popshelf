import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MiniProductCard from './MiniProductCard';

describe('MiniProductCard', () => {
  const defaultProps = {
    name: 'Test Product',
    price: 9.99,
    imageUrl: '/test-image.jpg',
    imageAlt: 'Test product image',
    onAddToCart: jest.fn(),
    onViewDetails: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<MiniProductCard {...defaultProps} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test product image' })).toBeInTheDocument();
  });

  it('shows ADD TO CART button when in stock', () => {
    render(<MiniProductCard {...defaultProps} inStock={true} />);
    
    const button = screen.getByRole('button', { name: 'Add Test Product to cart' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('ADD TO CART');
  });

  it('shows VIEW DETAILS button when out of stock', () => {
    render(<MiniProductCard {...defaultProps} inStock={false} />);
    
    const button = screen.getByRole('button', { name: 'View details for Test Product' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('VIEW DETAILS');
  });

  it('calls onAddToCart when ADD TO CART is clicked', () => {
    render(<MiniProductCard {...defaultProps} inStock={true} />);
    
    const button = screen.getByRole('button', { name: 'Add Test Product to cart' });
    fireEvent.click(button);
    
    expect(defaultProps.onAddToCart).toHaveBeenCalledTimes(1);
    expect(defaultProps.onViewDetails).not.toHaveBeenCalled();
  });

  it('calls onViewDetails when VIEW DETAILS is clicked', () => {
    render(<MiniProductCard {...defaultProps} inStock={false} />);
    
    const button = screen.getByRole('button', { name: 'View details for Test Product' });
    fireEvent.click(button);
    
    expect(defaultProps.onViewDetails).toHaveBeenCalledTimes(1);
    expect(defaultProps.onAddToCart).not.toHaveBeenCalled();
  });

  it('formats price correctly', () => {
    render(<MiniProductCard {...defaultProps} price={10} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    
    render(<MiniProductCard {...defaultProps} price={10.5} />);
    expect(screen.getByText('$10.50')).toBeInTheDocument();
    
    render(<MiniProductCard {...defaultProps} price={10.999} />);
    expect(screen.getByText('$11.00')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MiniProductCard {...defaultProps} className="custom-class" />
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('handles long product names with title attribute', () => {
    const longName = 'This is a very long product name that should be truncated';
    render(<MiniProductCard {...defaultProps} name={longName} />);
    
    const nameElement = screen.getByText(longName);
    expect(nameElement).toHaveAttribute('title', longName);
  });

  it('uses default imageAlt when not provided', () => {
    render(<MiniProductCard 
      name={defaultProps.name}
      price={defaultProps.price}
      imageUrl={defaultProps.imageUrl}
      onAddToCart={defaultProps.onAddToCart}
      onViewDetails={defaultProps.onViewDetails}
    />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', '');
  });

  it('defaults to inStock true when not specified', () => {
    render(<MiniProductCard {...defaultProps} />);
    
    expect(screen.getByText('ADD TO CART')).toBeInTheDocument();
  });

  it('does not crash when callbacks are not provided', () => {
    render(<MiniProductCard 
      name={defaultProps.name}
      price={defaultProps.price}
      imageUrl={defaultProps.imageUrl}
      inStock={true}
    />);
    const addButton = screen.getByRole('button');
    expect(() => fireEvent.click(addButton)).not.toThrow();
    
    render(<MiniProductCard 
      name={defaultProps.name}
      price={defaultProps.price}
      imageUrl={defaultProps.imageUrl}
      inStock={false}
    />);
    const viewButton = screen.getByRole('button');
    expect(() => fireEvent.click(viewButton)).not.toThrow();
  });

  it('renders image with correct dimensions', () => {
    render(<MiniProductCard {...defaultProps} />);
    
    const image = screen.getByRole('img', { name: 'Test product image' });
    expect(image).toHaveAttribute('width', '80');
    expect(image).toHaveAttribute('height', '80');
  });
});