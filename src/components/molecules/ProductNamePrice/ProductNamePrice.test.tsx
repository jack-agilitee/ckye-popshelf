import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductNamePrice from './ProductNamePrice';

describe('ProductNamePrice', () => {
  const defaultProps = {
    name: 'Dermott Damask Throw Pillow (Set of 2)',
    price: 9.00,
    regularPrice: 9.50,
    rating: 4.5,
    reviewCount: 280,
    onShare: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    const { name, price } = defaultProps;
    render(<ProductNamePrice name={name} price={price} />);
    
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('$9.00')).toBeInTheDocument();
  });

  it('renders product name correctly', () => {
    render(<ProductNamePrice {...defaultProps} />);
    
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent(defaultProps.name);
  });

  it('formats prices correctly', () => {
    render(<ProductNamePrice {...defaultProps} />);
    
    expect(screen.getByText('$9.00')).toBeInTheDocument();
    expect(screen.getByText('reg. $9.50')).toBeInTheDocument();
  });

  it('renders share button when onShare is provided', () => {
    render(<ProductNamePrice {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: 'Share product' });
    expect(shareButton).toBeInTheDocument();
  });

  it('does not render share button when onShare is not provided', () => {
    const { onShare: _, ...propsWithoutShare } = defaultProps;
    render(<ProductNamePrice {...propsWithoutShare} />);
    
    expect(screen.queryByRole('button', { name: 'Share product' })).not.toBeInTheDocument();
  });

  it('calls onShare when share button is clicked', () => {
    render(<ProductNamePrice {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: 'Share product' });
    fireEvent.click(shareButton);
    
    expect(defaultProps.onShare).toHaveBeenCalledTimes(1);
  });

  it('renders ReviewStars component with correct props', () => {
    render(<ProductNamePrice {...defaultProps} />);
    
    // Check for review count text
    expect(screen.getByText('(280)')).toBeInTheDocument();
  });

  it('does not render regular price when it equals current price', () => {
    render(<ProductNamePrice {...defaultProps} price={9.50} regularPrice={9.50} />);
    
    expect(screen.getByText('$9.50')).toBeInTheDocument();
    expect(screen.queryByText('reg. $9.50')).not.toBeInTheDocument();
  });

  it('does not render regular price when not provided', () => {
    const { regularPrice: _, ...propsWithoutRegular } = defaultProps;
    render(<ProductNamePrice {...propsWithoutRegular} />);
    
    expect(screen.getByText('$9.00')).toBeInTheDocument();
    expect(screen.queryByText(/reg\./)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProductNamePrice {...defaultProps} className="custom-class" />
    );
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
    expect(component).toHaveClass('product-name-price');
  });

  it('handles zero rating and review count', () => {
    render(<ProductNamePrice name="Test Product" price={10} rating={0} reviewCount={0} />);
    
    expect(screen.getByText('(0)')).toBeInTheDocument();
  });

  it('handles edge case prices', () => {
    render(<ProductNamePrice name="Test" price={0.01} regularPrice={999.99} />);
    
    expect(screen.getByText('$0.01')).toBeInTheDocument();
    expect(screen.getByText('reg. $999.99')).toBeInTheDocument();
  });

  it('maintains proper spacing and layout structure', () => {
    const { container } = render(<ProductNamePrice {...defaultProps} />);
    
    const title = container.querySelector('.product-name-price__title');
    const rating = container.querySelector('.product-name-price__rating');
    const pricing = container.querySelector('.product-name-price__pricing');
    
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(pricing).toBeInTheDocument();
  });

  it('handles long product names gracefully', () => {
    const longName = 'This is a very long product name that should wrap properly and not break the layout of the component';
    render(<ProductNamePrice {...defaultProps} name={longName} />);
    
    expect(screen.getByText(longName)).toBeInTheDocument();
  });
});