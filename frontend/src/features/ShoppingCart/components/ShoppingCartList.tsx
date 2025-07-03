import {memo, useMemo, useRef} from "react";
import type {CartProduct} from "@/shared/types/type.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/shared/stores/store.ts";
import {
  createColumnHelper, flexRender, getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import {PriceChangeDialog} from "@/features/ShoppingCart/components/PriceChangeDialog.tsx";
import {TrashIcon} from "@radix-ui/react-icons";
import {adjustItemToCart} from "@/shared/stores/states/shopping-cart.ts";
import {debounce, sumBy} from "lodash";
import {toast} from "sonner";

export const ShoppingCartList = memo(function ShoppingCartList() {
  const data: CartProduct[] = useSelector((state: RootState) => state.shoppingCart).cartContent;
  const dispatch = useDispatch<AppDispatch>();

  const updateCart = (product: CartProduct) => {
    dispatch(adjustItemToCart(product));
    toast("Cập nhật vật phẩm thành công!", {
      description: product.product.title
    });
  }

  const debounceUpdateCart = useRef(
    debounce((product: CartProduct) => updateCart(product), 1000)
  ).current

  const columnHelper = createColumnHelper<CartProduct>();
  const columns = useMemo(() => [
    columnHelper.accessor(
      'product.title', {
        header: 'Name',
        cell: props => (
          <div>
            {props.getValue()}
          </div>
        ),
      }
    ),
    columnHelper.accessor(
      'product.description', {
        header: 'Description',
        cell: props => (
          <div className={"overflow-hidden"}>
            {props.getValue().split(" ").slice(0, 12).join(" ")}
          </div>
        ),
      }
    ),
    columnHelper.accessor(
      'product.images', {
        header: '',
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
        header: 'Amount',
        cell: props => (
          <PriceChangeDialog product={props.row.original.product} amount={props.row.original.amount}/>
        )
      }
    ),
    columnHelper.accessor(
      'product.price', {
        header: 'Price',
        cell: props => <div className={"text-center"}>{props.getValue()}</div>,
      }
    ),
    columnHelper.display(
      {
        id: 'subtotal',
        header: 'Subtotal',
        cell: props => (
          <div className={"text-center"}>
            {props.row.original.amount * props.row.original.product.price}
          </div>
        ),
      }
    ),
    columnHelper.display(
      {
        id: 'actions',
        cell: (props) => (
          <TrashIcon className={"text-palette font-bold scale-150 mr-4"} onClick={() => {
            debounceUpdateCart({product: props.row.original.product, amount: 0})
          }}/>
        )
      }
    )
  ], [columnHelper, debounceUpdateCart]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={"w-1/2 px-8 py-4"}>
      <table className={"w-full table-auto"}>
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
      <div className={"w-full text-end rounded-md text-white bg-palette py-2 px-4"}>
        Total : {sumBy(data, (product) => {
        return product.product.price * product.amount
      })}
      </div>
    </div>
  )
})