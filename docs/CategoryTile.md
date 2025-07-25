# CategoryTile Component

A clickable category tile component that displays a circular image with a label, designed for category navigation in the PopShelf application.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=3-467&m=dev
- Node ID: 3:467

## Usage

```tsx
import CategoryTile from '@/components/molecules/CategoryTile/CategoryTile';

// Basic usage
<CategoryTile
  label="Home & Garden"
  imageSrc="/categories/category-home.jpg"
  onClick={() => console.log('Category selected')}
/>

// With all props
<CategoryTile
  label="Electronics"
  imageSrc="/categories/category-electronics.jpg"
  imageAlt="Electronics and gadgets"
  onClick={() => handleCategorySelect('electronics')}
  selected={selectedCategory === 'electronics'}
  className="custom-tile"
  ariaLabel="Select electronics category"
/>

// Category grid example
<div className="category-grid">
  {categories.map((category) => (
    <CategoryTile
      key={category.id}
      label={category.name}
      imageSrc={category.image}
      onClick={() => selectCategory(category.id)}
      selected={selectedCategoryId === category.id}
    />
  ))}
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | The name of the category to display |
| `imageSrc` | `string` | Required | The path to the category image |
| `imageAlt` | `string` | `''` | Alternative text for the image |
| `onClick` | `() => void` | - | Callback function when the tile is clicked |
| `className` | `string` | - | Additional CSS class names |
| `selected` | `boolean` | `false` | Whether the tile is in a selected state |
| `ariaLabel` | `string` | - | ARIA label for the clickable tile |

## Design Specifications

- **Image**: Circular, 134x137px
- **Text**: 16px, medium weight (500), #212121 color
- **Spacing**: 12px between image and text
- **Padding**: 13px horizontal padding
- **Interactions**: 
  - Hover: Slight upward translation and subtle overlay
  - Active: Returns to original position
  - Focus: Purple outline for accessibility
  - Selected: Purple tint overlay and purple text color

## Accessibility

- Keyboard navigation support (Enter and Space keys)
- Proper ARIA attributes for button role
- Focus indicator for keyboard users
- Descriptive alt text for images
- `aria-pressed` state for selected tiles

## Testing

Run tests with:

```bash
npm run test -- CategoryTile.test.tsx
```

Test coverage includes:
- Rendering with various prop combinations
- Click and keyboard interactions
- Selected state behavior
- Accessibility attributes
- Custom styling application

## Examples

### Category Selection Grid

```tsx
const categories = [
  { id: 1, name: 'Home & Garden', image: '/categories/home.jpg' },
  { id: 2, name: 'Electronics', image: '/categories/electronics.jpg' },
  { id: 3, name: 'Fashion', image: '/categories/fashion.jpg' },
  { id: 4, name: 'Toys & Games', image: '/categories/toys.jpg' },
];

function CategorySelector() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryTile
          key={category.id}
          label={category.name}
          imageSrc={category.image}
          onClick={() => setSelectedId(category.id)}
          selected={selectedId === category.id}
        />
      ))}
    </div>
  );
}
```

### Navigation Menu

```tsx
function CategoryNavigation() {
  const router = useRouter();

  const navigateToCategory = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  return (
    <nav className="category-nav">
      <CategoryTile
        label="New Arrivals"
        imageSrc="/categories/new-arrivals.jpg"
        onClick={() => navigateToCategory('new-arrivals')}
        ariaLabel="Browse new arrivals"
      />
      {/* More categories... */}
    </nav>
  );
}
```