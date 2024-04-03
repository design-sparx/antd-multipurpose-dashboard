import {
  CSSProperties,
  HTMLProps,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useMediaQuery } from 'react-responsive';

type ContainerProps = {
  children: ReactNode;
  style?: CSSProperties;
} & HTMLProps<HTMLDivElement>;

export const Container = ({ children, style, ...others }: ContainerProps) => {
  const [containerWidth, setContainerWidth] = useState<string>();
  const isMedium = useMediaQuery({ minWidth: 769 }),
    isLarge = useMediaQuery({ minWidth: 992 }),
    isXLarge = useMediaQuery({ minWidth: 1200 }),
    isXXLarge = useMediaQuery({ minWidth: 1400 });

  useEffect(() => {
    // sort from large to small devices
    if (isXXLarge) {
      setContainerWidth('1320px');
    } else if (isXLarge) {
      setContainerWidth('1140px');
    } else if (isLarge) {
      setContainerWidth('960px');
    } else if (isMedium) {
      setContainerWidth('720px');
    } else {
      setContainerWidth('100%');
    }
  }, [isLarge, isXLarge, isXXLarge, isMedium]);

  return (
    <div
      {...others}
      style={{
        width: containerWidth,
        margin: '0 auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
