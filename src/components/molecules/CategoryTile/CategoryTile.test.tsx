import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryTile from './CategoryTile';

describe('CategoryTile', () => {
  const defaultProps = {
    label: 'Home & Garden',
    imageSrc: '/categories/category-home.jpg',
    imageAlt: 'Home and garden products',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<CategoryTile label="Test Category" imageSrc="/test.jpg" />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders the label correctly', () => {
    render(<CategoryTile {...defaultProps} />);
    expect(screen.getByText('Home & Garden')).toBeInTheDocument();
  });

  it('renders the image with correct attributes', () => {
    render(<CategoryTile {...defaultProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', 'Home and garden products');
    expect(image).toHaveAttribute('width', '134');
    expect(image).toHaveAttribute('height', '137');
  });

  it('uses label as default image alt text when imageAlt is not provided', () => {
    render(<CategoryTile label="Home & Garden" imageSrc="/categories/category-home.jpg" onClick={jest.fn()} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Home & Garden category');
  });

  it('calls onClick when clicked', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    fireEvent.click(tile);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    fireEvent.keyDown(tile, { key: 'Enter' });
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Space key is pressed', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    fireEvent.keyDown(tile, { key: ' ' });
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick for other keys', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    fireEvent.keyDown(tile, { key: 'Tab' });
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CategoryTile {...defaultProps} className="custom-class" />
    );
    const tile = container.firstChild as HTMLElement;
    expect(tile).toHaveClass('custom-class');
  });

  it('applies selected state correctly', () => {
    const { container } = render(
      <CategoryTile {...defaultProps} selected={true} />
    );
    const tile = container.firstChild as HTMLElement;
    expect(tile).toHaveClass('category-tile--selected');
    expect(tile).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not have button role when onClick is not provided', () => {
    render(<CategoryTile label="Home & Garden" imageSrc="/categories/category-home.jpg" imageAlt="Home and garden products" />);
    const tile = screen.getByText('Home & Garden').closest('div');
    expect(tile).not.toHaveAttribute('role');
    expect(tile).not.toHaveAttribute('tabIndex');
  });

  it('uses custom aria-label when provided', () => {
    render(
      <CategoryTile {...defaultProps} ariaLabel="Select home and garden category" />
    );
    const tile = screen.getByRole('button');
    expect(tile).toHaveAttribute('aria-label', 'Select home and garden category');
  });

  it('uses default aria-label when not provided', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    expect(tile).toHaveAttribute('aria-label', 'Home & Garden category');
  });

  it('handles keyboard navigation correctly', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    expect(tile).toHaveAttribute('tabIndex', '0');
  });

  it('prevents default behavior for Enter and Space keys', () => {
    render(<CategoryTile {...defaultProps} />);
    const tile = screen.getByRole('button');
    
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = jest.spyOn(enterEvent, 'preventDefault');
    
    fireEvent(tile, enterEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});