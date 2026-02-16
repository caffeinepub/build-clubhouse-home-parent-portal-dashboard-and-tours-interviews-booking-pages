import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Users, Calendar, Heart } from 'lucide-react';
import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/parent-portal', label: 'Parent Portal', icon: Users },
    { path: '/tours', label: 'Book a Tour', icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex flex-col app-with-handprints-bg">
      {/* Image-only sticky header */}
      <header className="sticky top-0 z-50 w-full border-b-4 border-primary/20 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-bubble">
        <div className="w-full h-24 md:h-32 overflow-hidden">
          <img 
            src="/assets/generated/cool-kidz-club-hero.dim_1600x900.jpg" 
            alt="Cool Kids Club" 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Navigation bar below header */}
      <nav className="sticky top-24 md:top-32 z-40 w-full border-b-2 border-primary/10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
        <div className="container py-3">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center justify-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all text-sm ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile navigation */}
          <div className="flex md:hidden items-center justify-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all text-xs ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t-4 border-primary/20 bg-card mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Auntie Maia's Clubhouse</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-primary fill-current animate-pulse" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
