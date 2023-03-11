import Pagination, { PaginationProps } from '.';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Pagination',
  component: Pagination,
};

const Template: StoryFn<PaginationProps> = (args: PaginationProps) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});

Default.args = {
  count: 100,
  selectedPage: 1,
  onChange: function (page: number) {
    this.selectedPage = page;
  },
};
