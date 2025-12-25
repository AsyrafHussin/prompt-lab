
import type { PromptTemplate, TemplateConfig } from '../types';

export const dashboardTemplate: PromptTemplate = {
  generate: (config: TemplateConfig): string => {
    const {
      dashboardType,
      layout,
      dataVisualization,
      sidebarStyle,
      theme,
      density,
      features,
      colorScheme,
    } = config;

    const visualizationList = Array.isArray(dataVisualization) ? dataVisualization : [];
    const featureList = Array.isArray(features) ? features : [];

    return `Act as an expert UI/UX designer specializing in data-driven interfaces. Design a comprehensive ${dashboardType.toLowerCase()} with excellent data visualization and user experience.

## DASHBOARD SPECIFICATIONS
- Dashboard Type: ${dashboardType}
- Theme: ${theme}
- Color Accent: ${colorScheme}
- Information Density: ${density}

## LAYOUT & NAVIGATION
- Navigation Style: ${sidebarStyle}
- Layout Style: ${layout || 'Bento Grid'}

## DATA VISUALIZATION
Include the following visualization components:
${visualizationList.map((viz) => `- ${viz}`).join('\n')}

## KEY FEATURES
${featureList.length > 0 ? featureList.map((feature) => `- ${feature}`).join('\n') : '- Standard dashboard functionality'}

## DESIGN REQUIREMENTS
${generateDashboardRequirements(dashboardType, theme, density)}

## USER EXPERIENCE CONSIDERATIONS
- Create intuitive information hierarchy with clear visual grouping
- Ensure data is scannable and insights are immediately apparent
- Use progressive disclosure for complex data (drill-down capabilities)
- Implement responsive design that works on desktop and tablet
- Provide clear feedback for all user actions
- Include loading states for data-heavy components

## ACCESSIBILITY & PERFORMANCE
- Ensure WCAG 2.1 AA compliance for all visualizations
- Use colorblind-friendly palettes for charts
- Provide text alternatives for data visualizations
- Optimize for performance with lazy loading for heavy data tables
- Include keyboard navigation for all interactive elements

## VISUAL DESIGN
- Typography: Use a clear, legible sans-serif font (Inter, Roboto, or similar)
- Spacing: ${getDensitySpacing(density)}
- Shadows: Use subtle shadows to create depth and hierarchy
- Colors: ${getColorGuidance(theme, colorScheme)}
- Charts: Use consistent styling across all data visualizations

## OUTPUT
Provide a complete dashboard UI design including:
- Overall layout structure with grid system
- Sidebar/navigation component design
- Dashboard header with breadcrumbs and actions
- Individual widget/card designs for each data visualization
- Color palette with specific values for ${theme.toLowerCase()}
- Typography scale and hierarchy
- Interactive states (hover, active, disabled)
- Sample data visualizations with proper labeling and legends`;
  },
};

function generateDashboardRequirements(
  dashboardType: string,
  theme: string,
  density: string
): string {
  const requirements: string[] = [];

  // Type-specific requirements
  if (dashboardType.includes('Analytics')) {
    requirements.push('- Prominent KPI cards showing key metrics with trend indicators (up/down arrows)');
    requirements.push('- Time period selector for filtering data (Last 7 days, 30 days, etc.)');
    requirements.push('- Comparison views (vs. previous period)');
  } else if (dashboardType.includes('Admin Panel')) {
    requirements.push('- Quick action buttons for common admin tasks');
    requirements.push('- Recent activity feed or audit log');
    requirements.push('- User management table with inline actions');
  } else if (dashboardType.includes('CRM')) {
    requirements.push('- Contact/lead pipeline visualization');
    requirements.push('- Activity timeline for customer interactions');
    requirements.push('- Task management with status indicators');
  } else if (dashboardType.includes('Project Management')) {
    requirements.push('- Project status overview with progress indicators');
    requirements.push('- Task board or kanban view');
    requirements.push('- Team member assignment and workload visualization');
  } else if (dashboardType.includes('E-commerce')) {
    requirements.push('- Sales metrics with revenue, orders, and conversion rates');
    requirements.push('- Product performance tables');
    requirements.push('- Order management with status workflows');
  }

  // Theme-specific requirements
  if (theme.includes('Dark')) {
    requirements.push('- Use dark background (#0f172a or similar) with elevated cards');
    requirements.push('- Ensure sufficient contrast for text (WCAG AAA for body text)');
    requirements.push('- Use subtle borders and dividers to separate sections');
  } else if (theme.includes('Light')) {
    requirements.push('- Use light background (#f8fafc or similar) with white cards');
    requirements.push('- Use shadows to create depth and hierarchy');
  }

  // Density-specific requirements
  if (density.includes('Compact')) {
    requirements.push('- Maximize data density with minimal padding (8-12px)');
    requirements.push('- Use smaller typography (12-14px for body text)');
    requirements.push('- Compact table rows and tight line height');
  } else if (density.includes('Spacious')) {
    requirements.push('- Generous whitespace and padding (20-32px)');
    requirements.push('- Larger typography (14-16px for body text)');
    requirements.push('- Comfortable spacing in tables and lists');
  } else {
    requirements.push('- Balanced spacing with adequate breathing room (16-24px)');
    requirements.push('- Standard typography (14px for body text)');
  }

  return requirements.join('\n');
}

function getDensitySpacing(density: string): string {
  if (density.includes('Compact')) {
    return 'Tight spacing (8-12px padding, 4-8px gaps)';
  } else if (density.includes('Spacious')) {
    return 'Generous spacing (20-32px padding, 16-24px gaps)';
  }
  return 'Comfortable spacing (16-24px padding, 12-16px gaps)';
}

function getColorGuidance(theme: string, colorScheme: string): string {
  const isDark = theme.includes('Dark');
  const base = isDark ? 'Dark background with light text' : 'Light background with dark text';

  let accent = '';
  if (colorScheme.includes('Blue')) {
    accent = isDark ? '#3b82f6 for primary actions' : '#2563eb for primary actions';
  } else if (colorScheme.includes('Purple')) {
    accent = isDark ? '#a78bfa for primary actions' : '#7c3aed for primary actions';
  } else if (colorScheme.includes('Green')) {
    accent = isDark ? '#34d399 for success/positive metrics' : '#10b981 for success/positive metrics';
  } else if (colorScheme.includes('Orange')) {
    accent = isDark ? '#fb923c for highlights and warnings' : '#f97316 for highlights and warnings';
  } else if (colorScheme.includes('Monochrome')) {
    accent = 'Grayscale palette with subtle accent colors only for critical actions';
  } else {
    accent = 'Category-specific colors for different data types';
  }

  return `${base}. ${accent}`;
}
