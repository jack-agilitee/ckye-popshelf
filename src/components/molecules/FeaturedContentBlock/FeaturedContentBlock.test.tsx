import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedContentBlock from './FeaturedContentBlock';

describe('FeaturedContentBlock', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test description for the featured content block',
    desktopImage: '/content/content-shoe.png',
    mobileImage: '/content/content-bath.jpg',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description for the featured content block')).toBeInTheDocument();
    });

    it('renders images correctly', () => {
      const { container } = render(<FeaturedContentBlock {...defaultProps} />);
      
      // Check for picture element with source
      const picture = container.querySelector('picture');
      expect(picture).toBeInTheDocument();
      
      const source = picture?.querySelector('source');
      expect(source).toHaveAttribute('srcSet', defaultProps.mobileImage);
      expect(source).toHaveAttribute('media', '(max-width: 767px)');
      
      const img = picture?.querySelector('img');
      expect(img).toHaveAttribute('src', defaultProps.desktopImage);
    });

    it('renders arrow icon', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const arrowContainer = screen.getByText('Test Title').parentElement?.querySelector('img[src="/arrow.svg"]');
      expect(arrowContainer).toBeInTheDocument();
    });

    it('renders decorative elements', () => {
      const { container } = render(<FeaturedContentBlock {...defaultProps} />);
      
      const decorations = container.querySelectorAll('img[src="/content/two-bubbles.svg"]');
      expect(decorations.length).toBeGreaterThan(0);
    });

    it('applies custom className', () => {
      const { container } = render(
        <FeaturedContentBlock {...defaultProps} className="custom-class" />
      );
      
      const component = container.firstChild;
      expect(component).toHaveClass('custom-class');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when card is clicked', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      fireEvent.click(card);
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Enter key is pressed', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Space key is pressed', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick for other keys', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Tab' });
      
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    });

    it('works without onClick prop', () => {
      const propsWithoutOnClick = {
        title: defaultProps.title,
        description: defaultProps.description,
        desktopImage: defaultProps.desktopImage,
        mobileImage: defaultProps.mobileImage,
      };
      render(<FeaturedContentBlock {...propsWithoutOnClick} />);
      
      const card = screen.getByRole('button');
      // Should not throw error
      fireEvent.click(card);
    });
  });

  describe('Accessibility', () => {
    it('has proper role and tabIndex', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('has descriptive aria-label', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute(
        'aria-label',
        'Test Title. Test description for the featured content block. Click to learn more.'
      );
    });

    it('is keyboard accessible', () => {
      render(<FeaturedContentBlock {...defaultProps} />);
      
      const card = screen.getByRole('button');
      card.focus();
      expect(card).toHaveFocus();
    });

    it('has decorative images with empty alt text', () => {
      const { container } = render(<FeaturedContentBlock {...defaultProps} />);
      
      // All decorative images should have empty alt
      const decorativeImages = container.querySelectorAll('img[alt=""]');
      expect(decorativeImages.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive behavior', () => {
    it('uses correct image source based on viewport', () => {
      const { container } = render(<FeaturedContentBlock {...defaultProps} />);
      
      const picture = container.querySelector('picture');
      const source = picture?.querySelector('source');
      
      // Mobile source
      expect(source).toHaveAttribute('media', '(max-width: 767px)');
      expect(source).toHaveAttribute('srcSet', defaultProps.mobileImage);
      
      // Desktop fallback
      const img = picture?.querySelector('img');
      expect(img).toHaveAttribute('src', defaultProps.desktopImage);
    });
  });

  describe('Edge cases', () => {
    it('handles long text content gracefully', () => {
      const longProps = {
        ...defaultProps,
        title: 'This is a very long title that might wrap to multiple lines',
        description: 'This is an extremely long description that will definitely wrap to multiple lines and test how the component handles overflow situations in both mobile and desktop views',
      };
      
      render(<FeaturedContentBlock {...longProps} />);
      
      expect(screen.getByText(longProps.title)).toBeInTheDocument();
      expect(screen.getByText(longProps.description)).toBeInTheDocument();
    });

    it('handles special characters in text', () => {
      const specialProps = {
        ...defaultProps,
        title: 'Title with & special < characters >',
        description: 'Description with "quotes" and \'apostrophes\'',
      };
      
      render(<FeaturedContentBlock {...specialProps} />);
      
      expect(screen.getByText(specialProps.title)).toBeInTheDocument();
      expect(screen.getByText(specialProps.description)).toBeInTheDocument();
    });
  });
});