import { Sidebar } from "@/features/AdminPage/Components/SideBar";
//import { DataTable } from "@/features/AdminPage/Components/TableComponent";

export function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar />
      {/* <main className="flex-1 p-6">

        <DataTable />
      </main> */}
    </div>
  )
}

