
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { UIType, TemplateConfig, SavedConfiguration, TechStack } from '../types';
import { templateEngine } from '../templates';
import { debounce } from '../utils/debounce';

interface ConfigState {
  // Current UI Type
  currentUIType: UIType;

  // Selected Tech Stack
  techStack: TechStack;

  // Configurations for each UI type
  configurations: Record<UIType, TemplateConfig>;

  // Generated prompt
  generatedPrompt: string;

  // Loading state for async template generation
  isGenerating: boolean;

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

// Create debounced prompt generator outside the store
// This will be initialized once the store is created
let debouncedGeneratePrompt: (() => void) | null = null;

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => {
      // Helper function to actually generate the prompt (async for code-split templates)
      const generatePromptImpl = async () => {
        const { currentUIType, configurations, techStack } = get();
        const config = configurations[currentUIType];

        // Set loading state
        set({ isGenerating: true });

        try {
          const prompt = await templateEngine.generate(currentUIType, config, techStack);
          set({ generatedPrompt: prompt, isGenerating: false });
        } catch (error) {
          console.error('Error generating prompt:', error);
          set({
            generatedPrompt: 'Error generating prompt. Please check your configuration.',
            isGenerating: false,
          });
        }
      };

      // Initialize debounced version (300ms delay for form input changes)
      if (!debouncedGeneratePrompt) {
        debouncedGeneratePrompt = debounce(generatePromptImpl, 300);
      }

      return {
      // Initial state
      currentUIType: 'website',
      techStack: 'React + Tailwind v4',
      configurations: getDefaultConfigurations(),
      generatedPrompt: '',
      isGenerating: false,
      savedConfigs: [],

      // Set current UI type
      setUIType: (type: UIType) => {
        set({ currentUIType: type });
        // Immediate generation for intentional UI type changes
        generatePromptImpl();
      },

      // Set tech stack
      setTechStack: (stack: TechStack) => {
        set({ techStack: stack });
        // Immediate generation for intentional tech stack changes
        generatePromptImpl();
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
        // Debounced generation for frequent config updates (typing, slider changes)
        if (type === get().currentUIType && debouncedGeneratePrompt) {
          debouncedGeneratePrompt();
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
        // Immediate generation for intentional reset actions
        if (type === get().currentUIType) {
          generatePromptImpl();
        }
      },

      // Generate prompt for current UI type (immediate, not debounced)
      generatePrompt: generatePromptImpl,

      // Save current configuration
      saveConfiguration: (name: string) => {
        const { currentUIType, configurations } = get();
        const config = configurations[currentUIType];

        // Validate configuration before saving
        const isValid = templateEngine.validateConfig(currentUIType, config);
        if (!isValid) {
          console.error('Cannot save invalid configuration');
          throw new Error('Configuration is invalid. Please ensure all required fields are filled.');
        }

        const newConfig: SavedConfiguration = {
          id: nanoid(),
          name,
          uiType: currentUIType,
          techStack: get().techStack,
          config,
          timestamp: Date.now(),
        };

        set((state) => ({
          savedConfigs: [...state.savedConfigs, newConfig],
        }));
      },

      // Load a saved configuration
      loadConfiguration: (id: string) => {
        const saved = get().savedConfigs.find((c) => c.id === id);
        if (!saved) {
          throw new Error('Configuration not found. It may have been deleted.');
        }

        // Validate saved configuration before loading
        const isValid = templateEngine.validateConfig(saved.uiType, saved.config);
        if (!isValid) {
          console.warn('Loaded configuration is incomplete. Some fields may be missing.');
          // Still load it, but user will need to fix missing fields
        }

        // Update current UI type, tech stack, and configuration
        set((state) => ({
          currentUIType: saved.uiType,
          techStack: saved.techStack,
          configurations: {
            ...state.configurations,
            [saved.uiType]: saved.config,
          },
        }));

        // Immediate generation for intentional load action
        generatePromptImpl();
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
    };
  },
    {
      name: 'ui-prompt-generator-config',
      partialize: (state) => ({
        configurations: state.configurations,
        savedConfigs: state.savedConfigs,
        currentUIType: state.currentUIType,
        techStack: state.techStack,
      }),
      // Migration for older saved configurations without techStack
      migrate: (persistedState: any) => {
        if (persistedState.savedConfigs) {
          persistedState.savedConfigs = persistedState.savedConfigs.map((config: any) => ({
            ...config,
            techStack: config.techStack || 'React + Tailwind v4',
          }));
        }
        return persistedState as ConfigState;
      },
      version: 1,
    }
  )
);
