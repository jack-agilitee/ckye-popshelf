'use client';

import React from 'react';
import Image from 'next/image';
import ReviewStars from '@/components/atoms/ReviewStars/ReviewStars';
import styles from './ProductNamePrice.module.scss';

interface ProductNamePriceProps {
  /** Product name/title */
  name: string;
  /** Current price */
  price: number;
  /** Regular/original price (optional) */
  regularPrice?: number;
  /** Product rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Callback when share icon is clicked */
  onShare?: () => void;
  /** Additional CSS class */
  className?: string;
}

const ProductNamePrice: React.FC<ProductNamePriceProps> = ({
  name,
  price,
  regularPrice,
  rating = 0,
  reviewCount = 0,
  onShare,
  className
}) => {
  const formatPrice = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare();
    }
  };

  return (
    <div className={`${styles['product-name-price']} ${className || ''}`}>
      {/* Product name */}
      <h2 className={styles['product-name-price__title']}>
        {name}
      </h2>

      {/* Share icon */}
      {onShare && (
        <button
          type="button"
          className={styles['product-name-price__share']}
          onClick={handleShareClick}
          aria-label="Share product"
        >
          {/* TODO: Replace with actual share icon path */}
          <Image
            src="/icons/share.svg"
            alt=""
            width={30}
            height={30}
          />
        </button>
      )}

      {/* Rating stars */}
      <div className={styles['product-name-price__rating']}>
        <ReviewStars 
          rating={rating} 
          showCount={true} 
          reviewCount={reviewCount} 
        />
      </div>

      {/* Pricing section */}
      <div className={styles['product-name-price__pricing']}>
        <span className={styles['product-name-price__price']}>
          {formatPrice(price)}
        </span>
        {regularPrice && regularPrice !== price && (
          <span className={styles['product-name-price__regular-price']}>
            reg. {formatPrice(regularPrice)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductNamePrice;