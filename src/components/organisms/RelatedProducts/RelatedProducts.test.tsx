import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from './RelatedProducts';

interface MockSwiperProps {
  children: React.ReactNode;
  onSwiper?: (swiper: { slideTo: jest.Mock }) => void;
}

interface MockSwiperSlideProps {
  children: React.ReactNode;
}

// Mock Swiper components
jest.mock('swiper/react', () => ({
  Swiper: ({ children, onSwiper }: MockSwiperProps) => {
    // Call onSwiper with a mock swiper instance
    React.useEffect(() => {
      if (onSwiper) {
        onSwiper({ slideTo: jest.fn() });
      }
    }, [onSwiper]);
    return <div data-testid="swiper">{children}</div>;
  },
  SwiperSlide: ({ children }: MockSwiperSlideProps) => <div data-testid="swiper-slide">{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Pagination: {},
  Navigation: {},
}));

interface ImageProps {
  src: string;
  alt?: string;
  [key: string]: unknown;
}

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

const mockCategories = [
  { id: '1', name: 'Foil Fringe Banner' },
  { id: '2', name: 'Foil Letter Balloons' },
  { id: '3', name: '16 Inch Letter Balloons' },
];

const mockProducts = [
  {
    id: '1',
    name: '321 Party! Foil Gold Create Your Own Banner',
    price: 5.00,
    imageUrl: '/products/banner.jpg',
    imageAlt: 'Gold banner',
    inStock: true,
  },
  {
    id: '2',
    name: '321 Party! Champagne Balloon Cascade Kit',
    price: 5.00,
    imageUrl: '/products/balloon-kit.jpg',
    imageAlt: 'Balloon kit',
    inStock: true,
  },
  {
    id: '3',
    name: '321 Party! Cupcake Foil Balloon',
    price: 4.00,
    imageUrl: '/products/cupcake-balloon.jpg',
    imageAlt: 'Cupcake balloon',
    inStock: false,
  },
];

describe('RelatedProducts', () => {
  const defaultProps = {
    categories: mockCategories,
    products: mockProducts,
    onCategoryClick: jest.fn(),
    onAddToCart: jest.fn(),
    onViewDetails: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both sections when categories and products are provided', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    expect(screen.getByText('Related Items')).toBeInTheDocument();
    expect(screen.getByText('Related Products')).toBeInTheDocument();
  });

  it('renders category buttons correctly', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('renders product cards correctly', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    mockProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('calls onCategoryClick when category button is clicked', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    const firstCategoryButton = screen.getByText(mockCategories[0].name);
    fireEvent.click(firstCategoryButton);
    
    expect(defaultProps.onCategoryClick).toHaveBeenCalledWith(mockCategories[0]);
  });

  it('calls onAddToCart when add to cart button is clicked for in-stock item', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    const addToCartButtons = screen.getAllByText('ADD TO CART');
    fireEvent.click(addToCartButtons[0]);
    
    expect(defaultProps.onAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('calls onViewDetails when view details button is clicked for out-of-stock item', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    const viewDetailsButton = screen.getByText('VIEW DETAILS');
    fireEvent.click(viewDetailsButton);
    
    expect(defaultProps.onViewDetails).toHaveBeenCalledWith(mockProducts[2]);
  });

  it('does not render categories section when no categories provided', () => {
    render(<RelatedProducts {...defaultProps} categories={[]} />);
    
    expect(screen.queryByText('Related Items')).not.toBeInTheDocument();
    expect(screen.getByText('Related Products')).toBeInTheDocument();
  });

  it('does not render products section when no products provided', () => {
    render(<RelatedProducts {...defaultProps} products={[]} />);
    
    expect(screen.getByText('Related Items')).toBeInTheDocument();
    expect(screen.queryByText('Related Products')).not.toBeInTheDocument();
  });

  it('renders nothing when both categories and products are empty', () => {
    const { container } = render(
      <RelatedProducts {...defaultProps} categories={[]} products={[]} />
    );
    
    expect(container.firstChild).toHaveClass('related-products');
    expect(screen.queryByText('Related Items')).not.toBeInTheDocument();
    expect(screen.queryByText('Related Products')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RelatedProducts {...defaultProps} className="custom-class" />
    );
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('handles missing callback props gracefully', () => {
    render(
      <RelatedProducts
        categories={mockCategories}
        products={mockProducts}
      />
    );
    
    // Click category button
    const categoryButton = screen.getByText(mockCategories[0].name);
    expect(() => fireEvent.click(categoryButton)).not.toThrow();
    
    // Click add to cart button
    const addToCartButton = screen.getAllByText('ADD TO CART')[0];
    expect(() => fireEvent.click(addToCartButton)).not.toThrow();
  });

  it('renders correct number of swiper slides', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    const swiperSlides = screen.getAllByTestId('swiper-slide');
    expect(swiperSlides).toHaveLength(mockCategories.length + mockProducts.length);
  });

  it('uses correct aria labels for category buttons', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    mockCategories.forEach(category => {
      const button = screen.getByLabelText(`View ${category.name} category`);
      expect(button).toBeInTheDocument();
    });
  });

  it('passes correct props to MiniProductCard', () => {
    render(<RelatedProducts {...defaultProps} />);
    
    // Check that product images are rendered with correct alt text
    mockProducts.forEach(product => {
      if (product.imageAlt) {
        const image = screen.getByAltText(product.imageAlt);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', product.imageUrl);
      }
    });
  });
});