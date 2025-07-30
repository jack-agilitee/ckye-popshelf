# ArticleCard Component

## Overview
The ArticleCard component is a molecule-level component that displays an article with an image, title, subtitle, and navigation arrow. It's designed based on the Figma design and follows the PopShelf design system.

## Figma Reference
- URL: https://www.figma.com/design/ri9qaHxsKZS00ViWhwguiP/%F0%9F%93%8C-PS-Components?node-id=5-150&m=dev
- Node ID: 5:150

## Usage

```tsx
import ArticleCard from '@/components/molecules/ArticleCard/ArticleCard';

// Basic usage
<ArticleCard
  title="galaxy Glitter Art"
  subtitle="Out of this world creations"
  imageUrl="/images/article1.jpg"
  imageAlt="Galaxy glitter art supplies"
/>

// With click handler
<ArticleCard
  title="DIY Home Decor"
  subtitle="Transform your space on a budget"
  imageUrl="/images/article2.jpg"
  imageAlt="Home decor items"
  onClick={() => console.log('Article clicked')}
/>

// With custom className
<ArticleCard
  title="Seasonal Crafts"
  subtitle="Projects for every season"
  imageUrl="/images/article3.jpg"
  className="my-custom-card"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | The main title of the article |
| `subtitle` | `string` | Yes | - | The subtitle or description |
| `imageUrl` | `string` | Yes | - | URL for the article's background image |
| `imageAlt` | `string` | No | `''` | Alt text for the image (for accessibility) |
| `onClick` | `() => void` | No | - | Callback function when card is clicked |
| `className` | `string` | No | - | Additional CSS classes to apply |

## Features

### Accessibility
- Keyboard navigation support (Enter and Space keys trigger onClick)
- Proper ARIA labels and roles
- Focus indicators
- Screen reader friendly

### Responsive Design
- Flexible width (100% of container)
- Maintains aspect ratio
- Text truncation with ellipsis for long content

### Interactive States
- Hover: Card elevates with shadow and arrow slides
- Focus: Visible outline for keyboard navigation
- Active: Slight scale animation

## Design System Integration

The component uses the following design system tokens:

### Colors
- Background: `$white`
- Title: `$black`
- Subtitle: `$gray-600`
- Shadow: `$shadow-text-field`

### Spacing
- Content padding: `$spacing-4` (16px)
- Text gap: `$spacing-1` (4px)
- Content/arrow gap: `$spacing-2` (8px)

### Typography
- Title: `@include avenir-heavy` (16px, Heavy weight)
- Subtitle: `@include article-card-subtitle` (14px, Medium weight)

### Dimensions
- Border radius: `$radius-md` (8px)
- Content height: `$article-card-content-height` (72px)
- Arrow size: `$article-card-arrow-size` (24px)

## Examples

### Article Grid
```tsx
const articles = [
  {
    id: 1,
    title: "galaxy Glitter Art",
    subtitle: "Out of this world creations",
    imageUrl: "/images/galaxy-art.jpg",
    slug: "galaxy-glitter-art"
  },
  // ... more articles
];

<div className="article-grid">
  {articles.map(article => (
    <ArticleCard
      key={article.id}
      title={article.title}
      subtitle={article.subtitle}
      imageUrl={article.imageUrl}
      onClick={() => router.push(`/articles/${article.slug}`)}
    />
  ))}
</div>
```

### With Loading State
```tsx
const ArticleCardSkeleton = () => (
  <ArticleCard
    title=""
    subtitle=""
    imageUrl="/images/placeholder.jpg"
    className="article-card--loading"
  />
);
```

## Testing

The component includes comprehensive tests covering:
- Rendering with all prop combinations
- Click and keyboard event handling
- Accessibility attributes
- Custom className application
- Edge cases with long text

To run tests:
```bash
npm run test ArticleCard.test.tsx
```

## Best Practices

1. **Image Optimization**: Use Next.js Image optimization for production images
2. **Alt Text**: Always provide meaningful `imageAlt` for accessibility
3. **Click Handlers**: Ensure onClick handlers are performant and don't block UI
4. **Container Sizing**: The card takes full width of its container, so control sizing at the parent level

## Related Components
- `Button` (atoms) - For standalone action buttons
- `ProductCard` (molecules) - Similar card pattern for products
- `FeaturedContentBlock` (organisms) - Larger content blocks