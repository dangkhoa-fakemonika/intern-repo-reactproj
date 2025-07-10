import {isValidURL} from "@/shared/helpers/is-valid-url.ts";
import {Cross2Icon} from "@radix-ui/react-icons";
import {useFieldArray, useFormContext} from "react-hook-form";
import {useEffect, useMemo, useRef, useState} from "react";
import {useThrottle} from "@/shared/hooks/useThrottle.ts";

export function ImageInput(){
  const {watch, control} = useFormContext();
  const [imageInput, setImageInput] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const imageInputThrottle = useThrottle(imageInput, 1000);

  // const [isDraggingFile, setDraggingFile] = useState<boolean>("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  // const [imageList, setImageList] = useState<string[]>([]);

  const watchImages = watch("images");
  const {fields, append, remove} = useFieldArray({
    control,
    name: "images",
    rules: {
      maxLength: 5
    }
  });

  useEffect(() => {
    if (imageInputRef.current !== null && imageInputRef.current.files !== null) {
      imageInputRef.current.onchange = () => {
        if (imageInputRef.current !== null && imageInputRef.current.files !== null)
          for (let i = 0; i < Math.min(imageInputRef.current.files.length, 5) ; i++){
            // tempImg.push(URL.createObjectURL(imageInputRef.current.files[i]))
            append(URL.createObjectURL(imageInputRef.current.files[i]));

          }
      }
    }
  }, [])

  useMemo(() => {
    if (imageInputThrottle.length <= 0 || !isValidURL(imageInputThrottle)) {
      setImageError("Not a valid image URL");
    } else setImageError("");
  }, [imageInputThrottle])




  return (
    <div>
      <div className={"w-full flex flex-row gap-2"}>
        <label className={"w-full shrink"}>
          <div
            className={"absolute duration-300 transition-all z-10 "
              + ((imageInput) ? "text-sm -my-3 mx-2 bg-white text-palette" : "mx-2 my-2.5 opacity-60")}>
            {imageError.length === 0 ? "Image URL" : imageError}
          </div>

          <input
            className={"w-full outline rounded hover:outline-palette hover:shadow duration-500 focus:outline-palette px-2 py-2 text-lg relative"}
            value={imageInput}
            onChange={(event) => setImageInput(event.target.value)}
            type={"text"}/>
        </label>

        {/*<button*/}
        {/*  type={"button"}*/}
        {/*  disabled={imageInputThrottle.length <= 0 || !isValidURL(imageInputThrottle)}*/}
        {/*  onClick={() => {*/}
        {/*    append(imageInput);*/}
        {/*    setImageInput("");*/}
        {/*  }}*/}
        {/*  className={"w-fit text-white bg-palette disabled:bg-gray-300 p-2 rounded hover:scale-105 duration-300 transition-transform shrink-0"}*/}
        {/*>*/}
        {/*  <span className={"inline-block w-full flex-nowrap"}> Add Image </span>*/}
        {/*</button>*/}

        <label
          className={"border-2 rounded text-palette flex flex-row items-center p-2  border-palette shrink-0 hover:scale-105 duration-300 transition-transform"}
        >
          <div>
            Upload Image
          </div>

          <input
            type={"file"}
            hidden={true}
            accept={"image/*"}
            multiple={true}
            ref={imageInputRef}
          />

        </label>
      </div>


      <div
        className={"w-full flex flex-row flex-wrap gap-2 my-2 p-2 border-dashed rounded border border-2 border-palette min-h-[240px]"}
        onDragOver={() => console.log("something something")}
      >
        {
          fields.length != 0 ?
          fields.map((item, index) => (
            <div
              key={item.id}
              className={"relative flex flex-wrap flex-col items-end"}
            >
              <div
                className={"absolute z-10 text-white bg-red-600 p-2 rounded-full m-2 hover:bg-red-700 duration-300 transition-colors"}
                onClick={() => remove(index)}
              >
                <Cross2Icon/>
              </div>

              <img
                src={watchImages[index]}
                alt={item.id}
                className={"relative aspect-square w-[240px] rounded"}
              />
            </div>
          )) :
            <div className={"text-palette opacity-75 w-full text-center py-8"}>Enter an image URL to add an image to your product</div>
        }
      </div>
    </div>
  )
}