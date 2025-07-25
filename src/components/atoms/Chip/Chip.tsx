'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Chip.module.scss';

interface ChipProps {
  label?: string;
  variant?: 'solid' | 'outlined';
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
}

const Chip: React.FC<ChipProps> = ({ 
  label = 'FILTERS',
  variant = 'solid',
  icon,
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
      {icon && (
        <Image 
          src={icon}
          alt=""
          width={8}
          height={8}
          className={styles.chip__icon}
        />
      )}
      <span className={styles.chip__label}>{label}</span>
    </button>
  );
};

export default Chip;