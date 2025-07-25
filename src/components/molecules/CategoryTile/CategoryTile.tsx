'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CategoryTile.module.scss';

interface CategoryTileProps {
  /** The name of the category to display */
  label: string;
  /** The path to the category image */
  imageSrc: string;
  /** Alternative text for the image */
  imageAlt?: string;
  /** Callback function when the tile is clicked */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Whether the tile is in a selected state */
  selected?: boolean;
  /** ARIA label for the clickable tile */
  ariaLabel?: string;
}

const CategoryTile: React.FC<CategoryTileProps> = ({
  label,
  imageSrc,
  imageAlt = '',
  onClick,
  className,
  selected = false,
  ariaLabel,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`${styles['category-tile']} ${selected ? styles['category-tile--selected'] : ''} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel || `${label} category`}
      aria-pressed={onClick ? selected : undefined}
    >
      <div className={styles['category-tile__image-wrapper']}>
        <Image
          src={imageSrc}
          alt={imageAlt || `${label} category`}
          width={134}
          height={137}
          className={styles['category-tile__image']}
          priority
        />
      </div>
      <p className={styles['category-tile__label']}>{label}</p>
    </div>
  );
};

export default CategoryTile;