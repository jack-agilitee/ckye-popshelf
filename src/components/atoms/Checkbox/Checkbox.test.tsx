import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    label: 'Accept terms and conditions',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    render(<Checkbox {...defaultProps} />);
    expect(screen.getByText('Accept terms and conditions')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    render(<Checkbox {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked when checked prop is true', () => {
    render(<Checkbox {...defaultProps} checked={true} />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox {...defaultProps} />);
    
    const label = screen.getByText('Accept terms and conditions');
    await user.click(label);
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it('toggles checked state correctly', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Checkbox {...defaultProps} checked={false} />);
    
    const label = screen.getByText('Accept terms and conditions');
    await user.click(label);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
    
    rerender(<Checkbox {...defaultProps} checked={true} />);
    await user.click(label);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox {...defaultProps} disabled={true} />);
    
    const label = screen.getByText('Accept terms and conditions');
    await user.click(label);
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('renders disabled state correctly', () => {
    render(<Checkbox {...defaultProps} disabled={true} />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toBeDisabled();
  });

  it('handles keyboard navigation with Space key', () => {
    render(<Checkbox {...defaultProps} />);
    const checkboxBox = screen.getByRole('checkbox', { name: '' });
    
    fireEvent.keyDown(checkboxBox, { key: ' ', code: 'Space' });
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it('does not respond to Space key when disabled', () => {
    render(<Checkbox {...defaultProps} disabled={true} />);
    const checkboxBox = screen.getByRole('checkbox', { name: '' });
    
    fireEvent.keyDown(checkboxBox, { key: ' ', code: 'Space' });
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Checkbox {...defaultProps} className="custom-checkbox" />
    );
    const checkboxWrapper = container.firstChild as HTMLElement;
    expect(checkboxWrapper).toHaveClass('custom-checkbox');
  });

  it('uses provided id', () => {
    render(<Checkbox {...defaultProps} id="custom-id" />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('generates unique id when not provided', () => {
    const { container } = render(<Checkbox {...defaultProps} />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toHaveAttribute('id');
    expect(checkbox?.getAttribute('id')).toBeTruthy();
  });

  it('uses provided name attribute', () => {
    render(<Checkbox {...defaultProps} name="terms" />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toHaveAttribute('name', 'terms');
  });

  it('applies aria-label when provided', () => {
    render(<Checkbox {...defaultProps} ariaLabel="Accept the terms" />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toHaveAttribute('aria-label', 'Accept the terms');
  });

  it('applies aria-describedby when provided', () => {
    render(<Checkbox {...defaultProps} ariaDescribedBy="terms-description" />);
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toHaveAttribute('aria-describedby', 'terms-description');
  });

  it('has correct aria-checked attribute', () => {
    const { rerender } = render(<Checkbox {...defaultProps} checked={false} />);
    let checkboxBox = screen.getByRole('checkbox', { name: '' });
    expect(checkboxBox).toHaveAttribute('aria-checked', 'false');
    
    rerender(<Checkbox {...defaultProps} checked={true} />);
    checkboxBox = screen.getByRole('checkbox', { name: '' });
    expect(checkboxBox).toHaveAttribute('aria-checked', 'true');
  });

  it('has correct aria-disabled attribute', () => {
    const { rerender } = render(<Checkbox {...defaultProps} disabled={false} />);
    let checkboxBox = screen.getByRole('checkbox', { name: '' });
    expect(checkboxBox).toHaveAttribute('aria-disabled', 'false');
    
    rerender(<Checkbox {...defaultProps} disabled={true} />);
    checkboxBox = screen.getByRole('checkbox', { name: '' });
    expect(checkboxBox).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows checkmark SVG when checked', () => {
    const { container, rerender } = render(<Checkbox {...defaultProps} checked={false} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
    
    rerender(<Checkbox {...defaultProps} checked={true} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('maintains focus after clicking', async () => {
    const user = userEvent.setup();
    render(<Checkbox {...defaultProps} />);
    
    const label = screen.getByText('Accept terms and conditions');
    await user.click(label);
    
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toHaveFocus();
  });
});