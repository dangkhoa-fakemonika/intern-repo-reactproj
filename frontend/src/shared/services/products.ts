import {axiosInstance} from "@/shared/services/axios/axios.ts";
import {type ProductFilter, convertToFilterQuery, type Product} from "@/shared/types/type.ts";

export class Products {
  public static async getProducts(filter? : ProductFilter): Promise<Product[]>{
    let query;
    const filterQuery = convertToFilterQuery(filter ?? {});
    if (filterQuery.length === 0){
      query = `/products`;
    }
    else {
      query = `/products?${filterQuery}`;
    }
    const response = await axiosInstance.get(query);

    if (response.status === 200)
      return response.data as Product[];
    else return [];
  }

  public static async getProduct(productId : number) : Promise<Product> {
    const response = await axiosInstance.get(`/products/${productId}`);

    if (response.status === 200)
      return response.data as Product;
    else return {} as Product;
  }

  public static async getSimilarProduct(productId : number) : Promise<Product[]> {
    const response = await axiosInstance.get(`/products/${productId}/related`);

    if (response.status === 200)
      return response.data as Product[];
    else return [] as Product[];
  }
  public static async createProduct( product: Product) : Promise<Product>{
    const response = await axiosInstance.post(`/products`, product);
    if(response.status === 201)
      return response.data as Product;
    else
      throw new Error("Failed to created product")
  } 
  public static async updateProduct(productId: number , product: Product) : Promise<Product>{
    const response = await axiosInstance.put(`/products/${productId}`,product);
    if(response.status===200)
      return response.data as Product;
    else
      throw new Error("Failed to update product")
  }
  public static async deleteProduct(productId: number) : Promise<void>{
    const response = await axiosInstance.delete(`/products/${productId}`);
    if(response.status !== 204)
      throw new Error("Failed to delete product");
  }
}
