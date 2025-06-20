import {useFormContext} from "react-hook-form";

interface NumberTextFieldProps {
  name : string,
  registerName : string,
  hidden? : boolean
}

export function NumberTextField(props : NumberTextFieldProps){
  const { register } = useFormContext();

  return (
    <label hidden={props.hidden}>
      <div>{props.name}</div>
      <input className={"w-full outline-2 rounded focus:outline-palette px-2 py-2 text-lg"}
             type={"number"} {...register(props.registerName, {valueAsNumber: true})}/>
    </label>
  )
}
