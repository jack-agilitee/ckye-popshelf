'use client';

import React, { useState } from 'react';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import TextField from '@/components/atoms/TextField/TextField';
import Button from '@/components/atoms/Button/Button';
import styles from './OrderSummary.module.scss';

interface OrderSummaryProps {
  originalTotal: number;
  rewards?: number;
  subtotal: number;
  crvFeeQuantity?: number;
  crvFeePerItem?: number;
  bagFeeQuantity?: number;
  bagFeePerItem?: number;
  tax: number;
  orderTotal: number;
  onProceedToCheckout?: () => void;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  originalTotal,
  rewards = 0,
  subtotal,
  crvFeeQuantity = 0,
  crvFeePerItem = 0.10,
  bagFeeQuantity = 0,
  bagFeePerItem = 0.10,
  tax,
  orderTotal,
  onProceedToCheckout,
  className
}) => {
  const [bringOwnBags, setBringOwnBags] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');

  const handleApplyPromo = () => {
    console.log('Applying promo code:', promoCode);
  };

  const handleProceedToCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const crvFeeTotal = crvFeeQuantity * crvFeePerItem;
  const bagFeeTotal = bagFeeQuantity * bagFeePerItem;

  return (
    <div className={`${styles['order-summary']} ${className || ''}`}>
      <div className={styles['order-summary__bring-bags']}>
        <h3 className={styles['order-summary__section-title']}>
          Will you bring your own bags?
        </h3>
        <Checkbox
          label="Yes, I will bring my own bags"
          checked={bringOwnBags}
          onChange={setBringOwnBags}
          className={styles['order-summary__checkbox']}
        />
      </div>

      <div className={styles['order-summary__details']}>
        <h3 className={styles['order-summary__section-title']}>Order Summary</h3>
        
        <div className={styles['order-summary__line-item']}>
          <span className={styles['order-summary__line-label']}>Original total:</span>
          <span className={styles['order-summary__line-value']}>
            {formatCurrency(originalTotal)}
          </span>
        </div>

        <div className={styles['order-summary__promo-section']}>
          <TextField
            id="promo-code"
            placeholder="Promo code"
            value={promoCode}
            onChange={setPromoCode}
            className={styles['order-summary__promo-input']}
          />
          <Button
            variant="secondary"
            onClick={handleApplyPromo}
            className={styles['order-summary__apply-button']}
          >
            Apply
          </Button>
        </div>

        {rewards > 0 && (
          <div className={styles['order-summary__line-item']}>
            <span className={styles['order-summary__line-label']}>Rewards:</span>
            <span className={styles['order-summary__line-value']}>
              -{formatCurrency(rewards)}
            </span>
          </div>
        )}

        <div className={styles['order-summary__line-item']}>
          <span className={styles['order-summary__line-label']}>Subtotal:</span>
          <span className={styles['order-summary__line-value']}>
            {formatCurrency(subtotal)}
          </span>
        </div>

        {crvFeeQuantity > 0 && (
          <div className={styles['order-summary__line-item']}>
            <span className={styles['order-summary__line-label']}>
              CA CRV Fee {crvFeeQuantity} @ {formatCurrency(crvFeePerItem)}:
            </span>
            <span className={styles['order-summary__line-value']}>
              {formatCurrency(crvFeeTotal)}
            </span>
          </div>
        )}

        {bagFeeQuantity > 0 && !bringOwnBags && (
          <div className={styles['order-summary__line-item']}>
            <span className={styles['order-summary__line-label']}>
              Est Bag Fee {bagFeeQuantity} @ {formatCurrency(bagFeePerItem)}:
            </span>
            <span className={styles['order-summary__line-value']}>
              {formatCurrency(bagFeeTotal)}
            </span>
          </div>
        )}

        <div className={styles['order-summary__line-item']}>
          <span className={styles['order-summary__line-label']}>Tax:</span>
          <span className={styles['order-summary__line-value']}>
            {formatCurrency(tax)}
          </span>
        </div>

        <div className={`${styles['order-summary__line-item']} ${styles['order-summary__line-item--total']}`}>
          <span className={styles['order-summary__line-label']}>Order Total:</span>
          <span className={styles['order-summary__line-value']}>
            {formatCurrency(orderTotal)}
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleProceedToCheckout}
        className={styles['order-summary__proceed-button']}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;