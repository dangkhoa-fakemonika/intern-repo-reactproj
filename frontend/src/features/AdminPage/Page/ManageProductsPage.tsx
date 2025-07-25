import { useState, useEffect } from 'react';
import { TableComponent } from '@/features/AdminPage/Components/TableComponent';
import { Products } from '@/shared/services/products';
import { type ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash } from 'lucide-react';

export function ManageProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: ColumnDef<Products>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: 'Product name',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: info => `${info.getValue<number>().toLocaleString()} ₫`,
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="space-x-2">
                  <button
          className="text-blue-500 hover:underline"
          onClick={() => alert(`Edit`)}
        >
          <PencilLine size={20} />
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => alert(`Delete`)}
        >
          <Trash size={20} />
        </button>
        </div>
      ),
    },
  ];


   useEffect(() => {
     let isMounted = true;
 
     const fetchUsers = async () => {
       setLoading(true);
       setError(null);
       try {
         const data = await Products.getProducts();
         if (isMounted) setProducts(data);
       }
       catch (err) {
         if (isMounted) setError(err.message || 'Loading product failed');
       } finally {
         if (isMounted) setLoading(false);
       }
     };
 
     fetchUsers();
     return () => { isMounted = false; };
   }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <TableComponent<Products>
        data={products}
        columns={columns}
        loading={loading}
        fileName="products.xlsx" 
      />
    </div>
  );
}
