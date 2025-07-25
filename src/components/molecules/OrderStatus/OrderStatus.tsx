'use client';

import React from 'react';
import Image from 'next/image';
import styles from './OrderStatus.module.scss';

// Enum for order status variants
export enum OrderStatusType {
  NO_ORDER = 'NO_ORDER',
  ORDER_RECEIVED = 'ORDER_RECEIVED',
  READY_TO_PICKUP = 'READY_TO_PICKUP',
  MULTIPLE_ORDERS = 'MULTIPLE_ORDERS'
}

interface OrderStatusProps {
  /** The current status of the order */
  status: OrderStatusType;
  /** Store name to display */
  storeName: string;
  /** Store address (will be truncated with ellipsis if too long) */
  storeAddress: string;
  /** Store closing time */
  closingTime: string;
  /** Callback when edit button is clicked */
  onEdit?: () => void;
  /** Callback when "View Your Orders" is clicked (only for MULTIPLE_ORDERS status) */
  onViewOrders?: () => void;
  /** Additional CSS class names */
  className?: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  status,
  storeName,
  storeAddress,
  closingTime,
  onEdit,
  onViewOrders,
  className
}) => {
  // Get status-specific text and styles
  const getStatusConfig = () => {
    switch (status) {
      case OrderStatusType.NO_ORDER:
        return {
          statusText: 'NO PICKUP ORDER STARTED',
          statusLabel: 'Order Status',
          statusClass: styles['order-status--no-order']
        };
      case OrderStatusType.ORDER_RECEIVED:
        return {
          statusText: 'ORDER RECEIVED - BEING PREPARED',
          statusLabel: 'Order Status',
          statusClass: styles['order-status--received']
        };
      case OrderStatusType.READY_TO_PICKUP:
        return {
          statusText: 'READY TO PICK UP',
          statusLabel: 'Order Status',
          statusClass: styles['order-status--ready']
        };
      case OrderStatusType.MULTIPLE_ORDERS:
        return {
          statusText: 'VIEW YOUR ORDERS',
          statusLabel: 'Multiple Orders Placed',
          statusClass: styles['order-status--multiple']
        };
    }
  };

  const { statusText, statusLabel, statusClass } = getStatusConfig();

  const handleEditClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  const handleStatusClick = () => {
    if (status === OrderStatusType.MULTIPLE_ORDERS && onViewOrders) {
      onViewOrders();
    }
  };

  const isStatusClickable = status === OrderStatusType.MULTIPLE_ORDERS && onViewOrders;

  return (
    <div className={`${styles['order-status']} ${statusClass} ${className || ''}`}>
      <div className={styles['order-status__store-info']}>
        <div className={styles['order-status__icon-wrapper']}>
          <Image
            src="/location.svg"
            alt=""
            width={24}
            height={24}
            className={styles['order-status__icon']}
          />
        </div>
        <div className={styles['order-status__store-details']}>
          <p className={styles['order-status__store-name']}>{storeName}</p>
          <p className={styles['order-status__store-address']}>{storeAddress}</p>
          <p className={styles['order-status__store-hours']}>Closes at {closingTime}</p>
        </div>
        <button
          className={styles['order-status__edit-button']}
          onClick={handleEditClick}
          aria-label="Edit store location"
          type="button"
        >
          <Image
            src="/edit.svg"
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className={styles['order-status__status-bar']}>
        <p className={styles['order-status__status-label']}>
          {statusLabel}
        </p>
        <button
          className={styles['order-status__status-text']}
          onClick={handleStatusClick}
          disabled={!isStatusClickable}
          type="button"
          aria-label={isStatusClickable ? statusText : undefined}
        >
          {statusText}
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;