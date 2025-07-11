import {Dialog, Select} from "radix-ui";
import {Controller, useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import type {Category} from "@/shared/types/category.ts";
import {Categories} from "@/shared/services/categories.ts";
import {CreateCategory} from "@/features/AddProductsAndCategories/components/CreateCategory.tsx";

export function CategoryInput() {
  const {control, formState: {errors}} = useFormContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, onOpenDialogChange] = useState<boolean>(false);

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
    <div className={"w-full flex flex-row gap-2"}>
      <Controller
        name={"categoryId"}
        control={control}
        render={({field}) => (
          <Select.Root onValueChange={field.onChange} value={field.value + ""}>
            <Select.Trigger
              className={"relative w-full justify-start outline rounded hover:outline-palette hover:shadow duration-500 focus:outline-palette px-2 py-2 my-2 text-lg shrink"}>
              <div
                className={"absolute text-sm -my-5 mx-1 bg-white " + ((errors.categoryId) ? "text-red-600" : "text-palette")}>
                {errors.categoryId ? "Please select a category" : "Category"}
              </div>
              <div className={"flex flex-row items-center w-full relative justify-between"}>
                <Select.Value placeholder={"Select a category"} className={"text-black"}/>
                <Select.Icon className={"relative"}/>
              </div>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className={"z-50 flex flex-row text-black bg-white flex flex-col *:py-2 *:px-2 shadow my-2 *:hover:bg-gray-200 *:duration-300 *:transition-colors *:cursor-pointer SelectContent w-full min-w-[var(--radix-popper-anchor-width)] border-palette border rounded"}
                position={"popper"}>
                {
                  categories.map((category) => (
                    <Select.Item value={category.id + ""} key={category.id}>
                      <Select.ItemText>{category.name}</Select.ItemText>
                    </Select.Item>
                  ))
                }
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        )}
      />

      <Dialog.Root open={openDialog} onOpenChange={onOpenDialogChange}>
        <Dialog.Trigger className={"shrink-0 my-2 p-2 rounded bg-palette text-white"}>
          <div>
            Add Category
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={"absolute w-screen h-screen bg-black opacity-40 z-40"}/>
          <Dialog.Content className={"absolute flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white z-50 p-4 rounded"}>
            <Dialog.Title>Add New Category</Dialog.Title>
            <CreateCategory reloadCategory={async () => {setCategories(await Categories.getCategories()); onOpenDialogChange(false);}}/>
            <Dialog.Close>
              <div className={"p-2 rounded bg-palette text-white hover:scale-105 duration-300 transition-all disabled:bg-gray-500 disabled:hover:scale-100"}>
                Close
              </div>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}