# Dropdown Component

## Overview
The Dropdown component is an atom-level component that provides a custom-styled select dropdown with enhanced features like keyboard navigation, disabled options, error states, and full accessibility support.

## Figma Reference
- **URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=18-304&m=dev
- **Node ID**: 18:304

## Usage

```tsx
import Dropdown, { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';

// Basic usage
const options: DropdownOption[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

<Dropdown
  id="size-selector"
  options={options}
  value={selectedSize}
  onChange={setSelectedSize}
/>

// With label and placeholder
<Dropdown
  id="country"
  label="Country"
  placeholder="Select a country"
  options={countryOptions}
  value={selectedCountry}
  onChange={setSelectedCountry}
  required
/>

// With disabled options
const options: DropdownOption[] = [
  { value: 'free', label: 'Free Shipping' },
  { value: 'standard', label: 'Standard (3-5 days)' },
  { value: 'express', label: 'Express (1-2 days)', disabled: true },
];

// With error state
<Dropdown
  id="category"
  label="Category"
  options={categoryOptions}
  value={selectedCategory}
  onChange={setSelectedCategory}
  error={!selectedCategory}
  errorMessage="Please select a category"
  required
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | ✓ | Unique identifier for the dropdown |
| `name` | `string` | - | - | Name attribute for form submission |
| `label` | `string` | - | - | Label text above the dropdown |
| `placeholder` | `string` | `'Select an option'` | - | Placeholder text when no value selected |
| `options` | `DropdownOption[]` | - | ✓ | Array of options to display |
| `value` | `string` | - | - | Currently selected value |
| `onChange` | `(value: string) => void` | - | - | Callback when selection changes |
| `disabled` | `boolean` | `false` | - | Whether the dropdown is disabled |
| `required` | `boolean` | `false` | - | Whether the field is required |
| `error` | `boolean` | `false` | - | Whether to show error state |
| `errorMessage` | `string` | - | - | Error message to display |
| `className` | `string` | - | - | Additional CSS class |
| `aria-label` | `string` | - | - | Custom aria-label |
| `aria-describedby` | `string` | - | - | ID of element that describes dropdown |

## DropdownOption Interface

```typescript
interface DropdownOption {
  value: string;      // Option value
  label: string;      // Display text
  disabled?: boolean; // Whether option is disabled
}
```

## States

### Visual States
- **Default**: Closed dropdown with placeholder or selected value
- **Open**: Dropdown menu visible with options
- **Hover**: Purple border on trigger, gray background on options
- **Focus**: Purple outline for accessibility
- **Disabled**: Grayed out with reduced opacity
- **Error**: Red border with error message below

### Interactions
- Click dropdown to open/close menu
- Click option to select and close menu
- Click outside to close menu
- Keyboard navigation:
  - Enter/Space: Toggle dropdown
  - Escape: Close dropdown
  - Arrow Down: Open dropdown
  - Tab: Navigate through options when open

## Accessibility
- Full ARIA support with `role="listbox"` and `role="option"`
- Proper `aria-expanded`, `aria-haspopup`, and `aria-selected` states
- Keyboard navigation support
- Screen reader friendly
- Hidden native select for form compatibility
- Focus management and indicators

## Styling
The component uses design system variables exclusively:
- Border color: `$gray-600` (#757575 from Figma)
- Background: `$white` (#FFFFFF)
- Text color: `$black` (#000000)
- Shadow: `$shadow-radio-selector` (reused from RadioButtonSelector)
- All spacing uses `$spacing-*` variables
- Typography uses system fonts and weights

## Examples

### Form with Dropdown
```tsx
const ProductForm = () => {
  const [formData, setFormData] = useState({
    size: '',
    color: '',
    quantity: '1',
  });

  const sizeOptions: DropdownOption[] = [
    { value: 'xs', label: 'Extra Small' },
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];

  return (
    <form>
      <Dropdown
        id="product-size"
        label="Size"
        options={sizeOptions}
        value={formData.size}
        onChange={(value) => setFormData({ ...formData, size: value })}
        required
        error={submitted && !formData.size}
        errorMessage="Please select a size"
      />
    </form>
  );
};
```

### Cascading Dropdowns
```tsx
const LocationSelector = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const stateOptions = country ? getStatesByCountry(country) : [];

  return (
    <>
      <Dropdown
        id="country"
        label="Country"
        options={countryOptions}
        value={country}
        onChange={(value) => {
          setCountry(value);
          setState(''); // Reset state when country changes
        }}
      />
      
      <Dropdown
        id="state"
        label="State/Province"
        options={stateOptions}
        value={state}
        onChange={setState}
        disabled={!country}
        placeholder={country ? 'Select a state' : 'Select country first'}
      />
    </>
  );
};
```

### Filter Dropdown
```tsx
const ProductFilter = () => {
  const [sortBy, setSortBy] = useState('featured');

  const sortOptions: DropdownOption[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <Dropdown
      id="sort-products"
      label="Sort By"
      options={sortOptions}
      value={sortBy}
      onChange={setSortBy}
      aria-label="Sort products by"
    />
  );
};
```

## Testing
The component includes comprehensive tests covering:
- Rendering in all states
- User interactions (click, keyboard)
- Option selection and disabled options
- Accessibility features
- Error states
- Form compatibility
- Edge cases

Run tests with: `npm run test Dropdown.test.tsx`