# MiniProductCard Component

A compact product card component that displays product information with two variants based on stock availability.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=14-197&m=dev
- Node ID: 14:197

## Usage

```tsx
import MiniProductCard from '@/components/molecules/MiniProductCard/MiniProductCard';

function ProductGrid() {
  const handleAddToCart = (productId: string) => {
    console.log(`Adding product ${productId} to cart`);
  };

  const handleViewDetails = (productId: string) => {
    console.log(`Viewing details for product ${productId}`);
  };

  return (
    <div className="product-grid">
      <MiniProductCard
        name="Party Balloon Set"
        price={12.99}
        imageUrl="/categories/product-balloon.png"
        imageAlt="Colorful party balloons"
        inStock={true}
        onAddToCart={() => handleAddToCart('balloon-set')}
        onViewDetails={() => handleViewDetails('balloon-set')}
      />
      
      <MiniProductCard
        name="Unicorn Pinata"
        price={24.99}
        imageUrl="/categories/product-pinata.png"
        imageAlt="Rainbow unicorn pinata"
        inStock={false}
        onAddToCart={() => handleAddToCart('unicorn-pinata')}
        onViewDetails={() => handleViewDetails('unicorn-pinata')}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | Product name displayed on the card |
| `price` | `number` | Required | Product price (will be formatted as currency) |
| `imageUrl` | `string` | Required | URL/path to the product image |
| `imageAlt` | `string` | `''` | Alt text for the product image |
| `inStock` | `boolean` | `true` | Controls button variant and text |
| `onAddToCart` | `() => void` | Optional | Callback when "ADD TO CART" is clicked (in stock) |
| `onViewDetails` | `() => void` | Optional | Callback when "VIEW DETAILS" is clicked (out of stock) |
| `className` | `string` | Optional | Additional CSS class for styling |

## Features

### Stock Variants
The component displays different button styles based on the `inStock` prop:
- **In Stock (`inStock={true}`)**: Purple filled "ADD TO CART" button
- **Out of Stock (`inStock={false}`)**: Purple outline "VIEW DETAILS" button

### Responsive Design
- Fixed width of 170px for consistent grid layouts
- Product images are 80x80px with cover fit
- Product names support up to 2 lines with ellipsis for overflow
- Full-width buttons prevent text wrapping

### Accessibility
- Proper alt text for images
- Descriptive aria-labels for buttons
- Title attribute on product names for full text on hover
- Semantic HTML structure

## Styling

The component uses SCSS modules with BEM methodology:
- All colors, spacing, and typography use design system variables
- Shadows and borders match the Figma design exactly
- Button styles override the base Button component for specific sizing

## Implementation Details

- Uses Next.js Image component for optimized image loading
- Reuses the Button atom component with custom styling
- Price formatting handles decimal places correctly
- Long product names are truncated with CSS line-clamp

## Example Grid Layout

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 16px;
  padding: 16px;
}
```

This creates a responsive grid that adjusts the number of columns based on available space while maintaining the 170px minimum width for each card.