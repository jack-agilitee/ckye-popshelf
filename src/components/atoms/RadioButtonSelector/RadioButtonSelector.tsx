'use client';

import React from 'react';
import Image from 'next/image';
import styles from './RadioButtonSelector.module.scss';

interface RadioButtonSelectorProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  rightContent?: 'check' | 'price' | 'status';
  price?: string;
  statusText?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const RadioButtonSelector: React.FC<RadioButtonSelectorProps> = ({
  id,
  name,
  value,
  label,
  checked = false,
  disabled = false,
  onChange,
  rightContent,
  price,
  statusText = 'unavailable',
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const getRadioIcon = () => {
    if (disabled) {
      return '/radio-disabled.svg';
    }
    return checked ? '/radio-selected.svg' : '/radio-unselected.svg';
  };

  const getState = () => {
    if (disabled) return 'disabled';
    if (checked && rightContent === 'check') return 'selected';
    if (rightContent === 'price') return 'priced';
    return 'default';
  };

  return (
    <div
      className={`${styles['radio-selector']} ${styles[`radio-selector--${getState()}`]} ${className || ''}`}
      onClick={handleClick}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
        className={styles['radio-selector__input']}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedby}
      />
      
      <div className={styles['radio-selector__radio']}>
        <Image
          src={getRadioIcon()}
          alt=""
          width={20}
          height={20}
          className={styles['radio-selector__radio-icon']}
        />
      </div>

      <label htmlFor={id} className={styles['radio-selector__label']}>
        {label}
      </label>

      {checked && rightContent === 'check' && (
        <div className={styles['radio-selector__check']}>
          <Image
            src="/check.svg"
            alt=""
            width={24}
            height={24}
            className={styles['radio-selector__check-icon']}
          />
        </div>
      )}

      {rightContent === 'price' && price && (
        <span className={styles['radio-selector__price']}>
          {price}
        </span>
      )}

      {disabled && rightContent === 'status' && (
        <span className={styles['radio-selector__status']}>
          {statusText}
        </span>
      )}
    </div>
  );
};

export default RadioButtonSelector;