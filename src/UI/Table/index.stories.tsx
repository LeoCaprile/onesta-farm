import { Harvests } from '@interfaces/harvests';
import { StoryFn } from '@storybook/react';
import Table, { TableProps } from '.';
import { harvestsData } from './data';

export default {
  title: 'Table',
  component: Table,
};

const Template: StoryFn<TableProps> = (args: TableProps) => <Table {...args} />;
export const Default = Template.bind({});

Default.args = {
  tableHeaders: [
    {
      name: 'Agricultor',
      key: 'grower',
    },
    {
      name: 'Fruta',
      key: 'commodity',
    },
    {
      name: 'Variedad',
      key: 'variety',
    },
    {
      name: 'Campo',
      key: 'farm',
    },
    {
      name: 'Cliente',
      key: 'client',
    },
  ],
  dataSource: harvestsData.map((harvest: Harvests) => ({
    key: harvest.id,
    grower: harvest.grower.name,
    commodity: harvest.commodity.name,
    variety: harvest.variety.name,
    farm: harvest.farm.name,
    client: harvest.client.name,
    createdAt: harvest.createdAt,
  })),
};
