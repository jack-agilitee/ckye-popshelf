# FulfillmentCard Component

A fulfillment options card that displays pickup or shipping information with in-stock/out-of-stock states.

## Figma Reference
- Pickup: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=18-191&m=dev
- Shipping: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=18-208&m=dev
- Out of Stock: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=18-199&m=dev

## Usage

```tsx
import FulfillmentCard, { FulfillmentType } from '@/components/molecules/FulfillmentCard/FulfillmentCard';

// In-store pickup with stock
<FulfillmentCard
  type={FulfillmentType.PICKUP}
  stockCount={27}
  storeName="315 NW Shenstone St."
  storeAddress="Nashville, TN"
  onAddToCart={() => handleAddToCart()}
  onAddressClick={() => showStoreDetails()}
  onHowItWorksClick={() => showPickupInfo()}
/>

// Shipping option
<FulfillmentCard
  type={FulfillmentType.SHIPPING}
  zipCode="75240"
  shippingDays="3-5 days"
  onAddToCart={() => handleAddToCart()}
  onPolicyClick={() => showShippingPolicy()}
/>

// Out of stock pickup
<FulfillmentCard
  type={FulfillmentType.PICKUP}
  outOfStock={true}
  nearbyStoresCount={2}
  onChangeStore={() => openStoreSelector()}
  onAddressClick={() => showStoreDetails()}
  onHowItWorksClick={() => showPickupInfo()}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `FulfillmentType` | Yes | Type of fulfillment: `PICKUP` or `SHIPPING` |
| `outOfStock` | `boolean` | No | Whether the item is out of stock (affects pickup only) |
| `onAddToCart` | `() => void` | No | Callback when Add to Cart is clicked |
| `onChangeStore` | `() => void` | No | Callback when Change Store is clicked (out of stock only) |
| `onAddressClick` | `() => void` | No | Callback when store address is clicked |
| `onHowItWorksClick` | `() => void` | No | Callback for "How pickup works" link |
| `onPolicyClick` | `() => void` | No | Callback for "Shipping & return policy" link |
| `className` | `string` | No | Additional CSS class for styling |
| **Pickup Props** |
| `stockCount` | `number` | No | Number of items in stock (default: 0) |
| `storeName` | `string` | No | Store address line 1 (default: "315 NW Shenstone St.") |
| `storeAddress` | `string` | No | Store address line 2 (default: "Nashville, TN") |
| `nearbyStoresCount` | `number` | No | Number of nearby stores with stock (default: 2) |
| **Shipping Props** |
| `zipCode` | `string` | No | Shipping destination zip code (default: "75240") |
| `shippingDays` | `string` | No | Shipping timeline (default: "3-5 days") |

## Types

### FulfillmentType
```typescript
enum FulfillmentType {
  PICKUP = 'pickup',
  SHIPPING = 'shipping'
}
```

## Features

- **Two fulfillment types**: Pickup and Shipping with distinct layouts
- **Stock status**: Shows in-stock count or out-of-stock message
- **Interactive elements**: Clickable address, informational links
- **Conditional buttons**: "Add to Cart" for in-stock, "Change Store" for out-of-stock
- **Responsive design**: Max width of 360px, adapts to container
- **Accessibility**: Keyboard navigation, proper focus states

## Variants

### 1. Pickup - In Stock
- Shows stock count
- Store address is clickable
- "How pickup works" link
- "Add to Cart" button

### 2. Pickup - Out of Stock
- Shows "Out of stock at" message
- Shows nearby stores with stock
- "Change Store" button instead of "Add to Cart"

### 3. Shipping
- Shows shipping destination zip code
- Shows estimated shipping timeline
- "Shipping & return policy" link
- Always shows "Add to Cart" button

## Example Implementation

```tsx
function ProductPage() {
  const [fulfillmentType, setFulfillmentType] = useState(FulfillmentType.PICKUP);
  const [selectedStore, setSelectedStore] = useState({
    id: '123',
    name: '315 NW Shenstone St.',
    address: 'Nashville, TN',
    stock: 27
  });

  const isOutOfStock = selectedStore.stock === 0;

  return (
    <div className="product-fulfillment">
      <FulfillmentCard
        type={fulfillmentType}
        outOfStock={isOutOfStock}
        stockCount={selectedStore.stock}
        storeName={selectedStore.name}
        storeAddress={selectedStore.address}
        nearbyStoresCount={5}
        onAddToCart={() => {
          addToCart({
            fulfillmentType,
            storeId: selectedStore.id
          });
        }}
        onChangeStore={() => {
          openStoreSelector();
        }}
        onAddressClick={() => {
          showStoreOnMap(selectedStore.id);
        }}
        onHowItWorksClick={() => {
          openModal('pickup-info');
        }}
        onPolicyClick={() => {
          openModal('shipping-policy');
        }}
      />
    </div>
  );
}
```

## Styling

The component uses SCSS modules with BEM methodology. Key features:
- White card with gray border and shadow
- Purple primary color for buttons and links
- Avenir font for text, Sofia Pro for buttons
- Fixed button width of 120px
- Consistent spacing using design system variables

## Accessibility

- Decorative icons have empty alt text
- All interactive elements are keyboard accessible
- Focus states with purple outline
- Semantic HTML with proper button and link elements
- Screen reader friendly with clear labels

## Testing

The component includes comprehensive tests covering:
- All three variants (pickup in-stock, pickup out-of-stock, shipping)
- Click handlers for all interactive elements
- Custom props and default values
- Accessibility features
- Edge cases

Run tests with:
```bash
npm test FulfillmentCard.test.tsx
```