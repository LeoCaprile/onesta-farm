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

const Template = (args: BreadcrumbProps) => <Breadcrumb {...args} />;
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
