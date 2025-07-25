'use client';

import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  labelTop?: string;
  variant?: 'primary' | 'secondary' | 'link' | 'inactive';
  multiline?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children,
  label,
  labelTop,
  variant = 'primary',
  multiline = false,
  onClick,
  disabled = false,
  type = 'button',
  className,
  ariaLabel
}) => {
  const isDisabled = disabled || variant === 'inactive';
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    multiline ? styles['button--multiline'] : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel || (multiline && labelTop ? `${labelTop} ${label}` : label)}
    >
      {multiline ? (
        <span className={styles.button__content}>
          {labelTop && (
            <span className={styles.button__labelTop}>{labelTop}</span>
          )}
          <span className={styles.button__label}>{label || children}</span>
        </span>
      ) : (
        <span className={styles.button__label}>{children || label}</span>
      )}
    </button>
  );
};

export default Button;