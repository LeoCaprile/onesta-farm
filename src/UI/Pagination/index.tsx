import React from 'react';

export interface PaginationProps {
  onChange: (page: number) => void;
  selectedPage: number;
  count: number;
}

const Pagination = ({ count, onChange, selectedPage }: PaginationProps) => {
  const pages = Array(Math.ceil(count / 10)).fill('');

  return (
    <div className="text-black flex gap-2 ">
      <button className="w-7 h-7 rounded-[6px] hover:bg-[#E9F1FF] hover:text-[#034BE5] bg-[#FFFFFF] border-2 border-[#F9F9F9]">
        &lt;
      </button>

      {pages.map((_, index) => {
        const page = index + 1;
        if (page === selectedPage) {
          return (
            <button
              key={page}
              className="w-7 h-7 text-white rounded-[6px] bg-[#034BE5]"
            >
              {page}
            </button>
          );
        }
        return (
          <button
            key={page}
            className="w-7 h-7 hover:bg-[#E9F1FF] hover:text-[#034BE5] rounded-[6px] bg-[#FFFFFF] border-2 border-[#F9F9F9]"
            onClick={() => {
              onChange(page);
            }}
          >
            {page}
          </button>
        );
      })}

      <button className="w-7 h-7 rounded-[6px] hover:bg-[#E9F1FF] hover:text-[#034BE5] bg-[#FFFFFF] border-2 border-[#F9F9F9]">
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
