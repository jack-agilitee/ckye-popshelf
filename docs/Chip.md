# Chip Component

## Overview
The Chip component is a compact, interactive element used for filtering, tagging, or categorizing content. It supports three variants based on the PopShelf design system.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=105-885&m=dev

## Usage

### Basic Usage
```tsx
import Chip from '@/components/atoms/Chip/Chip';

// Default solid chip
<Chip onClick={() => console.log('Chip clicked!')} />

// With custom label
<Chip label="NEW ARRIVALS" onClick={handleClick} />
```

### Variants
```tsx
// Solid variant (default)
<Chip variant="solid" label="FILTERS" />

// Outlined variant
<Chip variant="outlined" label="CATEGORY" />

// Removable variant with delete icon
<Chip variant="removable" label="PRICE: $10-$20" onClick={handleRemove} />
```

### Filter Implementation
```tsx
const FilterBar = () => {
  const [filters, setFilters] = useState(['Category', 'Price', 'Brand']);
  
  const removeFilter = (filterToRemove: string) => {
    setFilters(filters.filter(f => f !== filterToRemove));
  };
  
  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <Chip
          key={filter}
          variant="removable"
          label={filter}
          onClick={() => removeFilter(filter)}
        />
      ))}
    </div>
  );
};
```

### Category Selection
```tsx
const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['Electronics', 'Clothing', 'Home', 'Toys'];
  
  return (
    <div className="categories">
      {categories.map(category => (
        <Chip
          key={category}
          variant={selectedCategory === category ? 'solid' : 'outlined'}
          label={category}
          onClick={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );
};
```

### Tag Display
```tsx
// Static tags
<div className="product-tags">
  <Chip variant="solid" label="NEW" />
  <Chip variant="solid" label="BESTSELLER" />
  <Chip variant="outlined" label="LIMITED EDITION" />
</div>
```

### Accessibility
```tsx
// Custom aria-label for better screen reader context
<Chip 
  variant="removable"
  label="$10-$20"
  ariaLabel="Remove price filter $10 to $20"
  onClick={handleRemove}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'FILTERS'` | Text displayed in the chip |
| `variant` | `'solid' \| 'outlined' \| 'removable'` | `'solid'` | Visual style variant |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click handler function |
| `className` | `string` | - | Additional CSS classes |
| `ariaLabel` | `string` | - | Custom aria-label for accessibility |

## Styling

The component uses CSS Modules with SCSS and follows the BEM methodology. All styles are scoped to the component.

### CSS Classes
- `.chip` - Base chip styles
- `.chip--solid` - Solid variant styles (purple background)
- `.chip--outlined` - Outlined variant styles (white background, purple border)
- `.chip--removable` - Removable variant styles (purple background with delete icon)
- `.chip__label` - Label text styles
- `.chip__icon` - Delete icon styles

### Design Tokens
The component uses design tokens from the PopShelf design system:
- Colors: `$purple-primary`, `$purple-dark`, `$white`
- Spacing: `$spacing-1`, `$spacing-2`
- Typography: Typography mixins with uppercase text
- Transitions: `$transition-fast`

## Accessibility

- Semantic button element for proper keyboard navigation
- Focus visible indicators
- ARIA labels for screen readers
- Keyboard accessible (Tab, Enter, Space)
- Clear hover and active states

## Icon

The removable variant uses a delete icon located at `/public/delete.svg`. The icon is automatically styled to be white using CSS filters.

## Testing

The component includes comprehensive tests covering:
- All variant rendering
- Click event handling
- Icon display for removable variant
- Accessibility attributes
- Custom styling application

Run tests with:
```bash
npm run test Chip.test.tsx
```

## Examples

### Filter Bar with Multiple Chips
```tsx
<div className="filter-bar">
  <Chip variant="solid" label="ALL FILTERS" onClick={openFilterModal} />
  <Chip variant="removable" label="Under $25" onClick={() => removeFilter('price')} />
  <Chip variant="removable" label="In Stock" onClick={() => removeFilter('stock')} />
  <Chip variant="removable" label="New Arrivals" onClick={() => removeFilter('new')} />
</div>
```

### Product Categories
```tsx
<div className="categories">
  <Chip variant="outlined" label="HOME DECOR" onClick={() => setCategory('home')} />
  <Chip variant="outlined" label="BEAUTY" onClick={() => setCategory('beauty')} />
  <Chip variant="outlined" label="TOYS & GAMES" onClick={() => setCategory('toys')} />
  <Chip variant="outlined" label="SEASONAL" onClick={() => setCategory('seasonal')} />
</div>
```

### Status Indicators
```tsx
<div className="product-status">
  <Chip variant="solid" label="NEW" />
  <Chip variant="solid" label="SALE" />
  <Chip variant="outlined" label="CLEARANCE" />
</div>
```