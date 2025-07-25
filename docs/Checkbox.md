# Checkbox Component

A customizable checkbox component with label, checked/unchecked states, and disabled state support.

## Figma Reference

- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=102-881&m=dev
- Node ID: 102:881

## Usage

```tsx
import Checkbox from '@/components/atoms/Checkbox/Checkbox';

// Basic usage
<Checkbox
  label="Accept terms and conditions"
  onChange={(checked) => console.log('Checked:', checked)}
/>

// Controlled component
const [isChecked, setIsChecked] = useState(false);

<Checkbox
  label="Subscribe to newsletter"
  checked={isChecked}
  onChange={setIsChecked}
/>

// Disabled state
<Checkbox
  label="This option is unavailable"
  disabled
/>

// With custom ID and name for forms
<Checkbox
  id="terms-checkbox"
  name="terms"
  label="I agree to the terms of service"
  checked={formData.acceptTerms}
  onChange={(checked) => updateFormData({ acceptTerms: checked })}
/>

// With accessibility attributes
<Checkbox
  label="Enable notifications"
  ariaLabel="Enable email notifications"
  ariaDescribedBy="notification-help-text"
  onChange={handleNotificationToggle}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | The text label displayed next to the checkbox |
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `onChange` | `(checked: boolean) => void` | - | Callback function called when checkbox state changes |
| `className` | `string` | - | Additional CSS class names |
| `id` | `string` | - | HTML id attribute (auto-generated if not provided) |
| `name` | `string` | - | HTML name attribute for form submission |
| `ariaLabel` | `string` | - | Accessible label for screen readers |
| `ariaDescribedBy` | `string` | - | ID of element that describes the checkbox |

## Design Specifications

- **Checkbox Box**:
  - Size: 20x20px
  - Border radius: 4px
  - Unchecked: White background with #757575 border (1px)
  - Checked: #9230A8 background with #979797 border (1px)
  - Disabled unchecked: #F5F5F5 background with #BDBDBD border
  - Disabled checked: #BDBDBD background and border

- **Checkmark**:
  - White SVG path
  - 12x10px size
  - 2px stroke width
  - Rounded line caps and joins

- **Label**:
  - Uses body-medium typography mixin
  - Primary text color (#212121)
  - Disabled text color (#9E9E9E)
  - 12px gap between checkbox and label

- **States**:
  - Hover: Darker borders and background
  - Focus: 2px purple outline with 2px offset
  - Disabled: Reduced opacity and muted colors

## Accessibility

- Fully keyboard accessible (Space key to toggle)
- Proper ARIA attributes (aria-checked, aria-disabled)
- Focus indicators for keyboard navigation
- Screen reader friendly with customizable aria-label
- Associated label element for better accessibility

## Component Details

The Checkbox component is a controlled component that:
- Uses a hidden native checkbox input for form compatibility
- Provides custom styling while maintaining accessibility
- Supports keyboard navigation with Space key
- Includes hover and focus states
- Works with React forms and form libraries

## Testing

Run tests with:

```bash
npm run test -- Checkbox.test.tsx
```

Test coverage includes:
- Rendering with different states
- Click and keyboard interactions
- onChange callback functionality
- Disabled state behavior
- Accessibility attributes
- Custom props (id, name, className)

## Examples

### Form Integration

```tsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    acceptTerms: false,
    subscribeNewsletter: false,
    enableNotifications: true
  });

  const handleCheckboxChange = (field: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox
        name="terms"
        label="I accept the terms and conditions"
        checked={formData.acceptTerms}
        onChange={handleCheckboxChange('acceptTerms')}
      />
      
      <Checkbox
        name="newsletter"
        label="Subscribe to our newsletter"
        checked={formData.subscribeNewsletter}
        onChange={handleCheckboxChange('subscribeNewsletter')}
      />
      
      <Checkbox
        name="notifications"
        label="Enable push notifications"
        checked={formData.enableNotifications}
        onChange={handleCheckboxChange('enableNotifications')}
      />
      
      <button type="submit">Register</button>
    </form>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="settings-panel">
      <h2>Privacy Settings</h2>
      
      <Checkbox
        label="Allow analytics tracking"
        checked={settings.allowAnalytics}
        onChange={(checked) => updateSetting('allowAnalytics', checked)}
      />
      
      <Checkbox
        label="Share usage data"
        checked={settings.shareData}
        onChange={(checked) => updateSetting('shareData', checked)}
        disabled={!settings.allowAnalytics}
      />
      
      <Checkbox
        label="Personalized recommendations"
        checked={settings.personalizedAds}
        onChange={(checked) => updateSetting('personalizedAds', checked)}
      />
    </div>
  );
}
```

### Multi-Select List

```tsx
function MultiSelectList({ items, onSelectionChange }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const handleToggle = (id: string) => (checked: boolean) => {
    const newSelection = checked 
      ? [...selectedIds, id]
      : selectedIds.filter(selectedId => selectedId !== id);
    
    setSelectedIds(newSelection);
    onSelectionChange(newSelection);
  };
  
  return (
    <div className="multi-select-list">
      {items.map(item => (
        <Checkbox
          key={item.id}
          label={item.name}
          checked={selectedIds.includes(item.id)}
          onChange={handleToggle(item.id)}
          disabled={item.disabled}
        />
      ))}
    </div>
  );
}
```