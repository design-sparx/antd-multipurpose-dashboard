import { Button, ButtonProps, CardProps, Flex } from 'antd';
import { Card } from '../index.ts';
import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterCircleFilled,
} from '@ant-design/icons';

const BUTTON_PROPS: ButtonProps = {
  type: 'link',
  style: {
    textAlign: 'start',
  },
};

type Props = CardProps;

const SocialMediaCard = ({ ...others }: Props) => {
  return (
    <Card title="Social Media" {...others}>
      <Flex vertical gap="small">
        <Button icon={<FacebookFilled />} {...BUTTON_PROPS}>
          Facebook
        </Button>
        <Button icon={<InstagramFilled />} {...BUTTON_PROPS}>
          Instagram
        </Button>
        <Button icon={<TwitterCircleFilled />} {...BUTTON_PROPS}>
          Facebook
        </Button>
        <Button icon={<LinkedinFilled />} {...BUTTON_PROPS}>
          Facebook
        </Button>
        <Button icon={<GithubFilled />} {...BUTTON_PROPS}>
          Facebook
        </Button>
      </Flex>
    </Card>
  );
};

export default SocialMediaCard;
