'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import styles from './FulfillmentCard.module.scss';

export enum FulfillmentType {
  PICKUP = 'pickup',
  SHIPPING = 'shipping'
}

interface FulfillmentCardProps {
  type: FulfillmentType;
  outOfStock?: boolean;
  // Common props
  onAddToCart?: () => void;
  onChangeStore?: () => void;
  onAddressClick?: () => void;
  onHowItWorksClick?: () => void;
  onPolicyClick?: () => void;
  className?: string;
  // Pickup-specific props
  stockCount?: number;
  storeName?: string;
  storeAddress?: string;
  nearbyStoresCount?: number;
  // Shipping-specific props
  zipCode?: string;
  shippingDays?: string;
}

const FulfillmentCard: React.FC<FulfillmentCardProps> = ({
  type,
  outOfStock = false,
  onAddToCart,
  onChangeStore,
  onAddressClick,
  onHowItWorksClick,
  onPolicyClick,
  className,
  // Pickup props
  stockCount = 0,
  storeName = '315 NW Shenstone St.',
  storeAddress = 'Nashville, TN',
  nearbyStoresCount = 2,
  // Shipping props
  zipCode = '75240',
  shippingDays = '3-5 days'
}) => {
  const isPickup = type === FulfillmentType.PICKUP;

  const handleLinkClick = (callback?: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (callback) {
      callback();
    }
  };

  return (
    <div className={`${styles['fulfillment-card']} ${className || ''}`}>
      <div className={styles['fulfillment-card__header']}>
        <div className={styles['fulfillment-card__icon']}>
          <Image
            src={isPickup ? '/bag.svg' : '/truck.svg'}
            alt=""
            width={24}
            height={24}
          />
        </div>
        <h3 className={styles['fulfillment-card__title']}>
          {isPickup ? 'In-store pickup' : 'Ship it to me'}
        </h3>
        <a
          href="#"
          className={styles['fulfillment-card__link']}
          onClick={handleLinkClick(isPickup ? onHowItWorksClick : onPolicyClick)}
        >
          {isPickup ? 'How pickup works' : 'Shipping & return policy'}
        </a>
      </div>

      <div className={styles['fulfillment-card__body']}>
        <div className={styles['fulfillment-card__content']}>
          {isPickup ? (
            <>
              <p className={`${styles['fulfillment-card__stock']} ${outOfStock ? styles['fulfillment-card__stock--error'] : ''}`}>
                {outOfStock ? 'Out of stock at' : `${stockCount} in stock at`}
              </p>
              <button
                className={styles['fulfillment-card__address']}
                onClick={onAddressClick}
                type="button"
              >
                {storeName}<br />
                {storeAddress}
              </button>
              {outOfStock && nearbyStoresCount > 0 && (
                <p className={styles['fulfillment-card__nearby']}>
                  In stock at {nearbyStoresCount} nearby stores
                </p>
              )}
            </>
          ) : (
            <>
              <p className={styles['fulfillment-card__shipping']}>
                Shipping to <span className={styles['fulfillment-card__zipcode']}>{zipCode}</span>
              </p>
              <p className={styles['fulfillment-card__timeline']}>
                Ships within {shippingDays}
              </p>
            </>
          )}
        </div>

        <div className={styles['fulfillment-card__action']}>
          {outOfStock && isPickup ? (
            <Button
              variant="secondary"
              onClick={onChangeStore}
              className={styles['fulfillment-card__button']}
            >
              CHANGE STORE
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={onAddToCart}
              className={styles['fulfillment-card__button']}
            >
              ADD TO CART
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FulfillmentCard;