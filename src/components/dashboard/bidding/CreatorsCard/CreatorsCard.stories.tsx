import type { Meta, StoryObj } from '@storybook/react';
import CreatorsData from '../../../../../public/mocks/AuctionCreators.json';

import CreatorsCard from './CreatorsCard.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Dashboard/Bidding/Creators table',
  component: CreatorsCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof CreatorsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    data: CreatorsData,
    style: { width: 600 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    style: { width: 600 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error loading creators',
    style: { width: 600 },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    style: { width: 600 },
  },
};
