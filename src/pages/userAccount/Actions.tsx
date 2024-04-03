import { Card, Flex } from '../../components';
import { Button, Col, Divider, Row, Switch, Typography } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useStylesContext } from '../../context';

const { Text } = Typography;

const dividerStyles: CSSProperties = {
  margin: `8px 0`,
};

type ActionItemProps = {
  title: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
};

const ActionItem = ({ children, extra, title }: ActionItemProps) => {
  return (
    <Flex flexDirection="column" gap="middle" alignItems="flex-start">
      <Text strong>{title}</Text>
      {children}
      {extra}
      <Divider style={dividerStyles} />
    </Flex>
  );
};

export const UserProfileActionsPage = () => {
  const context = useStylesContext();

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Row {...context?.rowProps}>
      <Col xs={24} lg={12} xl={8}>
        <Card title="Advanced" style={{ height: '100%' }}>
          <Flex flexDirection="column">
            <ActionItem
              title="Auto accept project invites"
              extra={
                <Text>
                  Automatically accept project invites from known collaborators.
                </Text>
              }
              children={<Switch defaultChecked onChange={onChange} />}
            />
            <ActionItem
              title="Experimental features"
              extra={
                <Button
                  icon={<QuestionCircleOutlined />}
                  type="link"
                  size="small"
                >
                  Learn more about experimental features
                </Button>
              }
              children={<Switch onChange={onChange} />}
            />
            <ActionItem
              title="Clear local data"
              children={
                <Button type="default" icon={<SyncOutlined />}>
                  Reload
                </Button>
              }
            />
          </Flex>
        </Card>
      </Col>
      <Col xs={24} lg={12} xl={8}>
        <Card title="Export content" style={{ height: '100%' }}>
          <Flex flexDirection="column">
            <ActionItem
              title="Export workspace content"
              extra={
                <Button
                  icon={<QuestionCircleOutlined />}
                  type="link"
                  size="small"
                >
                  Learn about exporting workspaces
                </Button>
              }
              children={<Button>Export all workspace content</Button>}
            />
            <ActionItem
              title="Export members"
              extra={
                <Button
                  icon={<QuestionCircleOutlined />}
                  type="link"
                  size="small"
                >
                  Learn about exporting members
                </Button>
              }
              children={<Button>Export members as CSV</Button>}
            />
          </Flex>
        </Card>
      </Col>
      <Col xs={24} lg={12} xl={8}>
        <Card title="Danger zone" style={{ height: '100%' }}>
          <ActionItem
            title="Delete account"
            extra={
              <Button
                icon={<QuestionCircleOutlined />}
                type="link"
                size="small"
              >
                Learn about deleting account
              </Button>
            }
            children={<Button danger>Delete account</Button>}
          />
        </Card>
      </Col>
    </Row>
  );
};
