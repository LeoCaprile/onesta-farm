import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />;
    </>
  );
}
