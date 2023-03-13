import { Route } from '@interfaces/route';
import Link from 'next/link';
import React from 'react';

export interface BreadcrumbProps {
  routes: Array<Route>;
}

const Breadcrumb = ({ routes }: BreadcrumbProps) => {
  return (
    <nav>
      <Link href="/">Home</Link> /{' '}
      {routes?.map(({ name, path }, index) => {
        if (index === routes.length - 1) {
          return (
            <Link key={path} href={path}>
              {name}
            </Link>
          );
        }
        return (
          <Link key={path} href={path}>
            {name} /{' '}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
