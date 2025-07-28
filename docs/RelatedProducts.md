# RelatedProducts Component

## Overview
The RelatedProducts component displays two horizontal carousels: one for related category tags and another for related product cards. It uses Swiper.js for carousel functionality and is designed to showcase related items and products on product detail pages.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=19-337&m=dev
- Node ID: 19:337

## Usage

```tsx
import RelatedProducts from '@/components/organisms/RelatedProducts/RelatedProducts';

const categories = [
  { id: '1', name: 'Foil Fringe Banner' },
  { id: '2', name: 'Foil Letter Balloons' },
  { id: '3', name: '16 Inch Letter Balloons' },
];

const products = [
  {
    id: '1',
    name: '321 Party! Foil Gold Create Your Own Banner',
    price: 5.00,
    imageUrl: '/products/banner.jpg',
    imageAlt: 'Gold banner',
    inStock: true,
  },
  {
    id: '2',
    name: '321 Party! Champagne Balloon Cascade Kit',
    price: 5.00,
    imageUrl: '/products/balloon-kit.jpg',
    imageAlt: 'Balloon kit',
    inStock: true,
  },
];

function ProductDetailPage() {
  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    // Navigate to category page or filter products
  };

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
    // Add product to cart
  };

  const handleViewDetails = (product) => {
    console.log('View details:', product);
    // Navigate to product details page
  };

  return (
    <RelatedProducts
      categories={categories}
      products={products}
      onCategoryClick={handleCategoryClick}
      onAddToCart={handleAddToCart}
      onViewDetails={handleViewDetails}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| categories | `Category[]` | `[]` | Array of category objects to display in the first carousel |
| products | `Product[]` | `[]` | Array of product objects to display in the second carousel |
| onCategoryClick | `(category: Category) => void` | - | Callback when a category button is clicked |
| onAddToCart | `(product: Product) => void` | - | Callback when add to cart button is clicked |
| onViewDetails | `(product: Product) => void` | - | Callback when view details button is clicked (for out-of-stock items) |
| className | `string` | - | Additional CSS class for the container |

## Type Definitions

```typescript
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
```

## Features

- **Dual Carousels**: Displays both category tags and product cards in separate carousels
- **Swiper.js Integration**: Uses Swiper for smooth carousel functionality
- **Responsive Design**: Automatically adjusts slide widths based on content
- **Pagination Dots**: Shows navigation dots for the products carousel
- **Conditional Rendering**: Only shows sections when data is provided
- **Stock Status**: Shows different buttons based on product availability
- **Accessibility**: Includes proper ARIA labels for all interactive elements

## Design System Integration

The component follows the PopShelf design system with:
- **Colors**: Uses `$purple-primary` for active states and buttons
- **Typography**: Avenir Heavy for section titles, Sofia Pro for button text
- **Spacing**: 92px gap between sections, 20px padding, 8px between items
- **Shadows**: Product cards use the standard card shadow from design system

## Swiper Configuration

- **Categories Carousel**:
  - `slidesPerView: "auto"` - Shows as many slides as fit
  - `spaceBetween: 8` - 8px gap between slides
  - No pagination or navigation

- **Products Carousel**:
  - `slidesPerView: "auto"` - Shows as many slides as fit
  - `spaceBetween: 8` - 8px gap between slides
  - Pagination dots enabled
  - Custom pagination styling

## Testing

The component includes comprehensive tests covering:
- Rendering with different prop combinations
- Click event handling for all interactive elements
- Conditional rendering based on data availability
- Accessibility features
- Custom className application

Run tests with:
```bash
npm run test RelatedProducts
```

## Accessibility

- All interactive elements have descriptive ARIA labels
- Category buttons include "View [category name] category" labels
- Product cards delegate accessibility to MiniProductCard component
- Keyboard navigation supported through Swiper.js

## Notes

- The component uses client-side rendering (`'use client'`) due to Swiper.js requirements
- Product images should be placed in `/public/products/` directory
- Both sections are optional - component handles empty arrays gracefully
- Swiper CSS must be imported for proper carousel styling