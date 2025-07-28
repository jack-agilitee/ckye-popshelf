'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Dropdown, { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';
import styles from './ProductOptions.module.scss';

export interface ColorOption {
  id: string;
  name: string;
  imagePath: string;
}

interface ProductOptionsProps {
  colorOptions: ColorOption[];
  letterOptions: DropdownOption[];
  defaultColorId?: string;
  defaultLetter?: string;
  onColorSelect?: (colorId: string) => void;
  onLetterSelect?: (letter: string) => void;
  className?: string;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  colorOptions,
  letterOptions,
  defaultColorId,
  defaultLetter,
  onColorSelect,
  onLetterSelect,
  className
}) => {
  const [selectedColorId, setSelectedColorId] = useState(defaultColorId || colorOptions[0]?.id || '');
  const [selectedLetter, setSelectedLetter] = useState(defaultLetter || '');

  const handleColorSelect = (colorId: string) => {
    setSelectedColorId(colorId);
    if (onColorSelect) {
      onColorSelect(colorId);
    }
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    if (onLetterSelect) {
      onLetterSelect(letter);
    }
  };

  const selectedColor = colorOptions.find(color => color.id === selectedColorId);

  return (
    <div className={`${styles['product-options']} ${className || ''}`}>
      <div className={styles['product-options__color-section']}>
        <label className={styles['product-options__label']}>
          Color: {selectedColor?.name || 'Select'}
        </label>
        <div className={styles['product-options__color-selector']}>
          {colorOptions.map((color) => (
            <button
              key={color.id}
              type="button"
              className={`${styles['product-options__color-option']} ${
                selectedColorId === color.id ? styles['product-options__color-option--selected'] : ''
              }`}
              onClick={() => handleColorSelect(color.id)}
              aria-label={`Select ${color.name} color`}
              aria-pressed={selectedColorId === color.id}
            >
              <Image
                src={color.imagePath}
                alt={color.name}
                width={60}
                height={60}
                className={styles['product-options__color-image']}
              />
            </button>
          ))}
        </div>
      </div>

      <div className={styles['product-options__letter-section']}>
        <label className={styles['product-options__label']}>Letter</label>
        <Dropdown
          id="product-letter-selector"
          name="letter"
          placeholder="E"
          options={letterOptions}
          value={selectedLetter}
          onChange={handleLetterSelect}
          className={styles['product-options__dropdown']}
        />
      </div>
    </div>
  );
};

export default ProductOptions;