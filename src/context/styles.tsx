import { createContext, useContext } from 'react';
import { CarouselProps, RowProps } from 'antd';

export type StylesContentProps = {
  rowProps: RowProps;
  carouselProps: CarouselProps;
};

export const StylesContext = createContext<StylesContentProps | null>(null);

export const useStylesContext = () => useContext(StylesContext);
