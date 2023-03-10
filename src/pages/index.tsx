import Button from '@UI/Button';
import Container from '@UI/Container';
import Head from 'next/head';

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
        <h1 className="text-4xl font-bold">Home</h1>
        <p className="text-xl">Bienvenido a Onesta farm</p>
        <div className="flex gap-5">
          <Button icon="+" type="primary">
            Button
          </Button>
          <Button type="secondary">Button</Button>
          <Button type="link">Button</Button>
        </div>
      </main>
    </Container>
  );
}
