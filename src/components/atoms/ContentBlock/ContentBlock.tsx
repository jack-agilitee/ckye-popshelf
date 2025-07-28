import React from 'react';
import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  title: string;
  items: string[];
  className?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  items,
  className
}) => {
  return (
    <div className={`${styles['content-block']} ${className || ''}`}>
      <h3 className={styles['content-block__title']}>{title}</h3>
      <ul className={styles['content-block__list']}>
        {items.map((item, index) => (
          <li key={index} className={styles['content-block__item']}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentBlock;