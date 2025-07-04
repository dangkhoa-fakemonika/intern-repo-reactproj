import {Controller, useFormContext} from "react-hook-form";
import {SmartHintTextField} from "@/features/ShoppingCart/components/ShoppingCart/SmartHintTextField.tsx";
import {Select} from "radix-ui";
import {CustomFormRadio} from "@/features/ShoppingCart/components/CheckOut/CustomFormRadio.tsx";
import {deliveryProvider, priceProvider} from "@/features/ShoppingCart/common/fake-data.ts";


export function CheckoutForm() {
  const {
    control,
    register,
    formState : {errors}
  } = useFormContext();

  return (
    <div className={"w-full flex flex-col gap-2"}>
      <div className={"text-xl font-bold"}>Billing Information</div>
      <div className={"w-full lg:grid lg:grid-cols-2 flex flex-col gap-x-8 gap-y-4"}>
        <SmartHintTextField name={"Receiver"} registerName={"name"}/>
        <SmartHintTextField name={"Contact Number"} registerName={"phone"}/>
        <SmartHintTextField name={"Address"} registerName={"address"}/>
        <SmartHintTextField name={"Email"} registerName={"email"}/>
        <Controller name={"billingMethod"} control={control}
                    render={({field}) => (
                      <Select.Root onValueChange={field.onChange} value={field.value}>
                        <Select.Trigger
                          className={"relative w-full justify-start outline-2 rounded hover:outline-palette focus:outline-palette px-2 py-2 my-2 text-lg"}>
                          <div
                            className={"absolute text-sm -my-5 mx-1 bg-white " + ((errors.billingMethod) ? "text-red-600" : "text-palette")}>
                            {errors.billingMethod ? "Please select a billing method" : "Billing Method"}
                          </div>
                          <div className={"flex flex-row items-center w-full relative justify-between"}>
                            <Select.Value placeholder={"Select a billing method"}/>
                            <Select.Icon className={"relative"}/>
                          </div>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content
                            className={"z-50 flex flex-row text-black bg-white flex flex-col *:py-2 *:px-2 shadow my-2 *:hover:bg-gray-200 *:duration-300 *:transition-colors *:cursor-pointer"}
                            position={"popper"}>
                            <Select.Item value={"Cash on Delivery"}>
                              <Select.ItemText>Cash on Delivery</Select.ItemText>
                            </Select.Item>
                            <Select.Item value={"Credit Card"}>
                              <Select.ItemText>Credit Card</Select.ItemText>
                            </Select.Item>
                            <Select.Item value={"Debit Card"}>
                              <Select.ItemText>Debit Card</Select.ItemText>
                            </Select.Item>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    )}
        />
        <SmartHintTextField name={"Zipcode"} registerName={"zipcode"}/>

      </div>

      <hr/>

      <div className={"text-xl font-bold"}>Shipping</div>
      <div className={"text-lg"}>Shipping Service</div>
      <div className={"w-full flex flex-wrap flex-row gap-2"}>
        {
          deliveryProvider.map((p) => (
            <CustomFormRadio registerName={"shippingService"} value={p.value} key={p.value}>
              <img
                className={"w-[150px]"}
                src={p.logo}
                alt={p.value}
              />
            </CustomFormRadio>
          ))
        }
      </div>
      <div className={"text-red-600"}
           hidden={errors.shippingService === undefined}>{"" + errors.shippingService?.message}</div>
      <div className={"text-lg"}>Shipping Type</div>
      <div className={"w-full flex flex-row gap-2 *:!w-1/3"}>
        {
          priceProvider.map((p) => (
            <CustomFormRadio registerName={"shippingSpeed"} value={p.type} key={p.type}>
              <div className={"w-full flex flex-col"}>
                <div className={"w-full flex flex-row justify-between"}>
                  <div className={"font-bold"}>{p.type}</div>
                  <div className={"text-palette"}>{p.price}</div>
                </div>
                <div>{p.desc}</div>
              </div>
            </CustomFormRadio>
          ))
        }
      </div>

      <div className={"text-red-600"}
           hidden={errors.shippingSpeed === undefined}>{"" + errors.shippingSpeed?.message}</div>

      <div className={"text-xl font-bold"}>Delivery Notes</div>
      <textarea
        className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-md font-light"} {...register("notes")} />
      <div className={"text-red-600"} hidden={errors.notes === undefined}>{"" + errors.notes?.message}</div>
    </div>
  )
}