import {useFormContext} from "react-hook-form";

interface SmartHintTextFieldProps {
  name : string,
  registerName : string
}

export function SmartHintTextField(props : SmartHintTextFieldProps) {
  const { register, watch } = useFormContext();
  const value = watch(props.registerName);

  return (
    <label className={"relative items-center my-2"}>
      <div
        className={"absolute duration-300 transition-all z-10 " + ((value) ? "text-sm -my-3 mx-2 bg-white text-palette" : "mx-2 my-2.5 opacity-60")}>{props.name}</div>
      <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg relative"}
             type={"text"} {...register(props.registerName)}/>
    </label>
  )
}