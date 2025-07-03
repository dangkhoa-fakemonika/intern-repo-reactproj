import {memo, useEffect, useState} from "react";
import {CheckoutForm, ShoppingCartList} from "@/features/ShoppingCart/components";
import LoadingComponent from "@/components/ui/LoadingComponent.tsx";
import type {CartProduct} from "@/shared/types/cart-product.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/shared/stores/store.ts";
import {clearCart} from "@/shared/stores/states/shopping-cart.ts";

export const ShoppingCart = memo(function ShoppingCart() {
  const [loading, isLoading] = useState(true);
  const data: CartProduct[] = useSelector((state: RootState) => state.shoppingCart).cartContent;
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    new Promise(() => setTimeout(() => {
      isLoading(false)
    }, 2000));
  }, []);

  return (
    loading ?
      <div className={"flex flex-col justify-center items-center w-full scale-200 py-16"}>
        <LoadingComponent/>
      </div>
      : data.length === 0 ?
        <div className={"flex flex-col justify-center items-center w-full scale-200 py-16"}>
          Your cart is empty, please add an item to your cart to proceed.
        </div>
        :
        <div className={"flex flex-col justify-center items-center w-full"}>
          {
            step === 0 ?
              <div className={"flex flex-col justify-center items-center w-full"}>
                <div className={"text-xl font-bold pt-4 px-8"}>Your Cart</div>
                <ShoppingCartList/>
                <div className={"w-1/2 flex flex-row justify-end px-8 gap-4"}>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className={"p-2 text-palette border-2 rounded-md border-palette hover:scale-105 cursor-pointer duration-500 transition-transform"}>
                    Clear Cart
                  </button>
                  <button onClick={() => setStep(1)}
                          className={"p-2 text-white rounded-md bg-palette hover:scale-105 cursor-pointer duration-500 transition-transform"}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            : step === 1 ?
                <div className={"flex flex-col justify-center items-center w-full"}>
                  <div className={"text-xl font-bold pt-4 px-8"}>Check Out</div>
                  <CheckoutForm/>
                  <div className={"w-1/2 flex flex-row justify-end gap-2"}>
                    <button
                      onClick={() => setStep(0)}
                      className={"p-2 text-palette border-2 rounded-md border-palette hover:scale-105 cursor-pointer duration-500 transition-transform"}>
                      Back to Cart
                    </button>
                    <button onClick={() => setStep(2)}
                            className={"p-2 text-white rounded-md bg-palette hover:scale-105 cursor-pointer duration-500 transition-transform"}>
                      Confirm
                    </button>
                  </div>
                </div>
                :
                <div></div>
          }
        </div>
  )
})