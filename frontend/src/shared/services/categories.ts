import {axiosInstance} from "@/shared/services/axios/axios.ts";
import type {Category} from "@/shared/types/type.ts";

export class Categories{
  public static async getCategories(limit : number = 10) : Promise<Category[]>{
    const response = await axiosInstance.get(`categories?limit=${limit}`);

    if (response.status === 200)
      return response.data as Category[];
    else return [];
  }

  public static async getCategory(id : number): Promise<Category>{
    const response = await axiosInstance.get(`categories/${id}`);

    if (response.status === 200)
      return response.data as Category;
    else return {} as Category;
  }

}
