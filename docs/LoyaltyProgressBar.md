# LoyaltyProgressBar Component

## Overview
The LoyaltyProgressBar component is an atom-level component that displays a user's loyalty points progress through three colored segments. It's a non-interactive, display-only component designed based on the Figma design.

## Figma Reference
- URLs: 
  - https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=27-329&m=dev (0 points)
  - https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=27-337&m=dev (120 points)
  - https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=56-829&m=dev (231 points)
- Node IDs: 27:329, 27:337, 56:829

## Usage

```tsx
import LoyaltyProgressBar from '@/components/atoms/LoyaltyProgressBar/LoyaltyProgressBar';

// Basic usage
<LoyaltyProgressBar points={120} />

// With custom max points
<LoyaltyProgressBar points={150} maxPoints={500} />

// With custom className
<LoyaltyProgressBar 
  points={231} 
  className="my-custom-progress" 
/>

// With custom aria label
<LoyaltyProgressBar 
  points={75} 
  ariaLabel="75 reward points earned"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `points` | `number` | Yes | - | Current loyalty points |
| `maxPoints` | `number` | No | `300` | Maximum points possible |
| `className` | `string` | No | - | Additional CSS classes to apply |
| `ariaLabel` | `string` | No | `Loyalty points: {points} out of {maxPoints}` | Custom accessibility label |

## Features

### Visual Design
- Three colored segments representing progress milestones
- Smooth color progression from light to dark purple
- White circular indicator showing current position
- Rounded ends for polished appearance

### Segments
1. **First segment (0-100 points)**: Light purple (#d7b6dd)
2. **Second segment (100-200 points)**: Medium purple (#b774c1)
3. **Third segment (200-300 points)**: Dark purple (#8a1a9b)

### Accessibility
- Proper ARIA progressbar role
- aria-valuenow, aria-valuemin, and aria-valuemax attributes
- Customizable aria-label for screen readers
- No keyboard interaction (display only)

## Design System Integration

The component uses the following design system tokens:

### Colors
- First segment: `$loyalty-progress-light` (#d7b6dd)
- Second segment: `$loyalty-progress-medium` (#b774c1)
- Third segment: `$loyalty-progress-dark` (#8a1a9b)
- Background track: `$loyalty-progress-track-bg` (#e6e6e6)
- Indicator: `$white`

### Dimensions
- Height: `$loyalty-progress-height` (18px)
- Indicator size: `$loyalty-progress-indicator-size` (14px)
- Border radius: `$radius-full` (9999px)

### Effects
- Indicator shadow: `$shadow-sm`
- Transition: `$transition-base`

## Examples

### Loyalty Points Display
```tsx
const UserLoyaltyStatus = ({ userPoints }) => (
  <div className="loyalty-status">
    <h3>Your Rewards Progress</h3>
    <LoyaltyProgressBar points={userPoints} />
    <p>{userPoints} / 300 points</p>
  </div>
);
```

### Multiple Progress Bars
```tsx
const LoyaltyTiers = () => (
  <div className="loyalty-tiers">
    <div className="tier">
      <span>Bronze (0 points)</span>
      <LoyaltyProgressBar points={0} />
    </div>
    <div className="tier">
      <span>Silver (120 points)</span>
      <LoyaltyProgressBar points={120} />
    </div>
    <div className="tier">
      <span>Gold (231 points)</span>
      <LoyaltyProgressBar points={231} />
    </div>
  </div>
);
```

### With Custom Thresholds
```tsx
// For a different point system
<LoyaltyProgressBar 
  points={750} 
  maxPoints={1000}
  ariaLabel="750 out of 1000 loyalty points"
/>
```

## Testing

The component includes comprehensive tests covering:
- Rendering with various point values
- ARIA attribute correctness
- Segment fill states based on progress
- Indicator positioning
- Edge cases (negative values, exceeding maximum)
- Custom prop application

To run tests:
```bash
npm run test LoyaltyProgressBar.test.tsx
```

## Best Practices

1. **Point Values**: Ensure points are non-negative numbers
2. **Max Points**: Default is 300, but can be customized for different reward systems
3. **Accessibility**: Always provide meaningful context around the progress bar
4. **Responsive**: Component takes full width of container

## Related Components
- `PointsEarned` (atoms) - Shows points earned from a transaction
- `OrderStatus` (molecules) - Shows order progress with similar visual style