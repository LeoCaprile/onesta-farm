import Select, { SelectProps } from '.';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Select',
  component: Select,
};

const Template: StoryFn<SelectProps> = (args: SelectProps) => (
  <Select {...args} />
);

export const Default = Template.bind({});
