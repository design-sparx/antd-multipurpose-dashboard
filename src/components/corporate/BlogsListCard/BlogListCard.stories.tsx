import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import BlogsListCard from './BlogsListCard.tsx';

const MOCK_DATA = Array.from({ length: 5 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Lorem ipsum ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Corporate/Blogs list',
  component: BlogsListCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [withRouter],
} satisfies Meta<typeof BlogsListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    data: MOCK_DATA,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to fetch blogs',
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};
