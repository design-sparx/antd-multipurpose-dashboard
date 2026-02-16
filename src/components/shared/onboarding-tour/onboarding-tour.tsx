import { useEffect, useState } from 'react';
import { Tour, TourProps } from 'antd';

type OnboardingStep = {
  target: HTMLElement | (() => HTMLElement | null) | null;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

type OnboardingTourProps = {
  steps: OnboardingStep[];
  storageKey?: string;
  open?: boolean;
  onClose?: () => void;
};

export function OnboardingTour({
  steps,
  storageKey = 'onboarding_tour_completed',
  open: controlledOpen,
  onClose: onControlledClose,
}: OnboardingTourProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  useEffect(() => {
    if (!isControlled) {
      const completed = localStorage.getItem(storageKey);
      if (!completed) {
        setInternalOpen(true);
      }
    }
  }, [storageKey, isControlled]);

  const handleClose = () => {
    if (isControlled) {
      onControlledClose?.();
    } else {
      setInternalOpen(false);
    }
    localStorage.setItem(storageKey, 'true');
  };

  const tourProps: TourProps = {
    open,
    current,
    steps: steps as TourProps['steps'],
    onChange: (cur) => setCurrent(cur),
    onClose: handleClose,
    onFinish: handleClose,
    scrollIntoViewOptions: { behavior: 'smooth', block: 'center' },
  };

  return <Tour {...tourProps} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOnboardingTour(
  steps: OnboardingStep[],
  storageKey?: string
) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const tourProps: TourProps = {
    open,
    current,
    steps: steps as TourProps['steps'],
    onChange: (cur) => setCurrent(cur),
    onClose: () => {
      setOpen(false);
      if (storageKey) localStorage.setItem(storageKey, 'true');
    },
    onFinish: () => {
      setOpen(false);
      if (storageKey) localStorage.setItem(storageKey, 'true');
    },
  };

  return {
    ...tourProps,
    isOpen: open,
    setOpen,
    setCurrent,
  };
}
