import type {Product} from "@/shared/types/type.ts";
import {Dialog} from "radix-ui";
import {adjustItemToCart} from "@/shared/stores/states/shopping-cart.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/shared/stores/store.ts";
import {useRef} from "react";

interface PriceChangeDialogProps {
  product: Product,
  amount: number
}

export function PriceChangeDialog(props : PriceChangeDialogProps){
  const dispatch = useDispatch<AppDispatch>();
  const inputField = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger className={"text-center w-full"}>
          {props.amount}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={"absolute w-screen h-screen bg-black opacity-40"}/>
          <Dialog.Content
            className={"absolute z-20 -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 flex flex-col justify-center items-center bg-white gap-4 px-4 py-2"}>
            <Dialog.Title>
              Nhập số lượng muốn thay đổi
            </Dialog.Title>
            <input ref={inputField}
              className={"text-center p-2"}
              defaultValue={props.amount}
            />
            <Dialog.Close>
              <div className={"bg-palette text-white p-2"} onClick={() => {
                dispatch(adjustItemToCart({
                  product: props.product,
                  amount: inputField.current?.value
                }))
              }}>
                Xong
              </div>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}