import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  forwardRef,
} from 'react';
import { Input, List, Modal, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

type CommandItem = {
  key: string;
  label: string;
  path?: string;
  action?: () => void;
  icon?: React.ReactNode;
  category?: string;
};

type CommandPaletteProps = {
  items: CommandItem[];
  placeholder?: string;
};

export const CommandPalette = forwardRef<
  { open: () => void },
  CommandPaletteProps
>(({ items, placeholder = 'Search pages, actions...' }, ref) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lower = search.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.category?.toLowerCase().includes(lower)
    );
  }, [items, search]);

  const handleSelect = (item: CommandItem) => {
    setOpen(false);
    setSearch('');
    if (item.path) {
      navigate(item.path);
    } else {
      item.action?.();
    }
  };

  const groupedItems = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredItems.forEach((item) => {
      const category = item.category || 'General';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!open) setOpen(true);
  };

  return (
    <>
      <Input.Search
        placeholder={`${placeholder} (Ctrl+K)`}
        value={search}
        onChange={handleSearchChange}
        onClick={() => setOpen(true)}
        style={{ width: 400 }}
        size="middle"
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        closable={false}
        width={500}
        styles={{ body: { padding: 0 } }}
        className="command-palette-modal"
        centered
      >
        <Input
          autoFocus
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="borderless"
          prefix={<SearchOutlined />}
          style={{ padding: '16px 16px 8px', fontSize: 16 }}
        />
        <List
          dataSource={Object.entries(groupedItems)}
          renderItem={([category, categoryItems]) => (
            <div key={category}>
              <Text
                type="secondary"
                style={{
                  padding: '8px 16px 4px',
                  display: 'block',
                  fontSize: 11,
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </Text>
              {categoryItems.map((item) => (
                <List.Item
                  key={item.key}
                  onClick={() => handleSelect(item)}
                  style={{ cursor: 'pointer', padding: '8px 16px' }}
                >
                  <Text>{item.label}</Text>
                </List.Item>
              ))}
            </div>
          )}
          style={{ maxHeight: 400, overflow: 'auto' }}
        />
      </Modal>
    </>
  );
});
