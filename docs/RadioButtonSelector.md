# RadioButtonSelector Component

## Overview
The RadioButtonSelector component is an atom-level component that provides an enhanced radio button with additional features like pricing display, status indicators, and visual feedback. It follows standard radio button behavior for single selection within a group.

## Figma Reference
- **URL**: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=60-876&m=dev
- **Node ID**: 60:876

## Usage

```tsx
import RadioButtonSelector from '@/components/atoms/RadioButtonSelector/RadioButtonSelector';

// Basic usage in a radio group
const [selectedValue, setSelectedValue] = useState('option1');

<RadioButtonSelector
  id="option1"
  name="options"
  value="option1"
  label="Option 1"
  checked={selectedValue === 'option1'}
  onChange={setSelectedValue}
/>

// With check indicator when selected
<RadioButtonSelector
  id="premium"
  name="subscription"
  value="premium"
  label="Premium Plan"
  checked={selectedValue === 'premium'}
  onChange={setSelectedValue}
  rightContent="check"
/>

// With price display
<RadioButtonSelector
  id="basic"
  name="subscription"
  value="basic"
  label="Basic Plan"
  checked={selectedValue === 'basic'}
  onChange={setSelectedValue}
  rightContent="price"
  price="$9.99"
/>

// Disabled with status
<RadioButtonSelector
  id="unavailable"
  name="options"
  value="unavailable"
  label="Out of Stock Item"
  disabled
  rightContent="status"
  statusText="Currently unavailable"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | ✓ | Unique identifier for the radio button |
| `name` | `string` | - | ✓ | Name attribute for radio group |
| `value` | `string` | - | ✓ | Value of the radio button |
| `label` | `string` | - | ✓ | Display label for the option |
| `checked` | `boolean` | `false` | - | Whether the radio is selected |
| `disabled` | `boolean` | `false` | - | Whether the radio is disabled |
| `onChange` | `(value: string) => void` | - | - | Callback when selection changes |
| `rightContent` | `'check' \| 'price' \| 'status'` | - | - | Type of content to show on right |
| `price` | `string` | - | - | Price to display (when rightContent='price') |
| `statusText` | `string` | `'unavailable'` | - | Status text (when rightContent='status') |
| `className` | `string` | - | - | Additional CSS class |
| `aria-label` | `string` | - | - | Custom aria-label (defaults to label) |
| `aria-describedby` | `string` | - | - | ID of element that describes the radio |

## States

### Visual States
- **Default**: Unselected radio button
- **Selected**: Radio button with filled center dot
- **Disabled**: Grayed out with strike-through indicator
- **Selected with check**: Selected state showing green checkmark on right

### Interactions
- Click anywhere on the component to select
- Keyboard accessible with Tab navigation
- Space key to select when focused
- Proper focus indicators for accessibility

## Accessibility
- Full ARIA support with role="radio"
- Proper aria-checked and aria-disabled states
- Keyboard navigation support
- Label properly associated with input
- Focus management for disabled state

## Styling
The component uses design system variables exclusively:
- Colors: `$purple-primary`, `$black`, `$gray-600`, `$white`
- Spacing: `$spacing-3`, `$spacing-4`, `$spacing-5`, `$spacing-6`
- Typography: `$font-size-base`, `$font-size-xs`, `$font-weight-medium`, `$font-weight-semibold`
- Shadow: `$shadow-radio-selector` (custom shadow from Figma)

## Examples

### Radio Group Implementation
```tsx
const SubscriptionSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const plans = [
    { id: 'basic', value: 'basic', label: 'Basic Plan', price: '$9.99' },
    { id: 'premium', value: 'premium', label: 'Premium Plan', price: '$19.99' },
    { id: 'enterprise', value: 'enterprise', label: 'Enterprise', price: 'Contact Us' }
  ];

  return (
    <div role="radiogroup" aria-label="Subscription plans">
      {plans.map(plan => (
        <RadioButtonSelector
          key={plan.id}
          id={plan.id}
          name="subscription"
          value={plan.value}
          label={plan.label}
          checked={selectedPlan === plan.value}
          onChange={setSelectedPlan}
          rightContent="price"
          price={plan.price}
        />
      ))}
    </div>
  );
};
```

### Form with Availability Status
```tsx
const ProductOptions = ({ options }) => {
  const [selected, setSelected] = useState(null);

  return (
    <fieldset>
      <legend>Select Size</legend>
      {options.map(option => (
        <RadioButtonSelector
          key={option.id}
          id={`size-${option.id}`}
          name="size"
          value={option.value}
          label={option.label}
          checked={selected === option.value}
          onChange={setSelected}
          disabled={!option.available}
          rightContent={!option.available ? 'status' : undefined}
          statusText={!option.available ? 'Out of stock' : undefined}
        />
      ))}
    </fieldset>
  );
};
```

### With Visual Feedback
```tsx
const FeatureSelector = () => {
  const [selectedFeatures, setSelectedFeatures] = useState(['feature1']);

  return (
    <div>
      {features.map(feature => (
        <RadioButtonSelector
          key={feature.id}
          id={feature.id}
          name="features"
          value={feature.value}
          label={feature.label}
          checked={selectedFeatures.includes(feature.value)}
          onChange={(value) => setSelectedFeatures([value])}
          rightContent="check"
        />
      ))}
    </div>
  );
};
```

## Testing
The component includes comprehensive tests covering:
- Rendering in all states
- User interactions
- Keyboard navigation
- Accessibility features
- Prop variations
- Edge cases

Run tests with: `npm run test RadioButtonSelector.test.tsx`