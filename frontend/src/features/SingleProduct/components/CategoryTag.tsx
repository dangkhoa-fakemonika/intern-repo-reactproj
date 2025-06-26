import {memo} from "react";

interface CategoryTagProps {
  categoryName : string
}

export const CategoryTag = memo(function CategoryTag (props : CategoryTagProps){
  return (
    <div className={"w-fit h-fit px-2 border-1 border-palette rounded text-palette hover:text-white hover:bg-palette hover:cursor-pointer duration-300 transition-colors"}>
      {props.categoryName}
    </div>
  )
})
