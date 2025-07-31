# PointsEarnedBadge Component

## Overview
The PointsEarnedBadge component is a molecule-level component that displays loyalty points status and rewards with various states. It features a circular progress indicator for points or displays rewards (dollar amounts or percentages) based on the state.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=595-5546&m=dev
- Node ID: 595-5546

## Usage

```tsx
import PointsEarnedBadge from '@/components/molecules/PointsEarnedBadge/PointsEarnedBadge';

// Default usage (points earned state)
<PointsEarnedBadge />

// No points state
<PointsEarnedBadge state="no points" />

// Close to reward
<PointsEarnedBadge state="800 pts" />

// Reward states
<PointsEarnedBadge state="reward available" />
<PointsEarnedBadge state="reward expiring" />

// Special rewards
<PointsEarnedBadge state="birthday" />
<PointsEarnedBadge state="employee" />

// Custom content
<PointsEarnedBadge 
  state="points earned"
  title="Great job!"
  subtitle="You're earning points fast!"
  points={450}
/>

// Web variant (less rounded button)
<PointsEarnedBadge type="web" />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `state` | `PointsEarnedBadgeState` | No | `'points earned'` | The state/variant of the component |
| `type` | `'app' \| 'web'` | No | `'app'` | The platform variant (affects button styling) |
| `title` | `string` | No | Based on state | Custom title text |
| `subtitle` | `string` | No | Based on state | Custom subtitle text |
| `points` | `number` | No | Based on state | Custom points value |
| `className` | `string` | No | - | Additional CSS classes |

### PointsEarnedBadgeState Type
```typescript
type PointsEarnedBadgeState = 
  | 'points earned'    // Shows points with purple border
  | 'no points'        // Shows 0 with light purple border
  | 'reward expiring'  // Shows $5 reward with expiring message
  | 'download'         // Shows points earned message
  | '800 pts'          // Shows "you're so close!" message
  | 'reward available' // Shows $5 reward
  | 'birthday'         // Shows 15% OFF birthday reward
  | 'employee'         // Shows 30% OFF employee discount
```

## States and Their Default Content

### Points States
- **points earned**: 292 points, "points earned!", progress border
- **no points**: 0 points, "keep going!", light border
- **download**: 330 points, "points earned!"
- **800 pts**: 800 points, "you're so close!", "Just 200 points left..."

### Reward States
- **reward available**: $5 reward, "you have a reward!"
- **reward expiring**: $5 reward, "reward expiring" (purple subtitle)
- **birthday**: 15% OFF, "birthday reward!"
- **employee**: 30% OFF, "thankful for you!"

## Features

- **Dynamic Display**: Shows either points circle or reward based on state
- **Progress Border**: Purple border for active points states, light purple for empty
- **Automatic Content**: Smart defaults for title and subtitle based on state
- **Platform Variants**: Different button border radius for app vs web
- **Reward Integration**: Uses the Reward atom component for reward states
- **Inner Shadow**: Subtle depth effect on the points circle

## Design System Integration

The component uses the following design system tokens:

### Colors
- Circle border (progress): `$purple-primary` (#87189D)
- Circle border (empty): `$points-earned-purple-lightest` (#E5D4ED)
- Background: `$white` (#FFFFFF)
- Title text: `$black` (#000000)
- Subtitle text: `$gray-700` (#636363)
- Subtitle (expiring): `$purple-primary` (#87189D)
- Button background: `$purple-primary` (#87189D)
- Button text: `$white` (#FFFFFF)

### Typography
- Points number: Sofia Pro Black, 28px
- Points label: Sofia Pro Regular, 8px
- Title: Sofia Pro Semi Bold, 20px
- Subtitle: Sofia Pro Regular/Medium, 12px
- Button: Sofia Pro Medium, 12px, uppercase

### Spacing
- Gap between circle and content: `$spacing-2` (8px)
- Gap between text elements: `$spacing-2` (8px)
- Circle padding top: `$spacing-2` (8px)

### Dimensions
- Circle size: 88px × 88px
- Circle border: 12px
- Button height: 32px
- Button padding: 0 24px
- Button radius (app): 24px
- Button radius (web): 8px

## Examples

### Loyalty Dashboard Integration
```tsx
function LoyaltyDashboard({ user }) {
  const getPointsState = () => {
    if (user.points === 0) return 'no points';
    if (user.points >= 800 && user.points < 1000) return '800 pts';
    if (user.hasReward) return 'reward available';
    return 'points earned';
  };

  return (
    <div className="dashboard">
      <PointsEarnedBadge 
        state={getPointsState()}
        points={user.points}
      />
    </div>
  );
}
```

### Special Events
```tsx
function SpecialOffers({ user }) {
  if (user.isBirthMonth) {
    return <PointsEarnedBadge state="birthday" />;
  }
  
  if (user.isEmployee) {
    return <PointsEarnedBadge state="employee" />;
  }
  
  return <PointsEarnedBadge state="points earned" points={user.points} />;
}
```

### Custom Messages
```tsx
// Welcome message for new users
<PointsEarnedBadge 
  state="no points"
  title="Welcome to PopShelf!"
  subtitle="Start shopping to earn your first points"
/>

// Achievement message
<PointsEarnedBadge 
  state="points earned"
  title="Amazing progress!"
  subtitle="You've earned 100 points this week"
  points={650}
/>

// Milestone reached
<PointsEarnedBadge 
  state="800 pts"
  title="Almost there!"
  subtitle="One more purchase to unlock your reward"
/>
```

## Component Composition

The PointsEarnedBadge component uses the Reward atom component for displaying rewards (dollar amounts and percentages). This ensures consistency with the standalone Reward component while adapting it to fit within the PointsEarnedBadge layout.

## Accessibility

- Uses semantic HTML with appropriate heading levels (h3 for title)
- Button is marked up as a div since it's non-interactive
- Color contrast meets WCAG AA standards
- Text is readable and hierarchical

## Testing

The component includes comprehensive tests covering:
- All state variations
- Type variations (app/web)
- Custom prop overrides
- Visual states (borders, colors)
- Component structure and BEM classes
- Reward component integration

To run tests:
```bash
npm test src/components/molecules/PointsEarnedBadge/PointsEarnedBadge.test.tsx
```

## Implementation Notes

- The component is not interactive (button is display-only)
- Reward states automatically use the Reward atom component
- Points values have smart defaults but can be overridden
- The inner shadow effect uses CSS pseudo-elements for depth
- Border changes based on state (progress vs empty)