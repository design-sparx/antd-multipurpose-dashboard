import { CardProps, Flex, Typography } from 'antd';
import { Card } from '../index.ts';

import './styles.css';
import { Link } from 'react-router-dom';

type Props = {
  data: {
    title: string;
    links: { title: string; path: string }[];
  };
} & CardProps;

export const SitemapCard = ({ data, ...others }: Props) => {
  return (
    <Card {...others}>
      <Flex vertical gap="middle">
        <Typography.Title level={5} className="m-0 text-capitalize">
          {data.title}
        </Typography.Title>
        <Flex gap="middle" wrap="wrap">
          {data.links.map((d) => (
            <Link to={d.path} className="text-capitalize">
              {d.title}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
