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

  public static async getProduct(productId : string) : Promise<Product> {
    const response = await axiosInstance.get(`/products/${productId}`);

    if (response.status === 200)
      return response.data as Product;
    else return {} as Product;
  }

  public static async getSimilarProduct(productId : string) : Promise<Product[]> {
    const response = await axiosInstance.get(`/products/${productId}/related`);

    if (response.status === 200)
      return response.data as Product[];
    else return [] as Product[];
  }

  public static async uploadProduct(product: Product) {
    const response = await axiosInstance.post(`/products`, {
      ...product
    });

    return (response.status === 201);
  }
  public static async createProduct( product: Product) : Promise<Product>{
    const response = await axiosInstance.post(`/products`, product);
    if(response.status === 201)
      return response.data as Product;
    else
      throw new Error("Failed to created product")
  }
  public static async updateProduct(productId: string , product: Product) : Promise<Product>{
    const response = await axiosInstance.put(`/products/${productId}`,product);
    if(response.status===200)
      return response.data as Product;
    else
      throw new Error("Failed to update product")
  }
  public static async deleteProduct(productId: string) : Promise<void>{
    const response = await axiosInstance.delete(`/products/${productId}`);
    if(response.status !== 204)
      throw new Error("Failed to delete product");
  }
}
