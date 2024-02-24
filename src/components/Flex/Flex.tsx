import { CSSProperties, ReactNode } from 'react';

type Props = {
  gap?: 'small' | 'middle' | 'large' | number;
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexDirection?: CSSProperties['flexDirection'];
  children: ReactNode;
} & CSSProperties;

const Flex = ({
  flexDirection,
  alignItems,
  gap,
  justifyContent,
  children,
  ...others
}: Props) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        gap:
          typeof gap === 'number'
            ? gap
            : gap === 'large'
              ? '24px'
              : gap === 'small'
                ? '8px'
                : '16px',
        ...others,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
