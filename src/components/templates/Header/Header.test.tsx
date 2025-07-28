import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  const mockProps = {
    onMenuClick: jest.fn(),
    onSearchClick: jest.fn(),
    onCartClick: jest.fn(),
    onLogoClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all header elements', () => {
      render(<Header {...mockProps} />);

      // Check for logo
      expect(screen.getByLabelText('Popshelf homepage')).toBeInTheDocument();
      expect(screen.getByAltText('Popshelf')).toBeInTheDocument();

      // Check for menu button
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      expect(screen.getByText('MENU')).toBeInTheDocument();

      // Check for search button
      expect(screen.getByLabelText('Search')).toBeInTheDocument();

      // Check for cart button
      expect(screen.getByLabelText('Shopping cart')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Header {...mockProps} className="custom-header" />
      );
      const header = container.querySelector('header');
      expect(header).toHaveClass('custom-header');
    });

    it('renders cart badge when cartItemCount > 0', () => {
      render(<Header {...mockProps} cartItemCount={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByLabelText('Shopping cart, 5 items')).toBeInTheDocument();
    });

    it('renders 99+ for cart counts over 99', () => {
      render(<Header {...mockProps} cartItemCount={150} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
      expect(screen.getByLabelText('Shopping cart, 150 items')).toBeInTheDocument();
    });

    it('does not render cart badge when cartItemCount is 0', () => {
      render(<Header {...mockProps} cartItemCount={0} />);
      expect(screen.queryByText('0')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Shopping cart')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onMenuClick when menu button is clicked', () => {
      render(<Header {...mockProps} />);
      const menuButton = screen.getByLabelText('Open menu');
      fireEvent.click(menuButton);
      expect(mockProps.onMenuClick).toHaveBeenCalledTimes(1);
    });

    it('calls onSearchClick when search button is clicked', () => {
      render(<Header {...mockProps} />);
      const searchButton = screen.getByLabelText('Search');
      fireEvent.click(searchButton);
      expect(mockProps.onSearchClick).toHaveBeenCalledTimes(1);
    });

    it('calls onCartClick when cart button is clicked', () => {
      render(<Header {...mockProps} />);
      const cartButton = screen.getByLabelText('Shopping cart');
      fireEvent.click(cartButton);
      expect(mockProps.onCartClick).toHaveBeenCalledTimes(1);
    });

    it('calls onLogoClick when logo is clicked', () => {
      render(<Header {...mockProps} />);
      const logo = screen.getByLabelText('Popshelf homepage');
      fireEvent.click(logo);
      expect(mockProps.onLogoClick).toHaveBeenCalledTimes(1);
    });

    it('prevents default navigation when logo is clicked', () => {
      render(<Header {...mockProps} />);
      const logo = screen.getByLabelText('Popshelf homepage');
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      fireEvent(logo, event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('renders without any callbacks', () => {
      render(<Header />);
      
      // Should not throw errors when clicking without callbacks
      fireEvent.click(screen.getByLabelText('Open menu'));
      fireEvent.click(screen.getByLabelText('Search'));
      fireEvent.click(screen.getByLabelText('Shopping cart'));
      fireEvent.click(screen.getByLabelText('Popshelf homepage'));
    });

    it('renders with partial callbacks', () => {
      render(<Header onMenuClick={mockProps.onMenuClick} />);
      
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(mockProps.onMenuClick).toHaveBeenCalled();
      
      // Other clicks should not throw
      fireEvent.click(screen.getByLabelText('Search'));
      fireEvent.click(screen.getByLabelText('Shopping cart'));
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for all interactive elements', () => {
      render(<Header {...mockProps} />);

      expect(screen.getByLabelText('Open menu')).toHaveAttribute('type', 'button');
      expect(screen.getByLabelText('Search')).toHaveAttribute('type', 'button');
      expect(screen.getByLabelText('Shopping cart')).toHaveAttribute('type', 'button');
      expect(screen.getByLabelText('Popshelf homepage')).toHaveAttribute('href', '/');
    });

    it('uses semantic HTML elements', () => {
      const { container } = render(<Header {...mockProps} />);
      
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelectorAll('button')).toHaveLength(3);
      expect(container.querySelector('a')).toBeInTheDocument();
    });

    it('provides keyboard navigation support', () => {
      render(<Header {...mockProps} />);
      
      const menuButton = screen.getByLabelText('Open menu');
      menuButton.focus();
      expect(menuButton).toHaveFocus();
      
      fireEvent.keyDown(menuButton, { key: 'Enter' });
      expect(mockProps.onMenuClick).toHaveBeenCalled();
    });

    it('hides decorative images from screen readers', () => {
      const { container } = render(<Header {...mockProps} />);
      
      // All icon images should have empty alt text
      const icons = container.querySelectorAll('img[alt=""]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });
});