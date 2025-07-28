import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FulfillmentCard, { FulfillmentType } from './FulfillmentCard';

describe('FulfillmentCard', () => {
  const mockCallbacks = {
    onAddToCart: jest.fn(),
    onChangeStore: jest.fn(),
    onAddressClick: jest.fn(),
    onHowItWorksClick: jest.fn(),
    onPolicyClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Pickup variant', () => {
    it('renders pickup card with stock', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          stockCount={27}
          {...mockCallbacks}
        />
      );

      expect(screen.getByText('In-store pickup')).toBeInTheDocument();
      expect(screen.getByText('27 in stock at')).toBeInTheDocument();
      expect(screen.getByText(/315 NW Shenstone St\./)).toBeInTheDocument();
      expect(screen.getByText('How pickup works')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'ADD TO CART' })).toBeInTheDocument();
    });

    it('renders pickup card out of stock', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          outOfStock={true}
          nearbyStoresCount={3}
          {...mockCallbacks}
        />
      );

      expect(screen.getByText('Out of stock at')).toBeInTheDocument();
      expect(screen.getByText('In stock at 3 nearby stores')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'CHANGE STORE' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'ADD TO CART' })).not.toBeInTheDocument();
    });

    it('handles address click', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          {...mockCallbacks}
        />
      );

      const addressButton = screen.getByRole('button', { name: /315 NW Shenstone St\./ });
      fireEvent.click(addressButton);
      expect(mockCallbacks.onAddressClick).toHaveBeenCalledTimes(1);
    });

    it('handles how pickup works link click', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          {...mockCallbacks}
        />
      );

      const link = screen.getByText('How pickup works');
      fireEvent.click(link);
      expect(mockCallbacks.onHowItWorksClick).toHaveBeenCalledTimes(1);
    });

    it('handles add to cart click', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          stockCount={5}
          {...mockCallbacks}
        />
      );

      const button = screen.getByRole('button', { name: 'ADD TO CART' });
      fireEvent.click(button);
      expect(mockCallbacks.onAddToCart).toHaveBeenCalledTimes(1);
    });

    it('handles change store click when out of stock', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          outOfStock={true}
          {...mockCallbacks}
        />
      );

      const button = screen.getByRole('button', { name: 'CHANGE STORE' });
      fireEvent.click(button);
      expect(mockCallbacks.onChangeStore).toHaveBeenCalledTimes(1);
    });
  });

  describe('Shipping variant', () => {
    it('renders shipping card', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.SHIPPING}
          zipCode="90210"
          shippingDays="2-3 days"
          {...mockCallbacks}
        />
      );

      expect(screen.getByText('Ship it to me')).toBeInTheDocument();
      expect(screen.getByText(/Shipping to/)).toBeInTheDocument();
      expect(screen.getByText('90210')).toBeInTheDocument();
      expect(screen.getByText('Ships within 2-3 days')).toBeInTheDocument();
      expect(screen.getByText('Shipping & return policy')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'ADD TO CART' })).toBeInTheDocument();
    });

    it('handles shipping policy link click', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.SHIPPING}
          {...mockCallbacks}
        />
      );

      const link = screen.getByText('Shipping & return policy');
      fireEvent.click(link);
      expect(mockCallbacks.onPolicyClick).toHaveBeenCalledTimes(1);
    });

    it('shows add to cart even when out of stock for shipping', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.SHIPPING}
          outOfStock={true}
          {...mockCallbacks}
        />
      );

      expect(screen.getByRole('button', { name: 'ADD TO CART' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'CHANGE STORE' })).not.toBeInTheDocument();
    });
  });

  describe('Props and customization', () => {
    it('applies custom className', () => {
      const { container } = render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          className="custom-class"
        />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('uses custom store information', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          storeName="123 Main St."
          storeAddress="Austin, TX"
          stockCount={15}
        />
      );

      expect(screen.getByText(/123 Main St\./)).toBeInTheDocument();
      expect(screen.getByText(/Austin, TX/)).toBeInTheDocument();
      expect(screen.getByText('15 in stock at')).toBeInTheDocument();
    });

    it('handles missing callbacks gracefully', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          stockCount={10}
        />
      );

      const addressButton = screen.getByRole('button', { name: /315 NW Shenstone St\./ });
      fireEvent.click(addressButton); // Should not throw

      const link = screen.getByText('How pickup works');
      fireEvent.click(link); // Should not throw
    });
  });

  describe('Accessibility', () => {
    it('renders images with empty alt text for decorative icons', () => {
      const { container } = render(
        <FulfillmentCard type={FulfillmentType.PICKUP} />
      );

      const icon = container.querySelector('img[src="/bag.svg"]');
      expect(icon).toHaveAttribute('alt', '');
    });

    it('provides keyboard navigation for interactive elements', () => {
      render(
        <FulfillmentCard
          type={FulfillmentType.PICKUP}
          {...mockCallbacks}
        />
      );

      const addressButton = screen.getByRole('button', { name: /315 NW Shenstone St\./ });
      addressButton.focus();
      expect(addressButton).toHaveFocus();

      fireEvent.keyDown(addressButton, { key: 'Enter' });
      expect(mockCallbacks.onAddressClick).toHaveBeenCalled();
    });
  });
});