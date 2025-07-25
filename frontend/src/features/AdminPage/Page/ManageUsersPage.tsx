import { Users } from "@/shared/services/users";
import type { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { TableComponent } from '@/features/AdminPage/Components/TableComponent';

export function ManageUsers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: ColumnDef<Users>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'password',
      header: 'Password',
      cell: info => `${info.getValue<number>().toLocaleString()}`,
    },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="space-x-2">
          <button className="text-blue-500 hover:underline" onClick={() => alert(`Edit`)}>
            <PencilLine size={20} />
          </button>
          <button className="text-red-500 hover:underline" onClick={() => alert(`Delete`)}>
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
        const data = await Users.getAllUsers();
        if (isMounted) setUsers(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Loading users failed');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <TableComponent<Users>
        data={users}
        columns={columns}
        loading={loading}
        fileName="users.xlsx" 
      />
    </div>
  );
}
