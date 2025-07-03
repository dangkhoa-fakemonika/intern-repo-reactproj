import {Controller, FormProvider, useForm} from "react-hook-form";
import {type DeliveryInfo, deliverySchema} from "@/features/ShoppingCart/common/delivery-info.ts";
import {SmartHintTextField} from "@/features/ShoppingCart/components/SmartHintTextField.tsx";
import {joiResolver} from "@hookform/resolvers/joi";
import {Select} from "radix-ui";


export function CheckoutForm() {
  const method = useForm<DeliveryInfo>({
    resolver: joiResolver(deliverySchema)
  });
  const {
    error,
    control,
    handleSubmit
  } = method;

  // const submit = () => {
  //   handleSubmit();
  // }

  return (
    <div className={"w-1/2"}>
      <FormProvider {...method}>
        <form className={"w-full"}>
          <div className={"w-full grid grid-cols-2 gap-x-2 gap-y-4"}>
            <SmartHintTextField name={"Receiver"} registerName={"name"}/>
            <SmartHintTextField name={"Contact Number"} registerName={"phone"}/>
            <SmartHintTextField name={"Address"} registerName={"address"}/>
            <SmartHintTextField name={"Email"} registerName={"email"}/>
            <Controller name={"billingMethod"} control={control}
              render={({field}) => (
                <Select.Root onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger className={"z-10 relative w-full justify-start outline-2 rounded focus:outline-palette px-2 my-2 text-lg"}>
                    <div
                      className={"absolute text-sm -my-5 mx-1 bg-white text-palette"}>
                      Billing Method
                    </div>
                    <div className={"flex flex-row items-center w-full relative"}>
                      <Select.Value placeholder={"Select a billing method"}/>
                      <Select.Icon className={"relative"}/>
                    </div>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className={"z-50 text-black bg-white flex flex-col gap-2 px-1 py-2"} position={"popper"}
                                    onPointerDown={(e) => e.stopPropagation()}
                    >
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
        </form>
      </FormProvider>
    </div>
  )
}