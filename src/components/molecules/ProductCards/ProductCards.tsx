'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import ReviewStars from '@/components/atoms/ReviewStars/ReviewStars';
import styles from './ProductCards.module.scss';

interface ProductCardsProps {
  name: string;
  price: number;
  regularPrice?: number;
  imageUrl: string;
  imageAlt?: string;
  rating?: number;
  reviewCount?: number;
  colorChoices?: number;
  stockCount?: number;
  inStock?: boolean;
  fulfillments?: string[];
  variant?: 'horizontal' | 'vertical';
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  onProductClick?: () => void;
  className?: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({
  name,
  price,
  regularPrice,
  imageUrl,
  imageAlt = '',
  rating = 0,
  reviewCount = 0,
  colorChoices,
  stockCount,
  inStock = true,
  fulfillments = ['Pickup', 'shipping'],
  variant = 'horizontal',
  onAddToCart,
  onViewDetails,
  onProductClick,
  className
}) => {
  const formatPrice = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const handleButtonClick = () => {
    if (inStock && onAddToCart) {
      onAddToCart();
    } else if (!inStock && onViewDetails) {
      onViewDetails();
    }
  };

  const handleProductNameClick = () => {
    if (onProductClick) {
      onProductClick();
    }
  };

  const renderButton = () => {
    if (inStock) {
      return (
        <Button
          variant="primary"
          onClick={handleButtonClick}
          className={styles['product-cards__button']}
          ariaLabel={`Add ${name} to cart`}
        >
          ADD TO CART
        </Button>
      );
    }
    
    return (
      <Button
        variant="secondary"
        onClick={handleButtonClick}
        className={styles['product-cards__button']}
        ariaLabel={`View details for ${name}`}
      >
        VIEW DETAILS
      </Button>
    );
  };

  const renderStockStatus = () => {
    if (inStock && stockCount) {
      return (
        <div className={styles['product-cards__stock-info']}>
          <span className={styles['product-cards__stock-status']}>
            {stockCount} in stock{variant === 'vertical' ? '' : ' at your store'}
          </span>
        </div>
      );
    }

    if (!inStock) {
      return (
        <div className={styles['product-cards__stock-info']}>
          <span className={styles['product-cards__out-of-stock']}>
            Out of stock
          </span>
        </div>
      );
    }

    return null;
  };

  const renderFulfillments = () => {
    if (fulfillments.length === 0) return null;

    return (
      <div className={styles['product-cards__fulfillments']}>
        <Image
          src="/check.svg"
          alt=""
          width={16}
          height={16}
          className={styles['product-cards__checkmark']}
        />
        <span className={styles['product-cards__fulfillments-text']}>
          {fulfillments.join(', ')}
        </span>
      </div>
    );
  };

  if (variant === 'horizontal') {
    return (
      <div 
        className={`
          ${styles['product-cards']} 
          ${styles['product-cards--horizontal']} 
          ${!inStock ? styles['product-cards--out-of-stock'] : ''} 
          ${className || ''}
        `}
      >
        <div className={styles['product-cards__image-container']}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={80}
            height={80}
            className={styles['product-cards__image']}
          />
        </div>

        <div className={styles['product-cards__main-content']}>
          <div className={styles['product-cards__top-section']}>
            <div className={styles['product-cards__info']}>
              <h3 
                className={styles['product-cards__name']}
                onClick={handleProductNameClick}
                role={onProductClick ? 'button' : undefined}
                tabIndex={onProductClick ? 0 : undefined}
                onKeyDown={onProductClick ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProductNameClick();
                  }
                } : undefined}
                title={name}
              >
                {name}
              </h3>
              <div className={styles['product-cards__rating']}>
                <ReviewStars rating={rating} showCount={true} reviewCount={reviewCount} />
              </div>
              {colorChoices && colorChoices > 0 && (
                <div className={styles['product-cards__color-choices']}>
                  {colorChoices} color choices
                </div>
              )}
            </div>
            <div className={styles['product-cards__price-section']}>
              <div className={styles['product-cards__price-container']}>
                <span className={styles['product-cards__price']}>
                  {formatPrice(price)}
                </span>
                {regularPrice && regularPrice !== price && (
                  <span className={styles['product-cards__regular-price']}>
                    reg {formatPrice(regularPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles['product-cards__bottom-section']}>
            <div className={styles['product-cards__status-section']}>
              {renderStockStatus()}
              {renderFulfillments()}
            </div>
            {renderButton()}
          </div>
        </div>
      </div>
    );
  }

  // Vertical variant
  return (
    <div 
      className={`
        ${styles['product-cards']} 
        ${styles['product-cards--vertical']} 
        ${!inStock ? styles['product-cards--out-of-stock'] : ''} 
        ${className || ''}
      `}
    >
      <div className={styles['product-cards__image-container']}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={140}
          height={96}
          className={styles['product-cards__image']}
        />
      </div>

      <div className={styles['product-cards__content']}>
        <h3 
          className={styles['product-cards__name']}
          onClick={handleProductNameClick}
          role={onProductClick ? 'button' : undefined}
          tabIndex={onProductClick ? 0 : undefined}
          onKeyDown={onProductClick ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleProductNameClick();
            }
          } : undefined}
          title={name}
        >
          {name}
        </h3>

        <div className={styles['product-cards__rating']}>
          <ReviewStars rating={rating} showCount={true} reviewCount={reviewCount} />
        </div>

        {colorChoices && colorChoices > 0 && (
          <div className={styles['product-cards__color-choices']}>
            {colorChoices} color choices
          </div>
        )}

        <div className={styles['product-cards__price-container']}>
          <span className={styles['product-cards__price']}>
            {formatPrice(price)}
          </span>
          {regularPrice && regularPrice !== price && (
            <span className={styles['product-cards__regular-price']}>
              reg {formatPrice(regularPrice)}
            </span>
          )}
        </div>

        {renderStockStatus()}
        {renderFulfillments()}
      </div>

      {renderButton()}
    </div>
  );
};

export default ProductCards;