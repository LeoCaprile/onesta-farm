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
      <button
        onClick={() => {
          onChange(selectedPage - 1);
        }}
        className={`w-7 h-7 rounded-[6px]  border-2 border-[#F9F9F9] ${
          selectedPage <= 1
            ? 'bg-[#E8E8E8] text-[#858585]'
            : 'hover:bg-[#E9F1FF] hover:text-[#034BE5] bg-[#FFFFFF]'
        } }`}
      >
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

      <button
        onClick={() => {
          onChange(selectedPage + 1);
        }}
        className={`w-7 h-7 rounded-[6px]  border-2 border-[#F9F9F9] ${
          selectedPage >= pages.length
            ? 'bg-[#E8E8E8] text-[#858585]'
            : 'hover:bg-[#E9F1FF] hover:text-[#034BE5] bg-[#FFFFFF]'
        } }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
