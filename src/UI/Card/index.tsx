import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={
        'p-5 rounded-lg shadow-md border border-[$F5F5F5] w-full ' + className
      }
    >
      {children}
    </div>
  );
};

export default Card;
