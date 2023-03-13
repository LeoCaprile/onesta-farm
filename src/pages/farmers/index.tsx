import Breadcrumb from '@UI/Breadcrumb';
import Button from '@UI/Button';
import Card from '@UI/Card';
import Container from '@UI/Container';
import Divider from '@UI/Divider';
import Layout from '@UI/Layout';
import Modal from '@UI/Modal';
import Pagination from '@UI/Pagination';
import Table from '@UI/Table';
import { AdaptedFarmer } from '@interfaces/farmers';
import { Farm } from '@interfaces/harvests';
import { TableHeaders } from '@interfaces/table';
import { useState } from 'react';
import { routes } from 'src/Routes';

export default function FarmersPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFarmer, setSelectedFarmer] = useState<AdaptedFarmer>();

  const tableHeaders: Array<TableHeaders<AdaptedFarmer>> = [
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

  const dataSource: AdaptedFarmer[] = [
    {
      id: '5e9eb8b7-3618-45c2-9cee-9f86879b26bb',
      name: 'string',
      lastName: 'string',
      email: 'user@example.com',
      farms: [
        {
          id: '9a5d5d5b-aa08-44b3-9f59-395b52694bb1',
          name: 'string',
          address: 'string',
        },
      ],
    },
    {
      id: '425cee53-a3fe-4fb3-91b6-bf774ff69020',
      name: 'Grower',
      lastName: 'Last Name 18',
      email: 'grower18@email.com',
      farms: [
        {
          id: '085f0f27-0c6e-4414-a316-8c5ee28f654e',
          name: 'Grower Farm 5-18',
          address: 'Farm 5, Country 18',
        },
        {
          id: 'd1e26efa-c263-4528-9f9d-c8cba4932885',
          name: 'Grower Farm 4-18',
          address: 'Farm 4, Country 18',
        },
        {
          id: '8862172a-107a-46fa-a866-77693fece3ec',
          name: 'Grower Farm 3-18',
          address: 'Farm 3, Country 18',
        },
        {
          id: 'e998ba72-3219-4d10-8627-3e138d674125',
          name: 'Grower Farm 2-18',
          address: 'Farm 2, Country 18',
        },
        {
          id: '8b57884a-3627-483c-823e-dbd35089a920',
          name: 'Grower Farm 1-18',
          address: 'Farm 1, Country 18',
        },
        {
          id: 'ac7f7f72-db89-4d4b-bd90-c9a5269d5e08',
          name: 'Grower Farm 6-18',
          address: 'Farm 6, Country 18',
        },
      ],
    },
  ];

  return (
    <Layout
      title="Agricultores ~ Onesta Farm"
      description="Information about our farmers"
    >
      <Container className="p-12">
        <div>
          <Breadcrumb routes={routes} />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-6">Agricultores</h1>
          </div>
        </div>

        <Divider />

        <Card className="my-6 overflow-y-auto">
          <Table dataSource={dataSource} tableHeaders={tableHeaders} />
          <div className="flex justify-end mt-2">
            <Pagination count={32} onChange={() => {}} selectedPage={2} />
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

export function getServerSideProps() {
  return {
    props: {},
  };
}
