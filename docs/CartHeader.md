# CartHeader Component

A simple cart summary header component that displays the number of items and total price in the shopping cart.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=32-563&m=dev
- Node ID: 32:563

## Usage

```tsx
import CartHeader from '@/components/atoms/CartHeader/CartHeader';

// Basic usage
<CartHeader
  itemCount={3}
  totalPrice={40.64}
/>

// With custom currency
<CartHeader
  itemCount={5}
  totalPrice={99.99}
  currencySymbol="€"
/>

// Clickable variant
<CartHeader
  itemCount={2}
  totalPrice={25.50}
  onClick={() => openCartDrawer()}
  ariaLabel="Open shopping cart"
/>

// With custom styling
<CartHeader
  itemCount={10}
  totalPrice={150.00}
  className="fixed-header"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemCount` | `number` | Required | Number of items in the cart |
| `totalPrice` | `number` | Required | Total price of items in cart |
| `currencySymbol` | `string` | `'$'` | Currency symbol to display |
| `className` | `string` | - | Additional CSS class names |
| `onClick` | `() => void` | - | Callback when header is clicked (makes it a button) |
| `ariaLabel` | `string` | - | Custom ARIA label for accessibility |

## Design Specifications

- **Background**: Purple (#87189D)
- **Text color**: White
- **Height**: 60px
- **Padding**: 20px horizontal
- **Typography**:
  - "cart" text: 20px extra bold
  - Item count: 16px normal weight
  - "total:" label: 16px medium weight
  - Price: 20px extra bold

## Variants

### Static Header
When no `onClick` prop is provided, the component renders as a `<div>` with `role="status"` for accessibility.

### Clickable Header
When `onClick` prop is provided, the component renders as a `<button>` with:
- Hover state (darker purple)
- Focus outline
- Active state (even darker purple)
- Proper button semantics

## Accessibility

- Automatic ARIA label generation: "Cart with X items, total $Y"
- Custom ARIA labels supported
- Proper semantic HTML (div vs button based on interactivity)
- Focus indicators for keyboard navigation
- Role attributes for screen readers

## Testing

Run tests with:

```bash
npm run test -- CartHeader.test.tsx
```

Test coverage includes:
- Rendering with various prop combinations
- Price formatting (2 decimal places)
- Singular/plural item text
- Currency symbol customization
- Click handler functionality
- Accessibility attributes

## Examples

### E-commerce Header

```tsx
function AppHeader() {
  const { itemCount, totalPrice } = useCart();
  const { openDrawer } = useCartDrawer();

  return (
    <header className="app-header">
      <Logo />
      <Navigation />
      <CartHeader
        itemCount={itemCount}
        totalPrice={totalPrice}
        onClick={openDrawer}
        ariaLabel="View shopping cart"
      />
    </header>
  );
}
```

### Mini Cart Preview

```tsx
function MiniCart() {
  const { items, getTotal } = useCart();
  
  return (
    <div className="mini-cart">
      <CartHeader
        itemCount={items.length}
        totalPrice={getTotal()}
      />
      <CartItemList items={items} />
    </div>
  );
}
```

### Multi-currency Support

```tsx
function InternationalCart() {
  const { currency, symbol } = useLocale();
  const { itemCount, totalPrice } = useCart();
  
  return (
    <CartHeader
      itemCount={itemCount}
      totalPrice={convertCurrency(totalPrice, currency)}
      currencySymbol={symbol}
    />
  );
}
```

### Fixed Position Cart

```tsx
function StickyCart() {
  const cartData = useCart();
  
  return (
    <div className="sticky-cart-container">
      <CartHeader
        {...cartData}
        className="sticky-cart"
        onClick={() => window.location.href = '/cart'}
      />
    </div>
  );
}
```