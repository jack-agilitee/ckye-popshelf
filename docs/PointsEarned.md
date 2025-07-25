# PointsEarned Component

A component that displays the number of points that will be earned upon order completion with a circular green icon.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=34-402&m=dev
- Node ID: 34:402

## Usage

```tsx
import PointsEarned from '@/components/atoms/PointsEarned/PointsEarned';

// Basic usage
<PointsEarned points={100} />

// With custom styling
<PointsEarned points={250} className="my-custom-class" />

// Zero points
<PointsEarned points={0} />

// Large number of points
<PointsEarned points={5000} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `points` | `number` | Required | The number of points to display |
| `className` | `string` | - | Additional CSS class names |

## Design Specifications

- **Container**:
  - Background: #FFFFFF (white)
  - Border radius: 4px
  - Shadow: 0px 4px 16px rgba(55,58,64,0.15)
  - Padding: 16px
  - Gap: 12px between icon and text

- **Icon**:
  - Size: 46.88x48px
  - Color: #3AB44A (green)
  - Shape: Ellipse/Circle

- **Typography**:
  - Font: Avenir Medium, 16px
  - Color: #1F1F1F (black-primary)
  - Line height: 20px (1.25)
  - Points number centered in icon
  - Text: "points will be earned when you complete this order."

## Component Details

The PointsEarned component is an informational atom that displays:
- A green circular icon with the points number centered inside
- Descriptive text explaining when points will be earned
- Clean white card design with subtle shadow

## Accessibility

- SVG icon marked with `aria-hidden="true"` as it's decorative
- Semantic HTML structure with proper text content
- Supports keyboard navigation when focused

## Testing

Run tests with:

```bash
npm run test -- PointsEarned.test.tsx
```

Test coverage includes:
- Correct points number rendering
- Zero and large number handling
- Custom className application
- SVG icon presence
- Component structure validation

## Examples

### In a Checkout Flow

```tsx
function CheckoutSummary() {
  const { subtotal, pointsEarned } = useCheckout();

  return (
    <div className="checkout-summary">
      <h2>Order Summary</h2>
      <div className="subtotal">Subtotal: ${subtotal}</div>
      <PointsEarned points={pointsEarned} />
      <button>Complete Order</button>
    </div>
  );
}
```

### With Conditional Display

```tsx
function OrderRewards() {
  const { isRewardsMember, calculatedPoints } = useRewards();

  if (!isRewardsMember) {
    return <JoinRewardsPrompt />;
  }

  return (
    <div className="order-rewards">
      <PointsEarned points={calculatedPoints} />
      <p className="rewards-balance">
        Current balance: {currentPoints} points
      </p>
    </div>
  );
}
```

### In a Cart Summary

```tsx
function CartSummary() {
  const { items, totalPoints } = useCart();

  return (
    <aside className="cart-summary">
      <h3>Cart ({items.length} items)</h3>
      {totalPoints > 0 && (
        <PointsEarned points={totalPoints} />
      )}
      <CheckoutButton />
    </aside>
  );
}
```