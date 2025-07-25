import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type VisibilityState,
  type SortingState
} from '@tanstack/react-table';
import { type ProductFilter } from '@/shared/types/type';
import icon_next from '@/assets/images/icon_next.png';
import icon_previous from '@/assets/images/icon_previous.png';
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react';
import icon_setting from '@/assets/images/logo_setting.png';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu';
import { downloadtoExcel, type ExportPage } from '@/lib/xlxx'; 
import { useState } from 'react';

interface TableComponentProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  defaultPageSize?: number;
  fileName?: string;                                      
  onExport?: (data: T[], fileName?: string) => void;      
  onSearch?: (query: string) => void;
  onSort?: (field: string, order: 'asc' | 'desc') => void;
  onFilter?: (filter: Partial<ProductFilter>) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function TableComponent<T>({
  data,
  columns,
  loading,
  defaultPageSize = 10,
  fileName,
  onExport,
}: TableComponentProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pageIndex, setPageIndex] = useState(0);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
      pagination: { pageIndex, pageSize },
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: updater => {
      const next = typeof updater === 'function'
        ? updater({ pageIndex, pageSize })
        : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize, pageIndex: 0 } },
    autoResetPageIndex: false,
  });

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0);
    table.setPageSize(newSize);
  };

   const handleExportClick = () => {
    let key = fileName ? fileName.replace(/\.xlsx$/i, '') : 'data';
    if (key.endsWith('s')) key = key.slice(0, -1);
    const pageKey = key as ExportPage;

    if (onExport) {
      onExport(data, pageKey);
    } else {
      downloadtoExcel(pageKey);
    }
  };
  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <input
            type="text"
            value={filtering}
            onChange={e => setFiltering(e.target.value)}
            placeholder="Search..."
            className="mb-4 p-2 w-[300px] bg-[#0A0E2C] text-gray-200 border border-gray-700 rounded focus:outline-none"
          />
          <button
            onClick={handleExportClick}
            className="ml-4 h-10 p-2 bg-green-700 rounded-[5px]"
          >
            Export to Excel
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img src={icon_setting} className="h-5 px-4" alt={"setting-icon"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(col => col.getCanHide()).map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={v => col.toggleVisibility(v)}
                className="capitalize"
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* pagination */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {[5, 10, 15, 20, 25].map(size => (
            <button
              key={size}
              onClick={() => handlePageSizeChange(size)}
              className={`px-3 py-1 rounded ${
                pageSize === size ? 'bg-blue-950 text-white' : 'bg-gray-700 text-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 w-8 h-8 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
          >
            <img src={icon_previous} alt="Previous" />
          </button>
          <span className="text-gray-200 bg-[#0A0E2C] px-3 py-1 rounded">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 w-8 h-8 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
          >
            <img src={icon_next} alt="Next" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#020517] rounded-lg shadow-md border border-gray-600">
        <table className="min-w-full table-fixed divide-y divide-gray-700">
          <thead className="bg-[#0A0E2C]">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-200 cursor-pointer select-none"
                    style={{ width: header.column.columnDef.width }}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ChevronUpIcon size={16} />,
                        desc: <ChevronDownIcon size={16} />,
                      }[header.column.getIsSorted() as string] ?? <ChevronsUpDownIcon size={16} />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-[#020517] divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-[#1A224F]">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
}