'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Button from '@/components/atoms/Button/Button';
import MiniProductCard from '@/components/molecules/MiniProductCard/MiniProductCard';
import styles from './RelatedProducts.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageAlt?: string;
  inStock?: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface RelatedProductsProps {
  categories?: Category[];
  products?: Product[];
  onCategoryClick?: (category: Category) => void;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  categories = [],
  products = [],
  onCategoryClick,
  onAddToCart,
  onViewDetails,
  className
}) => {
  const categorySwiperRef = useRef<SwiperType | null>(null);
  const productSwiperRef = useRef<SwiperType | null>(null);

  const handleCategoryClick = (category: Category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = (product: Product) => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div className={`${styles['related-products']} ${className || ''}`}>
      {categories.length > 0 && (
        <section className={styles['related-products__section']}>
          <h2 className={styles['related-products__title']}>Related Items</h2>
          <div className={styles['related-products__categories']}>
            <Swiper
              onSwiper={(swiper: SwiperType) => {
                categorySwiperRef.current = swiper;
              }}
              spaceBetween={8}
              slidesPerView="auto"
              slidesPerGroup={1}
              freeMode={true}
              modules={[FreeMode]}
              className={styles['related-products__category-swiper']}
            >
              {categories.map((category) => (
                <SwiperSlide
                  key={category.id}
                  className={styles['related-products__category-slide']}
                >
                  <Button
                    variant="secondary"
                    onClick={() => handleCategoryClick(category)}
                    className={styles['related-products__category-button']}
                    ariaLabel={`View ${category.name} category`}
                  >
                    {category.name}
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className={styles['related-products__section']}>
          <h2 className={styles['related-products__title']}>Related Products</h2>
          <div className={styles['related-products__products']}>
            <Swiper
              onSwiper={(swiper: SwiperType) => {
                productSwiperRef.current = swiper;
              }}
              spaceBetween={8}
              slidesPerView="auto"
              slidesPerGroup={1}
              watchSlidesProgress={true}
              pagination={{
                clickable: true,
                el: `.${styles['related-products__pagination']}`,
              }}
              modules={[Pagination]}
              className={styles['related-products__product-swiper']}
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className={styles['related-products__product-slide']}
                >
                  <MiniProductCard
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    imageAlt={product.imageAlt}
                    inStock={product.inStock}
                    onAddToCart={() => handleAddToCart(product)}
                    onViewDetails={() => handleViewDetails(product)}
                    className={styles['related-products__card']}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles['related-products__pagination']} />
          </div>
        </section>
      )}
    </div>
  );
};

export default RelatedProducts;