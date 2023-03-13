import Breadcrumb from '@UI/Breadcrumb';
import Card from '@UI/Card';
import Container from '@UI/Container';
import Divider from '@UI/Divider';
import Layout from '@UI/Layout';
import Pagination from '@UI/Pagination';
import Table from '@UI/Table';
import { Client } from '@interfaces/clients';
import { TableHeaders } from '@interfaces/table';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { clientsRoutes } from 'src/Routes';
import { OnestaApiInstance } from 'src/services';

interface GrowersPageProps {
  clients: Client[];
  count: number;
  error?: boolean;
}

export default function GrowersPage({ clients, count }: GrowersPageProps) {
  const router = useRouter();

  const tableHeaders: Array<TableHeaders<Client>> = [
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
  ];

  return (
    <Layout
      title="Clientes ~ Onesta Farm"
      description="Information about our clients"
    >
      <Container className="p-12">
        <div>
          <Breadcrumb routes={clientsRoutes} />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-6">Clientes</h1>
          </div>
        </div>

        <Divider />

        <Card className="my-6 overflow-y-auto">
          <Table dataSource={clients} tableHeaders={tableHeaders} />
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
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const page = Number(ctx.query.page) || 1;

  try {
    const {
      data: { clients, count },
    } = await OnestaApiInstance.get('/clients', {
      params: { page: page || 1 },
    });

    return {
      props: {
        clients,
        count,
      },
    };
  } catch (e) {
    return {
      props: {
        clients: [],
        count: 0,
        error: true,
      },
    };
  }
}
