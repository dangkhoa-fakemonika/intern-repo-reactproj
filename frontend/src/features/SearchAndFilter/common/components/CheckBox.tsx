import type {ReactNode} from "react";
import {useFormContext} from "react-hook-form";

interface CheckBoxProps {
  name : string,
  label? : ReactNode,
  className? : string,
}

export function CheckBox(props : CheckBoxProps){
  const { register } = useFormContext();

  return (
    <label className={"w-full flex flex-row justify-between"}>
      <div className={""}>{props.label}</div>
      <input
        type={"checkbox"}
        {...register(props.name)}
        className={"appearance-auto h-[25px] w-[25px] accent-[#f09728]"}
      />
    </label>
  )
}
