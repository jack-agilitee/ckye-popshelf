# ProductOptions Component

A product configuration component that allows users to select color and letter options for customizable products.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=18-296&m=dev
- Node ID: 18:296

## Usage

```tsx
import ProductOptions from '@/components/molecules/ProductOptions/ProductOptions';
import type { ColorOption } from '@/components/molecules/ProductOptions/ProductOptions';
import type { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';

const colorOptions: ColorOption[] = [
  { id: 'gold', name: 'Gold', imagePath: '/products/balloon-gold.png' },
  { id: 'silver', name: 'Silver', imagePath: '/products/balloon-silver.png' },
  { id: 'rose', name: 'Rose Gold', imagePath: '/products/balloon-rose.png' }
];

const letterOptions: DropdownOption[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' }
];

function ProductPage() {
  const handleColorSelect = (colorId: string) => {
    console.log('Selected color:', colorId);
    // Update product configuration
  };

  const handleLetterSelect = (letter: string) => {
    console.log('Selected letter:', letter);
    // Update product configuration
  };

  return (
    <ProductOptions
      colorOptions={colorOptions}
      letterOptions={letterOptions}
      defaultColorId="gold"
      defaultLetter="E"
      onColorSelect={handleColorSelect}
      onLetterSelect={handleLetterSelect}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `colorOptions` | `ColorOption[]` | Yes | Array of color options with id, name, and image path |
| `letterOptions` | `DropdownOption[]` | Yes | Array of letter options for the dropdown |
| `defaultColorId` | `string` | No | Initial selected color ID (defaults to first option) |
| `defaultLetter` | `string` | No | Initial selected letter |
| `onColorSelect` | `(colorId: string) => void` | No | Callback when a color is selected |
| `onLetterSelect` | `(letter: string) => void` | No | Callback when a letter is selected |
| `className` | `string` | No | Additional CSS class for styling |

## Types

### ColorOption
```typescript
interface ColorOption {
  id: string;
  name: string;
  imagePath: string;
}
```

### DropdownOption
```typescript
interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Features

- **Color Selection**: Visual color selector with thumbnail images
- **Letter Selection**: Dropdown selector for letter options
- **Internal State Management**: Component manages its own selection state
- **Callbacks**: Provides callbacks for parent component integration
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Responsive**: Adapts to container width

## Styling

The component uses SCSS modules with BEM methodology. Key features:
- Purple border (`#87189D`) for selected color option
- Gray border (`#D8D8D8`) for unselected options
- Avenir Heavy font for labels
- Sofia Pro Medium font for dropdown text
- Consistent spacing using design system variables

## Accessibility

- Color options are keyboard navigable buttons
- Each color option has descriptive ARIA labels
- Selected state is indicated with `aria-pressed`
- Dropdown follows accessibility best practices
- Focus indicators for keyboard navigation

## Testing

The component includes comprehensive tests covering:
- Rendering with required props
- Default selection behavior
- Color and letter selection callbacks
- Internal state management
- Keyboard accessibility
- Edge cases (empty options, prop changes)

Run tests with:
```bash
npm run test ProductOptions.test.tsx
```

## Example Configurations

### Basic Product Customization
```tsx
<ProductOptions
  colorOptions={[
    { id: 'red', name: 'Red', imagePath: '/products/red.png' },
    { id: 'blue', name: 'Blue', imagePath: '/products/blue.png' }
  ]}
  letterOptions={[
    { value: 'X', label: 'X' },
    { value: 'Y', label: 'Y' },
    { value: 'Z', label: 'Z' }
  ]}
/>
```

### With Disabled Letter Options
```tsx
<ProductOptions
  colorOptions={colorOptions}
  letterOptions={[
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B (Out of Stock)', disabled: true },
    { value: 'C', label: 'C' }
  ]}
  onColorSelect={handleColorSelect}
  onLetterSelect={handleLetterSelect}
/>
```

### Controlled Component Pattern
```tsx
function ControlledExample() {
  const [selectedColor, setSelectedColor] = useState('gold');
  const [selectedLetter, setSelectedLetter] = useState('A');

  return (
    <ProductOptions
      colorOptions={colorOptions}
      letterOptions={letterOptions}
      defaultColorId={selectedColor}
      defaultLetter={selectedLetter}
      onColorSelect={setSelectedColor}
      onLetterSelect={setSelectedLetter}
    />
  );
}
```