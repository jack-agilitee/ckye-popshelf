# OrderStatus Component

A store pickup status tile component that displays store information and order status with 4 different variants for the PopShelf application.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=4-198&m=dev
- Node ID: 4:198

## Usage

```tsx
import OrderStatus, { OrderStatusType } from '@/components/molecules/OrderStatus/OrderStatus';

// Basic usage - No order started
<OrderStatus
  status={OrderStatusType.NO_ORDER}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => console.log('Edit store')}
/>

// Order received status
<OrderStatus
  status={OrderStatusType.ORDER_RECEIVED}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
/>

// Ready to pickup status
<OrderStatus
  status={OrderStatusType.READY_TO_PICKUP}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
/>

// Multiple orders status
<OrderStatus
  status={OrderStatusType.MULTIPLE_ORDERS}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
  onViewOrders={() => navigateToOrders()}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `OrderStatusType` | Required | The current status of the order (enum) |
| `storeName` | `string` | Required | Store name to display |
| `storeAddress` | `string` | Required | Store address (will be truncated with ellipsis if too long) |
| `closingTime` | `string` | Required | Store closing time |
| `onEdit` | `() => void` | - | Callback when edit button is clicked |
| `onViewOrders` | `() => void` | - | Callback when "View Your Orders" is clicked (only for MULTIPLE_ORDERS status) |
| `className` | `string` | - | Additional CSS class names |

## OrderStatusType Enum

```typescript
enum OrderStatusType {
  NO_ORDER = 'NO_ORDER',           // Purple - No pickup order started
  ORDER_RECEIVED = 'ORDER_RECEIVED', // Blue - Order received and being prepared
  READY_TO_PICKUP = 'READY_TO_PICKUP', // Green - Order ready for pickup
  MULTIPLE_ORDERS = 'MULTIPLE_ORDERS'  // Orange - Multiple orders placed
}
```

## Design Specifications

- **Container**: White background with colored border matching status
- **Store Info Section**:
  - Purple location icon (40x40px)
  - Store name: 16px medium weight
  - Address: 16px semibold (truncates with ellipsis)
  - Hours: 12px semibold gray
  - Edit button: 30x30px clickable icon
- **Status Bar**:
  - Background color varies by status
  - Status label: 16px semibold
  - Status text: 16px extra bold, uppercase, underlined
  - Only clickable for MULTIPLE_ORDERS status

## Status Colors

- **NO_ORDER**: Light purple (#DBBAE2)
- **ORDER_RECEIVED**: Light blue (#B0E3FA)
- **READY_TO_PICKUP**: Light green (#91D6AC)
- **MULTIPLE_ORDERS**: Light orange (#FEC4A8)

## Accessibility

- Edit button has proper aria-label
- Status button (when clickable) has proper aria-label
- Icons use empty alt text as they are decorative
- Keyboard navigation support with visible focus indicators

## Testing

Run tests with:

```bash
npm run test -- OrderStatus.test.tsx
```

Test coverage includes:
- All 4 status variants
- Click handlers for edit and view orders
- Address truncation behavior
- Accessibility attributes
- Custom styling application

## Examples

### Order Tracking Page

```tsx
function OrderTracking() {
  const [orderStatus, setOrderStatus] = useState(OrderStatusType.NO_ORDER);
  const [selectedStore, setSelectedStore] = useState({
    name: 'PopShelf #123',
    address: '315 N Main St, Goodlettsville, TN 37072',
    closingTime: '9pm'
  });

  const handleEditStore = () => {
    // Open store selector modal
    openStoreSelector();
  };

  const handleViewOrders = () => {
    router.push('/orders');
  };

  return (
    <div className="order-tracking">
      <OrderStatus
        status={orderStatus}
        storeName={selectedStore.name}
        storeAddress={selectedStore.address}
        closingTime={selectedStore.closingTime}
        onEdit={handleEditStore}
        onViewOrders={handleViewOrders}
      />
    </div>
  );
}
```

### Store Selection with Status

```tsx
function StorePickup() {
  const stores = useStores();
  const orders = useOrders();

  return (
    <div className="store-pickup">
      {stores.map((store) => {
        const storeOrders = orders.filter(o => o.storeId === store.id);
        const status = getStoreOrderStatus(storeOrders);

        return (
          <OrderStatus
            key={store.id}
            status={status}
            storeName={store.name}
            storeAddress={store.address}
            closingTime={store.closingTime}
            onEdit={() => selectDifferentStore(store.id)}
            onViewOrders={() => viewStoreOrders(store.id)}
            className="store-pickup__item"
          />
        );
      })}
    </div>
  );
}
```

### Status Updates

```tsx
function OrderStatusUpdater() {
  const [status, setStatus] = useState(OrderStatusType.NO_ORDER);

  useEffect(() => {
    // Subscribe to order status updates
    const unsubscribe = subscribeToOrderStatus((newStatus) => {
      setStatus(newStatus);
    });

    return unsubscribe;
  }, []);

  return (
    <OrderStatus
      status={status}
      storeName="Your store"
      storeAddress="315 N Main St, Goodlettsville, TN 37072"
      closingTime="9pm"
      onEdit={() => console.log('Edit store')}
      onViewOrders={() => console.log('View orders')}
    />
  );
}
```