
import type { UIType, TemplateConfig, TechStack } from '../templates/types';

export interface SavedConfiguration {
  id: string;
  name: string;
  uiType: UIType;
  techStack: TechStack;
  config: TemplateConfig;
  timestamp: number;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type Theme = 'dark' | 'light';

export * from '../templates/types';
