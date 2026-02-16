import { useLocation } from 'react-router-dom';
import './styles.css';

type AccessibilityProps = {
  mainContentId?: string;
};

export function Accessibility({
  mainContentId = 'main-content',
}: AccessibilityProps) {
  const location = useLocation();

  return (
    <>
      <a href={`#${mainContentId}`} className="skip-link">
        Skip to main content
      </a>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Page changed to {location.pathname}
      </div>
    </>
  );
}

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
