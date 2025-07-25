'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Chip.module.scss';

interface ChipProps {
  label?: string;
  variant?: 'solid' | 'outlined' | 'removable';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
}

const Chip: React.FC<ChipProps> = ({ 
  label = 'FILTERS',
  variant = 'solid',
  onClick,
  className,
  ariaLabel
}) => {
  const chipClasses = [
    styles.chip,
    styles[`chip--${variant}`],
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={chipClasses}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {variant === 'removable' && (
        <Image 
          src="/delete.svg"
          alt=""
          width={10}
          height={10}
          className={styles.chip__icon}
        />
      )}
      <span className={styles.chip__label}>{label}</span>
    </button>
  );
};

export default Chip;