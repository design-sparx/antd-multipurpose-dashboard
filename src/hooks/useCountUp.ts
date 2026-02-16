import { useEffect, useRef, useState } from 'react';

type UseCountUpOptions = {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
};

export const useCountUp = ({
  end,
  start = 0,
  duration = 1200,
  decimals = 0,
}: UseCountUpOptions) => {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            setValue(Number(current.toFixed(decimals)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, start, duration, decimals]);

  return { value, ref };
};
