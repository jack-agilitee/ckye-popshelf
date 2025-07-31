# PointsEarnedCart Component

A molecule component that displays a notification message when a user has earned points from an order.

## Figma Reference
- **URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=595-6093&m=dev
- **Node ID**: 595:6093

## Overview

The PointsEarnedCart component is designed to show users how many points they've earned from a specific order. It features a purple gradient background with a matching border and uses the Sofia Pro font family to match the design system.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `points` | `number` | ✅ | - | The number of points earned |
| `className` | `string` | ❌ | `undefined` | Additional CSS class names |

## Usage Examples

### Basic Usage
```tsx
import PointsEarnedCart from '@/components/molecules/PointsEarnedCart/PointsEarnedCart';

function OrderConfirmation() {
  return (
    <div>
      <PointsEarnedCart points={180} />
    </div>
  );
}
```

### With Custom Styling
```tsx
import PointsEarnedCart from '@/components/molecules/PointsEarnedCart/PointsEarnedCart';

function OrderSuccess() {
  return (
    <div>
      <PointsEarnedCart 
        points={250} 
        className="my-custom-class" 
      />
    </div>
  );
}
```

### Different Point Values
```tsx
import PointsEarnedCart from '@/components/molecules/PointsEarnedCart/PointsEarnedCart';

function Examples() {
  return (
    <div>
      <PointsEarnedCart points={50} />
      <PointsEarnedCart points={180} />
      <PointsEarnedCart points={1000} />
    </div>
  );
}
```

## Design Specifications

### Colors
- **Border**: `$purple-primary` (#87189D)
- **Background**: Linear gradient from rgba(135, 24, 157, 0.1) to rgba(135, 24, 157, 0.05)
- **Text**: `$purple-primary` (#87189D)

### Typography
- **Regular text**: 16px Sofia Pro
- **Points number**: 24px Sofia Pro ExtraBold
- **Font Family**: `$font-family-sofia`

### Layout
- **Padding**: 16px (`$spacing-4`)
- **Border**: 2px solid
- **Border Radius**: 8px (`$radius-md`)
- **Max Width**: 335px
- **Shadow**: Custom shadow `$shadow-points-earned-cart`

## Accessibility

- Uses semantic HTML with proper `<p>` tag for text content
- Text contrast meets WCAG guidelines with purple text on light background
- Component is keyboard accessible (no interactive elements)
- Screen reader friendly with clear, descriptive text

## Testing

The component includes comprehensive tests covering:
- Basic rendering with required props
- Different point values (including edge cases like 0, negative, decimal)
- Custom className application
- Proper CSS class structure
- Text content accuracy
- Accessibility standards

### Running Tests
```bash
npm run test -- PointsEarnedCart
```

## Browser Support

Compatible with all modern browsers:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Related Components

- **PointsEarned** (atom): Shows points that will be earned in the future
- **Reward** (atom): Displays reward badges and amounts
- **LoyaltyProgressBar** (atom): Shows loyalty progress

## Notes

- This component is specifically for showing points that have **already been earned**
- Uses Sofia Pro font family to match the PopShelf brand
- The gradient background provides visual interest while maintaining readability
- Component is responsive and works well on mobile devices (max-width: 335px)