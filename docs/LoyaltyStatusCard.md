# LoyaltyStatusCard Component

## Overview
The LoyaltyStatusCard component is an organism-level component that displays a user's loyalty program status. It has two states: authenticated (showing points, progress, and QR code) and unauthenticated (showing promotional content).

## Figma Reference
- Authenticated: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=27-314&m=dev
- Unauthenticated: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=27-304&m=dev
- Node IDs: 27:314 (auth), 27:304 (unauth)

## Usage

```tsx
import LoyaltyStatusCard from '@/components/organisms/LoyaltyStatusCard/LoyaltyStatusCard';

// Authenticated state
<LoyaltyStatusCard
  isAuthenticated={true}
  points={120}
  pointsToNextTier={80}
  currentLevel="love"
  onQrCodeClick={() => console.log('QR code clicked')}
/>

// Unauthenticated state
<LoyaltyStatusCard
  isAuthenticated={false}
  onLearnMoreClick={() => console.log('Learn more clicked')}
/>

// With custom className
<LoyaltyStatusCard
  isAuthenticated={true}
  points={250}
  className="my-loyalty-card"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isAuthenticated` | `boolean` | Yes | - | Whether the user is authenticated |
| `points` | `number` | No | `0` | Current loyalty points (authenticated only) |
| `pointsToNextTier` | `number` | No | `80` | Points needed for next tier (authenticated only) |
| `currentLevel` | `string` | No | `'love'` | Current tier/level name (authenticated only) |
| `onQrCodeClick` | `() => void` | No | - | Callback when QR code is clicked (authenticated only) |
| `onLearnMoreClick` | `() => void` | No | - | Callback when "How does it work?" is clicked (unauthenticated only) |
| `className` | `string` | No | - | Additional CSS classes to apply |

## Features

### Authenticated State
- Displays current loyalty points in a circular badge
- Shows points needed to reach next tier
- Includes LoyaltyProgressBar component to visualize progress
- Shows current tier/level
- Clickable QR code for check-in functionality

### Unauthenticated State
- Shows promotional box image
- Displays benefits message: "earn points and unlock free perks"
- Clickable link to learn more about the program

### Visual Design
- Card with white background and subtle shadow
- PopShelf logo with "peeps" branding
- Responsive layout that adapts to content
- Smooth hover states on interactive elements

## Design System Integration

The component uses the following design system tokens:

### Colors
- Background: `$white`
- Logo color: `$loyalty-card-logo-color` (#8a1a9b)
- Text primary: `$black-primary` (#1f1f1f)
- Text secondary: `$gray-700` (#636363)
- Link color: `$loyalty-card-link-color` (#87189d)
- Points ring: `$green-primary`

### Typography
- Logo "peeps": 24px, Avenir Book
- Points value: 16px, Avenir Medium
- Labels: Various sizes with Avenir Medium
- Learn more link: 14px, Avenir Book

### Spacing & Layout
- Card padding: `$spacing-5` (20px)
- Shadow: `$loyalty-card-shadow`
- Border radius: `$radius-md` (8px)
- QR code size: `$loyalty-card-qr-size` (30px)
- Points ring size: `$loyalty-card-points-ring-size` (45px)

## Component Composition

This organism uses the following components:
- `LoyaltyProgressBar` (atom) - For showing points progress
- Next.js `Image` component - For logos and images

## Examples

### In a User Dashboard
```tsx
function UserDashboard({ user }) {
  const handleQrCodeClick = () => {
    // Open QR scanner or show QR code modal
    openQrScanner();
  };

  const handleLearnMore = () => {
    // Navigate to loyalty program info page
    router.push('/loyalty-program');
  };

  return (
    <div className="dashboard">
      <LoyaltyStatusCard
        isAuthenticated={user.isLoggedIn}
        points={user.loyaltyPoints}
        pointsToNextTier={user.pointsToNextTier}
        currentLevel={user.loyaltyTier}
        onQrCodeClick={handleQrCodeClick}
        onLearnMoreClick={handleLearnMore}
      />
    </div>
  );
}
```

### With Loading State
```tsx
function LoyaltySection({ isLoading, user }) {
  if (isLoading) {
    return <div className="loyalty-skeleton">Loading...</div>;
  }

  return (
    <LoyaltyStatusCard
      isAuthenticated={!!user}
      points={user?.loyaltyPoints}
      pointsToNextTier={user?.pointsToNextTier}
      currentLevel={user?.tier}
    />
  );
}
```

### In a Modal
```tsx
function LoyaltyModal({ isOpen, onClose, user }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Your Loyalty Status</Modal.Header>
      <Modal.Body>
        <LoyaltyStatusCard
          isAuthenticated={!!user}
          points={user?.points || 0}
          pointsToNextTier={user?.pointsToNext || 300}
          currentLevel={user?.level || 'bronze'}
          onQrCodeClick={() => {
            // Handle QR code action
            console.log('Opening camera for QR scan');
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
```

## Testing

The component includes comprehensive tests covering:
- Both authenticated and unauthenticated states
- All interactive elements and callbacks
- Edge cases with various prop values
- Proper rendering of child components
- Accessibility attributes

To run tests:
```bash
npm run test LoyaltyStatusCard.test.tsx
```

## Accessibility

- QR code button has proper aria-label
- Images have appropriate alt text
- Interactive elements are keyboard accessible
- Color contrast meets WCAG standards

## Best Practices

1. **State Management**: Pass authentication state from parent component
2. **Error Handling**: Wrap callbacks in try-catch if they involve async operations
3. **Loading States**: Consider showing skeleton while user data loads
4. **Responsive**: Component adapts to container width (max-width: 335px)

## Related Components
- `LoyaltyProgressBar` (atoms) - Used to show progress
- `Button` (atoms) - For consistent button styling
- `Modal` (organisms) - Can contain this card for detailed view