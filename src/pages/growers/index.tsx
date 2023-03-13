import Breadcrumb from '@UI/Breadcrumb';
import Button from '@UI/Button';
import Card from '@UI/Card';
import Container from '@UI/Container';
import Divider from '@UI/Divider';
import Layout from '@UI/Layout';
import Modal from '@UI/Modal';
import Pagination from '@UI/Pagination';
import Table from '@UI/Table';
import { Grower } from '@interfaces/growers';
import { Farm } from '@interfaces/harvests';
import { TableHeaders } from '@interfaces/table';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { growersRoutes } from 'src/Routes';
import { OnestaApiInstance } from 'src/services';

interface GrowersPageProps {
  growers: Grower[];
  count: number;
  error?: boolean;
}

export default function GrowersPage({ growers, count }: GrowersPageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Grower>();

  const router = useRouter();

  const tableHeaders: Array<TableHeaders<Grower>> = [
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'lastName',
      name: 'Apellido',
    },
    {
      key: 'email',
      name: 'Correo',
    },
    {
      key: 'farms',
      name: 'Campos',
      render: (row) => (
        <Button
          onClick={() => {
            setSelectedFarmer(row);
            setOpenModal(true);
          }}
        >
          Ver Campos
        </Button>
      ),
    },
  ];

  const farmsTableHeaders: Array<TableHeaders<Farm>> = [
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'address',
      name: 'Dirección',
    },
  ];

  return (
    <Layout
      title="Agricultores ~ Onesta Farm"
      description="Information about our farmers"
    >
      <Container className="p-12">
        <div>
          <Breadcrumb routes={growersRoutes} />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-6">Agricultores</h1>
          </div>
        </div>

        <Divider />

        <Card className="my-6 overflow-y-auto">
          <Table dataSource={growers} tableHeaders={tableHeaders} />
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
          title={
            'Campos de ' + selectedFarmer?.name + ' ' + selectedFarmer?.lastName
          }
        >
          <Table
            dataSource={selectedFarmer?.farms || []}
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
      data: { growers, count },
    } = await OnestaApiInstance.get('/growers', {
      params: { page: page || 1 },
    });

    return {
      props: {
        growers,
        count,
      },
    };
  } catch (e) {
    return {
      props: {
        growers: [],
        count: 0,
        error: true,
      },
    };
  }
}
