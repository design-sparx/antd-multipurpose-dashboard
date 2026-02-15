import { useEffect, useMemo, useState } from 'react';
import { Input, List, Modal, Typography } from 'antd';
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

export function CommandPalette({
  items,
  placeholder = 'Search pages, actions...',
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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

  return (
    <>
      <Text
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
        className="command-palette-trigger"
      >
        <span
          style={{
            padding: '4px 8px',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.1)',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          ⌘K
        </span>
      </Text>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        closable={false}
        width={500}
        styles={{ body: { padding: 0 } }}
        className="command-palette-modal"
      >
        <Input
          autoFocus
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="borderless"
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
}
