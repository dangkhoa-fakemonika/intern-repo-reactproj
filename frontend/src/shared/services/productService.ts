import axiosInstance from '@/shared/services/axios/axios';

export const getProduct = async (p0: { id: number; title: string; price: number; image: string; }[]) => {
  try {
    const response = await axiosInstance.get('products');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching product:', error);
    throw new Error(error.response?.statusText || error.message);
  }
};