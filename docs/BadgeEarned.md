# BadgeEarned Component

## Overview
The BadgeEarned component is a molecule-level component that displays a congratulatory message when a user earns a badge. It features a circular badge with an icon, star burst decoration, and customizable title and subtitle text.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=595-5541&m=dev
- Node ID: 595-5541

## Usage

```tsx
import BadgeEarned from '@/components/molecules/BadgeEarned/BadgeEarned';

// Default usage
<BadgeEarned />

// Custom title and subtitle
<BadgeEarned 
  title="Great job John!"
  subtitle="You completed your first order!"
/>

// With custom className
<BadgeEarned 
  title="Achievement Unlocked!"
  subtitle="You've reached Gold status"
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `"Congratulations Emily!"` | Title text for the badge earned message |
| `subtitle` | `string` | No | `"You earned the welcome badge!"` | Subtitle text for the badge earned message |
| `className` | `string` | No | - | Additional CSS classes to apply to the component |

## Features

- **Circular Badge Design**: 80x80px badge with purple border and radial gradient background
- **Star Burst Decoration**: Decorative star burst SVG positioned behind the badge
- **Badge Icon**: 48x48px icon displayed in the center of the badge
- **Responsive Text**: Title and subtitle that adapt to different content lengths
- **Customizable Messages**: Both title and subtitle can be customized for different achievements

## Design System Integration

The component uses the following design system tokens:

### Colors
- Badge border: `$purple-primary` (#87189D)
- Badge gradient: `$white` to `$purple-secondary` (#C691D0)
- Title text: `$purple-primary` (#87189D)
- Subtitle text: `$black` (#000000)
- Background: `$white` (#FFFFFF)

### Typography
- Title: Sofia Pro Semi Bold, 20px, line-height 26px
- Subtitle: Sofia Pro Regular, 18px

### Spacing
- Container padding: `$spacing-2` (8px)
- Gap between badge and text: `$spacing-4` (16px)
- Gap between title and subtitle: `$spacing-1` (4px)

### Dimensions
- Container border-radius: `$radius-md` (8px)
- Badge size: 80px × 80px
- Badge border width: 7.273px
- Icon size: 48px × 48px
- Star burst size: ~94.5px

## Examples

### Welcome Badge
```tsx
<BadgeEarned 
  title="Welcome to PopShelf!"
  subtitle="You earned your first badge"
/>
```

### Loyalty Achievement
```tsx
<BadgeEarned 
  title="Loyalty Champion!"
  subtitle="You've made 10 purchases this month"
/>
```

### Birthday Badge
```tsx
<BadgeEarned 
  title="Happy Birthday!"
  subtitle="You earned a special birthday badge"
/>
```

### Custom Styling
```tsx
<BadgeEarned 
  title="Special Achievement"
  subtitle="You're one of our top customers"
  className="special-badge-notification"
/>
```

## Accessibility

- Uses semantic HTML with appropriate heading levels (h3 for title)
- Decorative images have empty alt attributes
- Text maintains proper contrast ratios for readability
- Component structure is keyboard navigable

## Testing

The component includes comprehensive tests covering:
- Default and custom prop rendering
- Image rendering with correct dimensions
- Custom className application
- Proper HTML structure and BEM classes
- Accessibility attributes
- Edge cases (empty strings, long text)

To run tests:
```bash
npm test src/components/molecules/BadgeEarned/BadgeEarned.test.tsx
```

## Implementation Notes

- The component uses Next.js Image component for optimized image loading
- Star burst is positioned absolutely behind the badge for proper layering
- Badge gradient is implemented using CSS radial-gradient
- Component is marked as 'use client' for client-side rendering
- Follows BEM methodology for CSS class naming