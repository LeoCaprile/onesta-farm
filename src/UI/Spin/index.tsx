import React from 'react';

export interface SpinProps {
  size?: 'large' | 'medium' | 'small';
  tip?: string;
}

const Spin = ({ size, tip }: SpinProps) => {
  function getSize() {
    switch (size) {
      case 'large':
        return 'h-8 w-8 border-4';
      case 'medium':
        return 'h-6 w-6 border-4';
      case 'small':
        return 'h-4 w-4 border-2';
      default:
        return 'h-6 w-6';
    }
  }

  return (
    <div className="flex flex-col items-center w-fit">
      <div
        className={
          'rounded-full border-b-transparent animate-spin border-white ' +
          getSize()
        }
      />
      {tip && <div className="text-white text-[10px] ">{tip}</div>}
    </div>
  );
};

export default Spin;
