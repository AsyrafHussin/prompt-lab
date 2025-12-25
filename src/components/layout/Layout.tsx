
import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useThemeStore } from '../../store/themeStore';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: isDark ? 'var(--color-dark-background)' : 'var(--color-background)',
      }}
    >
      <Header />
      <main className="flex-1 w-full mx-auto px-4 pt-20 pb-8 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
