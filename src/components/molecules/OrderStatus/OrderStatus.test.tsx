import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderStatus, { OrderStatusType } from './OrderStatus';

describe('OrderStatus', () => {
  const defaultProps = {
    status: OrderStatusType.NO_ORDER,
    storeName: 'Your store',
    storeAddress: '315 N Main St, Goodlettsville, TN 37072',
    closingTime: '9pm',
    onEdit: jest.fn(),
    onViewOrders: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Common functionality', () => {
    it('renders with required props', () => {
      render(<OrderStatus {...defaultProps} />);
      expect(screen.getByText('Your store')).toBeInTheDocument();
      expect(screen.getByText('315 N Main St, Goodlettsville, TN 37072')).toBeInTheDocument();
      expect(screen.getByText('Closes at 9pm')).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', () => {
      render(<OrderStatus {...defaultProps} />);
      const editButton = screen.getByLabelText('Edit store location');
      fireEvent.click(editButton);
      expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
      const { container } = render(
        <OrderStatus {...defaultProps} className="custom-class" />
      );
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('custom-class');
    });

    it('renders without optional callbacks', () => {
      render(<OrderStatus 
        status={defaultProps.status}
        storeName={defaultProps.storeName}
        storeAddress={defaultProps.storeAddress}
        closingTime={defaultProps.closingTime}
      />);
      expect(screen.getByText('Your store')).toBeInTheDocument();
    });
  });

  describe('NO_ORDER status', () => {
    it('renders correct status text', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.NO_ORDER} />);
      expect(screen.getByText('Order Status')).toBeInTheDocument();
      expect(screen.getByText('NO PICKUP ORDER STARTED')).toBeInTheDocument();
    });

    it('applies correct styling class', () => {
      const { container } = render(
        <OrderStatus {...defaultProps} status={OrderStatusType.NO_ORDER} />
      );
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('order-status--no-order');
    });

    it('status text is not clickable', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.NO_ORDER} />);
      const statusText = screen.getByText('NO PICKUP ORDER STARTED');
      expect(statusText).toBeDisabled();
      fireEvent.click(statusText);
      expect(defaultProps.onViewOrders).not.toHaveBeenCalled();
    });
  });

  describe('ORDER_RECEIVED status', () => {
    it('renders correct status text', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.ORDER_RECEIVED} />);
      expect(screen.getByText('Order Status')).toBeInTheDocument();
      expect(screen.getByText('ORDER RECEIVED - BEING PREPARED')).toBeInTheDocument();
    });

    it('applies correct styling class', () => {
      const { container } = render(
        <OrderStatus {...defaultProps} status={OrderStatusType.ORDER_RECEIVED} />
      );
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('order-status--received');
    });
  });

  describe('READY_TO_PICKUP status', () => {
    it('renders correct status text', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.READY_TO_PICKUP} />);
      expect(screen.getByText('Order Status')).toBeInTheDocument();
      expect(screen.getByText('READY TO PICK UP')).toBeInTheDocument();
    });

    it('applies correct styling class', () => {
      const { container } = render(
        <OrderStatus {...defaultProps} status={OrderStatusType.READY_TO_PICKUP} />
      );
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('order-status--ready');
    });
  });

  describe('MULTIPLE_ORDERS status', () => {
    it('renders correct status text', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.MULTIPLE_ORDERS} />);
      expect(screen.getByText('Multiple Orders Placed')).toBeInTheDocument();
      expect(screen.getByText('VIEW YOUR ORDERS')).toBeInTheDocument();
    });

    it('applies correct styling class', () => {
      const { container } = render(
        <OrderStatus {...defaultProps} status={OrderStatusType.MULTIPLE_ORDERS} />
      );
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('order-status--multiple');
    });

    it('status text is clickable and calls onViewOrders', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.MULTIPLE_ORDERS} />);
      const statusText = screen.getByText('VIEW YOUR ORDERS');
      expect(statusText).not.toBeDisabled();
      fireEvent.click(statusText);
      expect(defaultProps.onViewOrders).toHaveBeenCalledTimes(1);
    });

    it('status text is not clickable without onViewOrders callback', () => {
      render(<OrderStatus 
        status={OrderStatusType.MULTIPLE_ORDERS}
        storeName={defaultProps.storeName}
        storeAddress={defaultProps.storeAddress}
        closingTime={defaultProps.closingTime}
        onEdit={defaultProps.onEdit}
      />);
      const statusText = screen.getByText('VIEW YOUR ORDERS');
      expect(statusText).toBeDisabled();
    });
  });

  describe('Address truncation', () => {
    it('handles long addresses with proper styling', () => {
      const longAddress = '12345 Very Long Street Name That Should Be Truncated With Ellipsis, City, State 12345';
      render(<OrderStatus {...defaultProps} storeAddress={longAddress} />);
      const addressElement = screen.getByText(longAddress);
      expect(addressElement).toHaveClass('order-status__store-address');
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label for edit button', () => {
      render(<OrderStatus {...defaultProps} />);
      expect(screen.getByLabelText('Edit store location')).toBeInTheDocument();
    });

    it('has proper aria-label for clickable status text', () => {
      render(<OrderStatus {...defaultProps} status={OrderStatusType.MULTIPLE_ORDERS} />);
      const statusButton = screen.getByRole('button', { name: 'VIEW YOUR ORDERS' });
      expect(statusButton).toBeInTheDocument();
    });

    it('location and edit icons have empty alt text', () => {
      render(<OrderStatus {...defaultProps} />);
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt', '');
      });
    });
  });
});