# LoyaltyMainPanel Component

## Overview
The LoyaltyMainPanel component is an organism-level component that displays the main loyalty program interface. It shows the user's current level, a QR code for earning points, current points balance, and a progress bar.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=51-775&m=dev
- Node ID: 51:775

## Usage

```tsx
import LoyaltyMainPanel from '@/components/organisms/LoyaltyMainPanel/LoyaltyMainPanel';

// Basic usage
<LoyaltyMainPanel />

// With custom level and points
<LoyaltyMainPanel 
  level="love" 
  points={120} 
/>

// With custom className
<LoyaltyMainPanel 
  level="gold" 
  points={250} 
  className="my-loyalty-panel" 
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `level` | `string` | No | `'like'` | Current loyalty tier/level name |
| `points` | `number` | No | `0` | Current loyalty points balance |
| `className` | `string` | No | - | Additional CSS classes to apply |

## Features

- **Level Display**: Shows current loyalty tier at the top
- **QR Code**: Large QR code for scanning at kiosks and checkout
- **Instructions**: Clear text explaining how to earn points
- **Points Display**: Circular badge showing current points balance
- **Progress Bar**: Visual indicator of progress using LoyaltyProgressBar component
- **Non-interactive**: QR code and text are display-only (no click handlers)

## Design System Integration

The component uses the following design system tokens:

### Colors
- Background: `$white`
- Border: `$loyalty-main-panel-border-color` (#DCDADA)
- Text: `$black` for level, `$gray-700` for instructions
- Points circle: `$loyalty-card-logo-color` (#8a1a9b)

### Typography
- Level: Avenir Medium, 16px
- Instructions: Avenir Book, 14px
- Points: Avenir Medium, 16px
- Link text: Avenir Medium, 14px

### Spacing & Layout
- Card padding: `$spacing-5` (20px)
- Border radius: `$loyalty-main-panel-radius` (10px)
- Shadow: `$loyalty-main-panel-shadow`
- Max width: `$loyalty-main-panel-max-width` (335px)
- QR code size: `$loyalty-main-panel-qr-size` (160px)

## Component Composition

This organism uses the following components:
- `LoyaltyProgressBar` (atom) - For showing points progress
- Next.js `Image` component - For the QR code

## Examples

### In a Loyalty Dashboard
```tsx
function LoyaltyDashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Your Rewards</h1>
      <LoyaltyMainPanel 
        level={user.loyaltyTier}
        points={user.loyaltyPoints}
      />
    </div>
  );
}
```

### With Loading State
```tsx
function LoyaltySection({ isLoading, userData }) {
  if (isLoading) {
    return <div className="skeleton">Loading loyalty information...</div>;
  }

  return (
    <LoyaltyMainPanel 
      level={userData?.tier || 'like'}
      points={userData?.points || 0}
    />
  );
}
```

### In a Mobile App View
```tsx
function MobileRewardsScreen({ loyaltyData }) {
  return (
    <div className="mobile-screen">
      <header className="app-header">
        <h2>Rewards</h2>
      </header>
      <main className="app-content">
        <LoyaltyMainPanel 
          level={loyaltyData.currentLevel}
          points={loyaltyData.totalPoints}
          className="mobile-loyalty-panel"
        />
      </main>
    </div>
  );
}
```

## Testing

The component includes comprehensive tests covering:
- Default and custom prop rendering
- QR code display with correct source
- Instruction text display
- Points and level display
- Progress bar integration
- Custom className application
- Edge cases with various prop values

To run tests:
```bash
npm test LoyaltyMainPanel.test.tsx
```

## Accessibility

- QR code has descriptive alt text
- Text maintains good color contrast
- Component structure is semantic
- All text is readable by screen readers

## Best Practices

1. **Data Management**: Pass loyalty data from parent component
2. **Loading States**: Handle loading states in parent component
3. **Error Handling**: Provide fallback values for missing data
4. **Responsive Design**: Component adapts to container width (max 335px)

## Related Components
- `LoyaltyProgressBar` (atoms) - Used for progress visualization
- `LoyaltyStatusCard` (organisms) - Alternative loyalty display
- `Modal` (organisms) - Can contain this panel for detailed view