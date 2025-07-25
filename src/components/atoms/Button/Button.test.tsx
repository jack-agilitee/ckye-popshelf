import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Single-line Button', () => {
    it('renders with label prop', () => {
      render(<Button label="Click me" />);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders with children prop', () => {
      render(<Button>Child content</Button>);
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('applies primary variant class by default', () => {
      const { container } = render(<Button label="Primary" />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button--primary');
    });

    it('applies secondary variant class correctly', () => {
      const { container } = render(<Button label="Secondary" variant="secondary" />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button--secondary');
    });

    it('applies tertiary variant class correctly', () => {
      const { container } = render(<Button label="Tertiary" variant="tertiary" />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button--tertiary');
    });

    it('applies disabled state correctly', () => {
      const { container } = render(<Button label="Disabled" disabled />);
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('disabled');
    });

    it('calls onClick when clicked', () => {
      render(<Button label="Click me" onClick={mockOnClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      render(<Button label="Disabled" onClick={mockOnClick} disabled />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('disabled state works for all variants', () => {
      const variants: Array<'primary' | 'secondary' | 'tertiary'> = ['primary', 'secondary', 'tertiary'];
      
      variants.forEach(variant => {
        mockOnClick.mockClear();
        const { unmount } = render(
          <Button variant={variant} disabled onClick={mockOnClick}>
            {variant} disabled
          </Button>
        );
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        fireEvent.click(button);
        expect(mockOnClick).not.toHaveBeenCalled();
        unmount();
      });
    });

    it('applies custom className', () => {
      const { container } = render(<Button label="Custom" className="custom-class" />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
    });

    it('sets button type correctly', () => {
      render(<Button label="Submit" type="submit" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('sets default button type to button', () => {
      render(<Button label="Default" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('sets aria-label correctly', () => {
      render(<Button label="Button" ariaLabel="Custom aria label" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom aria label');
    });

    it('uses label as default aria-label', () => {
      render(<Button label="Default Label" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Default Label');
    });
  });

  describe('Multi-line Button', () => {
    it('renders both labels in multiline mode', () => {
      render(<Button label="Bottom" labelTop="Top" multiline />);
      expect(screen.getByText('Top')).toBeInTheDocument();
      expect(screen.getByText('Bottom')).toBeInTheDocument();
    });

    it('applies multiline class', () => {
      const { container } = render(<Button label="Multi" multiline />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button--multiline');
    });

    it('renders multiline primary variant', () => {
      const { container } = render(
        <Button label="Primary" labelTop="Action" multiline variant="primary" />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('button--primary');
      expect(button).toHaveClass('button--multiline');
    });

    it('renders multiline secondary variant', () => {
      const { container } = render(
        <Button label="Secondary" labelTop="Action" multiline variant="secondary" />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('button--secondary');
      expect(button).toHaveClass('button--multiline');
    });

    it('handles click events in multiline mode', () => {
      render(<Button label="Click" labelTop="Please" multiline onClick={mockOnClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('sets combined aria-label for multiline buttons', () => {
      render(<Button label="Continue" labelTop="Ready to" multiline />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Ready to Continue');
    });

    it('uses custom aria-label over combined labels', () => {
      render(
        <Button 
          label="Continue" 
          labelTop="Ready to" 
          multiline 
          ariaLabel="Proceed to next step" 
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Proceed to next step');
    });
  });

  describe('Edge cases', () => {
    it('renders without any props', () => {
      const { container } = render(<Button />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('button--primary');
    });

    it('prioritizes children over label prop', () => {
      render(<Button label="Label">Children</Button>);
      expect(screen.getByText('Children')).toBeInTheDocument();
      expect(screen.queryByText('Label')).not.toBeInTheDocument();
    });

    it('handles onClick event object correctly', () => {
      const handleClick = jest.fn();
      render(<Button label="Event Test" onClick={handleClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
          target: expect.any(Object)
        })
      );
    });

    it('does not render labelTop without multiline mode', () => {
      render(<Button label="Bottom" labelTop="Top" />);
      expect(screen.queryByText('Top')).not.toBeInTheDocument();
      expect(screen.getByText('Bottom')).toBeInTheDocument();
    });
  });
});