# PointsEarningCart Component

A molecule component that displays a loyalty points earning banner with PopShelf branding, supporting both authenticated and unauthenticated user states.

## Figma Reference
- **Auth URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=920-942&m=dev
- **Unauth URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=925-936&m=dev
- **Auth Node ID**: 920:942
- **Unauth Node ID**: 925:936

## Overview

The PointsEarningCart component encourages users to earn loyalty points with their order. It displays the PopShelf perks logo alongside an earning message, and conditionally shows authentication buttons for unauthenticated users.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `points` | `number` | ✅ | - | The number of points user can earn |
| `isAuthenticated` | `boolean` | ❌ | `false` | Whether the user is authenticated |
| `onSignIn` | `() => void` | ❌ | `undefined` | Callback when sign in button is clicked |
| `onRegister` | `() => void` | ❌ | `undefined` | Callback when register button is clicked |
| `className` | `string` | ❌ | `undefined` | Additional CSS class names |

## States

### Authenticated State
- Shows PopShelf perks logo
- Displays "Earn up to X points with this order" message
- No action buttons

### Unauthenticated State  
- Shows PopShelf perks logo
- Displays "Earn up to X points with this order" message
- Shows "SIGN IN" and "REGISTER" buttons

## Usage Examples

### Authenticated User
```tsx
import PointsEarningCart from '@/components/molecules/PointsEarningCart/PointsEarningCart';

function OrderSummary() {
  return (
    <div>
      <PointsEarningCart 
        points={180} 
        isAuthenticated={true} 
      />
    </div>
  );
}
```

### Unauthenticated User
```tsx
import PointsEarningCart from '@/components/molecules/PointsEarningCart/PointsEarningCart';

function OrderSummary() {
  const handleSignIn = () => {
    // Navigate to sign in page or open modal
    router.push('/auth/signin');
  };

  const handleRegister = () => {
    // Navigate to registration page or open modal
    router.push('/auth/register');
  };

  return (
    <div>
      <PointsEarningCart 
        points={180} 
        isAuthenticated={false}
        onSignIn={handleSignIn}
        onRegister={handleRegister}
      />
    </div>
  );
}
```

### With Custom Styling
```tsx
import PointsEarningCart from '@/components/molecules/PointsEarningCart/PointsEarningCart';

function CustomOrderBanner() {
  return (
    <div>
      <PointsEarningCart 
        points={250} 
        isAuthenticated={false}
        onSignIn={() => console.log('Sign in clicked')}
        onRegister={() => console.log('Register clicked')}
        className="my-custom-banner" 
      />
    </div>
  );
}
```

## Design Specifications

### Colors
- **Border**: `$purple-primary` (#87189D)
- **Background**: Linear gradient from rgba(135, 24, 157, 0.1) to rgba(135, 24, 157, 0.05)
- **Text**: `$purple-primary` (#87189D)
- **Sign In Button**: White background, purple border and text
- **Register Button**: Purple background, white text

### Typography
- **Regular text**: 16px Sofia Pro Semi Bold
- **Points number**: 24px Sofia Pro Black  
- **Button text**: 12px Sofia Pro Medium, uppercase
- **Font Family**: `$font-family-sofia`

### Layout
- **Padding**: 16px (`$spacing-4`)
- **Border**: 2px solid
- **Border Radius**: 8px (`$radius-md`)
- **Shadow**: Custom shadow `$points-earning-cart-shadow`
- **Button Size**: 32px height × 104px width
- **Button Radius**: 6px
- **Logo Size**: 96.302px × 33.836px

### Component Structure
- **Authenticated**: Horizontal layout with logo and text
- **Unauthenticated**: Vertical layout with content row (logo + text) and button row

## Accessibility

### Semantic HTML
- Uses proper `<p>` tags for text content
- Buttons have descriptive `aria-label` attributes
- Logo has descriptive `alt` text

### ARIA Labels
- Sign In button: "Sign in to earn points"
- Register button: "Register to earn points"
- Logo: "PopShelf Perks"

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Proper focus management for button interactions

## Component Composition

### Reused Components
- **Button**: Uses existing `Button` atom component with `primary` and `secondary` variants
- **Image**: Uses Next.js `Image` component for optimized logo loading

### Assets Required
- PopShelf logo: `/public/logos/main-logo.svg`

## Testing

The component includes comprehensive tests covering:
- Both authenticated and unauthenticated states
- Button click interactions and callbacks
- Different point values and edge cases
- Custom className application
- Proper CSS class structure
- Accessibility attributes
- Component composition and structure

### Running Tests
```bash
npm run test -- PointsEarningCart
```

## Browser Support

Compatible with all modern browsers:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Related Components

- **PointsEarnedCart** (molecule): Shows points that have already been earned
- **Button** (atom): Reused for sign in/register actions
- **Reward** (atom): Displays reward badges and amounts
- **LoyaltyProgressBar** (atom): Shows loyalty progress

## Notes

- Component automatically defaults to unauthenticated state when `isAuthenticated` is not provided
- Callback functions are optional - component handles missing callbacks gracefully
- Logo asset must be present at `/public/logos/main-logo.svg`
- Uses existing Button component with custom styling overrides for this specific use case
- Responsive design adapts layout for different screen sizes
- Sofia Pro font family maintains brand consistency throughout the component