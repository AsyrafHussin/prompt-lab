
import type { PromptTemplate, TemplateConfig, TechStack } from '../types';
import { getDesignSystem, mapAestheticToDesignSystem } from '../../config/designSystems';

export const websiteTemplate: PromptTemplate = {
  generate: (config: TemplateConfig, techStack: TechStack): string => {
    const {
      websiteType,
      layout,
      aestheticStyle,
      components,
      copywritingTone,
      interactivity,
      colorScheme,
    } = config;

    const componentList = Array.isArray(components) ? components : [];

    return `Act as an expert Frontend Engineer.
Your task is to build a modern, high-quality website using **${techStack}**.

## Project Overview
- **Type**: ${websiteType}
- **Style**: ${aestheticStyle}
- **Layout**: ${layout}
- **Color Theme**: ${colorScheme}

## Functional Requirements
Please implement the following components and sections:
${componentList.map((c: string) => `- ${c}`).join('\n')}

## Technical Specifications
- **Tech Stack**: ${techStack}
- **Interactivity**: ${interactivity}
- **Responsiveness**: Fully responsive (Mobile-first approach).
- **Accessibility**: Ensure WCAG 2.1 AA compliance.
- **Tone**: The copy should be ${copywritingTone.toLowerCase()}.

## Design Guidelines
${generateRequirements(websiteType, aestheticStyle, componentList)}
${generateDesignSystemGuidelines(aestheticStyle, techStack)}

## Deliverables
Provide the complete code for the main page.
- Use semantic HTML tags.
- Use functional components with hooks.
- ${techStack === 'React + Tailwind v4' ? 'Use Tailwind CSS v4 for all styling.' : 'Use modern CSS rules.'}
- Ensure the code is clean, commented, and ready to run.`;
  },
};

function generateRequirements(
  websiteType: string,
  aestheticStyle: string,
  components: string[]
): string {
  const requirements: string[] = [];

  // Type-specific requirements
  if (websiteType.includes('E-commerce')) {
    requirements.push('- Product showcase must be visually compelling with clear pricing');
    requirements.push('- Shopping cart and checkout flow should be intuitive');
    requirements.push('- Trust signals (security badges, reviews) prominently displayed');
  } else if (websiteType.includes('SaaS')) {
    requirements.push('- Benefits-driven messaging highlighting key features');
    requirements.push('- Clear pricing tiers with feature comparison');
    requirements.push('- Strong emphasis on CTA buttons (Sign Up, Start Free Trial)');
  } else if (websiteType.includes('Portfolio')) {
    requirements.push('- Visual showcase of work/projects as primary focus');
    requirements.push('- About section highlighting skills and expertise');
    requirements.push('- Easy contact method prominently displayed');
  } else if (websiteType.includes('Landing')) {
    requirements.push('- Single, focused conversion goal with clear CTAs');
    requirements.push('- Persuasive copy emphasizing benefits and outcomes');
    requirements.push('- Social proof (testimonials, stats, logos) for credibility');
  }

  // Style-specific requirements
  if (aestheticStyle.includes('SaaS') || aestheticStyle.includes('Clean')) {
    requirements.push('- Ample whitespace with clean, uncluttered layouts');
    requirements.push('- Professional color palette (blues, grays with accent colors)');
  } else if (aestheticStyle.includes('Minimalist')) {
    requirements.push('- Extreme simplicity with focus on essential elements only');
    requirements.push('- Limited color palette (2-3 colors maximum)');
  } else if (aestheticStyle.includes('Glassmorphism')) {
    requirements.push('- Frosted glass effect with backdrop blur on cards/panels');
    requirements.push('- Layered UI elements with transparency and depth');
  } else if (aestheticStyle.includes('Brutalist')) {
    requirements.push('- Bold, unconventional layout breaking traditional grids');
    requirements.push('- High contrast colors and raw, unpolished aesthetic');
  }

  // Component-specific requirements
  if (components.some((c) => c.includes('Pricing'))) {
    requirements.push('- Pricing table with clear feature comparison and highlighted recommended plan');
  }

  if (components.some((c) => c.includes('Testimonials'))) {
    requirements.push('- Testimonials with photos, names, and roles for authenticity');
  }

  if (components.some((c) => c.includes('FAQ'))) {
    requirements.push('- FAQ section with collapsible accordion for easy scanning');
  }

  return requirements.join('\n');
}

function generateDesignSystemGuidelines(aestheticStyle: string, techStack: TechStack): string {
  const designSystemId = mapAestheticToDesignSystem(aestheticStyle);
  if (!designSystemId) return '';

  const designSystem = getDesignSystem(designSystemId);
  if (!designSystem) return '';

  // Portfolio Minimalist (Glass) specific guidelines
  if (designSystemId === 'portfolio-minimalist-glass') {
    return `

### ${designSystem.name} Design System

**Visual Philosophy**: ${designSystem.description}

**Color System**:
- Background: ${designSystem.colors.background}
- Foreground: ${designSystem.colors.foreground}
- Card backgrounds: Use 75% opacity (${designSystem.colors.card})
- Borders: Use 80% opacity for subtle definition
- Use OKLAB color space for color-mix() operations for perceptually uniform transparency

**Glass Morphism Effects**:
- Apply backdrop-filter: blur(16px) to navigation and translucent elements
- Use translucent backgrounds (75% opacity) with subtle borders
- Layer UI elements with proper depth hierarchy
- Smooth color transitions on all interactive states

**Typography**:
- Font Family: ${designSystem.typography.fontFamily}
- Font Sizes: ${designSystem.typography.fontSizes.join(', ')}
- Font Weights: ${designSystem.typography.fontWeights.join(', ')} (use 500 for buttons/emphasis)
- Secondary text: Use foreground color at 70% opacity
- Hover state: Transition from 70% to 100% opacity

**Spacing & Layout**:
- Use consistent spacing scale: ${designSystem.spacing.scale.map(s => s + designSystem.spacing.unit).join(', ')}
- Navigation: Fixed at top with inset-x-0, centered with max-width constraint
- Sections: Full-width with constrained content (max-w-5xl)

**Border Radius**:
- Small elements: ${designSystem.borderRadius.sm}
- Standard (buttons, inputs): ${designSystem.borderRadius.md}
- Large (cards, panels): ${designSystem.borderRadius.lg}

**Component Patterns**:

**Navigation Bar**:
${designSystem.patterns.navigation}
- Implementation: \`fixed top-2 inset-x-0 z-50\`
- Style: \`bg-card/75 backdrop-blur-md border border-border/80\`
- Shadow: \`shadow-lg\` with smooth transitions

**Buttons**:
${designSystem.patterns.buttons}
- Base: \`h-8 px-3 gap-1.5 rounded-md\`
- Text: \`text-sm font-medium\`
- Colors: \`text-foreground/70 hover:text-foreground\`
- Transitions: \`transition-colors duration-100\`

**Cards**:
${designSystem.patterns.cards}
- Style: \`rounded-lg border border-border/80\`
- Optional glass: \`bg-card/75 backdrop-blur-md\`

**Transitions & Animations**:
- Fast (hover, focus): ${designSystem.transitions.duration.fast}
- Normal (modals, dropdowns): ${designSystem.transitions.duration.normal}
- Slow (page transitions): ${designSystem.transitions.duration.slow}
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) for smooth deceleration

**Focus States** (Accessibility):
- Ring: \`focus-visible:ring-1 focus-visible:ring-ring/50\`
- Offset: \`focus-visible:ring-offset-1\`
- Remove default outline: \`focus-visible:outline-none\`

**Icons**:
- Standard size: 16px (size-4)
- Social icons: 24px (size-6)
- Always use \`shrink-0\` and \`pointer-events-none\` on SVGs

**Dark Mode** (if applicable):
- Use CSS custom properties for theme switching
- Automatic system preference detection
- Smooth transitions between themes

**Key Features to Implement**:
${designSystem.features.map(f => `- ${f}`).join('\n')}

${techStack === 'React + Tailwind v4' ? `
**Tailwind v4 Implementation**:
- Use OKLAB color values with opacity: \`bg-[oklch(100%_0_0_/_0.75)]\`
- Backdrop blur: \`backdrop-blur-md\` (16px)
- Color mixing for borders: Use inline styles with color-mix()
- Example navbar: \`className="fixed top-2 inset-x-0 z-50 flex justify-center px-4"\`
  - Inner: \`className="flex items-center justify-between rounded-lg py-1.5 px-4 bg-card/75 backdrop-blur-md border border-border/80 shadow-lg"\`
` : ''}`;
  }

  // For other design systems, return basic info
  return `

### ${designSystem.name} Style Guidelines
${designSystem.description}

**Key Features**:
${designSystem.features.map(f => `- ${f}`).join('\n')}`;
}
