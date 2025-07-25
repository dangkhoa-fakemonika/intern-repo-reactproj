import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Star, PencilLine, Trash } from 'lucide-react';
import { topProducts } from '@/features/AdminPage/DefaultData';

export interface Product {
  number: number;
  name: string;
  image: string;
  description: string;
  price: number;
  status: string;
  rating: number;
}


const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'number',
    header: 'No.',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'name',
    header: 'Product',
    cell: info => info.getValue(),
  },
  {
    id: 'details',
    header: 'Details',
    cell: info => {
      const row = info.row.original;
      return (
        <div className="flex items-center gap-x-4">
          <img
            src={row.image}
            alt={row.name}
            className="w-14 h-14 rounded-lg object-cover max-w-full"
          />
          <div className="flex flex-col">
            <span>{row.name}</span>
            <span className="text-slate-600 text-sm whitespace-normal">
              {row.description}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: info => `$${info.getValue()}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: info => (
      <div className="flex items-center gap-x-2">
        <Star size={18} className="fill-yellow-600 stroke-yellow-600" />
        {info.getValue()}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => alert(`Edit ${row.original.name}`)}
        >
          <PencilLine size={20} />
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => alert(`Delete ${row.original.name}`)}
        >
          <Trash size={20} />
        </button>
      </div>
    ),
  },
];


export function DataTable() {
  const data = topProducts;

  const table = useReactTable<Product>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return ( 
   <div className="overflow-x-auto bg-admin-template rounded-lg p-4 border border-admin-template">
      <table className="w-full table-auto text-gray-200 divide-y-2 divide-blue-950">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={`px-4 py-2 text-left font-medium 
                    ${header.id === 'number' ? 'w-[50px]' : ''} 
                    ${header.id === 'name' ? 'w-[150px]' : ''} 
                    ${header.id === 'details' ? 'w-[300px]' : ''} 
                    ${header.id === 'price' ? 'w-[100px]' : ''}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="even:bg-gray-900"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
