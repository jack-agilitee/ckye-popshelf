import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
  const defaultProps = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default quantity of 1', () => {
    render(<QuantitySelector {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders with custom initial quantity', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows trash icon when quantity is at minimum (1)', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={1} />);
    const leftButton = screen.getByLabelText('Remove item');
    expect(leftButton).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument(); // Trash icon
  });

  it('shows minus icon when quantity is above minimum', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={2} />);
    const leftButton = screen.getByLabelText('Decrease quantity');
    expect(leftButton).toBeInTheDocument();
  });

  it('increments quantity when plus button is clicked', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={1} />);
    const plusButton = screen.getByLabelText('Increase quantity');
    
    fireEvent.click(plusButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
  });

  it('decrements quantity when minus button is clicked', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={3} />);
    const minusButton = screen.getByLabelText('Decrease quantity');
    
    fireEvent.click(minusButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when trash icon is clicked', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={1} />);
    const trashButton = screen.getByLabelText('Remove item');
    
    fireEvent.click(trashButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('respects minimum quantity constraint', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={1} minQuantity={1} />);
    const leftButton = screen.getByLabelText('Remove item');
    
    // Should call onDelete instead of decrement when at minimum
    fireEvent.click(leftButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
    expect(defaultProps.onDecrement).not.toHaveBeenCalled();
  });

  it('respects maximum quantity constraint', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={5} maxQuantity={5} />);
    const plusButton = screen.getByLabelText('Increase quantity');
    
    expect(plusButton).toBeDisabled();
    
    fireEvent.click(plusButton);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(defaultProps.onIncrement).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <QuantitySelector {...defaultProps} className="custom-class" />
    );
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('handles multiple increments and decrements', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={2} />);
    const plusButton = screen.getByLabelText('Increase quantity');
    const minusButton = screen.getByLabelText('Decrease quantity');
    
    // Increment twice
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(screen.getByText('4')).toBeInTheDocument();
    
    // Decrement once
    fireEvent.click(minusButton);
    expect(screen.getByText('3')).toBeInTheDocument();
    
    expect(defaultProps.onIncrement).toHaveBeenCalledTimes(2);
    expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
  });

  it('transitions from minus to trash icon when reaching minimum', () => {
    render(<QuantitySelector {...defaultProps} initialQuantity={2} />);
    const minusButton = screen.getByLabelText('Decrease quantity');
    
    fireEvent.click(minusButton);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove item')).toBeInTheDocument();
  });

  it('works without callback props', () => {
    render(<QuantitySelector />);
    const plusButton = screen.getByLabelText('Increase quantity');
    const trashButton = screen.getByLabelText('Remove item');
    
    // Should not throw errors when callbacks are not provided
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    
    fireEvent.click(trashButton);
    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity unchanged
  });
});