'use client';

import React, { useId } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
  name?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label,
  checked = false,
  disabled = false,
  onChange,
  className,
  id,
  name,
  ariaLabel,
  ariaDescribedBy
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' && !disabled) {
      event.preventDefault();
      if (onChange) {
        onChange(!checked);
      }
    }
  };

  return (
    <div 
      className={`${styles.checkbox} ${disabled ? styles['checkbox--disabled'] : ''} ${className || ''}`}
    >
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.checkbox__input}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      />
      <label 
        htmlFor={checkboxId} 
        className={styles.checkbox__label}
      >
        <div 
          className={`${styles.checkbox__box} ${checked ? styles['checkbox__box--checked'] : ''}`}
          tabIndex={disabled ? -1 : 0}
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
        >
          {checked && (
            <svg 
              className={styles.checkbox__checkmark}
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M1 5L4.5 8.5L11 1" 
                stroke="white" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className={styles.checkbox__text}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;