'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onDelete?: () => void;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity,
  onIncrement,
  onDecrement,
  onDelete,
  className
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleIncrement = () => {
    if (!maxQuantity || quantity < maxQuantity) {
      setQuantity(prev => prev + 1);
      if (onIncrement) {
        onIncrement();
      }
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity(prev => prev - 1);
      if (onDecrement) {
        onDecrement();
      }
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const isAtMin = quantity === minQuantity;
  const isAtMax = maxQuantity ? quantity === maxQuantity : false;

  return (
    <div className={`${styles['quantity-selector']} ${className || ''}`}>
      <button
        type="button"
        className={`${styles['quantity-selector__action']} ${styles['quantity-selector__action--left']}`}
        onClick={isAtMin ? handleDelete : handleDecrement}
        aria-label={isAtMin ? 'Remove item' : 'Decrease quantity'}
        disabled={false}
      >
        {isAtMin ? (
          <Image
            src="/trash.svg"
            alt=""
            width={24}
            height={24}
            className={styles['quantity-selector__icon']}
          />
        ) : (
          <Image
            src="/minus.svg"
            alt=""
            width={24}
            height={24}
            className={styles['quantity-selector__icon']}
          />
        )}
      </button>

      <div className={styles['quantity-selector__quantity']}>
        {quantity}
      </div>

      <button
        type="button"
        className={`${styles['quantity-selector__action']} ${styles['quantity-selector__action--right']}`}
        onClick={handleIncrement}
        aria-label="Increase quantity"
        disabled={isAtMax}
      >
        <Image
          src="/plus.svg"
          alt=""
          width={24}
          height={24}
          className={styles['quantity-selector__icon']}
        />
      </button>
    </div>
  );
};

export default QuantitySelector;