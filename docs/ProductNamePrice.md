# ProductNamePrice Component

## Overview
The ProductNamePrice component displays product information including the product name, price, regular price, rating, and a share button. It's designed based on the Figma design system.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=18-221&m=dev
- Node ID: 18-221

## Usage

```tsx
import ProductNamePrice from '@/components/molecules/ProductNamePrice/ProductNamePrice';

// Basic usage
<ProductNamePrice
  name="Dermott Damask Throw Pillow (Set of 2)"
  price={9.00}
/>

// With all props
<ProductNamePrice
  name="Dermott Damask Throw Pillow (Set of 2)"
  price={9.00}
  regularPrice={9.50}
  rating={4.5}
  reviewCount={280}
  onShare={() => console.log('Share clicked')}
  className="custom-class"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | string | Yes | - | Product name/title |
| price | number | Yes | - | Current price |
| regularPrice | number | No | - | Regular/original price (optional) |
| rating | number | No | 0 | Product rating (0-5) |
| reviewCount | number | No | 0 | Number of reviews |
| onShare | () => void | No | - | Callback when share icon is clicked |
| className | string | No | - | Additional CSS class |

## Features
- Displays product name with proper typography
- Shows current price and optional regular price
- Integrates ReviewStars component for rating display
- Optional share button with callback
- Responsive layout with proper spacing
- Accessible with ARIA labels

## Design System Mapping
- **Colors**: 
  - Product name and price: `$black` (#000000)
  - Regular price and review count: `$gray-700` (#636363)
- **Typography**:
  - Product name: `@include product-name-price-title` (16px, Avenir Medium)
  - Price: `@include product-name-price-price` (20px, Avenir Heavy)
  - Regular price: `@include product-name-price-regular` (14px, Avenir Medium)
- **Spacing**:
  - Share icon size: `$product-name-price-share-icon-size` (30px)
  - Component spacing uses design system variables

## Notes
- Share icon is located at `/share.svg` in the public folder
- Regular price only displays if different from current price
- Share button only renders if onShare callback is provided
- Component is marked as 'use client' for interactivity

## Accessibility
- Share button includes aria-label for screen readers
- Semantic heading element (h2) for product name
- Proper keyboard navigation support

## Testing
Comprehensive test suite covers:
- Rendering with various prop combinations
- Price formatting
- Share button functionality
- Integration with ReviewStars
- Custom className application
- Edge cases and long product names