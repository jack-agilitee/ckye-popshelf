'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  maxLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  label,
  placeholder = '',
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  disabled = false,
  readOnly = false,
  required = false,
  error = false,
  errorMessage,
  type = 'text',
  maxLength,
  autoComplete,
  autoFocus = false,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (value === undefined) {
      setInputValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const hasValue = inputValue.length > 0;
  const fieldState = hasValue ? 'data' : 'entry';

  return (
    <div className={`${styles.textField} ${className || ''}`}>
      {label && (
        <label htmlFor={id} className={styles.textField__label}>
          {label}
          {required && <span className={styles.textField__required}>*</span>}
        </label>
      )}
      
      <div className={`${styles.textField__wrapper} ${styles[`textField__wrapper--${fieldState}`]}`}>
        <input
          ref={inputRef}
          id={id}
          name={name || id}
          type={type}
          className={`${styles.textField__input} ${
            error ? styles['textField__input--error'] : ''
          } ${disabled ? styles['textField__input--disabled'] : ''} ${
            isFocused ? styles['textField__input--focused'] : ''
          }`}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedby}
          aria-invalid={error}
          aria-required={required}
        />
      </div>

      {error && errorMessage && (
        <p className={styles.textField__error} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextField;