'use client';

import React from 'react';
import Image from 'next/image';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  /** Product name/title */
  name: string;
  /** Product image URL */
  image?: string;
  /** Product price */
  price: number;
  /** Regular/original price (optional) */
  regularPrice?: number;
  /** Stock quantity (required if not out of stock) */
  stockQuantity?: number;
  /** Initial quantity in cart */
  initialQuantity?: number;
  /** Whether the product is out of stock */
  outOfStock?: boolean;
  /** Callback when close button is clicked */
  onClose: () => void;
  /** Callback when quantity is incremented */
  onIncrement?: () => void;
  /** Callback when quantity is decremented */
  onDecrement?: () => void;
  /** Callback when delete button is clicked */
  onDelete?: () => void;
  /** Additional CSS class names */
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image = '/categories/product.png',
  price,
  regularPrice,
  stockQuantity = 0,
  initialQuantity = 1,
  outOfStock = false,
  onClose,
  onIncrement,
  onDecrement,
  onDelete,
  className,
}) => {
  const formatPrice = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={`${styles['product-card']} ${className || ''}`}>
      <Image
        src={image}
        alt={name}
        width={112}
        height={112}
        className={`${styles['product-card__image']} ${outOfStock ? styles['product-card__image--unavailable'] : ''}`}
      />
      
      <div className={styles['product-card__content']}>
        <h3 className={`${styles['product-card__name']} ${outOfStock ? styles['product-card__name--unavailable'] : ''}`}>
          {name}
        </h3>
        
        <div className={`${styles['product-card__price-section']} ${outOfStock ? styles['product-card__price-section--hidden'] : ''}`}>
          <span className={styles['product-card__price']}>{formatPrice(price)}</span>
          {regularPrice && regularPrice > price && (
            <span className={styles['product-card__regular-price']}>
              <span className={styles['product-card__reg-label']}>reg</span>
              <span>{formatPrice(regularPrice)}</span>
            </span>
          )}
        </div>
        
        <div className={styles['product-card__actions']}>
          {outOfStock ? (
            <span className={styles['product-card__out-of-stock']}>Out of stock</span>
          ) : (
            <>
              <span className={styles['product-card__stock']}>
                {stockQuantity} in stock
              </span>
              <QuantitySelector
                initialQuantity={initialQuantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onDelete={onDelete}
              />
            </>
          )}
        </div>
      </div>
      
      <button
        type="button"
        className={styles['product-card__close']}
        onClick={onClose}
        aria-label="Remove product"
      >
        <span className={styles['product-card__close-icon']} />
      </button>
    </div>
  );
};

export default ProductCard;