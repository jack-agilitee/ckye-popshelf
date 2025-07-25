# TextField Component

## Overview
The TextField component is an atom-level component that provides a styled text input with label support. It features two visual states (entry/data) based on whether the field has content, and supports all standard HTML input attributes.

## Figma Reference
- **URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=64-839&m=dev
- **Node ID**: 64:839

## Usage

```tsx
import TextField from '@/components/atoms/TextField/TextField';

// Basic usage
<TextField
  id="name"
  label="Name"
  placeholder="Enter your name"
  value={name}
  onChange={setName}
/>

// With error state
<TextField
  id="email"
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  required
  error={!isValidEmail}
  errorMessage="Please enter a valid email address"
/>

// Uncontrolled component
<TextField
  id="notes"
  label="Notes"
  defaultValue="Initial notes"
  onChange={(value) => console.log('Changed:', value)}
/>

// With all features
<TextField
  id="password"
  label="Password"
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={setPassword}
  required
  autoComplete="current-password"
  maxLength={20}
  error={passwordError}
  errorMessage="Password must be at least 8 characters"
  onFocus={() => setShowPasswordHint(true)}
  onBlur={() => setShowPasswordHint(false)}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | ✓ | Unique identifier for the input |
| `name` | `string` | - | - | Name attribute for form submission |
| `label` | `string` | - | - | Label text above the input |
| `placeholder` | `string` | `''` | - | Placeholder text |
| `value` | `string` | - | - | Controlled component value |
| `defaultValue` | `string` | - | - | Default value for uncontrolled component |
| `onChange` | `(value: string) => void` | - | - | Change handler |
| `onFocus` | `(event: FocusEvent) => void` | - | - | Focus handler |
| `onBlur` | `(event: FocusEvent) => void` | - | - | Blur handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | - | - | Keydown handler |
| `disabled` | `boolean` | `false` | - | Disabled state |
| `readOnly` | `boolean` | `false` | - | Read-only state |
| `required` | `boolean` | `false` | - | Required field indicator |
| `error` | `boolean` | `false` | - | Error state |
| `errorMessage` | `string` | - | - | Error message to display |
| `type` | `'text' \| 'email' \| 'password' \| 'tel' \| 'url' \| 'search'` | `'text'` | - | Input type |
| `maxLength` | `number` | - | - | Maximum character length |
| `autoComplete` | `string` | - | - | Autocomplete hint |
| `autoFocus` | `boolean` | `false` | - | Auto-focus on mount |
| `className` | `string` | - | - | Additional CSS class |
| `aria-label` | `string` | - | - | Custom aria-label |
| `aria-describedby` | `string` | - | - | ID of element that describes input |

## States

### Visual States
- **Entry State**: Empty field with regular font weight (#757575 text color)
- **Data State**: Field with content using medium font weight (#000000 text color)

### Interactive States
- **Default**: Gray border (#E3E3E3)
- **Hover**: Purple border
- **Focus**: Purple border with additional focus ring
- **Disabled**: Grayed out with reduced opacity
- **Error**: Red border with error message below

## Accessibility
- Proper label association with `htmlFor` and `id`
- ARIA attributes: `aria-label`, `aria-describedby`, `aria-invalid`, `aria-required`
- Keyboard accessible
- Error messages announced with `role="alert"`
- Required fields marked with asterisk and `aria-required`

## Styling
The component uses design system variables exclusively:
- Border color: `$gray-300` (#E3E3E3 from Figma)
- Background: `$white` (#FFFFFF)
- Label color: `$gray-700` (#636363 from Figma)
- Placeholder/empty state: `$gray-600` (#757575 from Figma)
- Filled state: `$black` (#000000)
- Shadow: `$shadow-text-field` (0px 4px 16px 0px rgba(55,58,64,0.15))
- Font sizes: 16px for label, 18px for input
- Line heights: 20px for label, 24px for input

## Examples

### Form Example
```tsx
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  return (
    <form>
      <TextField
        id="contact-name"
        label="Name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        required
        error={errors.name}
        errorMessage="Name is required"
      />
      
      <TextField
        id="contact-email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        required
        error={errors.email}
        errorMessage="Please enter a valid email"
      />
    </form>
  );
};
```

### Search Field Example
```tsx
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <TextField
      id="search"
      type="search"
      placeholder="Search products..."
      value={searchQuery}
      onChange={setSearchQuery}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          performSearch(searchQuery);
        }
      }}
      aria-label="Search products"
    />
  );
};
```

### Password Field with Validation
```tsx
const PasswordField = () => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  
  const validatePassword = (value: string) => {
    setPassword(value);
    setShowError(value.length > 0 && value.length < 8);
  };
  
  return (
    <TextField
      id="password"
      label="Password"
      type="password"
      placeholder="Min 8 characters"
      value={password}
      onChange={validatePassword}
      error={showError}
      errorMessage="Password must be at least 8 characters"
      autoComplete="new-password"
    />
  );
};
```

## Testing
The component includes comprehensive tests covering:
- Rendering with various props
- State transitions (entry/data)
- User interactions (typing, focus, blur)
- Controlled and uncontrolled behavior
- Error states
- Accessibility features
- All input types
- Edge cases

Run tests with: `npm run test TextField.test.tsx`