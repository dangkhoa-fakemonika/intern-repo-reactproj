import {axiosInstance} from "@/shared/services/axios/axios.ts";

export class Categories{
  public static async getCategories(limit : number = 10){
    const response = await axiosInstance.get(`categories?limit=${limit}`);

    if (response.status === 200)
      return response.data;
    else return [];
  }

  public static async getCategory(id : number){
    const response = await axiosInstance.get(`categories/${id}`);

    if (response.status === 200)
      return response.data;
    else return {};
  }

}
