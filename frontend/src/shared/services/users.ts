import {axiosInstance} from "@/shared/services/axios/axios.ts";
import type {User} from "@/shared/types/user.ts";
// import Cookies from "js-cookie";

export class Users {

  public static async getAllUsers(): Promise<Users[]> {
    const res = await axiosInstance.get<Users[]>("/users");
    if (res.status === 200) return res.data;
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

   public static async getUser(id : number){
    const response = await axiosInstance.get(`users/${id}`);
    if (response.status === 200)
      return response.data;
    else return {};
  }
    public static async signup(payload: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  }) {
    const res = await axiosInstance.post('users/', payload);
    return res.data;
  }

  public static async login(payload: {
    email: string;
    password: string;
  }) {
    
    const res = await axiosInstance.post('/users/', payload);
    // const { access, refresh } = res.data as { access: string; refresh: string };
    
    // Cookies.set('access_token', access, { path: '/' });
    // Cookies.set('refresh_token', refresh, { path: '/' });

    return res.data;
  }

  public static async updateUser(id: number, payload: {
    newname?: string;
    newemail?: string;
    newavatar?: string;
    newpassword?: string;
  }) {
    const res = await axiosInstance.put(`users/${id}`, payload);
    return res.data;
  }

  public static async getProfile() : Promise<User | undefined>{
     const response = await axiosInstance.get("auth/profile");

     if (response.status === 200){
       return response.data as User;
     }
     else return undefined;
  }

  
}