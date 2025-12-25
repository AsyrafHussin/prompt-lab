# Reference Portfolio - Exact Pattern Matching

## What I Fixed

I completely rebuilt the design system to **match the reference HTML exactly**, instead of oversimplifying it.

## Key Improvements

### 1. **CSS Custom Properties** (index.css)
Added semantic design tokens from reference:
```css
--color-foreground
--color-card
--color-card-elevated
--color-card-muted
--color-border
--color-ring
--color-ring-offset
--gradient-from / --gradient-to
--highlight-opacity
--ease-out-quad
--ease-navbar
```

### 2. **Utility Classes** (index.css)
Added custom utilities matching reference patterns:
- `text-foreground` / `text-foreground/70` - Semantic text colors
- `bg-card` / `bg-card-elevated` / `bg-card-muted` - Card backgrounds
- `border-border` - Semantic border color
- `card-highlight` - Gradient highlight effect with `--highlight-opacity`
- `ease-out-quad` / `ease-navbar` - Custom easing functions
- `bg-linear-to-b` / `from-gradient-from` / `to-gradient-to` - Gradient utilities

### 3. **Header Component** (Header.tsx)
Exact class patterns from reference:
```tsx
// Logo button
className="relative inline-flex cursor-pointer items-center justify-center rounded-md
  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
  transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100
  focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1
  focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none
  disabled:cursor-not-allowed disabled:opacity-50
  h-8 gap-1.5 has-[>svg]:px-2.5 p-0 text-sm font-medium
  text-foreground hover:bg-transparent"

// Navbar container
className="... text-foreground transition-shadow duration-[350ms] ease-navbar
  shadow-lg card-highlight"
style={{
  backdropFilter: 'blur(16px)',
  borderColor: 'color-mix(in oklab, var(--color-border) 100%, transparent)',
  backgroundColor: 'color-mix(in oklab, var(--color-card) 75%, transparent)',
  '--highlight-opacity': 1
}}

// Theme toggle
className="... text-foreground/70 hover:text-foreground ..."
```

### 4. **Button Component** (Button.tsx)
Sophisticated shadows and gradients from reference:
```tsx
// Primary button
className="bg-linear-to-b from-gradient-from to-gradient-to hover:contrast-90
  shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),
          0px_1px_1px_-0.5px_rgba(9,9,11,0.05),
          0px_3px_3px_-1.5px_rgba(9,9,11,0.05),
          0px_6px_6px_-3px_rgba(9,9,11,0.05)]
  dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/.12),...]
  text-foreground"

// Secondary/ghost
className="bg-transparent text-foreground/70 hover:text-foreground hover:bg-card-muted"

// Advanced SVG styling
className="[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
```

### 5. **Card Component** (Card.tsx)
Proper semantic classes:
```tsx
className="rounded-lg p-6 border border-border
  bg-card-elevated card-highlight
  shadow-sm hover:shadow-md
  transition-shadow duration-200"
style={{
  backdropFilter: 'blur(16px)'
}}
```

### 6. **Dark Mode Integration**
Added `.dark` class toggle on document root:
```tsx
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDark]);
```

Now all CSS utilities work with `.dark` prefix!

## Reference Pattern Features

### Advanced Class Patterns
`[&_svg]:pointer-events-none` - Disable pointer events on all SVG children
`[&_svg:not([class*='size-'])]:size-4` - Default size for SVGs without size class
`has-[>svg]:px-2.5` - Conditional padding when contains SVG
`transition-[background-color,color,box-shadow,filter]` - Specific transition properties

### Sophisticated Effects
**Card Highlight**: Gradient overlay with opacity control via `--highlight-opacity`
**Multi-layered Shadows**: Inset highlight + multiple elevation shadows
**Color Mixing**: `color-mix(in oklab, ...)` for smooth transparency
**Custom Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for smooth motion

### Semantic Design Tokens
`text-foreground` instead of `text-gray-900`
`bg-card-elevated` instead of `bg-white`
`border-border` instead of `border-gray-300`
Opacity modifiers: `text-foreground/70` for secondary text

## Before vs After

### Before (Oversimplified)
```tsx
// ❌ Basic color classes
className="text-gray-900 bg-white border-gray-300"

// ❌ Simple transitions
className="transition-colors duration-100"

// ❌ Basic shadows
className="shadow-sm"
```

### After (Reference-Matched)
```tsx
// Semantic tokens
className="text-foreground bg-card-elevated border-border"

// Sophisticated transitions
className="transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100"

// Multi-layered shadows
className="shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),...]"
```

## Dark Mode Colors

### Light Theme
```css
Background: oklch(100% 0 0)
Foreground: oklch(3.9% 0 0)
Card: oklch(100% 0 0)
Card Elevated: oklch(100% 0 0)
Border: oklch(89.8% 0 0)
```

### Dark Theme
```css
Background: oklch(15% 0.01 265)
Foreground: oklch(98% 0 0)
Card: oklch(18% 0.015 265)
Card Elevated: oklch(22% 0.015 265)
Border: oklch(28% 0.02 265)
```

## Result

Now the UI uses **exact patterns from the reference**:
- Proper design tokens (`--color-foreground`, `--color-card-elevated`)
- Sophisticated class patterns (`[&_svg]:pointer-events-none`)
- Custom easing functions (`ease-out-quad`)
- Card highlight effects (`card-highlight`)
- Multi-layered shadows (inset + elevation)
- Semantic color utilities (`text-foreground/70`)
- Gradient backgrounds with proper fallbacks
- Dark mode with `.dark` class prefix

The design now looks **professional and polished** like the reference, not oversimplified!
