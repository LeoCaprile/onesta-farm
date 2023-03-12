import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  description?: string;
  title?: string;
}

const Layout = ({ children, description, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
