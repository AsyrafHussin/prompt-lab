# PromptLab

A modern, powerful prompt generator for crafting AI-ready design prompts. Supports multiple interface types with comprehensive configuration options.

## Features

### 5 UI Types Supported
- **Website** - E-commerce, Landing Pages, Portfolios, Blogs, Corporate sites, SaaS products
- **Dashboard** - Admin Panels, Analytics, CRM, Project Management, E-commerce Admin
- **Mobile** - iOS, Android, Cross-platform applications
- **Desktop** - Electron, Native desktop applications
- **UI Kit** - Design Systems, Component Libraries, Pattern Libraries

### Key Features
- **Real-time Generation** - Prompts generate instantly as you configure
- **Template-Based** - Works 100% offline, no AI API needed
- **Save/Load Configurations** - Save favorite configurations and reload them later
- **Multiple Export Formats** - Text, Markdown, JSON, and shareable links
- **Modern UI** - Built with Tailwind CSS v4 and glassmorphism effects
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode** - Beautiful dark theme optimized for extended use

## Tech Stack

- **React 18** + **TypeScript** - Modern React with type safety
- **Tailwind CSS v4** - CSS-based configuration (no JavaScript config)
- **Zustand** - Lightweight state management with persistence
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library

## Getting Started

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

Open http://localhost:5173/ to view the app.

## How to Use

1. **Select UI Type** - Choose from Website, Dashboard, Mobile, Desktop, or UI Kit
2. **Configure** - Customize your design using the form options (style, components, layout, etc.)
3. **Preview** - See your generated prompt update in real-time on the right panel
4. **Copy or Export** - Copy to clipboard or export in multiple formats

### Saving Configurations
- Click **Save** to save your current configuration
- Give it a memorable name
- Load it later from the **Load** button

### Exporting
Click **Export** to download your prompt as:
- **Text (.txt)** - Plain text file
- **Markdown (.md)** - Formatted markdown
- **JSON (.json)** - Includes configuration and prompt
- **Share Link** - Generate a shareable URL with your configuration

## Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   ├── configurator/        # Configuration panel
│   ├── preview/             # Prompt preview panel
│   └── layout/              # Layout components
├── templates/               # Template system (CORE)
│   ├── website/
│   ├── dashboard/
│   ├── mobileApp/
│   ├── desktopApp/
│   └── componentLibrary/
├── store/                   # Zustand state management
├── hooks/                   # Custom React hooks
├── utils/                   # Utilities
└── types/                   # TypeScript types
```

## Why PromptLab?

1. **Multi-Type Support** - Generate prompts for 5 different UI types
2. **Comprehensive Configuration** - 6-8 options per UI type for precise control
3. **Smart Templates** - Context-aware prompt generation that understands design needs
4. **Persistent Storage** - Save and reload your favorite configurations
5. **Flexible Export** - Multiple formats including shareable links
6. **Modern Stack** - Built with cutting-edge technologies (Tailwind v4, TypeScript, Zustand)
7. **Extensible** - Clean architecture makes adding new UI types simple

## Adding New UI Types

To add a new UI type in just 4 steps:

1. Create config: `src/templates/[newType]/[newType]Config.ts`
2. Create template: `src/templates/[newType]/[newType]Template.ts`
3. Export in `src/templates/[newType]/index.ts`
4. Register in `src/templates/index.ts`

The UI automatically updates!

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Asyraf Hussin
