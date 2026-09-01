import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Flex, Spin } from 'antd';

import App from './App.tsx';
import './i18n';
import './index.css';
import { store, persistor } from './redux/store.ts';
import { AuthProvider } from './contexts/AuthContext';

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId) {
  ReactGA.initialize(gaId);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function PersistLoading() {
  return (
    <Flex align="center" justify="center" style={{ height: '100vh' }}>
      <Spin size="large" />
    </Flex>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
