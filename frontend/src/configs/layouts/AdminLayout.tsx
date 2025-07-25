import { Sidebar } from '@/features/AdminPage/Components/SideBar';
import { TopBar } from '@/features/AdminPage/Components/TopBar';
import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-admin-template text-gray-200">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <div className='sticky top-0 z-20'>
              <TopBar />
            </div>
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
  );
}