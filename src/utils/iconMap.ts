/**
 * Icon mapping for dynamic icon lookups.
 *
 * This file imports only the specific icons used in the application,
 * enabling proper tree-shaking by Vite/bundler to reduce bundle size.
 *
 * Instead of `import * as Icons from 'lucide-react'`, we import
 * individual icons and create a mapping object.
 */

import {
  // UI Type icons
  Globe,
  LayoutDashboard,
  Smartphone,
  Monitor,
  Box,
  // Modal/UI icons
  FolderOpen,
  Trash2,
  // Loading icons
  Loader2,
  type LucideIcon,
} from 'lucide-react';

/**
 * Map of icon names to their components.
 * Used for dynamic icon rendering based on string names from configs.
 */
export const iconMap: Record<string, LucideIcon> = {
  // UI Types
  Globe,
  LayoutDashboard,
  Smartphone,
  Monitor,
  Box,
  // UI Components
  FolderOpen,
  Trash2,
  // Loading
  Loader2,
};

/**
 * Get an icon component by name.
 * Returns undefined if icon is not found.
 *
 * @param iconName - The name of the icon to retrieve
 * @returns The icon component or undefined
 */
export function getIcon(iconName: string): LucideIcon | undefined {
  return iconMap[iconName];
}
