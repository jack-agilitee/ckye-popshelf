import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioButtonSelector from './RadioButtonSelector';

describe('RadioButtonSelector', () => {
  const defaultProps = {
    id: 'test-radio',
    name: 'test-group',
    value: 'test-value',
    label: 'Test Label',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders in unchecked state by default', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    const radioInput = screen.getByRole('radio', { hidden: true }) as HTMLInputElement;
    expect(radioInput.checked).toBe(false);
  });

  it('renders in checked state when checked prop is true', () => {
    render(<RadioButtonSelector {...defaultProps} checked />);
    const radioInput = screen.getByRole('radio', { hidden: true }) as HTMLInputElement;
    expect(radioInput.checked).toBe(true);
  });

  it('renders in disabled state when disabled prop is true', () => {
    render(<RadioButtonSelector {...defaultProps} disabled />);
    const radioInput = screen.getByRole('radio', { hidden: true }) as HTMLInputElement;
    expect(radioInput.disabled).toBe(true);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onChange when clicked', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    const container = screen.getByRole('radio');
    fireEvent.click(container);
    expect(defaultProps.onChange).toHaveBeenCalledWith('test-value');
  });

  it('does not call onChange when disabled', () => {
    render(<RadioButtonSelector {...defaultProps} disabled />);
    const container = screen.getByRole('radio');
    fireEvent.click(container);
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('renders with check icon when checked and rightContent is check', () => {
    render(<RadioButtonSelector {...defaultProps} checked rightContent="check" />);
    const checkIcon = screen.getAllByRole('img')[1]; // Second image is the check
    expect(checkIcon).toHaveAttribute('src', '/check.svg');
  });

  it('renders with price when rightContent is price', () => {
    render(<RadioButtonSelector {...defaultProps} rightContent="price" price="$9.99" />);
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('renders with status text when disabled and rightContent is status', () => {
    render(<RadioButtonSelector {...defaultProps} disabled rightContent="status" statusText="Out of stock" />);
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioButtonSelector {...defaultProps} className="custom-class" />
    );
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('handles keyboard navigation', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    const container = screen.getByRole('radio');
    expect(container).toHaveAttribute('tabIndex', '0');
  });

  it('has correct tabIndex when disabled', () => {
    render(<RadioButtonSelector {...defaultProps} disabled />);
    const container = screen.getByRole('radio');
    expect(container).toHaveAttribute('tabIndex', '-1');
  });

  it('uses aria-label when provided', () => {
    render(<RadioButtonSelector {...defaultProps} aria-label="Custom label" />);
    const radioInput = screen.getByRole('radio', { hidden: true });
    expect(radioInput).toHaveAttribute('aria-label', 'Custom label');
  });

  it('uses label as aria-label when aria-label not provided', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    const radioInput = screen.getByRole('radio', { hidden: true });
    expect(radioInput).toHaveAttribute('aria-label', 'Test Label');
  });

  it('applies aria-describedby when provided', () => {
    render(<RadioButtonSelector {...defaultProps} aria-describedby="description-id" />);
    const radioInput = screen.getByRole('radio', { hidden: true });
    expect(radioInput).toHaveAttribute('aria-describedby', 'description-id');
  });

  it('renders correct radio icon based on state', () => {
    const { rerender } = render(<RadioButtonSelector {...defaultProps} />);
    let radioIcon = screen.getAllByRole('img')[0];
    expect(radioIcon).toHaveAttribute('src', '/radio-unselected.svg');

    rerender(<RadioButtonSelector {...defaultProps} checked />);
    radioIcon = screen.getAllByRole('img')[0];
    expect(radioIcon).toHaveAttribute('src', '/radio-selected.svg');

    rerender(<RadioButtonSelector {...defaultProps} disabled />);
    radioIcon = screen.getAllByRole('img')[0];
    expect(radioIcon).toHaveAttribute('src', '/radio-disabled.svg');
  });

  it('handles onChange on input element', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    const radioInput = screen.getByRole('radio', { hidden: true });
    fireEvent.change(radioInput, { target: { value: 'test-value' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('test-value');
  });

  it('label is associated with input', () => {
    render(<RadioButtonSelector {...defaultProps} />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-radio');
  });
});