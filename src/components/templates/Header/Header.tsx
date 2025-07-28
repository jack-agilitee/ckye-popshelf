'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

interface HeaderProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onLogoClick?: () => void;
  cartItemCount?: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onSearchClick,
  onCartClick,
  onLogoClick,
  cartItemCount = 0,
  className
}) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className={`${styles.header} ${className || ''}`}>
      <div className={styles.header__container}>
        {/* Left section */}
        <div className={styles.header__left}>
          <button
            type="button"
            className={styles.header__menuButton}
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Image
              src="/menu.svg"
              alt=""
              width={48}
              height={48}
              className={styles.header__icon}
            />
            <span className={styles.header__menuText}>MENU</span>
          </button>
        </div>

        {/* Center section - Logo */}
        <div className={styles.header__center}>
          <Link
            href="/"
            className={styles.header__logo}
            onClick={handleLogoClick}
            aria-label="Popshelf homepage"
          >
            <Image
              src="/logos/main-logo.svg"
              alt="Popshelf"
              width={120}
              height={26}
              priority
            />
          </Link>
        </div>

        {/* Right section */}
        <div className={styles.header__right}>
          <button
            type="button"
            className={styles.header__iconButton}
            onClick={onSearchClick}
            aria-label="Search"
          >
            <Image
              src="/search.svg"
              alt=""
              width={48}
              height={48}
              className={styles.header__icon}
            />
          </button>

          <button
            type="button"
            className={`${styles.header__iconButton} ${styles['header__iconButton--cart']}`}
            onClick={onCartClick}
            aria-label={`Shopping cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ''}`}
          >
            <Image
              src="/cart.svg"
              alt=""
              width={48}
              height={48}
              className={styles.header__icon}
            />
            {cartItemCount > 0 && (
              <span className={styles.header__cartBadge} aria-hidden="true">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;