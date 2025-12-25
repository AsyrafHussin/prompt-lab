
import type { PromptTemplate, TemplateConfig } from '../types';

export const desktopAppTemplate: PromptTemplate = {
  generate: (config: TemplateConfig): string => {
    const { appType, platform, layoutStyle, theme, features, complexity } = config;

    const featureList = Array.isArray(features) ? features : [];

    return `Act as an expert desktop application UI/UX designer. Design a ${appType.toLowerCase()} for ${platform} with ${complexity.toLowerCase()} interface complexity.

## APPLICATION SPECIFICATIONS
- App Type: ${appType}
- Target Platform: ${platform}
- Layout Style: ${layoutStyle}
- Theme: ${theme}
- Complexity Level: ${complexity}

## INTERFACE COMPONENTS
${featureList.map((feature) => `- ${feature}`).join('\n')}

## DESKTOP-SPECIFIC REQUIREMENTS
- Design for desktop viewport (minimum 1280x720px, optimal 1920x1080px)
- Native window controls (minimize, maximize, close)
- Title bar with app name and document indicator
- Keyboard-first interaction with comprehensive shortcuts
- Context menus for right-click actions
- Resizable panels and windows with saved layout states
- Multi-monitor support considerations

## PLATFORM GUIDELINES
${getPlatformSpecifics(platform)}

## USER EXPERIENCE
- Efficient workspace utilization with customizable layouts
- Quick access to frequently used tools and features
- Visual hierarchy optimized for prolonged desktop use
- Consistent with platform conventions for menus and dialogs
- Professional color scheme suitable for extended viewing
- Crisp, readable typography at standard desktop viewing distances

## INTERACTION PATTERNS
- Keyboard shortcuts for all major actions
- Drag-and-drop where applicable
- Hover states and tooltips for discoverability
- Undo/redo functionality
- Auto-save and state persistence
- Window management (split views, tabs, etc.)

## OUTPUT
Provide complete desktop UI design including:
- Overall window layout and structure
- Menu bar structure and organization
- Toolbar design with icon set
- Main work area layout
- Sidebar/panel designs
- Typography and color scheme for ${theme.toLowerCase()} theme
- Keyboard shortcut mapping
- Settings/preferences interface`;
  },
};

function getPlatformSpecifics(platform: string): string {
  if (platform.includes('macOS')) {
    return `- Follow macOS Human Interface Guidelines
- Use SF Pro font family
- Traffic light window controls (red, yellow, green) on left
- Unified title bar and toolbar
- macOS-style preferences window
- Native menu bar integration`;
  } else if (platform.includes('Windows')) {
    return `- Follow Microsoft Fluent Design System
- Use Segoe UI font family
- Window controls (minimize, maximize, close) on right
- Ribbon or command bar interface options
- Windows-style settings panel
- System tray integration`;
  } else if (platform.includes('Linux')) {
    return `- Follow GNOME or KDE Human Interface Guidelines
- Use system font (Ubuntu, Roboto, etc.)
- Flexible window controls positioning
- GTK+ or Qt component styling
- Native desktop environment integration`;
  }
  return `- Create platform-agnostic design using Electron
- Custom title bar with cross-platform window controls
- Consistent experience across macOS, Windows, and Linux
- Use web-safe fonts or bundled fonts
- Electron-specific optimizations (frameless window, etc.)`;
}
