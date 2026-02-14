import { useState } from 'react';
import { Card, Col, Flex, Row, Select, Switch, Tabs, Typography } from 'antd';
import { Card as AntCard } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/theme/themeSlice';

const { Text } = Typography;

interface UISettingsProps {
  compactSidebar: boolean;
  onCompactSidebarChange: (value: boolean) => void;
}

const UISettingsSection = ({
  compactSidebar,
  onCompactSidebarChange,
}: UISettingsProps) => {
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <AntCard title="Appearance">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Theme Mode</Text>
                <Text type="secondary">Choose between light and dark mode</Text>
              </Flex>
              <Switch
                checked={mytheme === 'dark'}
                onChange={() => dispatch(toggleTheme())}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
      <Col xs={24} lg={12}>
        <AntCard title="Layout">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Compact Sidebar</Text>
                <Text type="secondary">Use collapsed sidebar by default</Text>
              </Flex>
              <Switch
                checked={compactSidebar}
                onChange={onCompactSidebarChange}
              />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
      <Col xs={24} lg={12}>
        <AntCard title="Content Display">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Show Page Titles</Text>
                <Text type="secondary">
                  Display page titles in content area
                </Text>
              </Flex>
              <Switch defaultChecked />
            </Flex>
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Breadcrumb Navigation</Text>
                <Text type="secondary">Show breadcrumb trail</Text>
              </Flex>
              <Switch defaultChecked />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
      <Col xs={24} lg={12}>
        <AntCard title="Animation">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Page Transitions</Text>
                <Text type="secondary">Enable smooth page transitions</Text>
              </Flex>
              <Switch defaultChecked />
            </Flex>
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Hover Effects</Text>
                <Text type="secondary">Enable hover animations</Text>
              </Flex>
              <Switch defaultChecked />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
    </Row>
  );
};

interface NotificationSettingsProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  onEmailChange: (value: boolean) => void;
  onPushChange: (value: boolean) => void;
}

const NotificationSettingsSection = ({
  emailNotifications,
  pushNotifications,
  onEmailChange,
  onPushChange,
}: NotificationSettingsProps) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AntCard title="Notification Channels">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Email Notifications</Text>
                <Text type="secondary">Receive notifications via email</Text>
              </Flex>
              <Switch checked={emailNotifications} onChange={onEmailChange} />
            </Flex>
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Push Notifications</Text>
                <Text type="secondary">
                  Receive push notifications in browser
                </Text>
              </Flex>
              <Switch checked={pushNotifications} onChange={onPushChange} />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
      <Col xs={24}>
        <AntCard title="Notification Frequency">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Text>Email Frequency</Text>
              <Select
                defaultValue="instant"
                style={{ width: 200 }}
                options={[
                  { value: 'instant', label: 'Instant' },
                  { value: 'daily', label: 'Daily Digest' },
                  { value: 'weekly', label: 'Weekly Digest' },
                  { value: 'never', label: 'Never' },
                ]}
              />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
    </Row>
  );
};

interface AccessibilitySettingsProps {
  reducedMotion: boolean;
  highContrast: boolean;
  onReducedMotionChange: (value: boolean) => void;
  onHighContrastChange: (value: boolean) => void;
}

const AccessibilitySettingsSection = ({
  reducedMotion,
  highContrast,
  onReducedMotionChange,
  onHighContrastChange,
}: AccessibilitySettingsProps) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AntCard title="Accessibility">
          <Flex vertical gap="middle">
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>Reduce Motion</Text>
                <Text type="secondary">
                  Minimize animations throughout the app
                </Text>
              </Flex>
              <Switch
                checked={reducedMotion}
                onChange={onReducedMotionChange}
              />
            </Flex>
            <Flex
              vertical={isMobile}
              align={isMobile ? 'flex-start' : 'center'}
              justify="space-between"
              gap={isMobile ? 8 : 24}
            >
              <Flex vertical gap={4}>
                <Text strong>High Contrast</Text>
                <Text type="secondary">
                  Increase contrast for better visibility
                </Text>
              </Flex>
              <Switch checked={highContrast} onChange={onHighContrastChange} />
            </Flex>
          </Flex>
        </AntCard>
      </Col>
    </Row>
  );
};

export const SettingsPage = () => {
  const [compactSidebar, setCompactSidebar] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [activeTab, setActiveTab] = useState('ui');

  const tabItems = [
    {
      key: 'ui',
      label: 'UI Settings',
    },
    {
      key: 'notifications',
      label: 'Notifications',
    },
    {
      key: 'accessibility',
      label: 'Accessibility',
    },
  ];

  return (
    <Flex vertical gap="middle">
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        {activeTab === 'ui' && (
          <UISettingsSection
            compactSidebar={compactSidebar}
            onCompactSidebarChange={setCompactSidebar}
          />
        )}
        {activeTab === 'notifications' && (
          <NotificationSettingsSection
            emailNotifications={emailNotifications}
            pushNotifications={pushNotifications}
            onEmailChange={setEmailNotifications}
            onPushChange={setPushNotifications}
          />
        )}
        {activeTab === 'accessibility' && (
          <AccessibilitySettingsSection
            reducedMotion={reducedMotion}
            highContrast={highContrast}
            onReducedMotionChange={setReducedMotion}
            onHighContrastChange={setHighContrast}
          />
        )}
      </Card>
    </Flex>
  );
};
