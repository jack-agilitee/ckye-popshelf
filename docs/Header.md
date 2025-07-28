# Header Component

A responsive header template component that provides navigation and action buttons for the application. Features mobile and desktop layouts with centered logo and interactive elements.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=526-1196&m=dev
- Node ID: 526:1196

## Usage

```tsx
import Header from '@/components/templates/Header/Header';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  return (
    <Header
      onMenuClick={() => setIsMenuOpen(true)}
      onSearchClick={() => console.log('Open search')}
      onCartClick={() => router.push('/cart')}
      onLogoClick={() => router.push('/')}
      cartItemCount={cartCount}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onMenuClick` | `() => void` | No | Callback when menu button is clicked |
| `onSearchClick` | `() => void` | No | Callback when search button is clicked |
| `onCartClick` | `() => void` | No | Callback when cart button is clicked |
| `onLogoClick` | `() => void` | No | Callback when logo is clicked (prevents default navigation) |
| `cartItemCount` | `number` | No | Number of items in cart for badge display (default: 0) |
| `className` | `string` | No | Additional CSS class for styling |

## Features

- **Responsive Design**: Automatically adapts between mobile and desktop layouts
- **Cart Badge**: Shows item count when cart has items (displays "99+" for counts over 99)
- **Accessibility**: Full keyboard navigation and screen reader support
- **Interactive Elements**: All buttons and logo use callback props for flexible integration
- **Desktop Enhancement**: Shows "MENU" text next to hamburger icon on larger screens

## Design Specifications

### Layout
- Height: 48px (both mobile and desktop)
- Desktop max-width: 1024px (centered)
- Border bottom: 1px solid #F0F0F0
- Background: White

### Sections
1. **Left**: Menu button (with "MENU" text on desktop)
2. **Center**: Popshelf logo (120px width)
3. **Right**: Search and Cart buttons

### Icons
- Menu: `/menu.svg`
- Search: `/search.svg`
- Cart: `/cart.svg`
- Logo: `/logos/main-logo.svg`

## Responsive Behavior

- **Mobile (<768px)**:
  - Hamburger menu icon only (no "MENU" text)
  - Compact spacing
  
- **Desktop (≥768px)**:
  - "MENU" text appears next to hamburger icon
  - Container max-width of 1024px

## Example Implementations

### With Navigation Drawer

```tsx
function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Header
        onMenuClick={() => setIsDrawerOpen(true)}
        onSearchClick={() => router.push('/search')}
        onCartClick={() => router.push('/cart')}
        onLogoClick={() => router.push('/')}
        cartItemCount={cart.items.length}
      />
      <NavigationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
```

### With Search Overlay

```tsx
function AppWithSearch() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Header
        onSearchClick={() => setShowSearch(true)}
        // ... other props
      />
      {showSearch && (
        <SearchOverlay onClose={() => setShowSearch(false)} />
      )}
    </>
  );
}
```

### With Cart Dropdown

```tsx
function AppWithCartDropdown() {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const { items } = useCart();

  return (
    <>
      <Header
        onCartClick={() => setShowCartDropdown(!showCartDropdown)}
        cartItemCount={items.length}
        // ... other props
      />
      {showCartDropdown && (
        <CartDropdown 
          items={items}
          onClose={() => setShowCartDropdown(false)}
        />
      )}
    </>
  );
}
```

## Styling

The component uses SCSS modules with BEM methodology. Key features:
- Uses design system variables for consistent theming
- Smooth hover transitions on interactive elements
- Focus states with purple outline for accessibility
- Responsive breakpoints for mobile/desktop layouts

### CSS Classes
- `.header` - Main container
- `.header__container` - Inner wrapper with max-width
- `.header__left` - Left section with menu
- `.header__center` - Center section with logo
- `.header__right` - Right section with search/cart
- `.header__menuButton` - Menu button wrapper
- `.header__menuText` - "MENU" text (desktop only)
- `.header__iconButton` - Icon button wrapper
- `.header__cartBadge` - Cart item count badge

## Accessibility

- Semantic HTML with `<header>` element
- Descriptive ARIA labels for all buttons
- Keyboard navigation support
- Screen reader announcements for cart item count
- Decorative images hidden from screen readers
- Focus indicators for keyboard users

## Testing

The component includes comprehensive tests covering:
- Rendering of all elements
- Click handlers for all interactive elements
- Cart badge display logic
- Responsive behavior
- Accessibility features
- Edge cases with missing props

Run tests with:
```bash
npm test Header.test.tsx
```