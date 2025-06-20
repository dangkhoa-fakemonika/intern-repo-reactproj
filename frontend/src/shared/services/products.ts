import {axiosInstance} from "@/shared/services/axios/axios.ts";
import {type ProductFilter, convertToFilterQuery} from "@/shared/types/type.ts";

export class Products {
  public static async getProducts(limit : number = 10, offset : number = 0, filter? : ProductFilter){
    let query;

    if (filter){
      const filterQuery = convertToFilterQuery(filter);
      query = `/products?limit=${limit}&offset=${offset}&${filterQuery}`;
    }
    else {
      query = `/products?limit=${limit}&offset=${offset}`;
    }

    const response = await axiosInstance(query)

    if (response.status === 200)
      return response.data;
    else return [];
  }

  public static async getProduct(productId : number) {
    const response = await axiosInstance.get(`/products/${productId}`);

    if (response.status === 200)
      return response.data;
    else return {};
  }
}
