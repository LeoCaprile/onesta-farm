import React from 'react';

interface TableHeaders {
  name: string;
  key: string | number;
}

interface DataSource extends Record<string, string | React.ReactNode | number> {
  key: string | number;
}

export interface TableProps {
  dataSource: Array<DataSource>;
  tableHeaders: Array<TableHeaders>;
}

function Table({ dataSource, tableHeaders }: TableProps) {
  return (
    <table className="text-left table-auto text-black text-xs border-spacing-y-2 w-full border-separate">
      <thead>
        <tr className="font-thin py-2">
          {tableHeaders.map((header) => (
            <td
              key={header.key}
              className="px-3 py-2 first:rounded-l-full border-r-[1px] last:rounded-r-full border-white bg-[#E9F1FF]"
            >
              {header.name}
            </td>
          ))}
        </tr>
      </thead>

      <tbody className="font-thin border-spacing-0">
        {dataSource?.map((data) => (
          <tr key={data.key} className="overflow-hidden shadow-sm rounded-xl">
            {Object.entries(data)?.map(([key, value]) => {
              if (tableHeaders.some((header) => header.key === key)) {
                return (
                  <td
                    key={key}
                    className="px-3 py-4 bg-white border-r-[1px] border-[#E8E8E8] first:rounded-l-xl last:rounded-r-xl"
                  >
                    {value}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
