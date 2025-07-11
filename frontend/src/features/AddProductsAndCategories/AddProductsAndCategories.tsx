import {memo, useRef} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {SmartHintTextField} from "@/components/ui/SmartHintTextField.tsx";
import {type Product, productSchema} from "@/shared/types/type.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {Products} from "@/shared/services/products";
import {toast} from "sonner";
import {CategoryInput, ImageInput} from "@/features/AddProductsAndCategories/components";

export const AddProductsAndCategories = memo(function AddProductsAndCategories() {
  const methods = useForm<Product>({
    resolver: joiResolver(productSchema),
    defaultValues: {
      images: []
    }
  });

  const {
    watch,
    formState: {errors},
    handleSubmit,
    register,
    reset
  } = methods;

  const watchDescription = watch("description");
  const submitImages = useRef<() => Promise<string[]>>(async () => []);

  const onSubmit = async (data: Product) => {
    data.images = await submitImages.current();
    const isSubmitSuccessful = await Products.uploadProduct(data);
    if (isSubmitSuccessful) {
      reset(); // Resets the form after a successful submission
      toast(
        "Upload Product Successful!", {
          description: "Check the Shop"
        }
      );
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"w-full flex flex-col gap-2 p-4"}>
            <div className={"text-xl font-bold "}>
              Add a Product
            </div>

            <div className={"w-full flex flex-row gap-4 *:w-full"}>
              <SmartHintTextField name={"Product Title"} registerName={"title"}/>
              <SmartHintTextField name={"Product Price"} registerName={"price"}/>
            </div>

            <label className={"relative items-center my-2"}>
              <div
                className={"absolute duration-300 transition-all z-10 "
                  + ((watchDescription) ? "text-sm -my-3 mx-2 bg-white " + ((errors.description) ? "text-red-600" : "text-palette") : "mx-2 my-2.5 opacity-60")}>
                {errors.description ? errors.description.message : "Description"}
              </div>
              <textarea
                className={"w-full outline rounded hover:outline-palette hover:shadow duration-500 focus:outline-palette px-2 py-2 text-lg relative " + ((errors.description ? "outline-red-400" : ""))}
                {...register("description")}
              ></textarea>
            </label>

            <CategoryInput/>
            <ImageInput submitImages={(func: () => Promise<string[]>) => {submitImages.current = func} }/>

            <div className={"w-full flex flex-row justify-end"}>
              <button
                type={"submit"}
                className={"p-2 text-white bg-palette rounded hover:scale-105 w-fit rounded"}
              >
                Confirm
              </button>
            </div>

          </div>
        </form>
      </FormProvider>
    </div>
  )
})