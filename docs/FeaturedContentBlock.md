# FeaturedContentBlock Component

A responsive featured content block component that displays an image with an overlaid content card. Features distinct mobile and desktop layouts with decorative elements.

## Figma Reference
- Desktop URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=529-1907&m=dev
- Mobile URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=664-8161&m=dev
- Desktop Node ID: 529:1907
- Mobile Node ID: 664:8161

## Usage

```tsx
import FeaturedContentBlock from '@/components/molecules/FeaturedContentBlock/FeaturedContentBlock';

function HomePage() {
  const handleFeatureClick = () => {
    router.push('/featured-products');
  };

  return (
    <FeaturedContentBlock
      title="New Arrivals"
      description="Check out our latest collection"
      desktopImage="/content/content-shoe.png"
      mobileImage="/content/content-bath.jpg"
      onClick={handleFeatureClick}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The title text displayed in the content card |
| `description` | `string` | Yes | The description text displayed below the title |
| `desktopImage` | `string` | Yes | Path to the desktop background image |
| `mobileImage` | `string` | Yes | Path to the mobile background image |
| `onClick` | `() => void` | No | Callback function when the card is clicked |
| `className` | `string` | No | Additional CSS class for styling |

## Features

- **Responsive Design**: Automatically adapts between mobile and desktop layouts
- **Click Interaction**: Entire content card is clickable with hover and active states
- **Keyboard Accessible**: Full keyboard navigation support (Enter/Space keys)
- **Decorative Elements**: Includes decorative bubble graphics
- **Image Optimization**: Uses picture element for responsive images
- **Smooth Transitions**: Hover effects with subtle animations

## Design Specifications

### Desktop Layout
- Container: 620px × 360px
- Content card: 220px wide, positioned absolutely
- Title: Avenir Heavy, 24px, color #262525
- Description: Avenir Medium, 16px, color #262525
- Card shadow: 12px 12px 24px 0px #E6E6E6
- Border radius: 16px for image, 8px for card

### Mobile Layout
- Full width with 16px horizontal padding
- Image height: 240px
- Content card overlaps image with negative margin
- Title: Sofia Pro Semi Bold, 16px, color #1F1F1F
- Description: Sofia Pro Regular, 14px, color #262525
- Card shadow: 0px 3px 10px 0px rgba(55,58,64,0.15)

## Example Implementations

### Basic Usage

```tsx
<FeaturedContentBlock
  title="Summer Collection"
  description="Discover vibrant styles for the season"
  desktopImage="/images/summer-desktop.jpg"
  mobileImage="/images/summer-mobile.jpg"
  onClick={() => console.log('Navigate to summer collection')}
/>
```

### With Router Navigation

```tsx
import { useRouter } from 'next/navigation';

function FeaturedSection() {
  const router = useRouter();

  return (
    <FeaturedContentBlock
      title="bath & beauty essentials"
      description="Add style to everyday bath & beauty supplies."
      desktopImage="/content/bath-desktop.png"
      mobileImage="/content/bath-mobile.jpg"
      onClick={() => router.push('/category/bath-beauty')}
    />
  );
}
```

### Multiple Features Grid

```tsx
function FeaturedGrid() {
  const features = [
    {
      title: "New Arrivals",
      description: "Fresh styles just in",
      desktop: "/content/new-desktop.jpg",
      mobile: "/content/new-mobile.jpg",
      link: "/new-arrivals"
    },
    {
      title: "Best Sellers",
      description: "Customer favorites",
      desktop: "/content/best-desktop.jpg",
      mobile: "/content/best-mobile.jpg",
      link: "/best-sellers"
    }
  ];

  return (
    <div className="featured-grid">
      {features.map((feature, index) => (
        <FeaturedContentBlock
          key={index}
          title={feature.title}
          description={feature.description}
          desktopImage={feature.desktop}
          mobileImage={feature.mobile}
          onClick={() => router.push(feature.link)}
        />
      ))}
    </div>
  );
}
```

### With Analytics Tracking

```tsx
function TrackedFeature() {
  const handleClick = () => {
    // Track analytics event
    analytics.track('Featured Content Clicked', {
      title: 'Holiday Specials',
      category: 'seasonal'
    });
    
    // Navigate
    router.push('/holiday-specials');
  };

  return (
    <FeaturedContentBlock
      title="Holiday Specials"
      description="Limited time offers"
      desktopImage="/content/holiday-desktop.jpg"
      mobileImage="/content/holiday-mobile.jpg"
      onClick={handleClick}
    />
  );
}
```

## Styling

The component uses SCSS modules with BEM methodology. Key features:
- Uses design system variables for consistent theming
- Responsive breakpoint at 768px
- Smooth hover transitions and active states
- Focus states with purple outline for accessibility

### CSS Classes
- `.featuredContentBlock` - Main container
- `.featuredContentBlock__decoration` - Desktop decorative element
- `.featuredContentBlock__imageContainer` - Image wrapper
- `.featuredContentBlock__image` - Background image
- `.featuredContentBlock__card` - Clickable content card
- `.featuredContentBlock__title` - Title text
- `.featuredContentBlock__description` - Description text
- `.featuredContentBlock__arrow` - Arrow icon container
- `.featuredContentBlock__mobileDecoration` - Mobile decorative element

## Accessibility

- Semantic HTML with proper role attributes
- Keyboard navigation support (Enter and Space keys)
- Descriptive aria-label including title and description
- Focus indicators for keyboard users
- Decorative images hidden from screen readers
- Proper heading hierarchy with h3 for title

## Assets Required

- `/arrow.svg` - Arrow icon for the card
- `/content/two-bubbles.svg` - Decorative bubble graphics
- Desktop and mobile images as specified in props

## Testing

The component includes comprehensive tests covering:
- Rendering of all elements
- Click and keyboard interactions
- Responsive image behavior
- Accessibility features
- Edge cases with long text
- Prop validation

Run tests with:
```bash
npm test FeaturedContentBlock.test.tsx
```

## Notes

- The entire content card is clickable, not just the arrow
- Desktop layout uses absolute positioning for the card overlay
- Mobile layout uses negative margin for the overlap effect
- Images should be optimized for web delivery
- Consider lazy loading for below-the-fold instances