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
  Select,
} from '@UI';
import { Client } from '@interfaces/clients';
import { Commodity, Variety } from '@interfaces/commodities';
import { Grower } from '@interfaces/growers';
import { Harvests, HarvestsAdapted } from '@interfaces/harvests';
import { Options } from '@interfaces/select';
import { TableHeaders } from '@interfaces/table';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { harvestRoutes } from 'src/Routes';
import { OnestaApiInstance } from 'src/services';
import { toast } from 'react-hot-toast';

interface GrowerFarms extends Options {
  farms: Options[];
}
interface CommoditiesVarieties extends Options {
  variety: Options[];
}
interface HarvestsPageProps {
  harvests: HarvestsAdapted[];
  clients: Options[];
  commodities: Array<CommoditiesVarieties>;
  growers: Array<GrowerFarms>;
  count: number;
  error?: boolean;
}

interface Inputs {
  growerId: string;
  farmId: string;
  commodityId: string;
  varietyId: string;
  clientId: string;
}

export default function HarvestsPage({
  harvests,
  commodities,
  clients,
  growers,
  count,
}: HarvestsPageProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [farms, setFarms] = useState<Options[]>();
  const [varieties, setVarieties] = useState<Options[]>();
  const [hasAllFields, setHasAllFields] = useState<boolean>(false);

  const { register, handleSubmit, watch, reset } = useForm<Inputs>();
  const router = useRouter();

  const watchGrower = watch('growerId');
  const watchCommodity = watch('commodityId');
  const watchAllFields = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const toastId = toast.loading('Creando cosecha...', { duration: 2000 });
      const response = await OnestaApiInstance.post('/harvests', data);
      if (response.status === 200) {
        toast.success('Cosecha creada correctamente');
        toast.dismiss(toastId);
        router.replace(router.asPath);
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al crear la cosecha');
    }

    reset();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const validateAllFields = Object.values(watchAllFields).every(Boolean);

    setHasAllFields(validateAllFields);
  }, [watchAllFields]);

  useEffect(() => {
    const growerFarm = growers?.find(
      (grower: Options) => grower.value === watchGrower,
    );
    setFarms(growerFarm?.farms);
    const commodityVariety = commodities?.find(
      (commodity: Options) => commodity.value === watchCommodity,
    );
    setVarieties(commodityVariety?.variety);
  }, [watchGrower, watchCommodity, growers, commodities]);

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
            <Button onClick={() => handleOpenModal()} icon="+">
              Agregar cosecha
            </Button>
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
          title={'Agregar cosecha'}
          footer={
            <Button
              disabled={!hasAllFields}
              onClick={handleSubmit(onSubmit)}
              htmlType="submit"
            >
              Agregar
            </Button>
          }
        >
          <form className="grid grid-cols-2 gap-5">
            <Select
              options={growers}
              title="Agricultor"
              {...register('growerId', { required: true })}
            />
            <Select
              options={farms}
              disabled={farms === undefined}
              title="Campo"
              {...register('farmId', { required: true })}
            />
            <Select
              options={commodities}
              title="Fruta"
              {...register('commodityId', { required: true })}
            />
            <Select
              options={varieties}
              disabled={varieties === undefined}
              title="Variedad"
              {...register('varietyId', { required: true })}
            />
            <Select
              options={clients}
              title="Cliente"
              {...register('clientId', { required: true })}
            />
          </form>
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

    const {
      data: { clients },
    } = await OnestaApiInstance.get('/clients');

    const {
      data: { commodities },
    } = await OnestaApiInstance.get('/commodities');

    const {
      data: { growers },
    } = await OnestaApiInstance.get('/growers');

    return {
      props: {
        clients: clients.map((client: Client) => ({
          value: client.id,
          label: client.name,
        })),
        commodities: commodities.map((commodity: Commodity) => ({
          value: commodity.id,
          label: commodity.name,
          variety: commodity.varieties.map((variety: Variety) => ({
            value: variety.id,
            label: variety.name,
          })),
        })),
        growers: growers.map((grower: Grower) => ({
          value: grower.id,
          label: grower.name,
          farms: grower.farms.map((farm) => ({
            value: farm.id,
            label: farm.name,
          })),
        })),
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
