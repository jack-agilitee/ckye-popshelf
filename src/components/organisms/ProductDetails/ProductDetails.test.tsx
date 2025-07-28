import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetails from './ProductDetails';

describe('ProductDetails', () => {
  const defaultProps = {
    highlights: [
      'Foil balloon is shaped like the letter E.',
      'Measures 14 inches tall when inflated',
      'Combine to spell out words and names.',
      'Coordinate with more silver party supplies.'
    ]
  };

  it('renders with default props', () => {
    render(<ProductDetails />);
    
    expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Ratings & Reviews' })).toBeInTheDocument();
    expect(screen.getByText('Highlights')).toBeInTheDocument();
  });

  it('renders highlights when provided', () => {
    render(<ProductDetails {...defaultProps} />);
    
    defaultProps.highlights.forEach(highlight => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });

  it('renders custom title', () => {
    render(<ProductDetails title="Features" highlights={['Feature 1']} />);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
  });

  it('shows details tab by default', () => {
    render(<ProductDetails {...defaultProps} />);
    
    const detailsTab = screen.getByRole('tab', { name: 'Details' });
    expect(detailsTab).toHaveAttribute('aria-selected', 'true');
    expect(detailsTab).toHaveClass('product-details__tab--active');
  });

  it('switches to ratings tab when clicked', () => {
    render(<ProductDetails {...defaultProps} />);
    
    const ratingsTab = screen.getByRole('tab', { name: 'Ratings & Reviews' });
    fireEvent.click(ratingsTab);
    
    expect(ratingsTab).toHaveAttribute('aria-selected', 'true');
    expect(ratingsTab).toHaveClass('product-details__tab--active');
    
    const detailsTab = screen.getByRole('tab', { name: 'Details' });
    expect(detailsTab).toHaveAttribute('aria-selected', 'false');
    expect(detailsTab).not.toHaveClass('product-details__tab--active');
  });

  it('shows placeholder when no ratings content provided', () => {
    render(<ProductDetails />);
    
    const ratingsTab = screen.getByRole('tab', { name: 'Ratings & Reviews' });
    fireEvent.click(ratingsTab);
    
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });

  it('shows custom ratings content when provided', () => {
    const ratingsContent = <div>Custom ratings content</div>;
    render(<ProductDetails ratingsContent={ratingsContent} />);
    
    const ratingsTab = screen.getByRole('tab', { name: 'Ratings & Reviews' });
    fireEvent.click(ratingsTab);
    
    expect(screen.getByText('Custom ratings content')).toBeInTheDocument();
    expect(screen.queryByText('No reviews yet')).not.toBeInTheDocument();
  });

  it('hides highlights content when switching to ratings tab', () => {
    render(<ProductDetails {...defaultProps} />);
    
    // Initially showing highlights
    expect(screen.getByText(defaultProps.highlights[0])).toBeInTheDocument();
    
    // Switch to ratings
    const ratingsTab = screen.getByRole('tab', { name: 'Ratings & Reviews' });
    fireEvent.click(ratingsTab);
    
    // Highlights should be hidden
    expect(screen.queryByText(defaultProps.highlights[0])).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProductDetails className="custom-class" />
    );
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
    expect(component).toHaveClass('product-details');
  });

  it('renders ContentBlock even with empty highlights array', () => {
    render(<ProductDetails highlights={[]} />);
    
    expect(screen.getByText('Highlights')).toBeInTheDocument();
    // ContentBlock will render but with empty list
  });

  it('maintains tab state when content changes', () => {
    const { rerender } = render(<ProductDetails {...defaultProps} />);
    
    // Switch to ratings tab
    const ratingsTab = screen.getByRole('tab', { name: 'Ratings & Reviews' });
    fireEvent.click(ratingsTab);
    
    // Update props
    rerender(<ProductDetails {...defaultProps} title="New Title" />);
    
    // Should still be on ratings tab
    expect(ratingsTab).toHaveAttribute('aria-selected', 'true');
  });
});