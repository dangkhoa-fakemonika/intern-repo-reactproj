import {axiosInstance} from "@/shared/services/axios/axios.ts";

export class ProductManagement {
  public static async getProducts(limit : number = 10, offset : number = 0){
    return await axiosInstance.get(`/products?limit=${limit}&offset${offset}`);
  }

  public static async getProduct(productId : number) {
    return await axiosInstance.get(`/products/${productId}`);
  }
}
