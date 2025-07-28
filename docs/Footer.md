# Footer Component

A responsive footer template component that provides site navigation, social media links, and copyright information. Features distinct mobile and desktop layouts.

## Figma Reference
- Desktop URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=873-346&m=dev
- Mobile URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=23-361&m=dev
- Desktop Node ID: 873:346
- Mobile Node ID: 23:361

## Usage

```tsx
import Footer from '@/components/templates/Footer/Footer';

function App() {
  return (
    <div className="app">
      <main>
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS class for styling |

## Features

- **Responsive Design**: Automatically adapts between mobile and desktop layouts
- **Social Media Links**: Facebook, Instagram, Pinterest, and TikTok icons
- **Dynamic Copyright**: Automatically displays current year
- **Accessibility**: Full keyboard navigation and screen reader support
- **Two-Column Desktop Layout**: Organized navigation links in two columns
- **Single-Column Mobile Layout**: Centered navigation for mobile devices

## Design Specifications

### Layout
- Desktop width: 1440px max container
- Desktop height: 324px (excluding copyright bar)
- Copyright bar height: 84px
- Background: Purple primary (#87189D)
- Copyright bar background: Black (#000000)

### Typography
- Desktop links: Sofia Pro Semi Bold, 16px
- Desktop copyright: Avenir Heavy, 13px
- Mobile: Sofia Pro Semi Bold, 16px
- Letter spacing: 0.5667px

### Sections
1. **Brand Section**: Logo and social media icons
2. **Navigation Links**: Two columns on desktop, single column on mobile
3. **Copyright Bar**: Black bar with copyright text

### Icons
- Logo: `/logos/logo_white.svg`
- Social Media: `/social-media.svg` (placeholder for all social icons)

## Responsive Behavior

- **Mobile (<768px)**:
  - Centered logo and social icons
  - Single column navigation
  - Centered copyright text
  - 6.4% horizontal padding
  
- **Desktop (≥768px)**:
  - Left-aligned logo and social icons
  - Two-column navigation layout
  - Left-aligned copyright text
  - Max width container of 1440px

## Example Implementations

### With Custom Styling

```tsx
function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="content">
        {/* Page content */}
      </main>
      <Footer className="app-footer" />
    </div>
  );
}
```

### In Next.js Layout

```tsx
// app/layout.tsx
import Footer from '@/components/templates/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### With Sticky Footer

```tsx
function StickyFooterLayout() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Content */}
      </main>
      <Footer />
    </div>
  );
}
```

## Navigation Links

### Desktop Layout (2 columns)

**Column 1:**
- About popshelf®
- Careers
- Help
- News
- Gift Cards
- Locations
- Stores
- California Privacy Rights

**Column 2:**
- Vendors
- track You Order
- Terms & Conditions
- SDS/Ingredient Information
- Your Privacy Choices
- CA Privacy Notice for Employees, Applicants & Contractors
- Privacy Policy
- Cookie Preferences

### Mobile Layout (single column)
- About pOpshelf®
- Careers
- Help
- News
- Gift Cards
- Track Your Order
- Terms & Conditions
- SDS/Ingredient Information
- Do Not Sell My Info
- CA Privacy Rights
- Privacy Policy

## Styling

The component uses SCSS modules with BEM methodology. Key features:
- Uses design system variables for consistent theming
- Smooth hover transitions on interactive elements
- Focus states with white outline for accessibility
- Responsive breakpoints for mobile/desktop layouts

### CSS Classes
- `.footer` - Main container
- `.footer__main` - Main content area (purple background)
- `.footer__container` - Inner wrapper with max-width
- `.footer__brand` - Logo and social media section
- `.footer__logo` - Logo link wrapper
- `.footer__social` - Social media icons container
- `.footer__desktopNav` - Desktop navigation (2 columns)
- `.footer__mobileNav` - Mobile navigation (single column)
- `.footer__column` - Individual column in desktop layout
- `.footer__link` - Navigation link styling
- `.footer__copyright` - Copyright bar (black background)
- `.footer__copyrightText` - Copyright text

## Accessibility

- Semantic HTML with `<footer>` element
- Proper navigation landmarks with `aria-label`
- Descriptive labels for social media links
- Keyboard navigation support
- Focus indicators for all interactive elements
- Decorative images hidden from screen readers

## Testing

The component includes comprehensive tests covering:
- Rendering of all elements
- Responsive layout behavior
- Navigation functionality
- Accessibility features
- Dynamic copyright year
- Link destinations

Run tests with:
```bash
npm test Footer.test.tsx
```

## Notes

- All links currently navigate to homepage (`/`) as a temporary implementation
- Social media icons use a placeholder SVG - replace with actual icon assets
- The component automatically displays the current year in the copyright text
- Different link sets are shown for mobile vs desktop to optimize for each layout