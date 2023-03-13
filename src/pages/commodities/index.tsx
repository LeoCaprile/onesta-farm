import Breadcrumb from '@UI/Breadcrumb';
import Button from '@UI/Button';
import Card from '@UI/Card';
import Container from '@UI/Container';
import Divider from '@UI/Divider';
import Layout from '@UI/Layout';
import Modal from '@UI/Modal';
import Pagination from '@UI/Pagination';
import Table from '@UI/Table';
import { Commodity, Variety } from '@interfaces/commodities';
import { TableHeaders } from '@interfaces/table';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { commoditiesRoutes } from 'src/Routes';
import { OnestaApiInstance } from 'src/services';

interface GrowersPageProps {
  commodities: Commodity[];
  count: number;
  error?: boolean;
}

export default function GrowersPage({ commodities, count }: GrowersPageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFruit, setSelectedFruit] = useState<Commodity>();

  const router = useRouter();

  const tableHeaders: Array<TableHeaders<Commodity>> = [
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'varieties',
      name: 'Variedades',
      render: (row) => (
        <Button
          onClick={() => {
            setSelectedFruit(row);
            setOpenModal(true);
          }}
        >
          Ver Variedades
        </Button>
      ),
    },
  ];

  const farmsTableHeaders: Array<TableHeaders<Variety>> = [
    {
      key: 'name',
      name: 'Nombre',
    },
  ];

  return (
    <Layout
      title="Frutas ~ Onesta Farm"
      description="Information about our farmers"
    >
      <Container className="p-12">
        <div>
          <Breadcrumb routes={commoditiesRoutes} />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-6">Frutas</h1>
          </div>
        </div>

        <Divider />

        <Card className="my-6 overflow-y-auto">
          <Table dataSource={commodities} tableHeaders={tableHeaders} />
          <div className="flex justify-end mt-2">
            <Pagination
              count={count}
              onChange={(selectedPage) => {
                router.push(`/growers?page=${selectedPage}`);
              }}
              selectedPage={Number(router.query?.page) || 1}
            />
          </div>
        </Card>

        <Modal
          open={openModal}
          setOpenModal={setOpenModal}
          title={'Variedades de ' + selectedFruit?.name}
        >
          <Table
            dataSource={selectedFruit?.varieties || []}
            tableHeaders={farmsTableHeaders}
          />
        </Modal>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const page = Number(ctx.query.page) || 1;

  try {
    const {
      data: { commodities, count },
    } = await OnestaApiInstance.get('/commodities', {
      params: { page: page || 1 },
    });

    return {
      props: {
        commodities,
        count,
      },
    };
  } catch (e) {
    return {
      props: {
        commodities: [],
        count: 0,
        error: true,
      },
    };
  }
}
