import Card from '@UI/Card';
import Container from '@UI/Container';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Container className="grid place-content-center h-screen">
      <Head>
        <title>Home ~ Onesta Farm</title>
        <meta
          name="description"
          content="Onesta Farm the application for the farm"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col items-center mb-5">
          <Image
            draggable={false}
            width={300}
            height={100}
            src="/logo.png"
            alt="logo"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Link href="/farmers">
            <Card className="flex flex-col items-center hover:scale-105 transition-transform">
              <Image width={100} height={100} src="/farmer.png" alt="cliente" />
              <h2 className="text-xl mt-2">Agricultores</h2>
            </Card>
          </Link>
          <Link href="/clients">
            <Card className="flex flex-col items-center hover:scale-105 transition-transform">
              <Image width={100} height={100} src="/client.png" alt="cliente" />
              <h2 className="text-xl mt-2">Clientes</h2>
            </Card>
          </Link>
          <Link href="/crops">
            <Card className="flex flex-col items-center hover:scale-105 transition-transform">
              <Image width={100} height={100} src="/crops.png" alt="cliente" />
              <h2 className="text-xl mt-2">Cosechas</h2>
            </Card>
          </Link>
          <Link href="/fruits">
            <Card className="flex flex-col items-center hover:scale-105 transition-transform">
              <Image width={100} height={100} src="/fruits.png" alt="cliente" />
              <h2 className="text-xl mt-2">Frutas</h2>
            </Card>
          </Link>
        </div>
      </main>
    </Container>
  );
}
