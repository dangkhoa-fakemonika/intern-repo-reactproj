import {useFormContext} from "react-hook-form";
import {type ReactNode} from "react";

interface CustomFormRadioProps{
  children : ReactNode,
  registerName : string,
  value : string,
}

export function CustomFormRadio(props: CustomFormRadioProps) {
  const {register, watch} = useFormContext();
  console.log(watch(props.registerName));

  return (
    <label className={"w-fit flex flex-row  border-2 rounded aria-checked:border-palette p-4 hover:bg-gray-100 duration-300 transition-colors"} aria-checked={watch(props.registerName) === props.value}>
      {props.children}
      <input hidden={true} type={"radio"} {...register(props.registerName)} value={props.value}/>
    </label>
  )
}