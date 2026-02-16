import { useCallback, useRef, useEffect } from 'react';

export function useAriaAnnounce() {
  const announcerRef = useRef<HTMLDivElement>(null);

  const announce = useCallback(
    (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      if (announcerRef.current) {
        announcerRef.current.setAttribute('aria-live', politeness);
        announcerRef.current.textContent = message;
        setTimeout(() => {
          if (announcerRef.current) announcerRef.current.textContent = '';
        }, 1000);
      }
    },
    []
  );

  return { announcerRef, announce };
}

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}

export function useSkipLink(targetId: string) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    target?.focus();
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return { handleClick };
}

export const ariaLabels = {
  close: 'Close',
  open: 'Open',
  menu: 'Menu',
  search: 'Search',
  filter: 'Filter',
  sort: 'Sort',
  loading: 'Loading',
  navigation: 'Navigation',
  mainContent: 'Main content',
  sidebar: 'Sidebar',
  footer: 'Footer',
};
