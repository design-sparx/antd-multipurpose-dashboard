import type { CarouselProps, CardProps } from 'antd';

export const ACTIVITY_DATA = [
  { day: 'Monday', value: 10 },
  { day: 'Tuesday', value: 22 },
  { day: 'Wednesday', value: 25 },
  { day: 'Thursday', value: 26 },
  { day: 'Friday', value: 15 },
  { day: 'Saturday', value: 12 },
  { day: 'Sunday', value: 3 },
];

export const TASKS_DATA = [
  { day: 'Monday', value: 33, status: 'new' },
  { day: 'Tuesday', value: 44, status: 'new' },
  { day: 'Wednesday', value: 35, status: 'new' },
  { day: 'Thursday', value: 55, status: 'new' },
  { day: 'Friday', value: 49, status: 'new' },
  { day: 'Saturday', value: 63, status: 'new' },
  { day: 'Sunday', value: 72, status: 'new' },
  { day: 'Monday', value: 69, status: 'in progress' },
  { day: 'Tuesday', value: 81, status: 'in progress' },
  { day: 'Wednesday', value: 34, status: 'in progress' },
  { day: 'Thursday', value: 25, status: 'in progress' },
  { day: 'Friday', value: 39, status: 'in progress' },
  { day: 'Saturday', value: 45, status: 'in progress' },
  { day: 'Sunday', value: 60, status: 'in progress' },
];

export const CAROUSEL_PROPS: CarouselProps = {
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const CARD_PROPS: CardProps = {
  style: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
};
