import { getProduct } from "@/shared/services/productService";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type ProductCardProps = {
  limit?: number; 
};

function ProductCard({ limit }: ProductCardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(); 
        let productList = data as Product[];
        
        
        if (limit && limit > 0) {
          productList = productList.slice(0, limit);
        }
        
        console.log(productList);
        setProducts(productList);
      } catch (err) {
        console.error(err);
        setError('Không tải được danh mục');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [limit]); 

  return (
    <div>
      {error && (
        <p className="text-red-500 text-sm mb-2 px-2">{error}</p>
      )}
      {isloading ? (
        <div className="flex justify-center py-4">
          <LoadingComponent />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center mt-8">
          {products.slice(0,limit).map((product, idx) => (
            <div
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              key={product.id}
              className="h-[450px] w-[275px] bg-white shadow-md rounded-md overflow-hidden  transform transition hover:scale-105 flex flex-col"
            >
                  <div className="w-full h-full overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-[150px]object-cover transition-transform duration-300 hover:scale-105"
                    />
                    </div>
              <div className="flex-1 flex flex-col justify-center items-center p-4 text-center">
                <p className="font-semibold text-gray-700 line-clamp-2">
                    {product.title}
                </p>
                <p className="mt-2 text-orange-500 font-bold">
                    {product.price.toLocaleString("vi-VN")}₫
                </p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCard;