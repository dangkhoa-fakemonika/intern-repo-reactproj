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

    return response.status === 200;
  }

  public static async getFile(){

  }
}