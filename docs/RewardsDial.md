# RewardsDial Component

## Overview
The RewardsDial component is an organism-level component that displays a user's loyalty points progress in a circular dial format. It shows current points, points remaining until reward, and the conversion rate between dollars spent and points earned.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=595-5407&m=dev
- Node ID: 595:5407

## Usage

```tsx
import RewardsDial from '@/components/organisms/RewardsDial/RewardsDial';

// Default usage
<RewardsDial />

// With specific points
<RewardsDial points={292} />

// No points state
<RewardsDial state="no-points" />

// Error state
<RewardsDial state="error" />

// Negative points
<RewardsDial points={-15} state="negative" />

// Custom reward threshold
<RewardsDial points={500} rewardThreshold={750} />

// With custom className
<RewardsDial points={827} className="dashboard-dial" />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `points` | `number` | No | `0` | Current points value |
| `state` | `RewardsDialState` | No | `'points'` | State of the dial |
| `rewardThreshold` | `number` | No | `1000` | Points needed for reward |
| `className` | `string` | No | - | Additional CSS classes |

### RewardsDialState Type
```typescript
type RewardsDialState = 
  | 'points'     // Show specific points value
  | 'no-points'  // 0 points state
  | 'error'      // Loading error state
  | 'negative';  // Negative points state
```

## Features

- **Visual Progress Indicator**: Circular border shows progress toward reward
- **Dynamic Calculations**: Automatically calculates points remaining
- **Multiple States**: Supports various states including error and negative points
- **Smooth Animations**: Progress changes animate smoothly
- **Conversion Display**: Shows "$1 = 10 points" conversion rate

## Design System Integration

The component uses the following design system tokens:

### Colors
- Dial background: `$white` (#FFFFFF)
- Progress border: `$purple-primary` (#87189D)
- Empty border: `$points-earned-purple-lightest` (#E5D4ED)
- Points text: `$black` (#000000)
- Label text: `$gray-700` (#636363)
- Conversion text: `$purple-primary` (#87189D)

### Typography
- Points number: Sofia Pro Black, 80px
- Points label: Sofia Pro Regular, 14px
- Status text: Sofia Pro Semi Bold, 30px
- Conversion text: Sofia Pro Regular/Black, 24px/32px/64px

### Spacing
- Component gap: `$spacing-2` (8px)
- Content padding: `$spacing-4` (16px)

### Dimensions
- Dial size: 240px
- Border width: 32px
- Inner shadow: Complex inset shadows for depth

## Examples

### Dashboard Integration
```tsx
function LoyaltyDashboard({ user }) {
  return (
    <div className="dashboard">
      <RewardsDial 
        points={user.loyaltyPoints}
        state={user.hasError ? 'error' : 'points'}
      />
    </div>
  );
}
```

### With Loading States
```tsx
function PointsDisplay({ isLoading, points, error }) {
  if (error) {
    return <RewardsDial state="error" />;
  }
  
  if (isLoading) {
    return <RewardsDial points={0} state="no-points" />;
  }
  
  return <RewardsDial points={points} />;
}
```

### Custom Reward Programs
```tsx
// Different reward thresholds for different tiers
function TieredRewards({ user }) {
  const threshold = user.tier === 'gold' ? 500 : 1000;
  
  return (
    <RewardsDial 
      points={user.points}
      rewardThreshold={threshold}
    />
  );
}
```

## Progress Calculation

The component automatically calculates and displays progress:
- Progress percentage = (points / rewardThreshold) × 100
- Points away = rewardThreshold - points (minimum 0)
- Full progress is shown when points ≥ rewardThreshold

## States Visualization

- **Points State**: Shows purple progress border proportional to points
- **No Points**: Shows light purple empty border
- **Error**: Shows "!" instead of points with "loading error" message
- **Negative**: Shows negative value with light purple border

## Accessibility

- Uses semantic HTML structure
- Color contrast meets WCAG AA standards
- Text is clear and hierarchical
- Non-interactive display component

## Testing

The component includes comprehensive tests covering:
- All point value variations
- Special states (error, negative, no points)
- Custom threshold calculations
- Progress visualization logic
- Component structure and styling

To run tests:
```bash
npm test src/components/organisms/RewardsDial/RewardsDial.test.tsx
```

## Implementation Notes

- The component is display-only with no user interactions
- Progress animation uses CSS transitions
- SVG circles create the progress visualization
- Negative points show total distance from reward
- Error state hides conversion rate and shows error message