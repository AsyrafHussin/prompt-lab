
import type { TemplateRegistry } from './types';
import { websiteConfig, websiteTemplate } from './website';
import { dashboardConfig, dashboardTemplate } from './dashboard';
import { mobileAppConfig, mobileAppTemplate } from './mobileApp';
import { desktopAppConfig, desktopAppTemplate } from './desktopApp';
import { componentLibraryConfig, componentLibraryTemplate } from './componentLibrary';
import { TemplateEngine } from './templateEngine';

export const TEMPLATE_REGISTRY: TemplateRegistry = {
  website: {
    config: websiteConfig,
    template: websiteTemplate,
  },
  dashboard: {
    config: dashboardConfig,
    template: dashboardTemplate,
  },
  mobileApp: {
    config: mobileAppConfig,
    template: mobileAppTemplate,
  },
  desktopApp: {
    config: desktopAppConfig,
    template: desktopAppTemplate,
  },
  componentLibrary: {
    config: componentLibraryConfig,
    template: componentLibraryTemplate,
  },
};

export const templateEngine = new TemplateEngine(TEMPLATE_REGISTRY);

export * from './types';
export { TemplateEngine, formatList, capitalize, toSentenceCase } from './templateEngine';
