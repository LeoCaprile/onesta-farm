import {
  Breadcrumb,
  Button,
  Card,
  Container,
  Divider,
  Modal,
  Pagination,
  Layout,
  Table,
} from '@UI';
import { Harvests, HarvestsAdapted } from '@interfaces/harvests';
import { TableHeaders } from '@interfaces/table';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { harvestRoutes } from 'src/Routes';
import { OnestaApiInstance } from 'src/services';

interface HarvestsPageProps {
  harvests: HarvestsAdapted[];
  count: number;
  error?: boolean;
}

export default function HarvestsPage({ harvests, count }: HarvestsPageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();

  const tableHeaders: Array<TableHeaders<HarvestsAdapted>> = [
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
  ];

  return (
    <Layout
      title="Cosechas ~ Onesta Farm"
      description="Information about our farmers"
    >
      <Container className="p-12">
        <div>
          <Breadcrumb routes={harvestRoutes} />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-6">Cosechas</h1>
            <Button icon="+">Agregar cosecha</Button>
          </div>
        </div>

        <Divider />

        <Card className="my-6 overflow-y-auto">
          <Table dataSource={harvests} tableHeaders={tableHeaders} />
          <div className="flex justify-end mt-2">
            <Pagination
              count={count}
              onChange={(selectedPage) => {
                router.push(`${router.pathname}?page=${selectedPage}`);
              }}
              selectedPage={Number(router.query?.page) || 1}
            />
          </div>
        </Card>

        <Modal
          open={openModal}
          setOpenModal={setOpenModal}
          title={'Campos de '}
        >
          hola
        </Modal>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const page = Number(ctx.query.page) || 1;

  try {
    const {
      data: { harvests, count },
    } = await OnestaApiInstance.get('/harvests', {
      params: { page: page || 1 },
    });

    return {
      props: {
        harvests: harvests.map((harvest: Harvests) => ({
          id: harvest.id,
          grower: harvest.grower.name,
          commodity: harvest.commodity.name,
          variety: harvest.variety.name,
          farm: harvest.farm.name,
          client: harvest.client.name,
          createdAt: harvest.createdAt,
        })),
        count,
      },
    };
  } catch (e) {
    return {
      props: {
        harvests: [],
        count: 0,
        error: true,
      },
    };
  }
}
