import {FormProvider, useForm, Controller} from "react-hook-form";
import {memo, useEffect, useState} from "react";
import type {ProductFilter} from "@/shared/types/product-filter.ts";
import type {Category} from "@/shared/types/type.ts";
import {Categories} from "@/shared/services/categories.ts";
import {NumberTextField} from "@/features/SearchAndFilter/components/NumberTextField.tsx";
import {Select} from "radix-ui";
import {useFilterContext} from "@/features/SearchAndFilter/common/contexts/FilterContext.ts";

interface FilterTableProps {
  className?: string,
  setFilterData: (filter: ProductFilter) => void,
}

export const FilterTable = memo(function FilterTable(props: FilterTableProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const filterContext = useFilterContext();
  const methods = useForm<ProductFilter>({
    defaultValues: filterContext
  });
  const {
    register,
    subscribe,
    control,
    watch
  } = methods;

  const searchTitle = watch("title");

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = subscribe({
      formState: {
        values: true
      },
      callback: ({values}) => {
        props.setFilterData(values);
      }
    });

    return () => callback();

  }, [props, subscribe]);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!active) {
        return
      }
      const categoryResults = await Categories.getCategories();
      setCategories(categoryResults);
    }

    load();
    return () => {
      active = false
    };

  }, []);


  return (
    <FormProvider {...methods}>
      <form
        className={"flex flex-col gap-2 text-lg " + (props.className ?? "")}
      >
        <div className={"font-extrabold text-2xl hidden lg:flex"}>Filters</div>
        <div className={"font-extrabold text-xl"}>General</div>
        <div className={"flex flex-col border rounded py-4 px-4"}>
          <div className={"flex flex-col gap-2"}>
            <label className={"relative items-center my-2"}>
              <div
                className={"absolute duration-300 transition-all z-10 " + ((searchTitle) ? "text-sm -my-3 mx-2 bg-white text-palette" : "my-1 mx-2")}>
                Product Name
              </div>
              <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-1 text-lg relative"}
                     type={"text"} {...register('title')}/>
            </label>
            <Controller
              control={control}
              name={"categorySlug"}
              render={({field}) => (
                <Select.Root onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger
                    className={"relative z-40 py-1 px-2 bg-white text-black rounded border-2 border-gray-300 hover:border-palette focus:border-palette outline-none duration-300 transition-colors"}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <div
                      className={"absolute duration-300 transition-all z-10 text-sm -my-4 mx-1 bg-white text-palette"}>
                      Category
                    </div>
                    <div className={"flex flex-row justify-between"}>
                      <Select.Value placeholder={"All"} className={"text-black"}/>
                      <Select.Icon/>
                    </div>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className={"z-50 text-black bg-white"} position={"popper"}
                                    onPointerDown={(e) => e.stopPropagation()}
                    >
                      <Select.Item
                        value={" "}
                        className={"p-2 text-black hover:bg-gray-200 duration-300 transition-colors outline-none"}
                      >
                        <Select.ItemText>All</Select.ItemText>
                      </Select.Item>
                      {categories.map((category) =>
                        <Select.Item
                          key={category.id}
                          value={category.slug}
                          className={"p-2 text-black hover:bg-gray-200 duration-300 transition-colors outline-none"}
                        >
                          <Select.ItemText>{category.name}</Select.ItemText>
                        </Select.Item>
                      )}
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              )}
            />
          </div>
        </div>
        <div>
          <div className={"font-extrabold text-xl py-2"}>Price Range</div>
          <div className={"flex flex-col border rounded py-2 px-4 gap-2"}>
            <NumberTextField name={"Min price"} registerName={"price_min"}/>
            <NumberTextField name={"Max price"} registerName={"price_max"}/>
          </div>
        </div>
      </form>
    </FormProvider>
  )
})
