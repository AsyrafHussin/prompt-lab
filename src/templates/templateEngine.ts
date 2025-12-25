
import type { TemplateConfig, TemplateRegistry, UIType, TechStack } from './types';

export class TemplateEngine {
  private registry: TemplateRegistry;

  constructor(registry: TemplateRegistry) {
    this.registry = registry;
  }

  /**
   * Generate a prompt for a specific UI type with given configuration
   */
  generate(uiType: UIType, config: TemplateConfig, techStack: TechStack): string {
    const templateEntry = this.registry[uiType];

    if (!templateEntry) {
      throw new Error(`No template found for UI type: ${uiType}`);
    }

    return templateEntry.template.generate(config, techStack);
  }

  /**
   * Get configuration options for a specific UI type
   */
  getConfig(uiType: UIType) {
    const templateEntry = this.registry[uiType];

    if (!templateEntry) {
      throw new Error(`No template found for UI type: ${uiType}`);
    }

    return templateEntry.config;
  }

  /**
   * Get all available UI types
   */
  getAvailableTypes(): UIType[] {
    return Object.keys(this.registry) as UIType[];
  }

  /**
   * Get default configuration for a UI type
   */
  getDefaultConfig(uiType: UIType): TemplateConfig {
    const config = this.getConfig(uiType);
    const defaultConfig: TemplateConfig = {};

    config.configOptions.forEach((option) => {
      defaultConfig[option.id] = option.defaultValue;
    });

    return defaultConfig;
  }

  /**
   * Validate configuration for a UI type
   */
  validateConfig(uiType: UIType, config: TemplateConfig): boolean {
    const templateConfig = this.getConfig(uiType);

    // Check if all required fields are present
    for (const option of templateConfig.configOptions) {
      if (!(option.id in config)) {
        return false;
      }
    }

    return true;
  }
}

export function formatList(items: string[], conjunction: string = 'and'): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;

  return `${items.slice(0, -1).join(', ')}, ${conjunction} ${items[items.length - 1]}`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toSentenceCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
