# PerksBar Component

## Overview
The PerksBar component is a molecule-level component that displays loyalty program tiers and their lock status. It shows three tiers (like, love, obsessed) with a visual progress bar design and lock indicators for tiers that haven't been unlocked yet.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=52-1342&m=dev
- Node ID: 52:1342

## Usage

```tsx
import PerksBar, { PerksTier } from '@/components/molecules/PerksBar/PerksBar';

// Basic usage - LIKE tier selected
<PerksBar selectedTier={PerksTier.LIKE} />

// LOVE tier selected - only obsessed is locked
<PerksBar selectedTier={PerksTier.LOVE} />

// OBSESSED tier selected - all tiers unlocked
<PerksBar selectedTier={PerksTier.OBSESSED} />

// With custom className
<PerksBar 
  selectedTier={PerksTier.LOVE} 
  className="my-perks-bar" 
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `selectedTier` | `PerksTier` | Yes | - | Currently selected/unlocked tier |
| `className` | `string` | No | - | Additional CSS classes to apply |

## PerksTier Enum

```typescript
enum PerksTier {
  LIKE = 'like',
  LOVE = 'love',
  OBSESSED = 'obsessed'
}
```

## Features

- **Rounded Pill Design**: Fully rounded ends creating a pill-shaped progress bar
- **Progressive Gradient Fill**: Gradient fills from left to right based on tier selection
- **White Dividers**: Clean white lines separate the three tier sections
- **Lock Icons**: Appear centered on locked/inactive tiers
- **Lock Overlay**: Gray overlay on inactive sections for clear visual distinction
- **Fixed Tier Names**: "like", "love", and "obsessed" perks displayed within segments
- **Non-interactive**: Display-only component showing current status

## Design System Integration

The component uses the following design system tokens:

### Colors
- Gradient: `$loyalty-progress-light`, `$loyalty-progress-medium`, `$loyalty-progress-dark`
- Background: `$gray-200` for the base bar
- Lock overlay: `$perks-bar-lock-overlay` (rgba(155, 151, 151, 0.3))
- Text: `$black`
- Lock icons: `$gray-700`
- Dividers: `$white`

### Typography
- Tier names: Avenir Heavy, 16px
- "perks" text: Avenir Book, 14px, letter-spacing: 0.35px

### Spacing & Layout
- Width: `$perks-bar-width` (335px)
- Height: `$perks-bar-height` (69px)
- Shadow: `$perks-bar-shadow`
- Fully rounded ends (border-radius equals height)

## Component Behavior

The component displays a pill-shaped bar with the following behavior:
- `PerksTier.LIKE`: Gradient fills 33.33% (1/3), lock overlay covers remaining 66.67%
- `PerksTier.LOVE`: Gradient fills 66.67% (2/3), lock overlay covers remaining 33.33%
- `PerksTier.OBSESSED`: Gradient fills 100%, no lock overlay

The gradient is a continuous fill that expands based on the selected tier, with lock icons appearing on the gray/locked sections.

## Examples

### In a Loyalty Dashboard
```tsx
function LoyaltyDashboard({ userTier }) {
  return (
    <div className="dashboard">
      <h2>Your Perks Status</h2>
      <PerksBar selectedTier={userTier} />
      <p>Unlock more perks by earning points!</p>
    </div>
  );
}
```

### With User Progress
```tsx
function UserProgress({ user }) {
  // Map user points to tier
  const getTierFromPoints = (points: number): PerksTier => {
    if (points >= 500) return PerksTier.OBSESSED;
    if (points >= 200) return PerksTier.LOVE;
    return PerksTier.LIKE;
  };

  return (
    <div className="progress-section">
      <PerksBar selectedTier={getTierFromPoints(user.points)} />
      <p>{user.points} points earned</p>
    </div>
  );
}
```

### In a Rewards Screen
```tsx
function RewardsScreen({ loyaltyData }) {
  return (
    <div className="rewards-screen">
      <header>
        <h1>Your Rewards</h1>
      </header>
      <section className="perks-status">
        <PerksBar selectedTier={loyaltyData.currentTier} />
      </section>
      <section className="available-perks">
        {/* List available perks based on tier */}
      </section>
    </div>
  );
}
```

## Testing

The component includes comprehensive tests covering:
- Rendering with each tier selected
- Gradient width calculations (33.33%, 66.67%, 100%)
- Lock overlay positioning and sizing
- Lock icon placement on inactive tiers
- White divider rendering between segments
- Custom className application
- Background bar container structure
- All enum values handling

To run tests:
```bash
npm test PerksBar.test.tsx
```

## Accessibility

- Lock icons include `aria-label="Locked"` for screen readers
- Dividers have `aria-hidden="true"` as they are decorative
- Component uses semantic HTML structure
- Color contrast meets WCAG standards
- Clear visual distinction between active and locked states

## Best Practices

1. **Tier Mapping**: Create a utility function to map user points/status to PerksTier
2. **Context**: Consider showing this alongside point totals or progress indicators
3. **Responsive**: Component max-width ensures it works on mobile devices
4. **Status Updates**: Update selectedTier when user's loyalty status changes

## Related Components
- `LoyaltyProgressBar` (atoms) - Similar purple gradient progress indicator
- `LoyaltyStatusCard` (organisms) - Full loyalty status display
- `LoyaltyMainPanel` (organisms) - Main loyalty interface