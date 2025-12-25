
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { UIType, TemplateConfig, SavedConfiguration, TechStack } from '../types';
import { templateEngine } from '../templates';

interface ConfigState {
  // Current UI Type
  currentUIType: UIType;

  // Selected Tech Stack
  techStack: TechStack;

  // Configurations for each UI type
  configurations: Record<UIType, TemplateConfig>;

  // Generated prompt
  generatedPrompt: string;

  // Saved configurations
  savedConfigs: SavedConfiguration[];

  // Actions
  setUIType: (type: UIType) => void;
  setTechStack: (stack: TechStack) => void;
  updateConfig: (type: UIType, config: Partial<TemplateConfig>) => void;
  resetConfig: (type: UIType) => void;
  generatePrompt: () => void;
  saveConfiguration: (name: string) => void;
  loadConfiguration: (id: string) => void;
  deleteConfiguration: (id: string) => void;
  clearAllSavedConfigs: () => void;
}

// Initialize default configurations for all UI types
const getDefaultConfigurations = (): Record<UIType, TemplateConfig> => {
  const types: UIType[] = ['website', 'dashboard', 'mobileApp', 'desktopApp', 'componentLibrary'];
  const configs = {} as Record<UIType, TemplateConfig>;

  types.forEach((type) => {
    configs[type] = templateEngine.getDefaultConfig(type);
  });

  return configs;
};

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUIType: 'website',
      techStack: 'React + Tailwind v4',
      configurations: getDefaultConfigurations(),
      generatedPrompt: '',
      savedConfigs: [],

      // Set current UI type
      setUIType: (type: UIType) => {
        set({ currentUIType: type });
        // Auto-generate prompt when switching types
        get().generatePrompt();
      },

      // Set tech stack
      setTechStack: (stack: TechStack) => {
        set({ techStack: stack });
        // Auto-generate prompt when stack changes
        get().generatePrompt();
      },

      // Update configuration for a specific UI type
      updateConfig: (type: UIType, partialConfig: Partial<TemplateConfig>) => {
        set((state) => ({
          configurations: {
            ...state.configurations,
            [type]: {
              ...state.configurations[type],
              ...partialConfig,
            },
          },
        }));
        // Auto-generate prompt when config changes
        if (type === get().currentUIType) {
          get().generatePrompt();
        }
      },

      // Reset configuration to defaults
      resetConfig: (type: UIType) => {
        set((state) => ({
          configurations: {
            ...state.configurations,
            [type]: templateEngine.getDefaultConfig(type),
          },
        }));
        // Regenerate prompt if resetting current type
        if (type === get().currentUIType) {
          get().generatePrompt();
        }
      },

      // Generate prompt for current UI type
      generatePrompt: () => {
        const { currentUIType, configurations, techStack } = get();
        const config = configurations[currentUIType];

        try {
          const prompt = templateEngine.generate(currentUIType, config, techStack);
          set({ generatedPrompt: prompt });
        } catch (error) {
          console.error('Error generating prompt:', error);
          set({ generatedPrompt: 'Error generating prompt. Please check your configuration.' });
        }
      },

      // Save current configuration
      saveConfiguration: (name: string) => {
        const { currentUIType, configurations } = get();
        const newConfig: SavedConfiguration = {
          id: nanoid(),
          name,
          uiType: currentUIType,
          techStack: get().techStack, // Save tech stack too
          config: configurations[currentUIType],
          timestamp: Date.now(),
        };

        set((state) => ({
          savedConfigs: [...state.savedConfigs, newConfig],
        }));
      },

      // Load a saved configuration
      loadConfiguration: (id: string) => {
        const saved = get().savedConfigs.find((c) => c.id === id);
        if (saved) {
          set((state) => ({
            currentUIType: saved.uiType,
            techStack: (saved as any).techStack || 'React + Tailwind v4', // Backward compatibility
            configurations: {
              ...state.configurations,
              [saved.uiType]: saved.config,
            },
          }));
          get().generatePrompt();
        }
      },

      // Delete a saved configuration
      deleteConfiguration: (id: string) => {
        set((state) => ({
          savedConfigs: state.savedConfigs.filter((c) => c.id !== id),
        }));
      },

      // Clear all saved configurations
      clearAllSavedConfigs: () => {
        set({ savedConfigs: [] });
      },
    }),
    {
      name: 'ui-prompt-generator-config',
      partialize: (state) => ({
        configurations: state.configurations,
        savedConfigs: state.savedConfigs,
        currentUIType: state.currentUIType,
        techStack: state.techStack,
      }),
    }
  )
);
