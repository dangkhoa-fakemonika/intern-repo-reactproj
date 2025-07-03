import {useFormContext} from "react-hook-form";
import {memo} from "react";

interface NumberTextFieldProps {
  name : string,
  registerName : string,
  hidden? : boolean
}

export const NumberTextField = memo(function NumberTextField(props : NumberTextFieldProps){
  const { register, watch } = useFormContext();
  const value = watch(props.registerName);

  return (
    <label hidden={props.hidden} className={"relative items-center my-2"}>
      <div className={"absolute duration-300 transition-all z-10 " + ((value) ? "text-sm -my-3 mx-2 bg-white text-palette" : "m-2")}>{props.name}</div>
      <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg relative"}
             type={"number"} {...register(props.registerName, {valueAsNumber: true})}/>
    </label>
  )
});
