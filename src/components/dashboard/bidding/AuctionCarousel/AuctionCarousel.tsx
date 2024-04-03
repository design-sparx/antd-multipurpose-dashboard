import { ReactNode } from 'react';
import {
  Alert,
  Button,
  CardProps,
  Carousel,
  CarouselProps,
  Flex,
  message,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Bidding } from '../../../../types';
import { Card, Loader } from '../../../index.ts';

import './styles.css';

type CardItemProps = {
  item: Bidding;
} & CardProps;

export const CardItem = ({ item, ...others }: CardItemProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const {
    auction_id,
    nft_name,
    nft_image,
    is_highest_bid_mine,
    winning_bid,
    status,
    time_left,
  } = item;

  return (
    <article style={{ marginRight: 16 }}>
      <Card
        cover={
          <div
            className="auction-card-header"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(75, 75, 75, .8) 0%, rgba(72, 85, 99, 0) 50%), url(${nft_image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            }}
          >
            <Flex
              justify="space-between"
              align="flex-start"
              style={{ margin: `0 1rem`, padding: `1rem 0` }}
            >
              <Tag
                color={
                  status === 'active' ? 'green-inverse' : 'volcano-inverse'
                }
                className="text-capitalize m-0"
              >
                {status}
              </Tag>
              <Tag
                icon={<ClockCircleOutlined />}
                color="magenta-inverse"
                className="m-0"
              >
                {time_left.split(' ')[0]} left
              </Tag>
            </Flex>
          </div>
        }
        className="auction-card card"
        {...others}
      >
        <Flex vertical gap="middle" style={{ padding: '16px' }}>
          <Typography.Title level={5} className="text-capitalize m-0">
            {nft_name.split(' ')[0]} {nft_name.split(' ')[1]} #
            {auction_id.slice(0, 4)}
          </Typography.Title>
          <Space>
            <Typography.Text>
              {is_highest_bid_mine ? 'Your Bid' : 'Highest Bid'}
            </Typography.Text>
            <Typography.Text>${winning_bid}</Typography.Text>
          </Space>
          <Button
            block
            type="primary"
            disabled={is_highest_bid_mine}
            onClick={() => message.success('You placed your bid')}
          >
            Place Bid
          </Button>
        </Flex>
      </Card>
    </article>
  );
};

type Props = {
  data: Bidding[];
  loading: boolean;
  error: ReactNode;
};

export const AuctionCarousel = ({ data, error, loading }: Props) => {
  const settings: CarouselProps = {
    autoplay: false,
    dots: true,
    dotPosition: 'bottom',
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    cssEase: 'linear',
    className: 'auction-carousel',
  };

  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : loading ? (
    <Loader />
  ) : (
    <Carousel {...settings}>
      {data.map((_) => (
        <CardItem key={_.auction_id} item={_} />
      ))}
    </Carousel>
  );
};
