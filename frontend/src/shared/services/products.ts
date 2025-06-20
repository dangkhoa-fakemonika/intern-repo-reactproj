import {axiosInstance} from "@/shared/services/axios/axios.ts";
import {type ProductFilter, convertToFilterQuery} from "@/shared/types/type.ts";

export class Products {
  public static async getProducts(filter? : ProductFilter){
    let query;
    const filterQuery = convertToFilterQuery(filter ?? {});
    if (filterQuery.length === 0){
      query = `/products`;
    }
    else {
      query = `/products?${filterQuery}`;
    }
    const response = await axiosInstance(query);

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
