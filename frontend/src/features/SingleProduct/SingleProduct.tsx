import {memo, useEffect, useLayoutEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import type {CartProduct, Product} from "@/shared/types/type";
import {Products} from "@/shared/services/products.ts";
import {CategoryTag} from "@/features/SingleProduct/components";
import {PlusIcon, MinusIcon, ChevronRightIcon, ChevronLeftIcon} from "@radix-ui/react-icons";
import {ShopProduct} from "@/components/product-display/ShopProduct.tsx";
import {adjustItemToCart} from "@/shared/stores/states/shopping-cart.ts";
import {useDispatch, useSelector} from "react-redux";
import {type AppDispatch, type RootState} from "@/shared/stores/store.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {debounce} from "lodash";

export const SingleProduct = memo(function SingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();
  const [productAmount, setProductAmount] = useState<number>(0);

  const productState = useSelector((state : RootState) => state.shoppingCart);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    async function getData() {
      const productID = parseInt(params.id ?? "0");

      const result =  await Products.getProduct(productID);
      setProduct(result);
      setSelectedImage(result.images[0]);

      const related = await Products.getSimilarProduct(productID);
      setRelatedProducts(related);

      const currentProduct = productState.cartContent.find((item) => item.product.id === productID);
      if (currentProduct){
        setProductAmount(currentProduct.amount);
      }
      else {
        setProductAmount(0);
      }
    }

    getData();

  }, [params, productState]);

  const navigate = useNavigate();

  const updateCart = (product : CartProduct) => {
    setProductAmount(product.amount);
    dispatch(adjustItemToCart(product));
    toast("Cập nhật vật phẩm thành công!", {
      description : product.product.title,
      action: {
        label : "Xem giỏ hàng",
        onClick : () => navigate("/shopping-cart")
      }
    });
  }

  const debounceUpdateCart = useRef(
    debounce((product : CartProduct) => updateCart(product), 300)
  ).current

  useEffect(() => {
    return () => debounceUpdateCart.cancel();
  }, [debounceUpdateCart])

  return (
    <div className={""}>
      {product ?
        <div>
          <div className={"w-full justify-center items-center flex lg:flex-row flex-col p-4 gap-16"}>
            <div className={"lg:w-1/3 w-full flex flex-col relative"}>
              {product.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={img}
                  className={"w-full rounded first:relative absolute aria-selected:!opacity-100 opacity-0 transition-opacity aspect-square duration-300 z-10"}
                  aria-selected={img === selectedImage}
                />
              ))
              }
              <div
                className={"absolute flex flex-row items-center justify-between w-full h-full text-white p-8 lg:hidden z-50"}>
                <ChevronLeftIcon className={""} width={40} height={40}/>
                <ChevronRightIcon className={""} width={40} height={40}/>
              </div>
            </div>
            <div className={"lg:w-1/3 w-full flex flex-col h-full justify-center"}>
              <div className={"text-3xl font-bold my-2"}>{product.title}</div>
              <div className={"text-2xl text-palette font-bold"}>{product.price}</div>
              <div className={"text-justify mb-2"}>{product.description}</div>
              <CategoryTag categoryName={product.category.name}/>
              <div className={"w-full lg:w-fit flex flex-row justify-between lg:justify-start my-4 items-center gap-4"}>
                <div
                  className={"rounded p-2 bg-palette text-white duration-300 transition-transform hover:scale-105 cursor-pointer active:scale-100"}
                  onClick={() => {
                    debounceUpdateCart({product: product, amount : 1});
                    // dispatch(adjustItemToCart({
                    //   product : product,
                    //   amount : 1
                    // }));
                    // toast("Đã thêm vật phẩm vào giỏ hàng!", {
                    //   description : product.title,
                    //   action: {
                    //     label : "Xem giỏ hàng",
                    //     onClick : () => navigate("/shopping-cart")
                    //   }
                    // });
                  }}>
                  Mua ngay
                </div>
                <div className={"w-fit flex flex-row items-center gap-2 lg:justify-start justify-end"} hidden={productAmount === 0}>
                  <div
                    className={"font-extrabold rounded p-2 text-palette cursor-pointer"}
                    onClick={() => {
                      debounceUpdateCart({product: product, amount : productAmount + 1});
                    }}
                  ><PlusIcon/></div>
                  <input
                    type={"number"}
                    className={"border-1 border-gray-400 p-2 rounded w-1/6 text-center"}
                    value={productAmount}
                    onChange={(event) => {
                      debounceUpdateCart({product: product, amount : parseInt(event.target.value)});
                    }}
                  />
                  <div
                    className={"font-extrabold rounded p-2 text-palette cursor-pointer"}
                    onClick={() => {
                      debounceUpdateCart({product: product, amount : productAmount - 1});
                    }}
                  ><MinusIcon/></div>
                </div>
              </div>
              <div className={"w-full lg:flex flex-row gap-2 hidden"}>
                {product.images.map((img) => (
                  <img
                    src={img}
                    alt={"image"}
                    aria-selected={img === selectedImage} key={img}
                    className={"w-[120px] border-4 rounded aria-selected:border-palette hover:border-gray-500 border-gray-200 transition-colors duration-300 aspect-square"}
                    onClick={() => setSelectedImage(img)}
                  >
                  </img>
                ))}
              </div>
            </div>
          </div>
          <div className={"w-full lg:p-6 p-4"}>
            <div className={"text-2xl font-bold mb-4"}>
              Các sản phẩm tương tự
            </div>
            <div className={"w-full lg:!w-screen overflow-x-scroll"}>
              <div className={"flex lg:!flex-nowrap flex-wrap flex-row w-fit lg:gap-8 pb-4"}>
                {
                  (relatedProducts && relatedProducts.length !== 0) ?
                  relatedProducts.map((p) => <ShopProduct productData={p} key={p.id}/>) :
                    <div>
                      Không tìm thấy sản phẩm nào tương tự.
                    </div>
                }
              </div>
            </div>
          </div>

        </div>
        :
        <div>Invalid product</div>
      }
    </div>
  )
});
