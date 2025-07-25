# Button Component

## Overview
The Button component is a versatile, accessible button implementation that supports multiple variants and layouts based on the PopShelf design system.

## Figma Reference
- Primary variants: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=19-207&m=dev
- Multiline variants: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=60-822&m=dev

## Usage

### Basic Usage
```tsx
import Button from '@/components/atoms/Button/Button';

// Primary button
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>

// With label prop
<Button label="Submit" onClick={handleSubmit} />
```

### Variants
```tsx
// Primary (default)
<Button variant="primary">Primary Button</Button>

// Secondary
<Button variant="secondary">Secondary Button</Button>

// Tertiary style
<Button variant="tertiary">Tertiary Button</Button>

// Disabled state (works with all variants)
<Button disabled>Disabled Button</Button>
```

### Multiline Buttons
```tsx
// Multiline primary
<Button 
  multiline
  labelTop="Ready to"
  label="Continue"
  onClick={handleContinue}
/>

// Multiline secondary
<Button 
  multiline
  variant="secondary"
  labelTop="View all"
  label="Products"
  onClick={handleViewProducts}
/>
```

### Form Buttons
```tsx
// Submit button
<Button type="submit">Submit Form</Button>

// Reset button
<Button type="reset" variant="secondary">Reset</Button>
```

### Disabled State
```tsx
// Disabled primary button
<Button disabled onClick={handleClick}>
  Disabled Primary
</Button>

// Disabled secondary button
<Button variant="secondary" disabled>
  Disabled Secondary
</Button>

// Disabled tertiary button
<Button variant="tertiary" disabled>
  Disabled Tertiary
</Button>
```

### Custom Styling
```tsx
// With custom className
<Button className="my-custom-class">
  Custom Styled
</Button>
```

### Accessibility
```tsx
// Custom aria-label
<Button 
  ariaLabel="Save document and continue to next step"
  onClick={handleSave}
>
  Save & Continue
</Button>

// Multiline buttons automatically combine labels for aria-label
<Button 
  multiline
  labelTop="Total Items"
  label="25"
/> // aria-label="Total Items 25"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content (takes precedence over label) |
| `label` | `string` | - | Button text (used when children not provided) |
| `labelTop` | `string` | - | Top label for multiline variant |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style variant |
| `multiline` | `boolean` | `false` | Enable two-line layout |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click handler function |
| `disabled` | `boolean` | `false` | Disable button interactions |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `className` | `string` | - | Additional CSS classes |
| `ariaLabel` | `string` | - | Custom aria-label for accessibility |

## Styling

The component uses CSS Modules with SCSS and follows the BEM methodology. All styles are scoped to the component.

### CSS Classes
- `.button` - Base button styles
- `.button--primary` - Primary variant styles
- `.button--secondary` - Secondary variant styles  
- `.button--tertiary` - Tertiary variant styles
- `.button--multiline` - Multiline layout modifier
- `.button__label` - Label element
- `.button__labelTop` - Top label in multiline mode
- `.button__content` - Content wrapper for multiline layout

### Design Tokens
The component uses design tokens from the PopShelf design system:
- Colors: `$purple-primary`, `$purple-dark`, `$white`, etc.
- Spacing: `$spacing-3`, `$spacing-6`
- Typography: Uses typography mixins
- Transitions: `$transition-fast`

## Accessibility

- Keyboard accessible with proper focus states
- ARIA labels for screen readers
- Disabled state handling
- Focus visible indicators
- Proper button semantics

## Testing

The component includes comprehensive tests covering:
- All variant rendering
- Click event handling
- Disabled state behavior
- Multiline functionality
- Accessibility attributes
- Edge cases

Run tests with:
```bash
npm run test Button.test.tsx
```

## Examples

### Call to Action
```tsx
<Button 
  variant="primary"
  onClick={handleShopNow}
>
  Shop Now
</Button>
```

### Form Actions
```tsx
<div className="form-actions">
  <Button 
    variant="secondary" 
    onClick={handleCancel}
  >
    Cancel
  </Button>
  <Button 
    type="submit"
    onClick={handleSave}
  >
    Save Changes
  </Button>
</div>
```

### Product Actions
```tsx
<Button 
  multiline
  variant="primary"
  labelTop="Add to Cart"
  label="$9.99"
  onClick={() => addToCart(productId)}
/>
```

### Navigation
```tsx
<Button 
  variant="tertiary"
  onClick={() => navigate('/products')}
>
  View all products →
</Button>
```