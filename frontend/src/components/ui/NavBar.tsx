import logo from "@/assets/images/logo.png"
import icon_cart from "@/assets/images/icon_cart.png"
import icon_search from "@/assets/images/icon_search.png"
import icon_heart from "@/assets/images/icon_heart.png"
import icon_menu from "@/assets/images/icon_menu.png"
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCategories } from "@/shared/services/categoryService";
import LoadingComponent from "@/components/ui/LoadingComponent";


type Category = {
  id: number;
  name: string;
};

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);    
    const [categories, setCategories] = useState<Category[]>([]);
    const [isloading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
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

   
  return (
    <div className="w-full h-full relative"> 
      
      <div className="hidden md:flex items-center justify-between text-gray-500 text-xs h-6 border-b border-gray-200 px-4 mt-3">
        <span className="px-10">+84 123 456 789</span>
        <span className="px-4">Trang mua sắm trực tuyến uy tín hàng đầu</span>
        <span className="flex items-center space-x-1 px-4">
          <a href="/login" className="!text-gray-500 !no-underline hover:text-gray-700">
            Đăng nhập
          </a>
          <span className="text-gray-500 ">/</span>
          <a href="/register" className="!text-gray-500 !no-underline hover:text-gray-700">
            Đăng ký
          </a>
        </span>
      </div>

    <header className="flex items-center justify-between text-black py-1 px-6 md:px-10 bg-white border-b border-gray-200 ">
        <a href="/">
        <img src={logo} alt="" className="w-30 h-18 hover:scale-105 transition-all"/>
        </a>
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base mt-2">
          <li className="p-3 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728]">Trang chủ</li>
        <li className="p-3 hover:scale-105 transition-all cursor-pointer group">
          <a href="#" className="flex items-center gap-[2px] !text-black !no-underline group-hover:!text-[#F09728]">
            Sản phẩm
            <span>
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </span>
          </a>
        <div className="absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white p-2 text-black shadow-lg">
          {error && (
            <p className="text-red-500 text-sm mb-2 px-2">{error}</p>
          )}

          {isloading ? (
            <div className="flex justify-center py-4">
              <LoadingComponent />
            </div>
          ) : (
            <ul className="w-full space-y-1">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="p-2 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728] break-words"
                >
                  <a
                    href={`/categories/${cat.id}`}
                    className="!text-black !no-underline break-words"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        </li>
          <li className="p-3 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728]">Bài viết</li>
          <li className="p-3 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728]">Liên hệ</li>
          <li className="p-3 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728]">Về chúng tôi</li>
        </ul>

        <div className="relative hidden md:flex items-center justify-center gap-3">
            <div className="relative group hidden sm:block" >
              <input type="text" placeholder="Search" className="search-bar" />
              <i className="w-8 h-8 p-0.5 mt-1 hover:scale-105  transition-all cursor-pointer absolute -translate-y-1 right-2"><img src={icon_search} alt="" /></i>
            </div>
            <i className="w-8 h-8  p-0.5 hover:scale-105  transition-all cursor-pointer" onClick={() => alert("Bạn chưa có sản phẩm yêu thích!")}><img src={icon_heart} alt="" /></i>
            <i className="w-8 h-8  p-0.5 hover:scale-105  transition-all cursor-pointer" onClick={() => alert("Chưa có sản phẩm trong giỏ hàng!")}><img src={icon_cart} alt="" /></i>
        </div>

        
        <i className=" w-10 h-10 xl:hidden block text-5x1 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}><img src={icon_menu} alt=""/></i>
        <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform 
        ${isMenuOpen ?"opacity-100" : "opacity-0"}`} style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}>
            <li className="list-none w-full text-center p-4 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728] ">Trang chủ</li>
            <li className="list-none w-full text-center p-4 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728] ">Sản phẩm</li>
            <li className="list-none w-full text-center p-4 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728] ">Bài viết</li>
            <li className="list-none w-full text-center p-4 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728] ">Liên hệ</li>
            <li className="list-none w-full text-center p-4 hover:scale-105 transition-all cursor-pointer hover:text-[#F09728] ">Về chúng tôi</li>
        </div>
    </header> 
    </div>
  )
}

export default NavBar