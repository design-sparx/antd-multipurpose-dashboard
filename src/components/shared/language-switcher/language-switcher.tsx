import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const items: MenuProps['items'] = languages.map((lang) => ({
    key: lang.code,
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{lang.flag}</span>
        <span>{lang.name}</span>
      </span>
    ),
    onClick: () => i18n.changeLanguage(lang.code),
  }));

  return (
    <Tooltip title="Language">
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <Button
          aria-label="Language"
          icon={<GlobalOutlined />}
          type="text"
          size="large"
        />
      </Dropdown>
    </Tooltip>
  );
}
