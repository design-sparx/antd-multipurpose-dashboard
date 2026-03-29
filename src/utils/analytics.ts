import ReactGA from 'react-ga4';

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({ action, category, label, value });
};
