import {axiosInstance} from "@/shared/services/services.ts";

export class Files {
  public static async uploadFile(file : File){
    const response = await axiosInstance.post("files/upload", {
      "file" : file
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (response.status === 201){
      return (response.data as {location : string}).location;
    }
    else {
      return "";
    }
  }

  public static async getFile(){

  }
}