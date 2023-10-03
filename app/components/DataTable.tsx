import React, { useMemo, useState } from 'react';
import TextField from './TextField';
import Button from './Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface DataTableColumn<T> {
  key: React.Key;
  label: string;
  render: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  className?: string;
  canSearch?: boolean;
  createLink?: string;
}

function TableSearch({ setSearch }: { setSearch: (s: string) => void }) {
  return (
    <TextField
      className="flex-grow"
      label="Search"
      name="search"
      type="text"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

/**
 * Generic data table component, suitable for modeling basic data types.
 */
export default function DataTable<T extends { id: React.Key }>({
  data,
  columns,
  className,
  canSearch,
  createLink,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (search && search.trim().length > 0) {
      // call column render function for each column, and check if any of them
      // contain the search term
      const searchLower = search.toLowerCase();
      return data.filter((row) =>
        columns.some((column) => {
          const rendered = column.render(row);
          return rendered && rendered.toString().toLowerCase().includes(searchLower);
        }),
      );
    }
    return data;
  }, [columns, data, search]);

  return (
    <div>
      <div className="flex flex-row w-full space-x-2 mb-4">
        {canSearch && <TableSearch setSearch={setSearch} />}
        {createLink && <Button icon={faPlus} label="Create" href={createLink} />}
      </div>
      <div className={`flex-grow overflow-auto rounded-md ${className}`}>
        <table className="relative w-full max-h-screen border overflow-auto">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column.key} className="border px-4 py-2">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
