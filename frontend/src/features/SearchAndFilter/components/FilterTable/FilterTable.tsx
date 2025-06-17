import {type FilterDataType} from "@/features/SearchAndFilter/common/types/filterData.ts";
import {FormProvider, useForm} from "react-hook-form";
import {CheckBox} from "@/features/SearchAndFilter/common/components/CheckBox.tsx";
import {useEffect} from "react";

interface FilterTableProps{
  className?: string,
  setfilterdata : (filter : FilterDataType) => void
}

type FilterInputs = {
  clothes : boolean,
  electronics : boolean,
  furniture : boolean,
  shoes : boolean,
  others : boolean,
  low : boolean,
  medium : boolean,
  high : boolean
}

export function FilterTable(props : FilterTableProps){
  const methods = useForm<FilterInputs>();
  const {
    subscribe
  } = methods;

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = subscribe({
      formState: {
        values: true
      },
      callback: ({ values }) => {
        console.log(values);
      }
    })

    return () => callback();

    // You can also just return the subscribe
    // return subscribe();
  }, [subscribe])


  return (
    <FormProvider {...methods}>
      <form
        className={"flex flex-col gap-2 text-lg " + (props.className ?? "")}
      >

        <div className={"font-extrabold text-2xl"}>Bộ lọc</div>
        <div>
          <div className={"font-extrabold text-xl py-2"}>Loại</div>
          <div className={"flex flex-col border rounded py-2 px-4"}>
            <CheckBox label={"Quần áo"} name={'clothes'}/>
            <CheckBox label={"Đồ điện tử"} name={'electronics'}/>
            <CheckBox label={"Nội thất"} name={'furniture'}/>
            <CheckBox label={"Giày dép"} name={'shoes'}/>
            <CheckBox label={"Khác"} name={'others'}/>
          </div>
        </div>
        <div>
          <div className={"font-extrabold text-xl py-2"}>Giá</div>
          <div className={"flex flex-col border rounded py-2 px-4"}>
            <CheckBox label={"Thấp"} name={'low'}/>
            <CheckBox label={"Trung bình"} name={'medium'}/>
            <CheckBox label={"Cao"} name={'high'}/>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
