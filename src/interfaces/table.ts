export interface TableHeaders<TableData> {
  name: string;
  key: string | number;
  render?: (record: TableData, allRecords: TableData[]) => React.ReactNode;
}
