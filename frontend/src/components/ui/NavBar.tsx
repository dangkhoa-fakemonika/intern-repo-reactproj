import logo from "@/assets/images/logo.png"
import icon_cart from "@/assets/images/icon_cart.png"
import icon_search from "@/assets/images/icon_search.png"
import icon_heart from "@/assets/images/icon_heart.png"
import icon_menu from "@/assets/images/icon_menu.png"
import {FaCaretDown} from "react-icons/fa";
import {useEffect, useState} from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";
// import Cookies from "js-cookie";
import {axiosInstance, Categories} from "@/shared/services/services.ts";
import {NavLink} from "react-router-dom";
import '@/shared/styles/index.css'
import { DropdownMenu } from "radix-ui";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/shared/stores/store.ts"
import {updateAccessToken, updateRefreshToken, updateUser} from "@/shared/stores/states/user.ts";
import {useNavigate} from "react-router";


type Category = {
  id: number,
  slug : string,
  name: string
};

type Users = { name: string; role: string };

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Users | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const cartState = useSelector((state: RootState) => state.shoppingCart);
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Categories.getCategories();
        setCategories(data as Category[]);
      } catch (err) {
        console.error(err);
        setError("Can't load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    // const token = Cookies.get("access_token");
    const token = userState.access_token;

    if (token) {
      axiosInstance
        .get<Users>("/auth/profile")
        .then(res => setUser(res.data))
        .catch(err => {
          console.error("Can't find user info ", err);
        });
    }

  }, [userState.access_token]);

  const handleSearch = () => {
    navigate(`products/title/${searchTitle}`);
  };

  const handleLogout = () => {
    // Cookies.remove("access_token");
    // Cookies.remove('current_user');
    dispatch(updateAccessToken(undefined));
    dispatch(updateRefreshToken({refresh_token: undefined, max_age: undefined}));
    dispatch(updateUser(undefined));

    window.location.href = '/';
    setUser(null);
  };
  return (
    <div className="w-full h-full relative">

      <div
        className="hidden md:flex items-center justify-between text-gray-500 text-xs h-6 border-b border-gray-200 px-4 mt-3">
        <span className="px-10">+84 123 456 789</span>
        <span className="px-4">Shop with confidence at the Premier Online Marketplace</span>
         {user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <div className="flex items-center space-x-1 px-4 whitespace-nowrap cursor-pointer text-[13.5px] text-gray-500 hover:text-gray-700">
                  Welcome, <strong>{user.name}</strong> <FaCaretDown />
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
                          System management
                        </NavLink>
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Item className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-500 text-sm hover:text-gray-700 ">
                      <NavLink
                        to="/auth/userpage"
                        className="w-full text-left text-sm !text-gray-500 hover:text-gray-700 !no-underline"
                      >
                        Personal information
                      </NavLink>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>

                  <DropdownMenu.Item
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-500 text-sm hover:text-gray-700"
                    onClick={handleLogout}
                  >
                    Logout
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
                Login
              </NavLink>
              <span className="text-gray-500">/</span>
              <NavLink
                to="/auth/register"
                className="!text-gray-500 !no-underline hover:text-gray-700"
              >
                Register
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
          <NavLink to={"/"} className="p-3 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">
            Home
          </NavLink>
          <li className="p-3 hover:scale-105 transition-all cursor-pointer group">
            <NavLink to={"/products"}
                className="flex items-center gap-[2px] !text-black !no-underline group-hover:!text-[#F09728]">
              Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180"/>
              </span>
            </NavLink>
            <div
              className="absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white p-2 text-black shadow-lg">
              {error && (
                <p className="text-red-500 text-sm mb-2 px-2">{error}</p>
              )}

              {isLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingComponent/>
                </div>
              ) : (
                <ul className="w-full space-y-1">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="p-2 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] break-words"
                    >
                      <NavLink
                        to={`/products/category/${category.id}`}
                        className="!text-black !no-underline break-words"
                        onClick={() => {
                          navigate(`/products/category/${category.slug}`);
                          window.location.reload();
                        }}
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <NavLink to={"/"} className="p-3 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Blogs</NavLink>
          <NavLink to={"/"} className="p-3 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Contacts</NavLink>
          <NavLink to={"/"} className="p-3 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">About Us</NavLink>
        </ul>

        <div className="relative hidden md:flex items-center justify-center gap-3">
          <div className="relative group hidden sm:block">
            <form onSubmit={() => handleSearch()} className={"relative"}>
              <input type="text" id={"search-value"} placeholder="Search" className="search-bar" value={searchTitle} onChange={(event) => {setSearchTitle(event.target.value)}}/>
            </form>
            <i
              className="w-8 h-8 p-0.5 -mt-7 hover:scale-105  transition-all cursor-pointer absolute -translate-y-1 right-2"><img
              src={icon_search} alt=""/></i>
          </div>
          <i className="w-8 h-8  p-0.5 hover:scale-105  transition-all cursor-pointer"
             onClick={() => alert("Bạn chưa có sản phẩm yêu thích!")}><img src={icon_heart} alt=""/></i>
          <NavLink to={"/shopping-cart"}
                   className="relative w-8 h-8 px-0.5 scale-110 hover:scale-125  transition-all cursor-pointer">
            <img src={icon_cart} alt="" className={"absolute"}/>
            <div
              className={"relative scale-75 block text-xs text-white bg-red-600 pt-1.5 left-3 -top-1.5 rounded-xl aspect-square text-center align-middle font-bold"}
              hidden={cartState.cartContent.length === 0}
            >
              {cartState.cartContent.length}
            </div>
          </NavLink>
        </div>


        <i className=" w-10 h-10 xl:hidden block text-5x1 cursor-pointer"
           onClick={() => setIsMenuOpen(!isMenuOpen)}><img src={icon_menu} alt=""/></i>
        <div className={`absolute xl:hidden top-20 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform
        ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
             style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline"> Home
          </NavLink>
          <NavLink to={"/products"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Products
          </NavLink>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Blogs
          </NavLink>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline">Contacts
          </NavLink>
          <NavLink to={"/"}
                className="list-none w-full !font-extrabold text-center p-4 hover:scale-105 transition-all cursor-pointer hover:!text-[#F09728] !text-black !no-underline ">About Us
          </NavLink>

        </div>
        <NavLink
          to="/shopping-cart"
          className="fixed bottom-25 right-6 z-50  xl:hidden bg-[#F09728] rounded-full shadow-lg p-4 flex items-center justify-center hover:scale-110 transition"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        >
          <img src={icon_cart} alt="Cart" className="w-7 h-7" />
          {cartState.cartContent.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {cartState.cartContent.length}
            </span>
          )}
        </NavLink>
      </header>
    </div>
  )
}

export default NavBar
