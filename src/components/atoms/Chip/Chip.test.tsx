import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from './Chip';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Chip', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<Chip />);
      expect(screen.getByText('FILTERS')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<Chip label="Custom Label" />);
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
    });

    it('applies default solid variant class', () => {
      const { container } = render(<Chip />);
      const chip = container.querySelector('button');
      expect(chip).toHaveClass('chip--solid');
    });
  });

  describe('Variants', () => {
    it('applies solid variant class', () => {
      const { container } = render(<Chip variant="solid" />);
      const chip = container.querySelector('button');
      expect(chip).toHaveClass('chip--solid');
    });

    it('applies outlined variant class', () => {
      const { container } = render(<Chip variant="outlined" />);
      const chip = container.querySelector('button');
      expect(chip).toHaveClass('chip--outlined');
    });


    it('renders icon when icon prop is provided', () => {
      render(<Chip icon="/delete.svg" />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('src', '/delete.svg');
      expect(icon).toHaveAttribute('width', '8');
      expect(icon).toHaveAttribute('height', '8');
    });

    it('does not render icon when icon prop is not provided', () => {
      render(<Chip />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders icon with any variant', () => {
      const { rerender } = render(<Chip variant="solid" icon="/test.svg" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      
      rerender(<Chip variant="outlined" icon="/test.svg" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      render(<Chip onClick={mockOnClick} />);
      const chip = screen.getByRole('button');
      fireEvent.click(chip);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('passes event object to onClick', () => {
      render(<Chip onClick={mockOnClick} />);
      const chip = screen.getByRole('button');
      fireEvent.click(chip);
      
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
          target: expect.any(Object)
        })
      );
    });

    it('works without onClick handler', () => {
      render(<Chip />);
      const chip = screen.getByRole('button');
      expect(() => fireEvent.click(chip)).not.toThrow();
    });

    it('calls onClick when chip with icon is clicked', () => {
      render(<Chip icon="/delete.svg" onClick={mockOnClick} />);
      const chip = screen.getByRole('button');
      fireEvent.click(chip);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Chip />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('uses label as default aria-label', () => {
      render(<Chip label="Test Label" />);
      const chip = screen.getByRole('button');
      expect(chip).toHaveAttribute('aria-label', 'Test Label');
    });

    it('uses custom aria-label when provided', () => {
      render(<Chip label="Label" ariaLabel="Custom aria label" />);
      const chip = screen.getByRole('button');
      expect(chip).toHaveAttribute('aria-label', 'Custom aria label');
    });

    it('has type button to prevent form submission', () => {
      render(<Chip />);
      const chip = screen.getByRole('button');
      expect(chip).toHaveAttribute('type', 'button');
    });
  });

  describe('Custom styling', () => {
    it('applies custom className', () => {
      const { container } = render(<Chip className="custom-class" />);
      const chip = container.querySelector('button');
      expect(chip).toHaveClass('custom-class');
    });

    it('combines custom className with variant classes', () => {
      const { container } = render(
        <Chip variant="outlined" className="custom-class" />
      );
      const chip = container.querySelector('button');
      expect(chip).toHaveClass('chip');
      expect(chip).toHaveClass('chip--outlined');
      expect(chip).toHaveClass('custom-class');
    });
  });

  describe('Edge cases', () => {
    it('renders empty label', () => {
      render(<Chip label="" />);
      const chip = screen.getByRole('button');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveAttribute('aria-label', '');
    });

    it('handles uppercase labels correctly', () => {
      render(<Chip label="lowercase" />);
      expect(screen.getByText('lowercase')).toBeInTheDocument();
    });

    it('handles special characters in label', () => {
      render(<Chip label="Test & Special < > Characters" />);
      expect(screen.getByText('Test & Special < > Characters')).toBeInTheDocument();
    });
  });
});