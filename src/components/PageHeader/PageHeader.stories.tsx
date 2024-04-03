import type { Meta, StoryObj } from '@storybook/react';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withRouter } from 'storybook-addon-react-router-v6';
import { DASHBOARD_ITEMS } from '../../constants';

import { PageHeader } from './PageHeader.tsx';

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
    title: 'Dashboard',
    breadcrumbs: [
      {
        title: (
          <>
            <HomeOutlined />
            <span>home</span>
          </>
        ),
        path: '/',
      },
      {
        title: 'default dashboard',
      },
    ],
    style: { width: 800 },
  },
};

export const Complex: Story = {
  args: {
    title: 'Dashboard',
    breadcrumbs: [
      {
        title: (
          <>
            <HomeOutlined />
            <span>home</span>
          </>
        ),
        path: '/',
      },
      {
        title: (
          <>
            <PieChartOutlined />
            <span>dashboards</span>
          </>
        ),
        menu: {
          items: DASHBOARD_ITEMS.map((d) => ({
            key: d.title,
            title: <Link to="#">{d.title}</Link>,
          })),
        },
      },
      {
        title: 'default',
      },
    ],
    style: { width: 800 },
  },
};
