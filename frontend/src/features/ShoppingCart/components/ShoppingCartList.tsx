import {memo, useMemo} from "react";
import type {CartProduct} from "@/shared/types/type.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/shared/stores/store.ts";
import {
  createColumnHelper, flexRender, getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Dialog } from "radix-ui";
import {adjustItemToCart} from "@/shared/stores/states/shopping-cart.ts";

export const ShoppingCartList = memo(function ShoppingCartList() {
  const data: CartProduct[] = useSelector((state: RootState) => state.shoppingCart).cartContent;
  const dispatch = useDispatch<AppDispatch>();

  const columnHelper = createColumnHelper<CartProduct>();
  const columns = useMemo(() => [
    columnHelper.accessor(
      'product.title', {
        header: 'Tên',
        cell: props => (
          <div>
            {props.getValue()}
          </div>
        ),
      }
    ),
    columnHelper.accessor(
      'product.description', {
        header: 'Mô tả',
        cell: props => (
          <div className={"break-words"}>
            {props.getValue()}
          </div>
        ),
      }
    ),
    columnHelper.accessor(
      'product.images', {
        header: 'Hình sản phẩm',
        cell: props => (
          <img
            src={props.getValue()[0]}
            alt={props.getValue()[0]}
            className={"aspect-square w-[80px] overflow-hidden"}
          />
        ),
      }
    ),
    columnHelper.accessor(
      'amount', {
        header: 'Số lượng',
        cell: props => (
          <div>
            <Dialog.Root>
              <Dialog.Trigger>
                {props.row.original.amount}
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={"absolute w-screen h-screen bg-black opacity-40"}/>
                <Dialog.Content className={"absolute z-20 translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 flex flex-col justify-center items-center bg-white gap-4 px-4 py-2"}>
                  <Dialog.Title>
                    Nhập số lượng muốn thay đổi
                  </Dialog.Title>
                  <input
                    className={"text-center p-2"}
                    // defaultValue={props.row.original.amount}
                    defaultValue={props.row.original.amount}
                  />
                  <Dialog.Close>
                    <div className={"bg-palette text-white p-2"} onClick={() => {dispatch(adjustItemToCart({
                      product: props.row.original.product,
                      amount: 2
                    }))}}>
                      Xong
                    </div>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        )
      }
    ),
    columnHelper.accessor(
      'product.price', {
        header: 'Đơn giá',
        cell: props => props.getValue(),
      }
    ),
    columnHelper.accessor(
      'product.price', {
        header: 'Tổng riêng',
        cell: props => (
          <div>
            {props.row.original.amount * props.row.original.product.price}
          </div>
        ),
      }
    ),
    columnHelper.display(
      {
        id: 'actions',
        cell: () => (<button className={"!bg-palette text-white"}>
          Hi
        </button>)
      }
    )
  ], [columnHelper, dispatch]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={"w-full px-8 py-4"}>
      <table className={"w-fit min-w-1/2 table-auto"}>
        <thead className={"text-white"}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className={"bg-palette p-2 first:rounded-l-md last:rounded-r-md"}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody className={"*:odd:bg-white *:even:bg-gray-200"}>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={"p-2 ps-4"}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
        <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </tfoot>
      </table>
    </div>
  )
})