import React from 'react';
import styles from './CartHeader.module.scss';

interface CartHeaderProps {
  /** Number of items in the cart */
  itemCount: number;
  /** Total price of items in cart */
  totalPrice: number;
  /** Currency symbol to display (default: $) */
  currencySymbol?: string;
  /** Additional CSS class names */
  className?: string;
  /** Callback when header is clicked (optional) */
  onClick?: () => void;
  /** ARIA label for the header (optional) */
  ariaLabel?: string;
}

const CartHeader: React.FC<CartHeaderProps> = ({
  itemCount,
  totalPrice,
  currencySymbol = '$',
  className,
  onClick,
  ariaLabel,
}) => {
  const formattedPrice = totalPrice.toFixed(2);
  const itemText = itemCount === 1 ? 'item' : 'items';
  const defaultAriaLabel = `Cart with ${itemCount} ${itemText}, total ${currencySymbol}${formattedPrice}`;
  
  const headerContent = (
    <>
      <div className={styles['cart-header__left']}>
        <span className={styles['cart-header__cart-text']}>cart</span>
        <span className={styles['cart-header__count']}>({itemCount} {itemText})</span>
      </div>
      <div className={styles['cart-header__right']}>
        <span className={styles['cart-header__total-label']}>total:</span>
        <span className={styles['cart-header__total-price']}>{currencySymbol}{formattedPrice}</span>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        className={`${styles['cart-header']} ${styles['cart-header--clickable']} ${className || ''}`}
        onClick={onClick}
        aria-label={ariaLabel || defaultAriaLabel}
        type="button"
      >
        {headerContent}
      </button>
    );
  }

  return (
    <div 
      className={`${styles['cart-header']} ${className || ''}`}
      role="status"
      aria-label={ariaLabel || defaultAriaLabel}
    >
      {headerContent}
    </div>
  );
};

export default CartHeader;