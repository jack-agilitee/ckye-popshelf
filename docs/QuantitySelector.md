# QuantitySelector Component

## Overview
The QuantitySelector component is a molecule-level component that provides an intuitive interface for selecting quantities. It features increment/decrement controls with special behavior when the quantity reaches the minimum value (showing a trash icon instead of minus).

## Figma Reference
- **URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=38-402&m=dev
- **Node ID**: 38:402

## Usage

```tsx
import QuantitySelector from '@/components/molecules/QuantitySelector/QuantitySelector';

// Basic usage
<QuantitySelector
  initialQuantity={1}
  onIncrement={() => console.log('Increment')}
  onDecrement={() => console.log('Decrement')}
  onDelete={() => console.log('Delete')}
/>

// With constraints
<QuantitySelector
  initialQuantity={5}
  minQuantity={1}
  maxQuantity={10}
  onIncrement={handleIncrement}
  onDecrement={handleDecrement}
  onDelete={handleDelete}
/>

// Custom styling
<QuantitySelector
  initialQuantity={2}
  className="custom-quantity-selector"
  onIncrement={handleIncrement}
  onDecrement={handleDecrement}
  onDelete={handleDelete}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialQuantity` | `number` | `1` | The initial quantity value |
| `minQuantity` | `number` | `1` | The minimum allowed quantity |
| `maxQuantity` | `number` | `undefined` | The maximum allowed quantity (optional) |
| `onIncrement` | `() => void` | `undefined` | Callback fired when quantity is incremented |
| `onDecrement` | `() => void` | `undefined` | Callback fired when quantity is decremented |
| `onDelete` | `() => void` | `undefined` | Callback fired when delete (trash) is clicked |
| `className` | `string` | `undefined` | Additional CSS class for custom styling |

## Behavior

### Visual States
- **Quantity = 1**: Shows trash icon on the left, allowing deletion
- **Quantity > 1**: Shows minus icon on the left for decrementing
- **At max quantity**: Plus button is disabled

### Interactions
- **Plus button**: Increments the quantity and fires `onIncrement` callback
- **Minus button**: Decrements the quantity and fires `onDecrement` callback
- **Trash button**: Fires `onDelete` callback (shown only when quantity = minQuantity)
- **Hover states**: Subtle background color change on hover for better UX

## Accessibility
- Proper ARIA labels for all interactive elements
- Keyboard accessible
- Disabled state for plus button when at maximum
- Clear focus indicators

## Styling
The component uses SCSS modules with BEM methodology:
- `.quantity-selector`: Main container
- `.quantity-selector__action`: Interactive buttons (left/right)
- `.quantity-selector__quantity`: Number display
- `.quantity-selector__icon`: Icon wrapper
- `.quantity-selector__minus`: Minus icon
- `.quantity-selector__plus`: Plus icon container

## Examples

### E-commerce Cart Item
```tsx
const CartItem = ({ item }) => {
  const handleIncrement = () => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateCartItemQuantity(item.id, item.quantity - 1);
  };

  const handleDelete = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <QuantitySelector
        initialQuantity={item.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
      />
    </div>
  );
};
```

### Inventory Management
```tsx
const InventoryItem = ({ product }) => {
  return (
    <div className="inventory-item">
      <h4>{product.name}</h4>
      <QuantitySelector
        initialQuantity={product.stock}
        minQuantity={0}
        maxQuantity={product.maxStock}
        onIncrement={() => adjustStock(product.id, 1)}
        onDecrement={() => adjustStock(product.id, -1)}
        onDelete={() => removeProduct(product.id)}
      />
    </div>
  );
};
```

## Testing
The component includes comprehensive tests covering:
- Rendering with different initial values
- Icon transitions (trash ↔ minus)
- Callback invocations
- Quantity constraints (min/max)
- Keyboard accessibility
- Edge cases

Run tests with: `npm run test QuantitySelector.test.tsx`