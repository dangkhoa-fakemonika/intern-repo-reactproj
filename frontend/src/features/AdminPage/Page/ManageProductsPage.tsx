import { useState, useEffect } from 'react';
import { TableComponent } from '@/features/AdminPage/Components/TableComponent';
import { Products } from '@/shared/services/products';
import { type ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash } from 'lucide-react';
import { AddProductsAndCategories } from '@/features/AddProductsAndCategories/AddProductsAndCategories';
import { Popover } from 'radix-ui';

export function ManageProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: ColumnDef<Products>[] = [
    { accessorKey: 'id',           
      header: 'ID',           
      size: 60,  
      enableResizing: false 
    },
    { accessorKey: 'title',         
      header: 'Product name', 
      size: 300 
    },
    {
      accessorKey: 'price',
      header: 'Price',
      size: 300,
      cell: info => `${info.getValue<number>().toLocaleString()} ₫`,
    },
    { accessorKey: 'category.name', header: 'Category',     size: 300 },
    {
      id: 'actions',
      header: 'Action',
      size: 170,
      cell: () => (
        <div className="space-x-2">
          <button className="text-blue-500 hover:underline" onClick={() => alert('Edit')}>
            <PencilLine size={20} />
          </button>
          <button className="text-red-500 hover:underline" onClick={() => alert('Delete')}>
            <Trash size={20} />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Products.getProducts();
        if (isMounted) setProducts(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Loading product failed');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="ml-2 bg-orange-400 text-white h-10 px-4 rounded">
              Add a Product
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="bottom"
              sideOffset={8}
              className="w-[600px] bg-admin-palette rounded-2xl max-h-[80vh] overflow-auto shadow-lg p-4 text-white"
            >
              <AddProductsAndCategories />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="p-4 w-full">
        <TableComponent<Products>
          data={products}
          columns={columns}
          loading={loading}
          fileName="products.xlsx"
        />
      </div>
    </div>
  );
}
