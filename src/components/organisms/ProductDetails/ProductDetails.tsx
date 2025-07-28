'use client';

import React, { useState } from 'react';
import ContentBlock from '@/components/atoms/ContentBlock/ContentBlock';
import styles from './ProductDetails.module.scss';

interface Tab {
  id: string;
  label: string;
}

interface ProductDetailsProps {
  /** Title for the details section */
  title?: string;
  /** Array of highlight items to display */
  highlights?: string[];
  /** Ratings content (for future implementation) */
  ratingsContent?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title = 'Highlights',
  highlights = [],
  ratingsContent,
  className
}) => {
  const [activeTab, setActiveTab] = useState<string>('details');

  const tabs: Tab[] = [
    { id: 'details', label: 'Details' },
    { id: 'ratings', label: 'Ratings & Reviews' }
  ];

  return (
    <div className={`${styles['product-details']} ${className || ''}`}>
      {/* Tab navigation */}
      <div className={styles['product-details__tabs']}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles['product-details__tab']} ${
              activeTab === tab.id ? styles['product-details__tab--active'] : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles['product-details__content']}>
        {activeTab === 'details' && (
          <div className={styles['product-details__details']}>
            <ContentBlock 
              title={title} 
              items={highlights}
            />
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className={styles['product-details__ratings']}>
            {ratingsContent || (
              <p className={styles['product-details__placeholder']}>
                No reviews yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;