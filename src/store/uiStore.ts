
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Theme, Toast } from '../types';

interface UIState {
  // Theme
  theme: Theme;

  // Modals
  isSaveModalOpen: boolean;
  isLoadModalOpen: boolean;

  // Toasts
  toasts: Toast[];

  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  openSaveModal: () => void;
  closeSaveModal: () => void;
  openLoadModal: () => void;
  closeLoadModal: () => void;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'dark',
      isSaveModalOpen: false,
      isLoadModalOpen: false,
      toasts: [],

      // Set theme
      setTheme: (theme: Theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      // Toggle theme
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(newTheme);
      },

      // Save modal
      openSaveModal: () => set({ isSaveModalOpen: true }),
      closeSaveModal: () => set({ isSaveModalOpen: false }),

      // Load modal
      openLoadModal: () => set({ isLoadModalOpen: true }),
      closeLoadModal: () => set({ isLoadModalOpen: false }),

      // Add toast notification
      addToast: (message: string, type: Toast['type'] = 'info') => {
        const newToast: Toast = {
          id: nanoid(),
          message,
          type,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto-remove toast after 4 seconds
        setTimeout(() => {
          get().removeToast(newToast.id);
        }, 4000);
      },

      // Remove toast
      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      // Clear all toasts
      clearToasts: () => {
        set({ toasts: [] });
      },
    }),
    {
      name: 'ui-prompt-generator-ui',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('ui-prompt-generator-ui');
  if (stored) {
    const { state } = JSON.parse(stored);
    const theme = state?.theme || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } else {
    document.documentElement.classList.add('dark');
  }
}
