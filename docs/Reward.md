# Reward Component

## Overview
The Reward component is an atom-level component that displays various types of reward badges. It features a circular purple badge with different content variations including dollar amounts, percentages, icons, and special occasions like birthdays.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=595-5635&m=dev
- Node ID: 595-5635

## Usage

```tsx
import Reward from '@/components/atoms/Reward/Reward';

// Default dollar reward
<Reward />

// Custom dollar amount
<Reward amount={10} />

// Percentage reward
<Reward variant="percent" percentage={20} />

// Employee discount (30% off)
<Reward variant="employee" />

// Birthday reward
<Reward variant="birthday" percentage={15} />

// Icon reward (e.g., cake for birthday)
<Reward 
  variant="icon" 
  iconPath="/loyalty/cake.svg"
/>

// Expiring reward (red text)
<Reward variant="expiring" amount={5} />

// Simple reward (no label/expiration)
<Reward variant="simple" amount={5} />

// Custom expiration date
<Reward 
  expirationDate="Exp. 01/15/2025"
/>

// Mark as expiring (red text)
<Reward isExpiring={true} />

// Hide label or expiration
<Reward showLabel={false} />
<Reward showExpiration={false} />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'default' \| 'percent' \| 'employee' \| 'birthday' \| 'icon' \| 'expiring' \| 'simple'` | No | `'default'` | The variant of the reward badge |
| `amount` | `number` | No | `5` | Dollar amount (for default, expiring, simple variants) |
| `percentage` | `number` | No | `15` | Percentage value (for percent, birthday variants) |
| `iconPath` | `string` | No | - | Icon path (for icon variant) |
| `showLabel` | `boolean` | No | `true` | Whether to show the "REWARD" label |
| `showExpiration` | `boolean` | No | `true` | Whether to show expiration date |
| `expirationDate` | `string` | No | `'Exp. 12/10/2024'` | Expiration date text |
| `isExpiring` | `boolean` | No | `false` | Whether this is expiring soon (shows red text) |
| `className` | `string` | No | - | Additional CSS classes |

## Variants

### Default
- Shows dollar amount (e.g., $5)
- Includes "REWARD" label
- Shows expiration date

### Percent
- Shows percentage off (e.g., 15% OFF)
- Customizable percentage value
- Includes "REWARD" label

### Employee
- Fixed 30% OFF discount
- Slightly smaller font for "30"
- Includes "REWARD" label

### Birthday
- Shows percentage off (customizable)
- Two-line label: "BIRTHDAY" / "REWARD"
- Special occasion styling

### Icon
- Displays custom icon (72x72px)
- Requires `iconPath` prop
- Commonly used with cake icon for birthdays

### Expiring
- Shows dollar amount
- Red expiration text: "Expiring 9/20/2024"
- Emphasizes urgency

### Simple
- Shows only dollar amount
- No label or expiration
- Minimal design

## Design System Integration

The component uses the following design system tokens:

### Colors
- Badge background: `$purple-primary` (#87189D)
- Text in badge: `$white` (#FFFFFF)
- Label text: `$black` (#000000)
- Expiration text: `$gray-700` (#636363)
- Expiring alert: `$color-error` (#F40000)

### Typography
- Dollar sign: Sofia Pro Semi Bold, 32px
- Dollar amount: Sofia Pro Black, 88px
- Percentage number: Sofia Pro Black, 80px (72px for 30%)
- Percent sign: Sofia Pro Semi Bold, 32px
- "OFF" text: Sofia Pro Semi Bold, 24px
- Label: Sofia Pro Black, 24px, uppercase
- Expiration: Sofia Pro Regular/Semi Bold, 12px

### Spacing & Layout
- Badge size: `$reward-badge-size` (120px)
- Badge radius: `$reward-badge-radius` (89px)
- Gap between elements: `$reward-gap` (8px)
- Letter spacing (percentages): -5px

## Examples

### Loyalty Rewards List
```tsx
function LoyaltyRewards({ rewards }) {
  return (
    <div className="rewards-grid">
      {rewards.map((reward) => (
        <Reward
          key={reward.id}
          variant={reward.type}
          amount={reward.amount}
          percentage={reward.percentage}
          expirationDate={reward.expiresAt}
          isExpiring={reward.expiringSoon}
        />
      ))}
    </div>
  );
}
```

### Birthday Month Special
```tsx
function BirthdayRewards({ user }) {
  return (
    <div className="birthday-section">
      <h2>Happy Birthday, {user.name}!</h2>
      <div className="birthday-rewards">
        <Reward 
          variant="icon" 
          iconPath="/loyalty/cake.svg"
          showExpiration={false}
        />
        <Reward 
          variant="birthday" 
          percentage={20}
          expirationDate={`Exp. ${user.birthMonth}/31/2024`}
        />
      </div>
    </div>
  );
}
```

### Employee Dashboard
```tsx
function EmployeePerks({ employee }) {
  return (
    <div className="employee-perks">
      <h3>Your Employee Benefits</h3>
      <Reward 
        variant="employee"
        showExpiration={false}
      />
      <p>Show this at checkout for your discount</p>
    </div>
  );
}
```

### Expiring Rewards Alert
```tsx
function ExpiringRewardsAlert({ expiringRewards }) {
  return (
    <div className="expiring-alert">
      <h3>Use these rewards soon!</h3>
      <div className="rewards-row">
        {expiringRewards.map((reward) => (
          <Reward
            key={reward.id}
            variant="expiring"
            amount={reward.value}
          />
        ))}
      </div>
    </div>
  );
}
```

## Testing

The component includes comprehensive tests covering:
- All 7 variants rendering correctly
- Custom prop values (amount, percentage, etc.)
- Conditional rendering (label, expiration)
- Icon loading for icon variant
- Multi-line label for birthday variant
- Red text for expiring rewards
- Custom className application

To run tests:
```bash
npm test Reward.test.tsx
```

## Accessibility

- **Color Contrast**: White text on purple background meets WCAG standards
- **Text Alternatives**: Icon variant includes alt text
- **Semantic HTML**: Uses appropriate heading levels for labels
- **Screen Reader**: All text content is accessible

## Best Practices

1. **Icon Assets**: Ensure icon paths are valid and images are optimized
2. **Expiration Dates**: Use consistent date format across the app
3. **Employee Variant**: Reserve for actual employee discounts only
4. **Birthday Variant**: Pair with user birthday data for personalization
5. **Expiring Alerts**: Use sparingly to maintain urgency impact

## Related Components
- `PerksBar` (molecules) - Shows progress through reward tiers
- `RedeemPerk` (organisms) - Modal for redeeming rewards
- `LoyaltyStatusCard` (organisms) - Overall loyalty program status