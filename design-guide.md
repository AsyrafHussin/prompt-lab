# NOCTA Portfolio - Design System Guide

## Overview
This design guide captures the look and feel of the NOCTA portfolio website - a minimalist, professional portfolio design that prioritizes clarity, credibility, and modern aesthetics.

---

## 1. Core Design Principles

### Visual Philosophy
- **Minimalist & Professional**: Clean layouts with purposeful whitespace
- **Clarity Over Complexity**: Information hierarchy through typography
- **Modern & Refined**: Subtle effects and smooth transitions
- **Accessibility First**: Proper focus states and semantic HTML

---

## 2. Color System

### Color Palette
```css
/* Base Colors */
--color-card: neutral base (with transparency support)
--color-foreground: primary text color
--color-background: page background
--color-border: subtle borders

/* Opacity Variations */
foreground/70: Secondary text (70% opacity)
bg-card/75: Translucent cards (75% opacity)
border/80: Subtle borders (80% opacity)

/* Dark Mode */
Automatic dark mode support with CSS custom properties
```

### Color Mixing Technique
Uses modern `color-mix()` in OKLAB color space for sophisticated transparency:
```css
background-color: color-mix(in oklab, var(--color-card) 75%, transparent);
border-color: color-mix(in oklab, var(--color-border) 100%, transparent);
```

---

## 3. Typography

### Font Hierarchy
```css
/* Sizes */
text-xs: 0.75rem (12px) - Navigation, footer, labels
text-sm: 0.875rem (14px) - Body text, buttons
text-base: 1rem (16px) - Primary content
/* Headings scale appropriately */

/* Weights */
font-medium: 500 - Buttons, emphasis
font-normal: 400 - Body text
```

### Text Colors
- Primary: `text-foreground`
- Secondary: `text-foreground/70`
- Hover state: Transition from 70% to 100% opacity

---

## 4. Layout System

### Container Widths
```css
w-264: Custom width for navigation (approx 66rem)
max-w-5xl: Content container (80rem / 1280px)
```

### Spacing System
- Consistent gap values: `gap-1`, `gap-1.5`, `gap-2`
- Padding: `px-2`, `px-4`, `py-1.5`, `py-4`
- Margins: Auto-centering with `mx-auto`

### Responsive Breakpoints
- Mobile-first approach
- `md:` Medium screens and up
- `lg:` Large screens and up

---

## 5. Component Patterns

### Navigation Bar
```html
Key Features:
- Fixed positioning (top-2)
- Centered with max-width constraint
- Backdrop blur (16px)
- Translucent background (75% opacity)
- Smooth shadow transitions
- Responsive: Compact on mobile, expanded on desktop

States:
- Default: Blur + translucent
- Mobile: Full background
- Desktop: Transparent background option
```

### Buttons
```css
Base Properties:
- height: 32px (h-8)
- Rounded corners (rounded-md)
- Inline-flex alignment
- Icon sizing: 16px (size-4)
- Gap between icon/text: 6px (gap-1.5)

Variants:
1. Ghost: transparent bg, foreground/70 text
2. Primary: (context-dependent)

Transitions:
- Duration: 100ms
- Easing: ease-out-quad
- Properties: background, color, box-shadow, filter
```

### Focus States
```css
focus-visible:ring-1
focus-visible:ring-ring/50
focus-visible:ring-offset-1
focus-visible:ring-offset-ring-offset/50
focus-visible:outline-none
```

### Cards & Sections
```css
Features:
- Rounded corners (rounded-lg)
- Border with subtle color
- Optional backdrop blur
- Card highlights for depth
- Shadow variations
```

---

## 6. Visual Effects

### Backdrop Blur
```css
backdrop-filter: blur(16px)
```
Applied to navigation and translucent elements

### Transitions
```css
/* Standard transition */
transition-[background-color,color,box-shadow,filter]
ease-out-quad
duration-100 (100ms)

/* Navigation transitions */
duration-350 (350ms)
ease-navbar
```

### Hover States
- Text: `foreground/70` → `foreground`
- Background: `transparent` → `transparent` (with color shift)
- Smooth color transitions

---

## 7. Iconography

### Icon Sizing
- Small: `size-4` (16px) - Standard icons
- Medium: `size-6` (24px) - Social icons
- Large: `size-8` (32px) - Feature icons

### SVG Properties
```css
[&_svg]:pointer-events-none
[&_svg]:shrink-0
fill="currentColor" (inherits text color)
```

### Theme Toggle Icon
- Sun/moon icon with rotation transition
- Smooth transform on theme change

---

## 8. Grid Systems

### Service Cards
```html
Grid pattern (typically):
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- gap-4 or gap-6 between items
```

### Project Showcase
```html
Features:
- Image thumbnails
- Card-based layout
- Hover effects on images
- Optional blur-up loading
```

---

## 9. Footer Design

### Structure
```html
Elements:
1. Multi-column layout (logo + navigation columns)
2. Social media icons
3. Copyright bar (border-top separator)
4. Responsive: Stack on mobile, row on desktop

Styling:
- Small text (text-xs)
- Secondary text color (foreground/70)
- Subtle borders (border/80)
```

---

## 10. Accessibility Features

### Focus Management
- Visible focus rings
- Keyboard navigation support
- ARIA labels on interactive elements
- Role attributes (menubar, menuitem)

### Semantic HTML
- Proper nav/main/footer structure
- Descriptive link text
- Icon titles for screen readers

---

## 11. Animation Principles

### Timing
- Fast interactions: 100ms (buttons, hovers)
- Medium transitions: 350ms (navigation)
- Slow reveals: 500ms+ (page loads)

### Easing
- `ease-out-quad`: Smooth deceleration
- Natural, not robotic motion

---

## 12. Key Design Patterns

### Glass Morphism Effect
```css
background: translucent color (75%)
backdrop-filter: blur(16px)
border: subtle with transparency
shadow: soft, layered
```

### Micro-interactions
- Button hover states
- Focus indicators
- Theme toggle animation
- Scroll-triggered animations

### Content Sections
1. **Hero**: Large headline + CTA buttons
2. **Services**: Grid of service cards with icons
3. **Works**: Project showcase with filtering
4. **Testimonials**: Carousel with avatars
5. **FAQ**: Accordion-style questions
6. **Contact**: Form with validation

---

## 13. Technical Implementation

### CSS Framework
Utility-first approach (Tailwind CSS or similar)

### Custom Properties
Theming through CSS variables:
```css
--color-card
--color-foreground
--color-background
--color-border
--highlight-opacity
```

### Color Space
OKLAB for perceptually uniform color mixing

---

## 14. Mobile Optimization

### Responsive Strategy
- Mobile-first CSS
- Touch-friendly targets (min 44x44px)
- Simplified navigation on mobile
- Full-width on small screens
- Constrained width on desktop

### Performance
- Optimized images
- Lazy loading
- Minimal JavaScript
- CSS-based animations

---

## 15. Design Checklist

When implementing this design style:

✓ Use translucent backgrounds with backdrop blur
✓ Implement smooth, subtle transitions (100-350ms)
✓ Apply proper focus states for accessibility
✓ Use foreground/70 for secondary text
✓ Maintain consistent spacing system
✓ Include dark mode support
✓ Add micro-interactions on hover
✓ Use OKLAB color mixing for transparency
✓ Implement responsive breakpoints
✓ Keep icons at consistent sizes (16px, 24px)
✓ Use rounded corners (md: 6px, lg: 8px)
✓ Apply subtle shadows for depth
✓ Ensure mobile-first responsive design

---

## Example Component Code Patterns

### Navigation Component
```html
<nav class="fixed top-2 inset-x-0 z-50 flex justify-center px-2 md:px-4">
  <div class="relative flex w-full max-w-screen-lg items-center justify-between
              rounded-lg py-1.5 px-4
              bg-card/75 border border-border
              backdrop-blur-md shadow-lg
              transition-shadow duration-350">
    <!-- Logo -->
    <!-- Nav Links -->
    <!-- Theme Toggle -->
  </div>
</nav>
```

### Button Component
```html
<button class="inline-flex items-center justify-center
               rounded-md h-8 px-3 gap-1.5
               text-sm font-medium
               text-foreground/70 hover:text-foreground
               transition-colors duration-100 ease-out
               focus-visible:ring-1 focus-visible:ring-ring/50">
  Button Text
</button>
```

### Card Component
```html
<div class="rounded-lg p-6
            bg-card border border-border
            shadow-sm hover:shadow-md
            transition-shadow duration-200">
  <!-- Card content -->
</div>
```

---

## Summary

The NOCTA portfolio design is characterized by:

1. **Minimalist aesthetics** with purposeful whitespace
2. **Sophisticated transparency** using modern CSS color-mix
3. **Smooth micro-interactions** with consistent timing
4. **Professional typography** with clear hierarchy
5. **Glass morphism effects** on key UI elements
6. **Full accessibility** with proper focus management
7. **Dark mode support** through CSS custom properties
8. **Mobile-optimized** responsive design
9. **Performance-focused** with CSS-based animations
10. **Process-driven content** emphasizing credibility

This creates a modern, professional portfolio that feels premium without being overly complex.
