import { useEffect, useState } from 'react';
import { FloatButton, Tooltip, Tour, TourProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

type OnboardingStep = {
  target: () => HTMLElement | null;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

type OnboardingTourProps = {
  steps: OnboardingStep[];
  storageKey?: string;
};

export function OnboardingTour({
  steps,
  storageKey = 'onboarding_tour_completed',
}: OnboardingTourProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(storageKey);
    if (!completed) {
      setOpen(true);
    }
  }, [storageKey]);

  const tourProps: TourProps = {
    open,
    current,
    steps,
    onChange: (cur) => setCurrent(cur),
    onClose: () => {
      setOpen(false);
      localStorage.setItem(storageKey, 'true');
    },
    onFinish: () => {
      setOpen(false);
      localStorage.setItem(storageKey, 'true');
    },
    scrollIntoViewOptions: { behavior: 'smooth', block: 'center' },
  };

  return (
    <>
      <Tour {...tourProps} />
      <Tooltip title="Help & Tour" placement="left">
        <FloatButton
          icon={<QuestionCircleOutlined />}
          type="primary"
          onClick={() => {
            setCurrent(0);
            setOpen(true);
          }}
          style={{ bottom: 88 }}
        />
      </Tooltip>
    </>
  );
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
    steps,
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
