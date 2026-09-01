import { MoonOutlined, RestOutlined, SunOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  ColorPicker,
  Drawer,
  Flex,
  Row,
  Slider,
  Switch,
  Typography,
  theme,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { setDesignStyle } from '../../../redux/design-style/designStyleSlice';
import { RootState } from '../../../redux/store';
import {
  resetCustomization,
  setBorderRadius,
  setCompact,
  setPrimaryDark,
  setPrimaryLight,
} from '../../../redux/theme-customization/themeCustomizationSlice';
import { toggleTheme } from '../../../redux/theme/themeSlice';
import { DESIGN_STYLES, DesignStyleName } from '../../../theme/design-styles';

const { Text } = Typography;

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
  mui: {
    gradient: 'linear-gradient(135deg, #1976d2 0%, #90caf9 100%)',
    icon: 'M',
  },
  shadcn: {
    gradient: 'linear-gradient(135deg, #e5e5e5 0%, #262626 100%)',
    icon: '⌘',
  },
  serene: {
    gradient: 'linear-gradient(135deg, #f8f6f2 0%, #2c241c 100%)',
    icon: '☁',
  },
};

type StyleSwitcherProps = {
  open: boolean;
  onClose: () => void;
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Text
    strong
    style={{
      fontSize: 13,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}
  >
    {children}
  </Text>
);

export const StyleSwitcher = ({ open, onClose }: StyleSwitcherProps) => {
  const dispatch = useDispatch();
  const { activeStyle } = useSelector((state: RootState) => state.designStyle);
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const { primaryLight, primaryDark, borderRadius, compact } = useSelector(
    (state: RootState) => state.themeCustomization
  );
  const {
    token: { colorPrimary, borderRadiusLG, colorBgContainer, colorBorder },
  } = theme.useToken();
  const isWide = useMediaQuery({ minWidth: 1200 });

  const isDark = mytheme === 'dark';

  const customizerFields = [
    { label: 'Light primary', value: primaryLight, onChange: setPrimaryLight },
    { label: 'Dark primary', value: primaryDark, onChange: setPrimaryDark },
  ];

  return (
    <Drawer
      title="Appearance"
      placement="right"
      onClose={onClose}
      open={open}
      size={isWide ? 520 : 340}
      styles={{
        body: { padding: '24px 20px' },
      }}
    >
      <Flex vertical gap={24}>
        <Text>Customize the look and feel</Text>
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
          <SectionLabel>Design Style</SectionLabel>
          <Row gutter={[10, 10]} style={{ marginTop: 12 }}>
            {(Object.keys(DESIGN_STYLES) as DesignStyleName[]).map((key) => {
              const style = DESIGN_STYLES[key];
              const preview = STYLE_PREVIEWS[key];
              const isActive = activeStyle === key;

              return (
                <Col xs={12} key={key}>
                  <div
                    onClick={() => dispatch(setDesignStyle(key))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        dispatch(setDesignStyle(key));
                      }
                    }}
                    style={{
                      cursor: 'pointer',
                      borderRadius: borderRadiusLG,
                      border: isActive
                        ? `2px solid ${colorPrimary}`
                        : `1px solid ${colorBorder}`,
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      background: isActive
                        ? `${colorPrimary}08`
                        : colorBgContainer,
                    }}
                  >
                    <div
                      style={{
                        height: 48,
                        background: preview.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        color: key === 'bold' ? '#4d8bff' : '#333',
                      }}
                    >
                      {preview.icon}
                    </div>
                    <Flex
                      align="center"
                      justify="space-between"
                      style={{ padding: '6px 10px' }}
                    >
                      <Text strong style={{ fontSize: 12 }}>
                        {style.label}
                      </Text>
                      {isActive && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: colorPrimary,
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Flex>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>

        {/* Theme customization */}
        <div>
          <Flex
            align="center"
            justify="space-between"
            style={{ marginBottom: 16 }}
          >
            <SectionLabel>Customize</SectionLabel>
            <Button
              type="text"
              size="small"
              icon={<RestOutlined />}
              onClick={() => dispatch(resetCustomization())}
            >
              Reset
            </Button>
          </Flex>
          <Row gutter={[16, 20]}>
            {customizerFields.map(({ label, value, onChange }) => (
              <Col xs={24} md={isWide ? 12 : 24} key={label}>
                <Flex
                  align="center"
                  justify="space-between"
                  gap={8}
                  style={{ minHeight: 32 }}
                >
                  <Text>{label}</Text>
                  <ColorPicker
                    value={value}
                    onChange={(color) =>
                      dispatch(onChange(color.toHexString()))
                    }
                    showText
                  />
                </Flex>
              </Col>
            ))}
            <Col xs={24}>
              <Flex align="center" justify="space-between">
                <Text>Border radius</Text>
                <Text type="secondary">{borderRadius}px</Text>
              </Flex>
              <Slider
                min={0}
                max={24}
                value={borderRadius}
                onChange={(value) => dispatch(setBorderRadius(value))}
              />
            </Col>
            <Col xs={24}>
              <Flex align="center" justify="space-between">
                <Flex vertical gap={0}>
                  <Text>Compact density</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Tighter components and layout
                  </Text>
                </Flex>
                <Switch
                  checked={compact}
                  onChange={(checked) => dispatch(setCompact(checked))}
                />
              </Flex>
            </Col>
          </Row>
        </div>
      </Flex>
    </Drawer>
  );
};
