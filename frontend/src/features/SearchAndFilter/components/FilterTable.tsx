import {FormProvider, useForm} from "react-hook-form";
// import {CheckBox} from "@/features/SearchAndFilter/common/components/CheckBox.tsx";
import {useEffect, useMemo, useState} from "react";
import type {ProductFilter} from "@/shared/types/product-filter.ts";
import {Categories} from "@/shared/services/services.ts";
import type {Category} from "@/shared/types/type.ts";

interface FilterTableProps {
  className?: string,
  setfilterdata: (filter: ProductFilter) => void
}

export function FilterTable(props: FilterTableProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceToggle, setPriceToggle] = useState<boolean>();
  const methods = useForm<ProductFilter>();
  const {
    register,
    subscribe,
    resetField
  } = methods;

  useMemo(() => {
    Categories.getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  useMemo(() => {
    if (!priceToggle) {
      resetField("price_max");
      resetField("price_min");
    } else {
      resetField("price");
    }
  }, [priceToggle, resetField])

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = subscribe({
      formState: {
        values: true
      },
      callback: ({values}) => {
        props.setfilterdata(values);
      }
    });

    return () => callback();

  }, [props, subscribe]);


  return (
    <FormProvider {...methods}>
      <form
        className={"flex flex-col gap-2 text-lg " + (props.className ?? "")}
      >
        <div className={"font-extrabold text-2xl"}>Bộ lọc</div>
        <div className={"font-extrabold text-xl"}>Thông tin</div>
        <div className={"flex flex-col border rounded py-4 px-4"}>
          <div className={"flex flex-col gap-2"}>
            <label className={"flex flex-col gap-2"}>
              <div>Tên sản phẩm</div>
              <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-1 text-lg"}
                     type={"text"} {...register('title')}/>
            </label>
            <div>Loại</div>
            <select
              className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg"} {...register('categoryId', {valueAsNumber: true})}
              defaultValue={undefined}>
              <option value={undefined} key={-1}>All</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className={"font-extrabold text-xl py-2"}>Giá</div>
          <div className={"flex flex-col border rounded py-2 px-4 gap-2"}>
            <label className={"flex flex-row w-full justify-between"}>
              <div>Dùng giá</div>
              <input type={"checkbox"} hidden={true} checked={priceToggle} onChange={(event) => {
                setPriceToggle(event.target.checked)
              }}/>
            </label>
            <label hidden={priceToggle}>
              <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg"} type={"number"} {...register('price', {valueAsNumber: true})}
                     placeholder={"Giá"}/>
            </label>
            <label hidden={!priceToggle}>
              <div>Giá thấp nhất</div>
              <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg"} type={"number"} {...register('price_min', {valueAsNumber: true})}/>
            </label>
            <label hidden={!priceToggle}>
              <div>Giá cao nhất</div>
              <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg"} type={"number"} {...register('price_max', {valueAsNumber: true})}/>
            </label>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
