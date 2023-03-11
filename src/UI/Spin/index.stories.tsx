import Spin from '.';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Spin',
  component: Spin,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
};

const Template: StoryFn = (args) => <Spin {...args} />;

export const Default = Template.bind({});
