import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <NextNProgress />
      <Component {...pageProps} />;
    </>
  );
}
