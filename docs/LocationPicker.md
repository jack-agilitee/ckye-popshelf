# LocationPicker Component

A location display component that shows a pickup or delivery address with an edit button for changing the location.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=535-1336&m=dev
- Node ID: 535:1336

## Usage

```tsx
import LocationPicker from '@/components/molecules/LocationPicker/LocationPicker';

// Basic usage
<LocationPicker
  address="315 N Main St, Atlanta GA"
  onEdit={() => handleEditLocation()}
/>

// With custom label
<LocationPicker
  label="Delivery address"
  address="123 Delivery St, Nashville TN"
  onEdit={() => openLocationModal()}
/>

// With custom styling
<LocationPicker
  address="456 Oak Ave, Memphis TN"
  onEdit={() => navigateToLocationPicker()}
  className="location-section"
/>

// With custom aria label
<LocationPicker
  address="789 Pine Rd, Knoxville TN"
  onEdit={() => handleChangeLocation()}
  editAriaLabel="Change store location"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `string` | Required | The address to display |
| `onEdit` | `() => void` | Required | Callback when edit button is clicked |
| `label` | `string` | `'Picking up at'` | The label text above the address |
| `className` | `string` | - | Additional CSS class names |
| `editAriaLabel` | `string` | `'Edit pickup location'` | ARIA label for the edit button |

## Design Specifications

- **Label**: 
  - Color: #7A7A7A (mapped to $gray-750)
  - Font size: 12px
  - Font weight: 500 (medium)
- **Address**: 
  - Color: #1F1F1F (mapped to $black-primary)
  - Font size: 16px
  - Font weight: 600 (semibold)
  - Text decoration: underline
- **Gap**: 5px between label and address
- **Edit icon**: 
  - Size: 20px × 23px
  - Path: `/public/edit.svg`

## Component Details

The LocationPicker component displays location information with an editable option. The address text is underlined to indicate it's associated with the location, and an edit icon button allows users to modify the location.

## Accessibility

- Edit button has proper ARIA label for screen readers
- Keyboard navigation supported with focus indicators
- Semantic HTML structure with button element

## Testing

Run tests with:

```bash
npm run test -- LocationPicker.test.tsx
```

Test coverage includes:
- Rendering with various prop combinations
- Click handler functionality
- Custom label and aria label support
- Long address handling
- Focus management
- Component structure verification

## Examples

### Store Pickup Location

```tsx
function StorePickup() {
  const [pickupStore, setPickupStore] = useState({
    address: '315 N Main St, Atlanta GA'
  });

  const handleEditLocation = () => {
    // Open store selector modal
    openStoreSelector();
  };

  return (
    <div className="pickup-section">
      <LocationPicker
        address={pickupStore.address}
        onEdit={handleEditLocation}
      />
      <p>Store closes at 9pm</p>
    </div>
  );
}
```

### Delivery Address

```tsx
function DeliveryInfo() {
  const { deliveryAddress, openAddressBook } = useDelivery();

  return (
    <LocationPicker
      label="Delivery address"
      address={deliveryAddress}
      onEdit={openAddressBook}
      editAriaLabel="Change delivery address"
    />
  );
}
```

### Multiple Locations

```tsx
function LocationsList() {
  const locations = [
    { id: 1, type: 'Pickup', address: '123 Main St, City A' },
    { id: 2, type: 'Delivery', address: '456 Oak Ave, City B' },
  ];

  return (
    <div className="locations-list">
      {locations.map((location) => (
        <LocationPicker
          key={location.id}
          label={`${location.type} location`}
          address={location.address}
          onEdit={() => editLocation(location.id)}
          className="location-item"
        />
      ))}
    </div>
  );
}
```

### In Order Summary

```tsx
function OrderSummary() {
  const { order, updatePickupLocation } = useOrder();

  return (
    <div className="order-summary">
      <h2>Order Details</h2>
      <LocationPicker
        address={order.pickupLocation}
        onEdit={updatePickupLocation}
      />
      <div className="order-items">
        {/* Order items list */}
      </div>
    </div>
  );
}
```