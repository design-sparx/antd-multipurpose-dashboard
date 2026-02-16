import { useEffect, useCallback } from 'react';

type KeyHandler = (e: KeyboardEvent) => void;

interface ShortcutConfig {
  key: string;
  handler: KeyHandler;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : true;
        const metaMatch = shortcut.meta ? e.metaKey : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.handler(e);
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export const GLOBAL_SHORTCUTS = {
  search: { key: 'k', ctrl: true, meta: true },
  home: { key: 'h', ctrl: true },
  escape: { key: 'Escape' },
};
