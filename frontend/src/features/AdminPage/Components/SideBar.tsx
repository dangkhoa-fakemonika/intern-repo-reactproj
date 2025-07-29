import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import logo from '@/assets/images/logo_admin.png';
import logo_home from '@/assets/images/logo_home.png';
import logo_analytics from '@/assets/images/logo_analytics.png';
import logo_report from '@/assets/images/logo_report.png';
import logo_product from '@/assets/images/logo_product.png';
import logo_setting from '@/assets/images/logo_setting.png';
import logo_order from '@/assets/images/logo_order.png';
import logo_user from '@/assets/images/logo_user.png';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openMenu  = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = () => {
    if (window.innerWidth < 640) closeMenu();
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`fixed sm:static top-0 left-0 h-full w-64 bg-admin-palette text-gray-200 flex flex-col p-4 border-r-2 border-[#161b2e] z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
      >
        {isOpen && (
          <div className="sm:hidden flex justify-end mb-2">
            <button
              onClick={closeMenu}
              className="p-1 text-gray-400 hover:text-white focus:outline-none"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
        )}

        <div className="flex items-center mb-8">
          <img src={logo} alt="Logo" className="w-10 h-9 mr-3 rounded-[3px]" />
          <h1 className="text-2xl font-semibold">Ecomerce</h1>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto">
          <div>
            <h2 className="px-2 mb-2 text-gray-400 uppercase text-xs font-semibold">Dashboard</h2>
            <NavLink to="/admin/dashboard" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_home} className="w-5 h-5 mr-3" alt="" /> Dashboard
            </NavLink>
            <NavLink to="/admin/analytics" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_analytics} className="w-5 h-5 mr-3" alt="" /> Analytics
            </NavLink>
            <NavLink to="/admin/reports" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_report} className="w-5 h-5 mr-3" alt="" /> Reports
            </NavLink>
          </div>

          <div>
            <h2 className="px-2 mb-2 text-gray-400 uppercase text-xs font-semibold">Data</h2>
            <NavLink to="/admin/manageProducts" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_product} className="w-5 h-5 mr-3" alt="" /> Manage Products
            </NavLink>
            <NavLink to="/admin/manageUsers" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_user} className="w-5 h-5 mr-3" alt="" /> Manage Users
            </NavLink>
            <NavLink to="/admin/manageOrders" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_order} className="w-5 h-5 mr-3" alt="" /> Manage Order
            </NavLink>
          </div>
          <div>
            <h2 className="px-2 mb-2 text-gray-400 uppercase text-xs font-semibold">Settings</h2>
            <NavLink to="/admin/settings" onClick={handleNavClick} className="flex items-center px-4 py-2 rounded-lg text-sm !text-white hover:bg-blue-700 transition">
              <img src={logo_setting} className="w-5 h-5 mr-3" alt="" /> Settings
            </NavLink>
          </div>
        </nav>
      </aside>
          {!isOpen && (
        <button
          onClick={openMenu}
          className="sm:hidden fixed top-2 left-4 z-40 p-2 bg-blue-950 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity"
        />
      )}
    </div>
  );
}
