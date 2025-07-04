import logo from "@/assets/images/logo.png"
import icon_cart from "@/assets/images/icon_cart.png"
import icon_search from "@/assets/images/icon_search.png"
import icon_heart from "@/assets/images/icon_heart.png"
import icon_menu from "@/assets/images/icon_menu.png"
import {FaCaretDown} from "react-icons/fa";
import {useEffect, useState} from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";
import Cookies from "js-cookie";
import { axiosInstance, Categories} from "@/shared/services/services.ts";
import {NavLink} from "react-router-dom";
import '@/shared/styles/index.css'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";


type Category = {
  id: number;
  name: string;
};
type Users = { name: string; role: string};
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user ,setUser] = useState<Users | null>(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Categories.getCategories();
        setCategories(data as Category[]);
      } catch (err) {
        console.error(err);
        setError('Không tải được danh mục');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  
    useEffect(() => {
      const token = Cookies.get("access_token");
      if (token) {
        axiosInstance
          .get<Users>("/auth/profile") 
          .then(res => setUser(res.data))
          .catch(err => {
            console.error("Không lấy được thông tin user:", err);
          });
      }

    }, []);
      const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove('current_user');
    window.location.href = '/';
    setUser(null);
  };
  return (
    <div className="w-full h-full relative">
      <div
        className="hidden md:flex items-center justify-between text-gray-500 text-xs h-6 border-b border-gray-200 px-4 mt-3">
        <span className="px-10">+84 123 456 789</span>
        <span className="px-4">Trang mua sắm trực tuyến uy tín hàng đầu</span>
         {user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <div className="flex items-center space-x-1 px-4 whitespace-nowrap cursor-pointer text-[13.5px] text-gray-500 hover:text-gray-700">
                  Xin chào, <strong>{user.name}</strong> <FaCaretDown />
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                side="bottom"       
                align="start"
                className="absolute w-35 bg-white shadow-lg rounded-md p-2 z-[9999]"
                sideOffset={4}
                >
                  <DropdownMenu.Group>
                    {user.role === 'admin' && (
                      <DropdownMenu.Item className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-500 text-sm hover:text-gray-700">
                        <NavLink
                          to="/admin/dashboard"
                          className="w-full text-left text-sm !text-gray-500 hover:text-gray-700 !no-underline"
                        >
                          Quản lý hệ thống
                        </NavLink>
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Item className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-500 text-sm hover:text-gray-700 ">
                      <NavLink
                        to="/auth/userpage"
                        className="w-full text-left text-sm !text-gray-500 hover:text-gray-700 !no-underline"
                      >
                        Trang cá nhân
                      </NavLink>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  
                  <DropdownMenu.Item
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-500 text-sm hover:text-gray-700"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <span className="flex items-center space-x-1 px-4 whitespace-nowrap">
              <NavLink
                to="/auth/login"
                className="!text-gray-500 !no-underline hover:text-gray-700"
              >
                Đăng nhập
              </NavLink>
              <span className="text-gray-500">/</span>
              <NavLink
                to="/auth/register"
                className="!text-gray-500 !no-underline hover:text-gray-700"
              >
                Đăng ký
              </NavLink>
            </span>
          )}
      </div>

      <header
        className="flex items-center justify-between text-black py-1 px-6 md:px-10 bg-white border-b border-gray-200 ">
        <NavLink to={"/"}>
          <img src={logo} alt="" className="w-30 h-18 hover:scale-105 transition-all"/>
        </NavLink>
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base mt-2">
          <NavLink to={"/"} className="p-3 !font-extrabold hover:scale-105 text-bold transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">
            Trang chủ
          </NavLink>
          <li className="p-3 hover:scale-105 transition-all cursor-pointer group">
            <NavLink to={"/products"}
                className="flex items-center gap-[2px] !font-extrabold !text-black !no-underline group-hover:!text-[#F09728]">
              Sản phẩm
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180"/>
              </span>
            </NavLink>
            <div
              className="absolute z-[9999]  hidden group-hover:block w-[180px] rounded-md bg-white p-2 text-black shadow-lg">
              {error && (
                <p className="text-red-500 text-sm mb-2 px-2">{error}</p>
              )}

              {isloading ? (
                <div className="flex justify-center py-4">
                  <LoadingComponent/>
                </div>
              ) : (
                <ul className="w-full space-y-1">
                  {categories.map((categories) => (
                    <li
                      key={categories.id}
                      className="p-2 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] break-words"
                    >
                      <NavLink
                        to={`/products/category/${categories.id}`}
                        className="!text-black !no-underline break-words"
                      >
                        {categories.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <NavLink to={"/"} className="p-3 !font-extrabold hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Bài viết</NavLink>
          <NavLink to={"/"} className="p-3 !font-extrabold hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Liên hệ</NavLink>
          <NavLink to={"/"} className="p-3 !font-extrabold hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Về chúng tôi</NavLink>
        </ul>

        <div className="relative hidden md:flex items-center justify-center gap-3">
          <div className="relative group hidden sm:block">
            <input type="text" placeholder="Search" className="search-bar"/>
            <i
              className="w-8 h-8 p-0.5 mt-1 hover:scale-105  transition-all cursor-pointer absolute -translate-y-1 right-2"><img
              src={icon_search} alt=""/></i>
          </div>
          <i className="w-8 h-8  p-0.5 hover:scale-105  transition-all cursor-pointer"
             onClick={() => alert("Bạn chưa có sản phẩm yêu thích!")}><img src={icon_heart} alt=""/></i>
          <i className="w-8 h-8  p-0.5 hover:scale-105  transition-all cursor-pointer"
             onClick={() => alert("Chưa có sản phẩm trong giỏ hàng!")}><img src={icon_cart} alt=""/></i>
        </div>


        <i className=" w-10 h-10 xl:hidden block text-5x1 cursor-pointer"
           onClick={() => setIsMenuOpen(!isMenuOpen)}><img src={icon_menu} alt=""/></i>
        <div className={`absolute xl:hidden top-20 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform
        ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Trang
            chủ
          </NavLink>
          <NavLink to={"/products"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Sản
            phẩm
          </NavLink>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Bài
            viết
          </NavLink>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Liên
            hệ
          </NavLink>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline ">Về
            chúng tôi
          </NavLink>
        </div>
      </header>
    </div>
  )
}

export default NavBar
