import { StoryFn } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from '.';

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
  argsTypes: {
    routes: {
      control: { type: 'array' },
    },
  },
};

const Template: StoryFn<BreadcrumbProps> = (args: BreadcrumbProps) => (
  <Breadcrumb {...args} />
);
export const Breadcrum = Template.bind({});

Breadcrum.args = {
  routes: [
    {
      path: '/about',
      name: 'About',
    },
    {
      path: '/about/our-team',
      name: 'Our Team',
    },
  ],
};
