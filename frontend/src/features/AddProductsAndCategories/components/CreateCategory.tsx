import {useState} from "react";
import {Categories} from "@/shared/services/services.ts";

export function CreateCategory(){
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
        type={"button"}
        onClick={async () => {await Categories.addCategory({name: categoryName, image: "https://placeimg.com/640/480/any"})}}
        className={"p-2 rounded bg-palette text-white hover:scale-105 duration-300 transition-all"}
      >
        Confirm
      </button>
    </div>
  )
}