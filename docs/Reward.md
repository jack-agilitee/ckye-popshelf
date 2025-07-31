# Reward Component

## Overview
The Reward component is an atom-level component that displays reward badges with dynamic layouts based on props. It can show dollar amounts, percentages, or icons, and automatically handles expiration date styling.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=595-5635&m=dev
- Node ID: 595-5635

## Usage

```tsx
import Reward from '@/components/atoms/Reward/Reward';

// Dollar reward
<Reward dollar={5} />

// Percentage reward
<Reward percentage={15} />

// Employee discount (always 30%)
<Reward isEmployee={true} />

// Birthday reward with percentage
<Reward percentage={20} isBirthday={true} />

// Icon reward
<Reward icon="/loyalty/cake.svg" />

// With expiration date
<Reward 
  dollar={10} 
  expirationDate={new Date('2024-12-31')}
/>

// Hide label or expiration
<Reward 
  percentage={25}
  hideLabel={true}
  hideExpiration={true}
/>

// Custom label
<Reward 
  dollar={5}
  label="SPECIAL"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `dollar` | `number` | No | 5 | Dollar amount to display (e.g., 5 for $5) |
| `percentage` | `number` | No | - | Percentage to display (e.g., 15 for 15% OFF) |
| `icon` | `string` | No | - | Path to icon image |
| `label` | `string` | No | 'REWARD' | Label text |
| `isBirthday` | `boolean` | No | false | Whether this is a birthday reward (shows "BIRTHDAY REWARD" on two lines) |
| `isEmployee` | `boolean` | No | false | Whether this is an employee discount (shows 30% OFF) |
| `expirationDate` | `Date` | No | - | Expiration date (will automatically show in red if within 5 days) |
| `hideLabel` | `boolean` | No | false | Whether to hide the label |
| `hideExpiration` | `boolean` | No | false | Whether to hide the expiration date |
| `className` | `string` | No | - | Additional CSS classes |

## Layout Priority

The component displays content based on prop priority:
1. **Icon** - If `icon` prop is provided, displays the icon
2. **Employee** - If `isEmployee` is true, displays 30% OFF
3. **Percentage** - If `percentage` prop is provided, displays percentage OFF
4. **Dollar** - If `dollar` prop is provided, displays dollar amount
5. **Default** - Falls back to $5 if no content props are provided

## Features

- **Dynamic Layout**: Component changes display based on props provided
- **Automatic Expiration Styling**: Dates within 5 days of expiration automatically display in red with "Expiring" text
- **Flexible Labels**: Support for custom labels or multi-line birthday variant
- **Icon Support**: Can display icons with automatic white color filter
- **1:1 Figma Match**: Pixel-perfect implementation of the Figma design

## Design System Integration

The component uses the following design system tokens:

### Colors
- Badge background: `$purple-primary` (#87189D)
- Text in badge: `$white`
- Label text: `$black`
- Normal expiration: `$gray-700` (#636363)
- Expiring text: `$color-error` (#F40000)

### Typography
- Dollar sign: Sofia Pro Semi Bold, 32px
- Dollar amount: Sofia Pro Black, 88px
- Percentage number: Sofia Pro Black, 80px (72px for employee)
- Percent sign: Sofia Pro Semi Bold, 32px
- "OFF" text: Sofia Pro Semi Bold, 24px
- Label: Sofia Pro Black, 24px, uppercase
- Expiration: Sofia Pro Regular/Semi Bold, 12px

### Spacing
- Gap between elements: `$spacing-2` (8px)
- Badge size: 120px × 120px
- Icon size: 72px × 72px

## Examples

### Rewards List
```tsx
const rewards = [
  { type: 'dollar', value: 5 },
  { type: 'percent', value: 15 },
  { type: 'employee' },
  { type: 'birthday', value: 20 },
  { type: 'icon', path: '/loyalty/cake.svg' }
];

return (
  <div className="rewards-grid">
    {rewards.map((reward, index) => {
      if (reward.type === 'dollar') {
        return <Reward key={index} dollar={reward.value} />;
      }
      if (reward.type === 'percent') {
        return <Reward key={index} percentage={reward.value} />;
      }
      if (reward.type === 'employee') {
        return <Reward key={index} isEmployee={true} />;
      }
      if (reward.type === 'birthday') {
        return <Reward key={index} percentage={reward.value} isBirthday={true} />;
      }
      if (reward.type === 'icon') {
        return <Reward key={index} icon={reward.path} />;
      }
    })}
  </div>
);
```

### Expiring Rewards
```tsx
const rewardsWithExpiry = [
  { dollar: 5, expires: new Date('2024-12-31') },
  { percentage: 15, expires: new Date('2024-07-15') },
  { dollar: 10, expires: new Date('2024-07-05') } // Will show as expiring
];

return (
  <div className="expiring-rewards">
    {rewardsWithExpiry.map((reward, index) => (
      <Reward
        key={index}
        dollar={reward.dollar}
        percentage={reward.percentage}
        expirationDate={reward.expires}
      />
    ))}
  </div>
);
```

### Loyalty Program Integration
```tsx
function LoyaltyReward({ user }) {
  const isUserBirthday = checkIfBirthday(user.birthdate);
  
  return (
    <Reward
      percentage={isUserBirthday ? 20 : 10}
      isBirthday={isUserBirthday}
      expirationDate={calculateExpiryDate()}
      label={user.isPremium ? "PREMIUM" : "REWARD"}
    />
  );
}
```

## Accessibility

- **Icons**: Icons include empty alt text as they are decorative
- **Color Contrast**: All text meets WCAG AA standards for contrast
- **Semantic HTML**: Uses appropriate heading and text elements

## Testing

The component includes comprehensive tests covering:
- All layout variations (dollar, percentage, icon)
- Special cases (employee, birthday)
- Expiration date logic and formatting
- Label and expiration visibility toggles
- Prop priority handling
- Custom className application

To run tests:
```bash
npm test src/components/atoms/Reward/Reward.test.tsx
```