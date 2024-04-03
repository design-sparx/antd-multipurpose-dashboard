import { Button, Dropdown, MenuProps } from 'antd';
import {
  DeleteOutlined,
  ExpandOutlined,
  MinusOutlined,
  MoreOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    label: 'Expand',
    key: '1',
    icon: <ExpandOutlined />,
  },
  {
    label: 'Minimize',
    key: '2',
    icon: <MinusOutlined />,
  },
  {
    label: 'Reload',
    key: '3',
    icon: <SyncOutlined />,
  },
  {
    label: 'Remove',
    key: '4',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

export const MoreMenu = () => {
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button>
        More <MoreOutlined />
      </Button>
    </Dropdown>
  );
};
