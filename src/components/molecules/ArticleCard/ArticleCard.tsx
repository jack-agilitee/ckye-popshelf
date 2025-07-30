'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt?: string;
  onClick?: () => void;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  subtitle, 
  imageUrl,
  imageAlt = '',
  onClick,
  className 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={`${styles['article-card']} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${title}. ${subtitle}`}
    >
      <div 
        className={styles['article-card__image']}
        style={{ backgroundImage: `url('${imageUrl}')` }}
        role="img"
        aria-label={imageAlt}
      />
      <div className={styles['article-card__content']}>
        <div className={styles['article-card__text']}>
          <h3 className={styles['article-card__title']}>{title}</h3>
          <p className={styles['article-card__subtitle']}>{subtitle}</p>
        </div>
        <div className={styles['article-card__arrow']}>
          <Image 
            src="/arrow.svg"
            alt=""
            width={24}
            height={24}
            className={styles['article-card__arrow-icon']}
          />
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;