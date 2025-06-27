import {axiosInstance} from "@/shared/services/axios/axios.ts";

export class Users {
  static signup(arg0: { name: string; email: string; password: string; avatar: string; }) {
    throw new Error("Method not implemented.");
  } 
   public static async getUser(id : number){
    const response = await axiosInstance.get(`users/${id}`);
    if (response.status === 200)
      return response.data;
    else return {};
  }
  public static async signInUser(){
    const response = await axiosInstance.get(`/users/`);
    if (response.status === 200)
      return response.data;
    else return {};
  }
}