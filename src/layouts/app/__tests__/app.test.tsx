import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../../../redux/theme/themeSlice';
import designStyleReducer from '../../../redux/design-style/designStyleSlice';
import { DesignStyleName, getDesignTokens } from '../../../theme/design-styles';

// Heavy siblings (charts, i18n, modals, tour) are not under test here.
vi.mock('../../../components', () => ({
  CommandPalette: () => <div data-testid="command-palette" />,
  MobileTabBar: () => null,
  NProgress: () => null,
  LoginModal: () => null,
  OnboardingTour: () => null,
  Accessibility: () => null,
  LanguageSwitcher: () => null,
  StyleSwitcher: () => null,
}));
vi.mock('../side-nav.tsx', () => ({
  default: () => null,
  SIDER_WIDTH: 200,
  SIDER_COLLAPSED_WIDTH: 64,
}));
vi.mock('../../../contexts', () => ({
  useAuth: () => ({ user: { firstName: 'Demo' }, logout: vi.fn() }),
}));

import { AppLayout } from '../app';

beforeAll(() => {
  // jsdom ships neither API; antd and react-responsive probe for them.
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList;
  }
  if (!window.ResizeObserver) {
    class ResizeObserverStub {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.ResizeObserver =
      ResizeObserverStub as unknown as typeof ResizeObserver;
  }
});

const renderLayout = (activeStyle: DesignStyleName = 'clean') => {
  const store = configureStore({
    reducer: { theme: themeReducer, designStyle: designStyleReducer },
    preloadedState: { designStyle: { activeStyle } },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboards/default']}>
        <AppLayout>
          <div>page content</div>
        </AppLayout>
      </MemoryRouter>
    </Provider>
  );

  return {
    header: screen.getByRole('banner'),
    content: screen.getByRole('main'),
  };
};

const scrollContent = (content: HTMLElement, scrollTop: number) =>
  fireEvent.scroll(content, { target: { scrollTop } });

describe('AppLayout header on scroll (issue #199)', () => {
  it('keeps the header at 64px after the content scrolls', () => {
    const { header, content } = renderLayout();

    expect(header.style.height).toBe('64px');

    scrollContent(content, 120);

    expect(header.style.height).toBe('64px');
  });

  it('still applies the filled background and shadow once scrolled', () => {
    const { header, content } = renderLayout('glassmorphic');
    const tokens = getDesignTokens('glassmorphic', 'light');
    if (!tokens) throw new Error('glassmorphic should expose surface tokens');

    expect(header.style.background).toBe('none');
    expect(header.style.boxShadow).toBe('none');

    scrollContent(content, 120);

    expect(header.style.background).toBe(tokens.headerFilledBg);
    expect(header.style.boxShadow).toBe(tokens.headerFilledShadow);
  });
});
