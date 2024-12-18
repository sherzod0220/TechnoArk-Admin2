import axiosInstance from '@config';
import { IParams } from '@types'
import { CategoryType } from '../types';

// ======== GET ========
export const getCategory = async(params:IParams) => {
    const response = await axiosInstance.get("product/list", { params })
    return response
}

// ============= CREATE ============
export const createCategory = async (data: CategoryType) => {
    const response =  await axiosInstance.post("category/create", data)
    return response?.data
}

// ============= UPDATE ============
export const updateCategory = async (data: CategoryType) => {
    const { id } = data;
    delete (data as any).id;
    const response = await axiosInstance.patch(`category/update/${id}`, data)
    return response?.data
}