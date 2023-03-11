import Button, { ButtonProps } from '.';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'secondary', 'link'],
      control: { type: 'radio' },
    },
    size: {
      options: ['normal', 'large'],
      control: { type: 'radio' },
    },
    icon: {
      options: ['+', '-', null],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <Button {...args}>Button</Button>
);
export const Primary = Template.bind({});
