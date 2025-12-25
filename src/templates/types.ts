
// Supported UI types
export type UIType = 'website' | 'dashboard' | 'mobileApp' | 'desktopApp' | 'componentLibrary';

// Supported Tech Stacks
export type TechStack = 'React + Tailwind v4' | 'HTML + CSS';

// Configuration option types
export type ConfigOptionType = 'select' | 'multiSelect' | 'text' | 'textarea' | 'toggle';

// Individual configuration option
export interface ConfigOption {
  id: string;
  label: string;
  type: ConfigOptionType;
  options?: string[]; // For select and multiSelect
  defaultValue: any;
  description?: string;
  placeholder?: string;
}

// UI Type configuration (defines the form for each UI type)
export interface UITypeConfig {
  type: UIType;
  label: string;
  icon: string;
  description: string;
  configOptions: ConfigOption[];
}

// Dynamic configuration based on UI type
export interface TemplateConfig {
  [key: string]: any;
}

// Prompt template generator interface
export interface PromptTemplate {
  generate: (config: TemplateConfig, techStack: TechStack) => string;
}

// Complete template entry (combines config and template)
export interface TemplateEntry {
  config: UITypeConfig;
  template: PromptTemplate;
}

// Template registry
export interface TemplateRegistry {
  [key: string]: TemplateEntry;
}

// Saved configuration structure
export interface SavedConfiguration {
  id: string;
  name: string;
  uiType: UIType;
  techStack: TechStack;
  config: TemplateConfig;
  timestamp: number;
}
