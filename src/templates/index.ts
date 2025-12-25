
import type { TemplateRegistry, PromptTemplate } from './types';
import { websiteConfig } from './website/websiteConfig';
import { dashboardConfig } from './dashboard/dashboardConfig';
import { mobileAppConfig } from './mobileApp/mobileAppConfig';
import { desktopAppConfig } from './desktopApp/desktopAppConfig';
import { componentLibraryConfig } from './componentLibrary/componentLibraryConfig';
import { TemplateEngine } from './templateEngine';

/**
 * Template loader functions that use dynamic imports for code splitting.
 * Each template is loaded on-demand only when needed for prompt generation.
 * This significantly reduces the initial bundle size.
 */
const templateLoaders: Record<string, () => Promise<{ default: PromptTemplate } | PromptTemplate | any>> = {
  website: () => import('./website/websiteTemplate').then(m => ({ default: m.websiteTemplate })),
  dashboard: () => import('./dashboard/dashboardTemplate').then(m => ({ default: m.dashboardTemplate })),
  mobileApp: () => import('./mobileApp/mobileAppTemplate').then(m => ({ default: m.mobileAppTemplate })),
  desktopApp: () => import('./desktopApp/desktopAppTemplate').then(m => ({ default: m.desktopAppTemplate })),
  componentLibrary: () => import('./componentLibrary/componentLibraryTemplate').then(m => ({ default: m.componentLibraryTemplate })),
};

/**
 * Template cache to avoid re-loading templates.
 * Once a template is loaded, it's cached for future use.
 */
const templateCache: Record<string, PromptTemplate> = {};

/**
 * Load a template on-demand with caching.
 * @param type - The UI type to load the template for
 * @returns Promise that resolves to the template
 */
async function loadTemplate(type: string): Promise<PromptTemplate> {
  // Return cached template if available
  if (templateCache[type]) {
    return templateCache[type];
  }

  // Load template dynamically
  const loader = templateLoaders[type];
  if (!loader) {
    throw new Error(`No template loader found for type: ${type}`);
  }

  const module = await loader();
  const template = module.default || module;

  // Cache for future use
  templateCache[type] = template;

  return template;
}

/**
 * Registry with configs (loaded upfront) and lazy templates.
 * Configs are small and needed immediately for UI rendering.
 * Templates are larger and only needed during prompt generation.
 */
export const TEMPLATE_REGISTRY: TemplateRegistry = {
  website: {
    config: websiteConfig,
    template: {
      generate: async (config, techStack) => {
        const template = await loadTemplate('website');
        return template.generate(config, techStack);
      },
    },
  },
  dashboard: {
    config: dashboardConfig,
    template: {
      generate: async (config, techStack) => {
        const template = await loadTemplate('dashboard');
        return template.generate(config, techStack);
      },
    },
  },
  mobileApp: {
    config: mobileAppConfig,
    template: {
      generate: async (config, techStack) => {
        const template = await loadTemplate('mobileApp');
        return template.generate(config, techStack);
      },
    },
  },
  desktopApp: {
    config: desktopAppConfig,
    template: {
      generate: async (config, techStack) => {
        const template = await loadTemplate('desktopApp');
        return template.generate(config, techStack);
      },
    },
  },
  componentLibrary: {
    config: componentLibraryConfig,
    template: {
      generate: async (config, techStack) => {
        const template = await loadTemplate('componentLibrary');
        return template.generate(config, techStack);
      },
    },
  },
};

export const templateEngine = new TemplateEngine(TEMPLATE_REGISTRY);

export * from './types';
export { TemplateEngine, formatList, capitalize, toSentenceCase } from './templateEngine';
