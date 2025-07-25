'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import styles from './MiniProductCard.module.scss';

interface MiniProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  imageAlt?: string;
  inStock?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

const MiniProductCard: React.FC<MiniProductCardProps> = ({
  name,
  price,
  imageUrl,
  imageAlt = '',
  inStock = true,
  onAddToCart,
  onViewDetails,
  className
}) => {
  const handleButtonClick = () => {
    if (inStock && onAddToCart) {
      onAddToCart();
    } else if (!inStock && onViewDetails) {
      onViewDetails();
    }
  };

  const formatPrice = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={`${styles['mini-product-card']} ${className || ''}`}>
      <div className={styles['mini-product-card__image-container']}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={80}
          height={80}
          className={styles['mini-product-card__image']}
        />
      </div>
      
      <div className={styles['mini-product-card__info']}>
        <h3 className={styles['mini-product-card__name']} title={name}>
          {name}
        </h3>
        <p className={styles['mini-product-card__price']}>
          {formatPrice(price)}
        </p>
      </div>

      <Button
        variant={inStock ? 'primary' : 'secondary'}
        onClick={handleButtonClick}
        className={styles['mini-product-card__button']}
        ariaLabel={inStock ? `Add ${name} to cart` : `View details for ${name}`}
      >
        {inStock ? 'ADD TO CART' : 'VIEW DETAILS'}
      </Button>
    </div>
  );
};

export default MiniProductCard;