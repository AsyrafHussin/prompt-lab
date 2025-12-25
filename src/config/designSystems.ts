/**
 * Design System Configurations
 * Defines complete design systems with tokens, components, and patterns
 */

export interface DesignSystemConfig {
  id: string;
  name: string;
  description: string;

  // Color system
  colors: {
    background: string;
    foreground: string;
    card: string;
    border: string;
    ring: string;
    accent?: string;
    muted?: string;
  };

  // Typography
  typography: {
    fontFamily: string;
    fontSizes: string[];
    fontWeights: string[];
    lineHeights: string[];
  };

  // Spacing
  spacing: {
    unit: string; // rem, px
    scale: number[]; // 0.25, 0.5, 1, 1.5, 2, 3, 4...
  };

  // Border radius
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  // Effects
  effects: {
    shadows: string[];
    blur: string[];
    opacity: number[];
  };

  // Transitions
  transitions: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: string[];
  };

  // Component patterns
  patterns: {
    navigation: string;
    buttons: string;
    cards: string;
    forms: string;
  };

  // Key features
  features: string[];
}

/**
 * Portfolio Minimalist Design System
 * Modern, minimalist portfolio design with glass morphism
 */
export const portfolioMinimalistDesignSystem: DesignSystemConfig = {
  id: 'portfolio-minimalist-glass',
  name: 'Portfolio Minimalist (Glass)',
  description: 'Minimalist portfolio design with glass morphism, sophisticated transparency, and smooth micro-interactions',

  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(0 0% 3.9%)',
    card: 'hsl(0 0% 100%)',
    border: 'hsl(0 0% 89.8%)',
    ring: 'hsl(0 0% 3.9%)',
    muted: 'hsl(0 0% 96.1%)',
    accent: 'hsl(0 0% 96.1%)',
  },

  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSizes: ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
    fontWeights: ['400', '500', '600', '700'],
    lineHeights: ['1', '1.25', '1.5', '1.75', '2'],
  },

  spacing: {
    unit: 'rem',
    scale: [0, 0.125, 0.25, 0.375, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8],
  },

  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },

  effects: {
    shadows: [
      '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    ],
    blur: ['4px', '8px', '12px', '16px', '24px'],
    opacity: [0, 0.5, 0.7, 0.75, 0.8, 0.9, 1],
  },

  transitions: {
    duration: {
      fast: '100ms',
      normal: '200ms',
      slow: '350ms',
    },
    easing: [
      'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // ease-out-quad
      'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
    ],
  },

  patterns: {
    navigation: 'Fixed translucent navbar with backdrop blur (16px), 75% opacity, rounded corners, centered layout',
    buttons: 'Ghost buttons with smooth transitions (100ms), hover state changes opacity 70% to 100%, rounded-md',
    cards: 'Rounded corners (lg), subtle borders with 80% opacity, optional glass morphism with backdrop blur',
    forms: 'Clean inputs with focus rings, subtle borders, smooth transitions',
  },

  features: [
    'Glass morphism effect with backdrop blur',
    'Translucent backgrounds (75% opacity)',
    'OKLAB color-mix for smooth transparency',
    'Micro-interactions with 100-350ms transitions',
    'Dark mode support via CSS custom properties',
    'Accessibility-first with proper focus states',
    'Mobile-first responsive design',
    'Professional typography hierarchy',
  ],
};

/**
 * Modern Clean Design System
 * Clean, contemporary design with solid colors
 */
export const modernCleanDesignSystem: DesignSystemConfig = {
  id: 'modern-clean',
  name: 'Modern Clean',
  description: 'Contemporary design with clean lines, solid colors, and clear hierarchy',

  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    card: 'hsl(0 0% 100%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    ring: 'hsl(222.2 84% 4.9%)',
    accent: 'hsl(210 40% 96.1%)',
    muted: 'hsl(210 40% 96.1%)',
  },

  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem', '3rem'],
    fontWeights: ['400', '500', '600', '700', '800'],
    lineHeights: ['1.25', '1.5', '1.75', '2'],
  },

  spacing: {
    unit: 'rem',
    scale: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8],
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },

  effects: {
    shadows: [
      '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    ],
    blur: ['2px', '4px', '8px', '16px'],
    opacity: [0, 0.5, 0.75, 1],
  },

  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: [
      'ease-in-out',
      'cubic-bezier(0.4, 0, 0.2, 1)',
    ],
  },

  patterns: {
    navigation: 'Solid background navbar with subtle shadow, clean layout',
    buttons: 'Solid buttons with hover effects, clear CTAs',
    cards: 'Clean cards with subtle shadows and borders',
    forms: 'Standard form inputs with clear labels',
  },

  features: [
    'Clean and contemporary aesthetic',
    'Solid colors with clear contrast',
    'Subtle shadows for depth',
    'Clear visual hierarchy',
    'Responsive grid layouts',
    'Standard transitions',
  ],
};

/**
 * Design System Registry
 */
export const designSystems: Record<string, DesignSystemConfig> = {
  'portfolio-minimalist-glass': portfolioMinimalistDesignSystem,
  'modern-clean': modernCleanDesignSystem,
};

/**
 * Get design system by ID
 */
export function getDesignSystem(id: string): DesignSystemConfig | undefined {
  return designSystems[id];
}

/**
 * Get all design system names
 */
export function getDesignSystemNames(): string[] {
  return Object.values(designSystems).map(ds => ds.name);
}

/**
 * Map aesthetic style name to design system ID
 */
export function mapAestheticToDesignSystem(aesthetic: string): string | undefined {
  const mapping: Record<string, string> = {
    'Portfolio Minimalist (Glass)': 'portfolio-minimalist-glass',
    'Modern Clean': 'modern-clean',
  };
  return mapping[aesthetic];
}
