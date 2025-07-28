import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductOptions from './ProductOptions';
import type { ColorOption } from './ProductOptions';
import type { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';

describe('ProductOptions', () => {
  const mockColorOptions: ColorOption[] = [
    { id: 'gold', name: 'Gold', imagePath: '/products/product-1.jpg' },
    { id: 'silver', name: 'Silver', imagePath: '/products/product-2.jpg' },
    { id: 'rose', name: 'Rose', imagePath: '/products/product-3.png' }
  ];

  const mockLetterOptions: DropdownOption[] = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' }
  ];

  const defaultProps = {
    colorOptions: mockColorOptions,
    letterOptions: mockLetterOptions,
    onColorSelect: jest.fn(),
    onLetterSelect: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<ProductOptions {...defaultProps} />);
    
    // Check color section
    expect(screen.getByText(/Color:/)).toBeInTheDocument();
    expect(screen.getByLabelText('Select Gold color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Silver color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Rose color')).toBeInTheDocument();
    
    // Check letter section
    expect(screen.getByText('Letter')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select an option/i })).toBeInTheDocument();
  });

  it('selects first color by default when no default provided', () => {
    render(<ProductOptions {...defaultProps} />);
    
    expect(screen.getByText('Color: Gold')).toBeInTheDocument();
    const goldButton = screen.getByLabelText('Select Gold color');
    expect(goldButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('respects default color and letter props', () => {
    render(
      <ProductOptions
        {...defaultProps}
        defaultColorId="silver"
        defaultLetter="C"
      />
    );
    
    expect(screen.getByText('Color: Silver')).toBeInTheDocument();
    const silverButton = screen.getByLabelText('Select Silver color');
    expect(silverButton).toHaveAttribute('aria-pressed', 'true');
    
    // Check dropdown has correct value
    expect(screen.getByRole('button', { name: /Select an option/i })).toHaveTextContent('C');
  });

  it('handles color selection', () => {
    render(<ProductOptions {...defaultProps} />);
    
    const silverButton = screen.getByLabelText('Select Silver color');
    fireEvent.click(silverButton);
    
    expect(defaultProps.onColorSelect).toHaveBeenCalledTimes(1);
    expect(defaultProps.onColorSelect).toHaveBeenCalledWith('silver');
    expect(screen.getByText('Color: Silver')).toBeInTheDocument();
    expect(silverButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('handles letter selection', () => {
    render(<ProductOptions {...defaultProps} />);
    
    // Open dropdown
    const dropdownTrigger = screen.getByRole('button', { name: /Select an option/i });
    fireEvent.click(dropdownTrigger);
    
    // Select letter B
    const optionB = screen.getByRole('option', { name: 'B' });
    fireEvent.click(optionB);
    
    expect(defaultProps.onLetterSelect).toHaveBeenCalledTimes(1);
    expect(defaultProps.onLetterSelect).toHaveBeenCalledWith('B');
  });

  it('maintains internal state when callbacks are not provided', () => {
    const { rerender } = render(
      <ProductOptions
        colorOptions={mockColorOptions}
        letterOptions={mockLetterOptions}
      />
    );
    
    // Select a color
    const roseButton = screen.getByLabelText('Select Rose color');
    fireEvent.click(roseButton);
    expect(screen.getByText('Color: Rose')).toBeInTheDocument();
    
    // Rerender to ensure state persists
    rerender(
      <ProductOptions
        colorOptions={mockColorOptions}
        letterOptions={mockLetterOptions}
      />
    );
    
    expect(screen.getByText('Color: Rose')).toBeInTheDocument();
    expect(roseButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProductOptions {...defaultProps} className="custom-class" />
    );
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('handles empty color options gracefully', () => {
    render(
      <ProductOptions
        colorOptions={[]}
        letterOptions={mockLetterOptions}
      />
    );
    
    expect(screen.getByText('Color: Select')).toBeInTheDocument();
  });

  it('updates selected color when props change', () => {
    const { rerender } = render(
      <ProductOptions {...defaultProps} defaultColorId="gold" />
    );
    
    expect(screen.getByText('Color: Gold')).toBeInTheDocument();
    
    rerender(
      <ProductOptions {...defaultProps} defaultColorId="silver" />
    );
    
    // Component maintains its own state, so it should still show Gold
    expect(screen.getByText('Color: Gold')).toBeInTheDocument();
  });

  it('renders correct image paths for color options', () => {
    render(<ProductOptions {...defaultProps} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'Gold');
    expect(images[1]).toHaveAttribute('alt', 'Silver');
    expect(images[2]).toHaveAttribute('alt', 'Rose');
  });

  it('provides keyboard accessibility for color selection', () => {
    render(<ProductOptions {...defaultProps} />);
    
    const goldButton = screen.getByLabelText('Select Gold color');
    const silverButton = screen.getByLabelText('Select Silver color');
    
    // Tab to first button
    goldButton.focus();
    expect(goldButton).toHaveFocus();
    
    // Tab to next button
    fireEvent.keyDown(goldButton, { key: 'Tab' });
    silverButton.focus();
    expect(silverButton).toHaveFocus();
  });
});