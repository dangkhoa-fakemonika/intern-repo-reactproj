import axiosInstance from '@/shared/services/axios/axios';

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('categories');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    throw new Error(error.response?.statusText || error.message);
  }
};