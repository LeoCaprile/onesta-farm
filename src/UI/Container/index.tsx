import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: Props) => {
  return <div className={'w-full h-screen ' + className}>{children}</div>;
};

export default Container;
