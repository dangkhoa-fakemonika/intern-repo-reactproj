import {  useEffect, useState } from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";
import type {Category, Product} from "@/shared/types/type.ts";
import {Products} from "@/shared/services/products.ts";
import {Categories} from "@/shared/services/services.ts";

// type Category = {
//   aosDelay: unknown;
//   id: number;
//   name: string;
//   image: string;
//   price: number;
// };
//
// type Product={
//   id:number;
//   title:string;
//   price:number;
//   images:string[]
// };

function CategoryTrending() {
      const [categories, setCategories] = useState<Category[]>([]);
      const [products, setProducts] = useState<Product[]>([]);
      const [isloading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

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
      const fetchProduct = async () => {
        try {
          const data = await Products.getProducts();
          setProducts(data as Product[]);
        } catch (err) {
          console.error(err);
          setError('Không tải được danh mục');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }, []);


  return (
    <div className="w-full">
  <div className="text-left mt-7 pr-5 ml-7 max-w-[600px]">
    <h2 data-aos="fade-up" className=" text-2xl font-bold">Danh mục thịnh hành</h2>
  </div>
  <div>
    {error && <p className="text-red-500 text-sm mb-2 px-2">{error}</p>}
    {isloading ? (
      <div className="flex justify-center py-4">
        <LoadingComponent />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 place-items-center mt-5">
        {categories.slice(0, 5).map((category, idx) => (
          <div
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            key={category.id}
            className="space-y-3"
          >
            <img
              src={category.image}
              alt=""
              className="h-[250px] w-[250px] object-cover rounded-md hover:scale-105"
            />
            <div className="text-center">
              <p className="font-semibold">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  <div>
    {error && <p className="text-red-500 text-sm mb-2 px-2">{error}</p>}
    {isloading ? (
      <div className="flex justify-center py-4">
        <LoadingComponent />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 place-items-center mt-5 mx-auto w-full p-4">
        {products.slice(0, 2).map((product, idx) => (
          <div
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            className="w-125 bg-gray-100 rounded-2xl p-4 flex flex-col items-center relative shadow-md hover:shadow-lg transition-shadow duration-200 mr-10 gap-4"
            key={product.id}
          >
            <div className="text-center">
              <div className="text-xs uppercase text-gray-500 mb-1 tracking-wide">{product.title}</div>
              <div className="text-lg font-semibold text-gray-800 mb-3">
                Giá khởi điểm: <span className="text-[#333]">{product.price}</span>
              </div>
            </div>
            <button className="!bg-[#F09728] text-white text-sm px-4 py-1 !rounded-full mb-4 hover:scale-105 transition-transform duration-200">
              Mua ngay
            </button>
            <div className="w-full flex justify-center mt-auto">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-[250px] h-[250px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  )
}

export default CategoryTrending
