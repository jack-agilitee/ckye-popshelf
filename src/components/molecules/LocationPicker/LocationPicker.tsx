'use client';

import React from 'react';
import Image from 'next/image';
import styles from './LocationPicker.module.scss';

interface LocationPickerProps {
  /** The label text above the address */
  label?: string;
  /** The address to display */
  address: string;
  /** Callback when edit button is clicked */
  onEdit: () => void;
  /** Additional CSS class names */
  className?: string;
  /** ARIA label for the edit button */
  editAriaLabel?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  label = 'Picking up at',
  address,
  onEdit,
  className,
  editAriaLabel = 'Edit pickup location',
}) => {
  return (
    <div className={`${styles['location-picker']} ${className || ''}`}>
      <div className={styles['location-picker__content']}>
        <span className={styles['location-picker__label']}>{label}</span>
        <span className={styles['location-picker__address']}>{address}</span>
      </div>
      <button
        type="button"
        className={styles['location-picker__edit-button']}
        onClick={onEdit}
        aria-label={editAriaLabel}
      >
        <Image
          src="/edit.svg"
          alt=""
          width={20}
          height={23}
          className={styles['location-picker__edit-icon']}
        />
      </button>
    </div>
  );
};

export default LocationPicker;