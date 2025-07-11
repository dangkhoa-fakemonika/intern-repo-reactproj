import {useState} from "react";
import {Categories} from "@/shared/services/services.ts";
import {toast} from "sonner";

interface CreateCategoryProps{
  reloadCategory : () => Promise<void>
}

export function CreateCategory(props: CreateCategoryProps){
  const [categoryName, setCategoryName] = useState<string>("");

  return (
    <div className={"w-full flex flex-col"}>
      <label className={"relative items-center my-2"}>
        <div
          className={"absolute duration-300 transition-all z-10 "
            + ((categoryName && categoryName.length !== 0) ? "text-sm -my-3 mx-2 bg-white text-palette" : "mx-2 my-2.5 opacity-60")}>
          Category Name
        </div>
        <input
          className={"w-full outline rounded hover:outline-palette hover:shadow duration-500 transition-all focus:outline-palette px-2 py-2 text-lg relative "}
          type={"text"}
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
      </label>
      <button
        disabled={categoryName.length === 0}
        type={"button"}
        onClick={async () => {

          const result = await Categories.addCategory({name: categoryName, image: "https://placeimg.com/640/480/any"});
          if (result) {
            toast("Added new category successfully", {
              description : categoryName
            });

            await props.reloadCategory();
          }
        }}
        className={"p-2 rounded bg-palette text-white hover:scale-105 duration-300 transition-all disabled:bg-gray-500 disabled:hover:scale-100"}
      >
        Confirm
      </button>
    </div>
  )
}