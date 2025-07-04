import {memo, useEffect, useState} from "react";
import {CheckoutForm, ShoppingCartList} from "@/features/ShoppingCart/components";
import LoadingComponent from "@/components/ui/LoadingComponent.tsx";
import type {CartProduct} from "@/shared/types/cart-product.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/shared/stores/store.ts";
import {clearCart} from "@/shared/stores/states/shopping-cart.ts";
import {FormProvider, useForm} from "react-hook-form";
import {type DeliveryInfo, deliverySchema} from "@/features/ShoppingCart/common/delivery-info.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {sumBy} from "lodash";
import {OrderedItems} from "@/features/ShoppingCart/components/CheckOut/OrderedItems.tsx";
import {toast} from "sonner";

export const ShoppingCart = memo(function ShoppingCart() {
  const [loading, isLoading] = useState(true);
  const data: CartProduct[] = useSelector((state: RootState) => state.shoppingCart).cartContent;
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(0);
  const [processDone, setProcessDone] = useState(false);

  const method = useForm<DeliveryInfo>({
    resolver: joiResolver(deliverySchema)
  });

  const {
    handleSubmit,
    // formState : {errors}
  } = method;

  const submitCheckout = (data: DeliveryInfo) => {
    setStep(2);
    console.log(data);
    toast("Order placed successfully!");
    dispatch(clearCart());
    setProcessDone(true);
  }

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
      : (data.length === 0 && !processDone) ?
        <div className={"flex flex-col justify-center text-center w-full text-2xl lg:text-5xl py-16"}>
            Your cart is empty, please add an item to your cart to proceed.
        </div>
        :
        <div className={"flex flex-col justify-center items-center w-full"}>
          {
            step === 0 ?
              <div className={"flex flex-col justify-center items-center w-full"}>
                <div className={"text-xl font-bold pt-4 px-8"}>Your Cart</div>
                <div className={"w-full flex lg:flex-row flex-col lg:px-8 lg:py-4 p-2 gap-4"}>
                  <div className={"lg:w-3/4 w-full"}>
                    <ShoppingCartList/>
                  </div>
                  <div className={"lg:w-1/4 w-full flex flex-col"}>
                    <div className={"w-full text-start rounded-md text-white bg-palette py-2 px-4"}>
                      Details
                    </div>

                    <div className={"w-full flex flex-col py-2 px-4 gap-4"}>
                      <div className={"w-full flex flex-row justify-between"}>
                        <div>Total</div>
                        <div>{sumBy(data, (product) => {
                          return product.product.price * product.amount
                        })}</div>
                      </div>

                      <div className={"w-full flex flex-row justify-between"}>
                        <div>Discount</div>
                        <div>0</div>
                      </div>

                      <div className={"w-full flex flex-row justify-between font-bold"}>
                        <div>Current Total</div>
                        <div>{sumBy(data, (product) => {
                          return product.product.price * product.amount
                        })}</div>
                      </div>
                    </div>

                    <div className={"w-full flex flex-col gap-4 *:w-full"}>
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
                </div>
              </div>
              : step === 1 ?
                <div className={"flex flex-col justify-center items-center w-full"}>
                  <div className={"text-xl font-bold pt-4"}>Check Out</div>
                  <div className={"w-full flex lg:flex-row flex-col lg:px-8 lg:py-4 p-2 gap-4"}>
                    <div className={"w-full lg:w-3/4"}>
                      <FormProvider {...method}>
                      <form id={"checkout"} className={"w-full flex flex-row justify-center"} onSubmit={handleSubmit(submitCheckout)}>
                          <CheckoutForm/>
                        </form>
                      </FormProvider>
                    </div>
                    <div className={"w-full lg:w-1/4 flex flex-col justify-start gap-2 *:w-full"}>
                      <div className={"text-xl font-bold"}>Ordered Items</div>
                      <div className={"w-full flex flex-col gap-2"}>
                        {
                          data.map((p) => (
                            <OrderedItems product={p} key={p.product.slug}/>
                          ))
                        }
                      </div>
                      <hr/>

                      <div className={"w-full flex flex-col gap-2 px-4 font-light opacity-50"}>
                          <div className={"w-full flex flex-row justify-between"}>
                            <div>Cart Total</div>
                            <div>{sumBy(data, (product) => {
                              return product.product.price * product.amount
                            })}</div>
                          </div>

                          <div className={"w-full flex flex-row justify-between"}>
                            <div>Discount</div>
                            <div>0</div>
                          </div>

                          <div className={"w-full flex flex-row justify-between"}>
                            <div>Taxes</div>
                            <div>10</div>
                          </div>

                          <div className={"w-full flex flex-row justify-between"}>
                            <div>Shipping Fee</div>
                            <div>0</div>
                          </div>

                      </div>

                      <div className={"w-full flex flex-row justify-between px-4 py-2 font-bold text-lg"}>
                        <div>Final Total</div>
                        <div>{sumBy(data, (product) => {
                          return product.product.price * product.amount + 10
                        })}
                        </div>
                      </div>



                      <hr/>
                      <button
                        onClick={() => setStep(0)}
                        className={"p-2 text-palette border-2 rounded-md border-palette hover:scale-105 cursor-pointer duration-500 transition-transform"}>
                        Back to Cart
                      </button>
                      <button type={"submit"} form={"checkout"}
                              className={"p-2 text-white rounded-md bg-palette hover:scale-105 cursor-pointer duration-500 transition-transform"}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
                :
                <div className={"flex flex-col justify-center text-center w-full text-2xl lg:text-5xl py-16"}>
                  Order placed successfully! Please check your email for further notice
                </div>
          }
        </div>
  )
})