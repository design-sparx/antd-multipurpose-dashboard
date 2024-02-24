import { useOutletContext } from 'react-router-dom';

export type ContextType = { title: string | null };

export function usePageContext() {
  return useOutletContext<ContextType>();
}
