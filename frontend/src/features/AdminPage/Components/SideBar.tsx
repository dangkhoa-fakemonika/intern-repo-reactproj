
import {NavLink } from 'react-router-dom';
import avatarMacDinh from '@/assets/images/avatar_mac_dinh.jpg';


export function Sidebar() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-gray-200 rounded-tr-4xl  flex flex-col p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-center">ADMINS PAGE</h1>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={avatarMacDinh}
            alt="User"
            className="h-20 w-20 rounded-full border-2"
          />
          <h1 className="mt-3 text-2xl font-bold">Khoi</h1>
          <p className="text-sm text-green-200">Anh Khoi Admin</p>
        </div>


        <nav className="flex-1">
          <div className="mb-4">
            <div><img src="" alt="" /></div>
            <NavLink
              to="/admin/dashboard"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition"
            >
              Dashboard
            </NavLink>
          </div>

          <div className="mb-4">
            <div className="px-2 mb-2 text-gray-400 uppercase text-xs font-semibold">
              Data
            </div>
            <NavLink
              to="/admin/manage-products"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition mb-1"
            >
              Manage Products
            </NavLink>
            <NavLink
              to="/admin/contacts-users"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition mb-1"
            >
            Manage Users
            </NavLink>
            <NavLink
              to="/admin/manage-order"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition"
            >
              Manage Order
            </NavLink>
          </div>

          <div className="mb-4">
            <div className="px-2 mb-2 text-gray-400 uppercase text-xs font-semibold">
              Charts
            </div>
            <NavLink
              to="/bar"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition mb-1"
            >
              Bar Chart
            </NavLink>
            <NavLink
              to="/pie"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition mb-1"
            >
              Pie Chart
            </NavLink>
            <NavLink
              to="/line"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700 transition mb-1"
            >
              Line Chart
            </NavLink>
            <NavLink
              to="/geography"
              className="block px-4 py-2 rounded-lg text-sm !text-white hover:bg-gray-700  transition mb-1"
            >
              Geography Chart
            </NavLink>
          </div>
        </nav>
      </aside>
    </div>
  );
}
