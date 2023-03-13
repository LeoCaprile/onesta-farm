import { TableHeaders } from '@interfaces/table';
import React from 'react';

export interface TableProps<TableData> {
  dataSource: Array<TableData & { id?: string | number }>;
  tableHeaders: Array<TableHeaders<TableData>>;
}

function Table<TableData>({ dataSource, tableHeaders }: TableProps<TableData>) {
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
          <tr key={data.id} className="overflow-hidden shadow-md rounded-xl">
            {Object.entries(data)?.map(([key, value]) => {
              if (tableHeaders.some((header) => header.key === key)) {
                if (
                  tableHeaders.find((header) => header.key === key)?.render !==
                  undefined
                ) {
                  return (
                    <td
                      key={key}
                      className="px-3 py-2 first:rounded-l-full border-r-[1px] last:rounded-r-full border-white bg-white"
                    >
                      {tableHeaders
                        .find((header) => header.key === key)
                        ?.render?.(data, dataSource)}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={key}
                      className="px-3 py-4 bg-white border-r-[1px] border-[#E8E8E8] first:rounded-l-xl last:rounded-r-xl"
                    >
                      {value}
                    </td>
                  );
                }
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
