import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon_search from '@/assets/images/icon_search.png';
import avatar_default from '@/assets/images/avatar_mac_dinh.jpg';
import icon_bell from '@/assets/images/logo_bell.png';
export function TopBar() {
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (searchTitle.trim()) {
      navigate(`/products/title/${searchTitle}`);
    }
  };

  return (
    <header className="relative w-full z-10 flex h-[60px] items-center bg-admin-palette px-4 shadow-md border-2 border-[#161b2e] transition-colors dark:bg-slate-900">
      <div className="flex items-center justify-between w-full">
        <div className="hidden sm:block">
          <form onSubmit={handleSearch} className="relative w-80">
            <input
              type="text"
              id="search-value"
              placeholder="Search"
              className="w-full bg-transparent text-white placeholder-white outline-none py-2 pl-4 pr-10 border border-white rounded-2xl transition focus:ring-2 focus:ring-white/50"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 focus:outline-none"
            >
              <img src={icon_search} alt="search" className="w-5 h-5 filter invert" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-x-3 sm:ml-auto max-sm:ml-auto">
          <div className="relative sm:hidden group">
            <div>
              <form onSubmit={handleSearch}>
                <input type="text" id={"search-value"} placeholder="Search" className="search-bar" //value={searchTitle}//onChange={(e) => setSearchTitle(e.target.value)}
                />
              </form>
              <i
              className=" w-8 h-8 p-0.5 -mt-7  filter invert hover:scale-105  transition-all cursor-pointer absolute -translate-y-1 right-2"><img
              src={icon_search} alt=""/></i>
            </div>
          </div>
          <button className="w-10 h-10 overflow-hidden justify-center">
            <img src={icon_bell} alt="" />
          </button>
          <button className="size-10 overflow-hidden rounded-full">
            <img src={avatar_default} alt="profile image" className="size-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}