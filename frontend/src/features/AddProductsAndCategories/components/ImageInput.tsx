import {Cross2Icon} from "@radix-ui/react-icons";
// import {useFieldArray, useFormContext} from "react-hook-form";
import {memo, useCallback, useEffect, useRef, useState} from "react";
import LoadingComponent from "@/components/ui/LoadingComponent.tsx";
import {Files} from "@/shared/services/services.ts";

interface ImageInputProps {
  submitImages : (func : () => Promise<string[]>) => void,
}

export const ImageInput = memo(function ImageInput(props : ImageInputProps){
  console.log("rendering");
  // const {control} = useFormContext();
  const [loadingImages, setLoadingImages] = useState<boolean>(false);
  const [isDraggingFile, setDraggingFile] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const imagesURL = useRef<string[]>([]);

  // const {append} = useFieldArray({
  //   control,
  //   name: "images",
  //   rules: {
  //     maxLength: 5
  //   }
  // });

  const processInputFiles = (files : FileList) =>{
    for (let i = 0; i < files.length ; i++){
      const currentFile = files[i];

      setImages(prevState => {
        return [...prevState, currentFile].slice(0, 5);
      });
    }
  }

  useEffect(() => {
    if (imageInputRef.current !== null) {
      imageInputRef.current.onchange = () => {
        if (imageInputRef.current !== null && imageInputRef.current.files !== null){
          processInputFiles(imageInputRef.current.files);
        }
      }
    }

    pageRef.current = document.body;
    pageRef.current.ondragover = (event) => {event.preventDefault(); setDraggingFile(true)};
    pageRef.current.ondragleave = (event) => {event.preventDefault(); setDraggingFile(false)};
    // pageRef.current.ondragover = (event) => {event.preventDefault(); setDraggingFile(false)};
    pageRef.current.ondrop = (event) => {event.preventDefault(); setDraggingFile(false)};

  }, []);


  const uploadImages = useCallback(async () => {
    const resultURLs = [];
    for (const img of images) {
      const result = await Files.uploadFile(img);
      resultURLs.push(result);
    }
    setImages([]);
    return resultURLs;
  }, [images]);

  useEffect(() => {
    props.submitImages(uploadImages);
  }, [props, uploadImages]);

  useEffect(() => {
    async function load(){
      imagesURL.current = images.map((img) => URL.createObjectURL(img));
      await new Promise(() => setTimeout(() => {setLoadingImages(false)}, 1000));
    }

    load();
    return () => setLoadingImages(true);

  }, [images]);

  return (
    <div
      className={"relative flex justify-center items-center"}
      // onDragEnter={}
      onDrop={(event) => {
        event.preventDefault();
        processInputFiles(event.dataTransfer.files);
      }}


    >
      <div className={"absolute flex justify-center items-center rounded gap-2 my-2 p-2 w-full h-full duration-500 transition-all bg-palette text-white " + (isDraggingFile ? "opacity-100 z-30 " : "opacity-0 -z-30 ")}>
        <div className={"w-fit"}>
          Hello
        </div>
      </div>

      <div className={"absolute flex justify-center items-center rounded gap-2 my-2 p-2 bg-white w-full h-full " + (loadingImages ? "opacity-100 z-20 " : "opacity-0 -z-20 ")}>
        <div className={"scale-200 w-fit"}>
          <LoadingComponent/>
        </div>
      </div>
      <div
        className={"relative w-full flex flex-row flex-wrap gap-2 my-2 p-2 border-dashed rounded border border-2 border-palette min-h-[240px]"}
      >
        {
          imagesURL.current.length != 0 ?
            imagesURL.current.map((item, index) => (
              <div
                key={item}
                className={"relative flex flex-wrap flex-col items-end"}
              >
                <div
                  className={"absolute z-10 text-white bg-red-600 p-2 rounded-full m-2 hover:bg-red-700 duration-300 transition-colors"}
                  onClick={() => setImages(prevState => {
                    return prevState.filter((_file, fileIndex) => fileIndex != index)
                  })}
                >
                  <Cross2Icon/>
                </div>

                <img
                  src={item}
                  alt={item}
                  className={"relative aspect-square w-[240px] rounded"}
                />
              </div>
            )) :
            <div className={"flex flex-col items-center gap-2 text-palette opacity-75 w-full text-center pt-8"}>
              <div>Enter an image URL to add an image to your product</div>
            </div>
        }


        <div className={"flex flex-row justify-center items-center " + (images.length === 0 ? "w-full" : "w-fit h-[240px]") + (images.length >= 5 ? " hidden" : "")}>
          <label
            className={"w-fit h-fit text-center border-2 rounded text-palette flex flex-row items-center p-2  border-palette shrink-0 hover:scale-105 duration-300 transition-transform"}
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
      </div>
    </div>
  )
});