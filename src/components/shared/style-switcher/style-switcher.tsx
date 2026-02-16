import { Drawer, Typography, Flex, Switch, theme } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setDesignStyle } from '../../../redux/design-style/designStyleSlice';
import { toggleTheme } from '../../../redux/theme/themeSlice';
import { DESIGN_STYLES, DesignStyleName } from '../../../theme/design-styles';

const { Text, Title } = Typography;

const STYLE_PREVIEWS: Record<
  DesignStyleName,
  { gradient: string; icon: string }
> = {
  clean: {
    gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    icon: '✦',
  },
  glassmorphic: {
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    icon: '◈',
  },
  neumorphic: {
    gradient: 'linear-gradient(135deg, #e8ecf1 0%, #d5dce6 100%)',
    icon: '◉',
  },
  bold: {
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)',
    icon: '◆',
  },
};

type StyleSwitcherProps = {
  open: boolean;
  onClose: () => void;
};

export const StyleSwitcher = ({ open, onClose }: StyleSwitcherProps) => {
  const dispatch = useDispatch();
  const { activeStyle } = useSelector((state: RootState) => state.designStyle);
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const {
    token: { colorPrimary, borderRadiusLG, colorBgContainer, colorBorder },
  } = theme.useToken();

  const isDark = mytheme === 'dark';

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={open}
      width={320}
      styles={{
        body: { padding: '24px 20px' },
      }}
    >
      <Flex vertical gap={24}>
        <div>
          <Title level={5} style={{ marginBottom: 4 }}>
            Appearance
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Customize the look and feel
          </Text>
        </div>

        {/* Theme mode toggle */}
        <Flex
          align="center"
          justify="space-between"
          style={{
            padding: '12px 16px',
            borderRadius: borderRadiusLG,
            border: `1px solid ${colorBorder}`,
            background: colorBgContainer,
          }}
        >
          <Flex align="center" gap={8}>
            {isDark ? <MoonOutlined /> : <SunOutlined />}
            <Text strong>{isDark ? 'Dark' : 'Light'} Mode</Text>
          </Flex>
          <Switch
            checked={isDark}
            onChange={() => dispatch(toggleTheme())}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </Flex>

        {/* Design style picker */}
        <div>
          <Text
            strong
            style={{
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 12,
            }}
          >
            Design Style
          </Text>
          <Flex vertical gap={10}>
            {(Object.keys(DESIGN_STYLES) as DesignStyleName[]).map((key) => {
              const style = DESIGN_STYLES[key];
              const preview = STYLE_PREVIEWS[key];
              const isActive = activeStyle === key;

              return (
                <div
                  key={key}
                  onClick={() => dispatch(setDesignStyle(key))}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      dispatch(setDesignStyle(key));
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: borderRadiusLG,
                    border: isActive
                      ? `2px solid ${colorPrimary}`
                      : `1px solid ${colorBorder}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive
                      ? `${colorPrimary}08`
                      : colorBgContainer,
                  }}
                >
                  {/* Preview swatch */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: borderRadiusLG,
                      background: preview.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                      color: key === 'bold' ? '#4d8bff' : '#333',
                    }}
                  >
                    {preview.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text strong style={{ display: 'block' }}>
                      {style.label}
                    </Text>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 12,
                        display: 'block',
                        lineHeight: 1.3,
                      }}
                    >
                      {style.description}
                    </Text>
                  </div>
                  {isActive && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: colorPrimary,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </Flex>
        </div>
      </Flex>
    </Drawer>
  );
};
