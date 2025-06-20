import {useFormContext} from "react-hook-form";
import type {Category} from "@/shared/types/type.ts";

interface CheckBoxProps {
  category: Category,
  className? : string,
  index: number
}

export function CheckBox(props : CheckBoxProps){
  const { register } = useFormContext();

  return (
    <label className={"w-full flex flex-row justify-between"}>
      <div className={""}>{props.category.name}</div>
      <input
        type={"radio"}
        {...register(`categories.${props.index}`)}
        className={"appearance-auto h-[25px] w-[25px] accent-[#f09728]"}
      />
    </label>
  )
}
