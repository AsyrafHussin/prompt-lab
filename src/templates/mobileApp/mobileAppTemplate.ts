
import type { PromptTemplate, TemplateConfig } from '../types';
import { formatList } from '../templateEngine';

export const mobileAppTemplate: PromptTemplate = {
  generate: (config: TemplateConfig): string => {
    const { appType, platform, navigationPattern, screens, designStyle, interactions } = config;

    const screenList = Array.isArray(screens) ? screens : [];
    const interactionList = Array.isArray(interactions) ? interactions : [];

    return `Act as an expert mobile UI/UX designer. Design a ${appType.toLowerCase()} mobile application following ${platform} design guidelines with a ${designStyle.toLowerCase()} aesthetic.

## APP SPECIFICATIONS
- App Type: ${appType}
- Platform: ${platform}
- Design Style: ${designStyle}
- Navigation Pattern: ${navigationPattern}

## SCREENS TO DESIGN
${screenList.map((screen) => `- ${screen}`).join('\n')}

## INTERACTIONS & GESTURES
${interactionList.map((interaction) => `- ${interaction}`).join('\n')}

## MOBILE-SPECIFIC REQUIREMENTS
- Design for mobile viewport (375x812px for iPhone, 360x800px for Android)
- Ensure touch targets are minimum 44x44px for accessibility
- Use native platform components and patterns where appropriate
- Optimize for one-handed use with key actions in thumb-reach zone
- Include proper status bar treatment
- Design loading states and empty states for all screens

## ${platform.includes('iOS') ? 'iOS DESIGN GUIDELINES' : platform.includes('Android') ? 'ANDROID MATERIAL DESIGN' : 'CROSS-PLATFORM DESIGN'}
${getPlatformGuidelines(platform)}

## USER EXPERIENCE
- Smooth transitions and animations (300-400ms timing)
- Clear visual feedback for all interactions
- Intuitive navigation with clear hierarchy
- Consistent spacing and typography throughout
- Error handling with helpful messages
- Offline state considerations

## OUTPUT
Provide complete UI designs for each screen including:
- Screen layouts with proper safe areas
- Navigation structure
- Typography scale optimized for mobile
- Color palette with accessibility considerations
- Component states (default, active, disabled)
- Animation and transition specifications
- Platform-specific design patterns`;
  },
};

function getPlatformGuidelines(platform: string): string {
  if (platform.includes('iOS')) {
    return `- Use SF Pro or system font
- Follow Apple's Human Interface Guidelines
- Use iOS native components (tab bars, navigation bars, alerts)
- Implement swipe-back gesture
- Use subtle shadows and rounded corners
- Light/Dark mode support`;
  } else if (platform.includes('Android')) {
    return `- Use Roboto or Google Sans font
- Follow Material Design 3 guidelines
- Use Material components (FAB, bottom sheets, snackbars)
- Implement ripple effects for touch feedback
- Use elevation and surfaces appropriately
- Dynamic color theming`;
  }
  return `- Create unified design that feels native on both platforms
- Use cross-platform compatible components
- Maintain brand consistency while respecting platform conventions
- Test on both iOS and Android devices
- Consider React Native or Flutter component libraries`;
}
