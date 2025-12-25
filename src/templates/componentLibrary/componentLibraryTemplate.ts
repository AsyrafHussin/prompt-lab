
import type { PromptTemplate, TemplateConfig } from '../types';

export const componentLibraryTemplate: PromptTemplate = {
  generate: (config: TemplateConfig): string => {
    const { libraryType, components, style, variants, features } = config;

    const componentList = Array.isArray(components) ? components : [];
    const featureList = Array.isArray(features) ? features : [];

    return `Act as an expert UI designer creating a comprehensive ${libraryType.toLowerCase()}. Design a ${style} component library with consistent, reusable components.

## LIBRARY SPECIFICATIONS
- Library Type: ${libraryType}
- Design Style: ${style}
- Variant Complexity: ${variants}

## COMPONENTS TO DESIGN
${componentList.map((comp) => `- ${comp}`).join('\n')}

## FEATURES & REQUIREMENTS
${featureList.map((feature) => `- ${feature}`).join('\n')}

## DESIGN SYSTEM FOUNDATION

### Color Palette
- Primary color family (50-950 shades)
- Secondary/accent colors
- Semantic colors (success, warning, error, info)
- Neutral grays (background, borders, text)
- ${featureList.includes('Dark Mode Support') ? 'Separate dark mode palette' : ''}

### Typography
- Font family selection (heading and body)
- Type scale (12px to 48px or rem equivalents)
- Font weights (regular, medium, semibold, bold)
- Line heights and letter spacing

### Spacing System
- Base unit (4px or 8px)
- Spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96px)
- Consistent padding and margin values

### Border Radius
- None, small, medium, large, full
- Consistent rounding across components

### Shadows
- Elevation scale (shadow-sm to shadow-2xl)
- Usage guidelines for depth and hierarchy

## COMPONENT SPECIFICATIONS

For each component, provide:
1. **Visual Design**: Complete mockup showing all variants
2. **Variants**: ${getVariantGuidance(variants)}
3. **States**: Default, hover, active, focus, disabled
4. **Sizes**: Small, medium, large (if applicable)
5. **${featureList.includes('Accessibility (WCAG 2.1)') ? 'Accessibility': 'Usage'}**: ${featureList.includes('Accessibility (WCAG 2.1)') ? 'ARIA labels, keyboard navigation, focus indicators' : 'When and how to use each variant'}
6. **Spacing**: Internal padding and external margins
7. **${featureList.includes('Dark Mode Support') ? 'Dark Mode': 'Colors'}**: ${featureList.includes('Dark Mode Support') ? 'Dark mode variant designs' : 'Color usage for each variant'}

## CONSISTENCY GUIDELINES
- Use the defined color palette consistently
- Apply spacing system uniformly
- Maintain consistent border radius across similar elements
- Use elevation/shadows purposefully for hierarchy
- Ensure typography scale is applied correctly

## DOCUMENTATION
- Component anatomy (labeled parts)
- Usage guidelines and best practices
- Do's and don'ts for each component
- Code-ready specifications (exact values for all properties)

## OUTPUT
Provide a complete component library design including:
- Design system foundation (colors, typography, spacing)
- Individual component designs with all variants and states
- Visual consistency guidelines
- Accessibility annotations
- Usage examples showing components in context`;
  },
};

function getVariantGuidance(variants: string): string {
  if (variants.includes('Basic')) {
    return 'Single primary variant';
  } else if (variants.includes('Standard')) {
    return 'Primary, secondary, and outline/ghost variants';
  }
  return 'Primary, secondary, outline, ghost, link, and specialized variants (danger, success, etc.)';
}
