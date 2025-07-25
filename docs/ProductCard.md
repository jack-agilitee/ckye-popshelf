# ProductCard Component

A product card component that displays product information with two variants: in-stock with quantity selector and out-of-stock state.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=33-580&m=dev
- Node ID: 33:580

## Usage

```tsx
import ProductCard from '@/components/molecules/ProductCard/ProductCard';

// In stock product
<ProductCard
  name="Round Gold Metal Wall Mirror"
  price={9.00}
  stockQuantity={15}
  onClose={() => handleRemoveProduct()}
  onIncrement={() => handleIncrement()}
  onDecrement={() => handleDecrement()}
  onDelete={() => handleDelete()}
/>

// With regular price (showing discount)
<ProductCard
  name="Decorative Throw Pillow"
  price={12.99}
  regularPrice={19.99}
  stockQuantity={8}
  initialQuantity={2}
  onClose={() => handleRemoveProduct()}
  onIncrement={() => handleIncrement()}
  onDecrement={() => handleDecrement()}
  onDelete={() => handleDelete()}
/>

// Out of stock product
<ProductCard
  name="Vintage Table Lamp"
  price={45.00}
  outOfStock={true}
  onClose={() => handleRemoveProduct()}
/>

// With custom image
<ProductCard
  name="Ceramic Vase"
  image="/products/ceramic-vase.jpg"
  price={25.00}
  stockQuantity={3}
  onClose={() => handleRemoveProduct()}
  onIncrement={() => handleIncrement()}
  onDecrement={() => handleDecrement()}
  onDelete={() => handleDelete()}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | Product name/title |
| `price` | `number` | Required | Current product price |
| `onClose` | `() => void` | Required | Callback when close button is clicked |
| `image` | `string` | `'/categories/product.png'` | Product image URL |
| `regularPrice` | `number` | - | Original price (shows when higher than current price) |
| `stockQuantity` | `number` | `0` | Available stock quantity |
| `initialQuantity` | `number` | `1` | Initial quantity in cart |
| `outOfStock` | `boolean` | `false` | Whether the product is out of stock |
| `onIncrement` | `() => void` | - | Callback when quantity is incremented |
| `onDecrement` | `() => void` | - | Callback when quantity is decremented |
| `onDelete` | `() => void` | - | Callback when delete button is clicked |
| `className` | `string` | - | Additional CSS class names |

## Design Specifications

- **Card**:
  - Background: #FFFFFF (white)
  - Border radius: 4px
  - Shadow: 0px 4px 16px rgba(55,58,64,0.15)
  - Padding: 8px
  - Gap: 8px

- **Product Image**:
  - Size: 112x112px
  - Opacity: 0.33 when out of stock

- **Typography**:
  - Product name: Avenir Medium, 14px, #000000 (in stock) or #757575 (out of stock)
  - Price: Avenir Heavy, 18px, #000000
  - Regular price: Avenir Roman, 12px, #757575
  - Stock text: Avenir Medium, 14px, #757575
  - Out of stock: Avenir Medium, 14px, #F40000

- **Layout**:
  - Product name limited to 2 lines with ellipsis
  - Close button: 16x16px in top right corner
  - Reuses QuantitySelector component for quantity controls

## Component Details

The ProductCard component has two main variants:

1. **In Stock**: Shows product with price, stock quantity, and quantity selector
2. **Out of Stock**: Shows product with grayed image and "Out of stock" text, hiding price and quantity controls

The component integrates with the existing QuantitySelector component for quantity management and provides callbacks for all user interactions.

## Accessibility

- Close button has proper ARIA label "Remove product"
- Product image includes alt text with product name
- Keyboard navigation supported with focus indicators
- Semantic HTML structure

## Testing

Run tests with:

```bash
npm run test -- ProductCard.test.tsx
```

Test coverage includes:
- Rendering both in-stock and out-of-stock variants
- Price formatting and regular price display
- Click handler functionality
- Long product name truncation
- Integration with QuantitySelector
- Custom styling and image support

## Examples

### Shopping Cart Implementation

```tsx
function ShoppingCart() {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className="shopping-cart">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          name={item.name}
          image={item.image}
          price={item.salePrice}
          regularPrice={item.originalPrice}
          stockQuantity={item.availableStock}
          initialQuantity={item.quantity}
          outOfStock={item.availableStock === 0}
          onClose={() => removeItem(item.id)}
          onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
          onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
          onDelete={() => removeItem(item.id)}
        />
      ))}
    </div>
  );
}
```

### Wishlist with Stock Status

```tsx
function Wishlist() {
  const { wishlistItems, moveToCart, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-grid">
      {wishlistItems.map((item) => (
        <ProductCard
          key={item.id}
          name={item.name}
          image={item.image}
          price={item.currentPrice}
          regularPrice={item.msrp}
          stockQuantity={item.stock}
          outOfStock={!item.inStock}
          onClose={() => removeFromWishlist(item.id)}
          onIncrement={() => moveToCart(item.id)}
        />
      ))}
    </div>
  );
}
```

### Recently Viewed Products

```tsx
function RecentlyViewed() {
  const recentProducts = useRecentlyViewed();

  return (
    <section className="recently-viewed">
      <h2>Recently Viewed</h2>
      <div className="product-grid">
        {recentProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.title}
            image={product.thumbnail}
            price={product.price}
            stockQuantity={product.inventory}
            outOfStock={product.inventory === 0}
            onClose={() => clearFromHistory(product.id)}
            onIncrement={() => addToCart(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
```