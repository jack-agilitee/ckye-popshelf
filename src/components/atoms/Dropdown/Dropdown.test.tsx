import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown, { DropdownOption } from './Dropdown';

describe('Dropdown', () => {
  const mockOptions: DropdownOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  const defaultProps = {
    id: 'test-dropdown',
    options: mockOptions,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Dropdown {...defaultProps} placeholder="Choose one" />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Dropdown {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with required indicator', () => {
    render(<Dropdown {...defaultProps} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <Dropdown {...defaultProps} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('selects option when clicked', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith('option2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not select disabled option', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    fireEvent.click(screen.getByText('Option 3'));
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders with pre-selected value', () => {
    render(<Dropdown {...defaultProps} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('updates when value prop changes', () => {
    const { rerender } = render(<Dropdown {...defaultProps} value="option1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    rerender(<Dropdown {...defaultProps} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    
    // Open with Enter
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    // Close with Escape
    fireEvent.keyDown(button, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    
    // Open with Space
    fireEvent.keyDown(button, { key: ' ' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    // Open with ArrowDown
    fireEvent.keyDown(button, { key: 'Escape' });
    fireEvent.keyDown(button, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<Dropdown {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Dropdown {...defaultProps} error errorMessage="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<Dropdown {...defaultProps} className="custom-class" />);
    expect(container.querySelector('.dropdown')).toHaveClass('custom-class');
  });

  it('uses aria-label when provided', () => {
    render(<Dropdown {...defaultProps} aria-label="Custom label" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
  });

  it('uses label as aria-label when aria-label not provided', () => {
    render(<Dropdown {...defaultProps} label="Test Label" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test Label');
  });

  it('has proper ARIA attributes', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('includes hidden select for form compatibility', () => {
    render(<Dropdown {...defaultProps} name="test-select" />);
    const hiddenSelect = document.querySelector('select[name="test-select"]');
    
    expect(hiddenSelect).toBeInTheDocument();
    expect(hiddenSelect).toHaveAttribute('aria-hidden', 'true');
    expect(hiddenSelect).toHaveAttribute('tabIndex', '-1');
  });

  it('marks selected option with aria-selected', () => {
    render(<Dropdown {...defaultProps} value="option2" />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    const options = screen.getAllByRole('option');
    
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('marks disabled options with aria-disabled', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    const options = screen.getAllByRole('option');
    
    expect(options[0]).toHaveAttribute('aria-disabled', 'false');
    expect(options[1]).toHaveAttribute('aria-disabled', 'false');
    expect(options[2]).toHaveAttribute('aria-disabled', 'true');
  });
});