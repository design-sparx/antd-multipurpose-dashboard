// YourComponent.stories.ts|tsx

import type {Meta, StoryObj} from '@storybook/react';
import {withRouter} from 'storybook-addon-react-router-v6';

import BackBtn from './BackBtn.tsx';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BackBtn> = {
  component: BackBtn,
  decorators: [withRouter]
};

export default meta;
type Story = StoryObj<typeof BackBtn>;

export const BackButton: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
