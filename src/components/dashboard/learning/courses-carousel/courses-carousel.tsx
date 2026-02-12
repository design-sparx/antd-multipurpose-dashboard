import {
  Alert,
  Button,
  Card as AntdCard,
  CardProps,
  Carousel,
  CarouselProps,
  Flex,
  Space,
  Tag,
  Typography,
} from 'antd';
import { RecommendedCourses } from '../../../../types';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  BookOutlined,
  ClockCircleOutlined,
  LeftCircleOutlined,
  LockOutlined,
  RightCircleOutlined,
  TagFilled,
} from '@ant-design/icons';
import { Card, Loader } from '../../../index.ts';
import { useMediaQuery } from 'react-responsive';

import './styles.css';

type CardItemProps = {
  data: RecommendedCourses;
} & CardProps;

const CardItem = ({ data, ...others }: CardItemProps) => {
  const [levelColor, setLevelColor] = useState<string>();
  const { duration, category, name, lessons, level } = data;

  useEffect(() => {
    switch (level) {
      case 'beginner':
        setLevelColor('geekblue');
        break;
      case 'intermediate':
        setLevelColor('magenta');
        break;
      case 'advanced':
        setLevelColor('volcano');
        break;
      case 'expert':
        setLevelColor('red');
        break;
      default:
        setLevelColor('warning');
        break;
    }
  }, [level]);

  return (
    <AntdCard
      style={{
        margin: `0 4px`,
      }}
      {...others}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            textTransform: 'capitalize',
          }}
        >
          {name.slice(0, 30)}...
        </Typography.Title>
        <Space size="small">
          <Space size={4}>
            <BookOutlined />
            <Typography.Text>{lessons} Lessons</Typography.Text>
          </Space>
          <Typography.Text>-</Typography.Text>
          <Space size={4}>
            <ClockCircleOutlined />
            <Typography.Text>{duration} Hours</Typography.Text>
          </Space>
        </Space>
        <Flex wrap="wrap" gap="small">
          <Tag icon={<TagFilled />}>{category}</Tag>
          <Tag
            bordered={true}
            color={levelColor}
            style={{ textTransform: 'capitalize' }}
          >
            {level}
          </Tag>
        </Flex>
        <Button icon={<LockOutlined />} type="primary" block>
          Enroll Now
        </Button>
      </Space>
    </AntdCard>
  );
};

type Props = {
  data?: RecommendedCourses[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CoursesCarousel = ({ data, loading, error, ...others }: Props) => {
  const sliderRef = useRef<any>();
  const isXlScreen = useMediaQuery({ maxWidth: 1200 });

  const settings: CarouselProps = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevious = (): void => {
    sliderRef?.current?.prev();
  };

  const handleNext = (): void => {
    sliderRef?.current?.next();
  };

  return (
    <Card
      title="Recommended for you"
      extra={
        <Space>
          {isXlScreen ? (
            <>
              <Button onClick={handlePrevious}>Previous</Button>
              <Button onClick={handleNext}>Next</Button>
            </>
          ) : (
            <>
              <Button onClick={handlePrevious} icon={<LeftCircleOutlined />} />
              <Button onClick={handleNext} icon={<RightCircleOutlined />} />
            </>
          )}
        </Space>
      }
      className="courses-carousel-card card"
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <Carousel ref={sliderRef} {...settings}>
          {data?.map((d) => <CardItem key={d.id} data={d} />)}
        </Carousel>
      )}
    </Card>
  );
};
