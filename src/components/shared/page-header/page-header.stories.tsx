import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { withRouter } from 'storybook-addon-react-router-v6';

import { PageHeader } from './page-header';

const meta = {
  title: 'Components/Page header',
  component: PageHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    title: 'Default Dashboard',
    style: { width: 800 },
  },
};

export const Complex: Story = {
  args: {
    title: 'E-commerce Dashboard',
    extra: [
      <Button key="filter" icon={<FilterOutlined />}>
        Filters
      </Button>,
    ],
    style: { width: 800 },
  },
};
