import { useQuery } from '@tanstack/react-query'
import { getCategory } from '../service'
import { IParams } from '@types'

export function useGetCategory(params:IParams){
    return useQuery({
        queryKey: ["category", params],
        queryFn: ()=> getCategory(params),
    })
}