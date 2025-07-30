'use client';

import React from 'react';
import Image from 'next/image';
import styles from './FeaturedContentBlock.module.scss';

interface FeaturedContentBlockProps {
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  onClick?: () => void;
  className?: string;
}

const FeaturedContentBlock: React.FC<FeaturedContentBlockProps> = ({
  title,
  description,
  desktopImage,
  mobileImage,
  onClick,
  className
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`${styles.featuredContentBlock} ${className || ''}`}>
      {/* Main image container */}
      <div className={styles.featuredContentBlock__imageContainer}>
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={mobileImage}
          />
          <img
            src={desktopImage}
            alt=""
            className={styles.featuredContentBlock__image}
          />
        </picture>
      </div>

      {/* Content card */}
      <div
        className={styles.featuredContentBlock__card}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${title}. ${description}. Click to learn more.`}
      >
        <h3 className={styles.featuredContentBlock__title}>{title}</h3>
        <p className={styles.featuredContentBlock__description}>{description}</p>
        <div className={styles.featuredContentBlock__arrow}>
          <Image
            src="/arrow.svg"
            alt=""
            width={32}
            height={32}
          />
        </div>
      </div>

      {/* Desktop decoration - positioned after card so it appears behind */}
      <div className={styles.featuredContentBlock__desktopDecoration}>
        <Image
          src="/content/two-bubbles.svg"
          alt=""
          width={108}
          height={125}
        />
      </div>

      {/* Mobile decoration */}
      <div className={styles.featuredContentBlock__mobileDecoration}>
        <Image
          src="/content/two-bubbles.svg"
          alt=""
          width={105}
          height={120}
          className={styles.featuredContentBlock__mobileDecorationImage}
        />
      </div>
    </div>
  );
};

export default FeaturedContentBlock;