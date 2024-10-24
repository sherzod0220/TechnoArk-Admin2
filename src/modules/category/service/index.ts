import axiosInstance from '@api';
import { IParams } from '@types'

// ======== GET ========
export const getCategory = async(params:IParams) => {
    const response = await axiosInstance.get("category/search", { params })
    return response?.data?.data
}