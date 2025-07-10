import {useFormContext} from "react-hook-form";

interface SmartHintTextFieldProps {
  name : string,
  registerName : string
}

export function SmartHintTextField(props : SmartHintTextFieldProps) {
  const { register, watch , formState : {errors}} = useFormContext();
  const value = watch(props.registerName);

  return (
    <label className={"relative items-center my-2"}>
      <div
        className={"absolute duration-300 transition-all z-10 "
          + ((value) ? "text-sm -my-3 mx-2 bg-white " + ((errors[props.registerName]) ? "text-red-600" : "text-palette") : "mx-2 my-2.5 opacity-60")}>

        {value ? errors[props.registerName] ? "" + (errors[props.registerName]?.message) : (props.name) : (props.name)}
      </div>
      <input className={"w-full outline rounded hover:outline-palette hover:shadow duration-500 transition-all focus:outline-palette px-2 py-2 text-lg relative " + ((errors[props.registerName] ? "outline-red-400" : ""))}
             type={"text"} {...register(props.registerName)}/>
    </label>
  )
}