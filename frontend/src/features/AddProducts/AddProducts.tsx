import {memo, useEffect, useMemo, useState} from "react";
import {Controller, FormProvider, useFieldArray, useForm} from "react-hook-form";
import {SmartHintTextField} from "@/components/ui/SmartHintTextField.tsx";
import {type Category, type Product, productSchema} from "@/shared/types/type.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {Select} from "radix-ui";
import {Categories} from "@/shared/services/categories.ts";
import {Cross2Icon} from "@radix-ui/react-icons";
import {isValidImageURL} from "@/shared/helpers/is-valid-url.ts";
import {useThrottle} from "@/shared/hooks/useThrottle.ts";

export const AddProducts = memo(function AddProducts(){
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageInput, setImageInput] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const imageInputThrottle = useThrottle(imageInput, 1000);

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

  useMemo(() => {
    if (imageInputThrottle.length <= 0 || !isValidImageURL(imageInputThrottle)){
      setImageError("Not a valid image URL");
    }
    else setImageError("");
  }, [imageInputThrottle])


  const methods = useForm<Product>({
    resolver: joiResolver(productSchema)
  });

  const {
    control,
    watch,
    formState : {errors},
    handleSubmit
  } = methods;

  const watchImages = watch("images");

  const { fields, append, remove } = useFieldArray({
    control,
    name : "images",
    rules : {
      maxLength: 5
    }
  })

  return (
    <FormProvider {...methods}>
      <form>
        <div className={"w-full flex flex-col gap-2 p-4"}>
          <div className={"w-full flex flex-row gap-4 *:w-full"}>
            <SmartHintTextField name={"Product Title"} registerName={"title"}/>
            <SmartHintTextField name={"Product Price"} registerName={"price"}/>
          </div>
          <Controller name={"categoryId"} control={control}
                      render={({field}) => (
                        <Select.Root onValueChange={field.onChange} value={field.value + ""}>
                          <Select.Trigger
                            className={"relative w-full justify-start outline-2 rounded hover:outline-palette focus:outline-palette px-2 py-2 my-2 text-lg"}>
                            <div
                              className={"absolute text-sm -my-5 mx-1 bg-white " + ((errors.categoryId) ? "text-red-600" : "text-palette")}>
                              {errors.categoryId ? "Please select a category" : "Category"}
                            </div>
                            <div className={"flex flex-row items-center w-full relative justify-between"}>
                              <Select.Value placeholder={"Select a category"}/>
                              <Select.Icon className={"relative"}/>
                            </div>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content
                              className={"z-50 flex flex-row text-black bg-white flex flex-col *:py-2 *:px-2 shadow my-2 *:hover:bg-gray-200 *:duration-300 *:transition-colors *:cursor-pointer SelectContent"}
                              position={"popper"}>
                              {
                                categories.map((category) => (
                                  <Select.Item value={category.id + ""}>
                                    <Select.ItemText>{category.name}</Select.ItemText>
                                  </Select.Item>
                                ))
                              }
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      )}
          />

          <div className={"w-full flex flex-row gap-2"}>
            <button
              type={"button"}
              disabled={imageInputThrottle.length <= 0 || !isValidImageURL(imageInputThrottle)}
              onClick={() => {append(imageInput); setImageInput("");}}
              className={"w-fit text-white bg-palette disabled:bg-gray-300 p-2 rounded hover:scale-105 duration-300 transition-transform"}
            >
              <span className={"inline-block w-full flex-nowrap"}> Add Image </span>
            </button>

            <label className={"w-full"}>
              <div
                className={"absolute duration-300 transition-all z-10 "
                  + ((imageInput) ? "text-sm -my-3 mx-2 bg-white text-palette" : "mx-2 my-2.5 opacity-60")}>
                {imageError.length === 0 ? "Image URL" : imageError}
              </div>

              <input
                className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg relative"}
                value={imageInput}
                onChange={(event) => setImageInput(event.target.value)}
                type={"text"}/>
            </label>
          </div>

          <div className={"w-full flex flex-row gap-2"}>
            {
              fields.map((item, index) => (
                <div
                  key={item.id}
                  className={"relative flex flex-col items-end"}
                >
                  <div
                    className={"absolute z-10 text-white bg-red-600 p-2 rounded-full m-2 hover:bg-red-700 duration-300 transition-colors"}
                    onClick={() => remove(index)}
                  >
                    <Cross2Icon/>
                  </div>

                  <img
                    src={watchImages[index]}
                    alt={item.id}
                    className={"relative aspect-square w-[240px] rounded"}
                  />
                </div>
              ))
            }
          </div>

        </div>
        {/*<button type={"submit"}>*/}
        {/*  */}
        {/*</button>*/}

      </form>
    </FormProvider>
  )
})