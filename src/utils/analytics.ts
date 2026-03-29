import ReactGA from 'react-ga4';

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return;
  ReactGA.event({ action, category, label, value });
};
