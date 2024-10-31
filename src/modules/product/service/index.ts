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
    const response =  await axiosInstance.post("product/create", data)
    return response?.data
}

// ============= UPDATE ============
export const updateCategory = async (data: CategoryType) => {
    const { id } = data;
    delete (data as any).id;
    const response = await axiosInstance.patch(`category/update/${id}`, data)
    return response?.data
}

// ========== DELETE ==========
export const deleteProduct = async (id: string | number) => {
    const response = await axiosInstance.delete(`/product/delete/${id}`)
    return response?.data
}