'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  name,
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      setSelectedValue(optionValue);
      setIsOpen(false);
      if (onChange) {
        onChange(optionValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleToggle();
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`${styles.dropdown} ${className || ''}`} ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className={styles.dropdown__label}>
          {label}
          {required && <span className={styles.dropdown__required}>*</span>}
        </label>
      )}
      
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className={`${styles.dropdown__trigger} ${
          isOpen ? styles['dropdown__trigger--open'] : ''
        } ${error ? styles['dropdown__trigger--error'] : ''} ${
          disabled ? styles['dropdown__trigger--disabled'] : ''
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || 'Select an option'}
        aria-describedby={ariaDescribedby}
      >
        <span className={`${styles.dropdown__value} ${
          !selectedValue ? styles['dropdown__value--placeholder'] : ''
        }`}>
          {displayLabel}
        </span>
        <div className={`${styles.dropdown__icon} ${
          isOpen ? styles['dropdown__icon--rotated'] : ''
        }`}>
          <Image
            src="/chevron-down.svg"
            alt=""
            width={20}
            height={20}
            className={styles.dropdown__chevron}
          />
        </div>
      </button>

      {isOpen && (
        <ul
          className={styles.dropdown__menu}
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              className={`${styles.dropdown__option} ${
                option.disabled ? styles['dropdown__option--disabled'] : ''
              } ${
                selectedValue === option.value ? styles['dropdown__option--selected'] : ''
              }`}
              onClick={() => !option.disabled && handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !option.disabled) {
                  handleSelect(option.value);
                }
              }}
              aria-selected={selectedValue === option.value}
              aria-disabled={option.disabled}
              tabIndex={option.disabled ? -1 : 0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && errorMessage && (
        <p className={styles.dropdown__error} role="alert">
          {errorMessage}
        </p>
      )}

      {/* Hidden select for form compatibility */}
      <select
        name={name || id}
        value={selectedValue}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={disabled}
        required={required}
        className={styles.dropdown__hidden}
        aria-hidden="true"
        tabIndex={-1}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;