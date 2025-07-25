import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TextField from './TextField';

describe('TextField', () => {
  const defaultProps = {
    id: 'test-field',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextField {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with required indicator', () => {
    render(<TextField {...defaultProps} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TextField {...defaultProps} placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    render(<TextField {...defaultProps} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
    expect(defaultProps.onChange).toHaveBeenCalledWith('Hello World');
  });

  it('shows entry state when empty', () => {
    const { container } = render(<TextField {...defaultProps} />);
    const wrapper = container.querySelector('.textField__wrapper');
    expect(wrapper).toHaveClass('textField__wrapper--entry');
  });

  it('shows data state when has value', () => {
    const { container } = render(<TextField {...defaultProps} value="Some text" />);
    const wrapper = container.querySelector('.textField__wrapper');
    expect(wrapper).toHaveClass('textField__wrapper--data');
  });

  it('handles controlled component', () => {
    const { rerender } = render(<TextField {...defaultProps} value="initial" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial');
    
    rerender(<TextField {...defaultProps} value="updated" />);
    expect(input).toHaveValue('updated');
  });

  it('handles uncontrolled component with defaultValue', () => {
    render(<TextField {...defaultProps} defaultValue="default text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('default text');
  });

  it('handles focus and blur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(<TextField {...defaultProps} onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', () => {
    const onKeyDown = jest.fn();
    render(<TextField {...defaultProps} onKeyDown={onKeyDown} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('renders in disabled state', () => {
    render(<TextField {...defaultProps} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders in readonly state', () => {
    render(<TextField {...defaultProps} readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('renders with error state', () => {
    render(<TextField {...defaultProps} error errorMessage="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<TextField {...defaultProps} className="custom-class" />);
    expect(container.querySelector('.textField')).toHaveClass('custom-class');
  });

  it('supports different input types', () => {
    render(<TextField {...defaultProps} type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles maxLength restriction', async () => {
    const user = userEvent.setup();
    render(<TextField {...defaultProps} maxLength={5} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello');
  });

  it('supports autoComplete attribute', () => {
    render(<TextField {...defaultProps} autoComplete="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });

  it('supports autoFocus', () => {
    render(<TextField {...defaultProps} autoFocus />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('uses aria-label when provided', () => {
    render(<TextField {...defaultProps} aria-label="Custom label" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Custom label');
  });

  it('uses label as aria-label when aria-label not provided', () => {
    render(<TextField {...defaultProps} label="Test Label" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Test Label');
  });

  it('has proper ARIA attributes', () => {
    render(<TextField {...defaultProps} required aria-describedby="help-text" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'help-text');
  });

  it('styles change based on focus state', () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(input).toHaveClass('textField__input--focused');
    
    fireEvent.blur(input);
    expect(input).not.toHaveClass('textField__input--focused');
  });

  it('uses name prop when provided', () => {
    render(<TextField {...defaultProps} name="custom-name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'custom-name');
  });

  it('uses id as name when name not provided', () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'test-field');
  });
});