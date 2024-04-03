import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { DASHBOARD_ITEMS } from '../../constants';

import { SitemapCard } from './SitemapCard.tsx';

const meta = {
  title: 'Components/Sitemap',
  component: SitemapCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [withRouter],
} satisfies Meta<typeof SitemapCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      title: 'dashboard',
      links: DASHBOARD_ITEMS.map((d) => ({ title: d.title, path: '#' })),
    },
    style: { width: 400 },
  },
};
