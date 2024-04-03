import {
  Button,
  ButtonProps,
  Card as AntdCard,
  Col,
  Flex,
  Row,
  Switch,
  Typography,
} from 'antd';
import { Card } from '../../components';
import { useStylesContext } from '../../context';
import { useMediaQuery } from 'react-responsive';

const { Text } = Typography;

const BUTTON_PROPS: ButtonProps = {
  type: 'dashed',
};

export const UserProfilePreferencesPage = () => {
  const context = useStylesContext();
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const notificationsOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Flex vertical gap="middle">
      <Card title="language info">
        <Flex vertical gap="small">
          <Flex
            vertical={isMobile}
            align={isMobile ? 'flex-start' : 'center'}
            gap={4}
          >
            <Text style={{ width: 200 }}>Display Language</Text>
            <Button {...BUTTON_PROPS}>English (Unites States)</Button>
          </Flex>
          <Flex
            vertical={isMobile}
            align={isMobile ? 'flex-start' : 'center'}
            gap={4}
          >
            <Text style={{ width: 200 }}>Preferred Language</Text>
            <Button {...BUTTON_PROPS}>--Add your preferred language--</Button>
          </Flex>
          <Flex
            vertical={isMobile}
            align={isMobile ? 'flex-start' : 'center'}
            gap={4}
          >
            <Text style={{ width: 200 }}>Regional Format</Text>
            <Button {...BUTTON_PROPS}>
              English (Kenya) - {new Date().toLocaleDateString()} :{' '}
              {new Date().toLocaleTimeString()}
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Card title="manage notifications">
        <Row {...context?.rowProps}>
          <Col sm={24} lg={12}>
            <AntdCard title="activities" style={{ marginBottom: '1rem' }}>
              <Flex vertical gap="middle">
                <Flex align="center" justify="space-between">
                  <Text>Someone comments on my content</Text>
                  <Switch
                    defaultChecked={false}
                    onChange={notificationsOnChange}
                  />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text>Someone mentions my profile</Text>
                  <Switch defaultChecked onChange={notificationsOnChange} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text>I received a like on my content</Text>
                  <Switch onChange={notificationsOnChange} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text>Anyone follows me</Text>
                  <Switch
                    defaultChecked={false}
                    onChange={notificationsOnChange}
                  />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text>I received a message</Text>
                  <Switch defaultChecked onChange={notificationsOnChange} />
                </Flex>
              </Flex>
            </AntdCard>
          </Col>
          <Col sm={24} lg={12}>
            <AntdCard title="newsletters">
              <Flex vertical gap="middle">
                <Flex align="center" justify="space-between">
                  <Flex vertical align="flex-start" gap={4}>
                    <Text>General newsletter</Text>
                    <Text type="secondary">
                      News, announcements & product updates
                    </Text>
                  </Flex>
                  <Switch
                    defaultChecked={false}
                    onChange={notificationsOnChange}
                  />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Flex vertical align="flex-start" gap={4}>
                    <Text>Weekly activity report</Text>
                    <Text type="secondary">
                      Weekly digest of top content & media
                    </Text>
                  </Flex>
                  <Switch defaultChecked onChange={notificationsOnChange} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Flex vertical align="flex-start" gap={4}>
                    <Text>Weekly jobs</Text>
                    <Text type="secondary">
                      Weekly board of the newest jobs
                    </Text>
                  </Flex>
                  <Switch onChange={notificationsOnChange} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Flex vertical align="flex-start" gap={4}>
                    <Text>Monthly webinars</Text>
                    <Text type="secondary">
                      Schedule of upcoming webinars & archive
                    </Text>
                  </Flex>
                  <Switch onChange={notificationsOnChange} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Flex vertical align="flex-start" gap={4}>
                    <Text>Weekly blog posts</Text>
                    <Text type="secondary">
                      Weekly feed of the most popular blog posts
                    </Text>
                  </Flex>
                  <Switch defaultChecked onChange={notificationsOnChange} />
                </Flex>
              </Flex>
            </AntdCard>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
};
