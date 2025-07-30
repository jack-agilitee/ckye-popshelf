# RedeemPerk Component

## Overview
The RedeemPerk component is an organism-level component that displays a modal-style card for redeeming in-store perks. It features a purple header with title and close button, and a white body containing instructions and a QR code for scanning.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=53-816&m=dev
- Node ID: 53-816

## Usage

```tsx
import RedeemPerk from '@/components/organisms/RedeemPerk/RedeemPerk';

// Basic usage
<RedeemPerk 
  qrCodePath="/qr-code.svg"
  onClose={() => console.log('Close clicked')}
/>

// With custom text
<RedeemPerk 
  title="Your Special Reward"
  instructionText="Show this code to our team member"
  qrCodePath="/qr-code.svg"
  onClose={() => handleClose()}
/>

// With custom className
<RedeemPerk 
  qrCodePath="/qr-code.svg"
  onClose={() => handleClose()}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `qrCodePath` | `string` | Yes | - | Path to the QR code image file |
| `onClose` | `() => void` | Yes | - | Callback function when close button is clicked |
| `title` | `string` | No | `'1 in store surprise'` | Title text displayed in the header |
| `instructionText` | `string` | No | `'Please find a pOpshelf® associate...'` | Instruction text displayed above QR code |
| `className` | `string` | No | - | Additional CSS classes to apply |

## Features

- **Purple Header**: Eye-catching header with title and close button
- **Close Button**: X icon button in top-right corner with hover states
- **Instruction Text**: Clear instructions for users
- **QR Code Display**: Centered QR code image for scanning
- **Responsive Design**: Max-width ensures proper display on all devices
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Shadow Effects**: Subtle shadows for depth and visual hierarchy

## Design System Integration

The component uses the following design system tokens:

### Colors
- Header background: `$purple-primary` (#87189D)
- Body background: `$white` (#FFFFFF)
- Text colors: `$white` (header), `$black` (body)

### Typography
- Title: Avenir Black, 26px, line-height: 40px
- Instructions: Avenir Medium, 16px, line-height: 26px
- Letter spacing: 0.4px (body text)

### Spacing & Layout
- Component width: `$redeem-perk-width` (360px)
- Header height: `$redeem-perk-header-height` (79px)
- Border radius: `$redeem-perk-radius` (18px)
- Close button size: `$redeem-perk-close-size` (43px)

### Shadows
- Header: `$redeem-perk-header-shadow` (0px 5px 25px 1px rgba(55, 58, 64, 0.145))
- Body: `$redeem-perk-body-shadow` (0px 5px 25px 1px rgba(55, 58, 64, 0.2))

## Component Behavior

- **Close Button**: Clicking the X button triggers the `onClose` callback
- **Keyboard Navigation**: Close button supports Enter and Space keys
- **Focus States**: Clear focus outline on interactive elements
- **Hover States**: Subtle opacity change on close button hover

## Examples

### In a Modal Context
```tsx
function RewardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <RedeemPerk 
          qrCodePath="/rewards/qr-surprise.svg"
          onClose={onClose}
        />
      </div>
    </div>
  );
}
```

### With Custom Reward
```tsx
function CustomReward({ reward, onDismiss }) {
  return (
    <RedeemPerk 
      title={reward.title}
      instructionText={reward.instructions}
      qrCodePath={reward.qrCodeUrl}
      onClose={onDismiss}
    />
  );
}
```

### In a Rewards Flow
```tsx
function RewardsScreen({ userRewards }) {
  const [selectedReward, setSelectedReward] = useState(null);

  return (
    <div className="rewards-screen">
      {/* Rewards list */}
      <div className="rewards-list">
        {userRewards.map(reward => (
          <button 
            key={reward.id}
            onClick={() => setSelectedReward(reward)}
          >
            {reward.name}
          </button>
        ))}
      </div>

      {/* Selected reward modal */}
      {selectedReward && (
        <RedeemPerk 
          title={selectedReward.name}
          instructionText={selectedReward.redeemInstructions}
          qrCodePath={selectedReward.qrPath}
          onClose={() => setSelectedReward(null)}
        />
      )}
    </div>
  );
}
```

## Testing

The component includes comprehensive tests covering:
- Rendering with default and custom props
- Click interactions on close button
- Keyboard navigation (Enter and Space keys)
- Focus states management
- Custom className application
- Accessibility attributes
- QR code image rendering

To run tests:
```bash
npm test RedeemPerk.test.tsx
```

## Accessibility

- **Close Button**: Includes `aria-label="Close"` for screen readers
- **Keyboard Navigation**: Close button responds to Enter and Space keys
- **Focus Management**: Clear focus indicators with proper outline
- **Alt Text**: QR code image includes descriptive alt text
- **Color Contrast**: Text colors meet WCAG standards

## Best Practices

1. **QR Code Images**: Ensure QR codes are high-resolution for easy scanning
2. **Error Handling**: Wrap in error boundary if QR code loading might fail
3. **Modal Usage**: Consider backdrop click handling when used as modal
4. **Mobile Experience**: Test QR code size on mobile devices
5. **Loading States**: Consider showing loading state while QR code loads

## Related Components
- `LoyaltyMainPanel` (organisms) - Similar QR code display for loyalty
- `Button` (atoms) - Can be used for additional actions
- `CartHeader` (atoms) - Similar header pattern with close action