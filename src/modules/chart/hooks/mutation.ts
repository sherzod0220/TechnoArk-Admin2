import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from "@notification";
import { CategoryType } from '../types';
import { createCategory, updateCategory } from '../service';

// ====== Create Category ======

export function useCreateCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CategoryType) => createCategory(data),
        onSuccess: async (response) => {
            Notification({
                type: "success",
                message: response?.message,
            });
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification({
                    type: "success",
                    message: error?.message,
                });
            } else {
                await queryClient.invalidateQueries({ queryKey: ["category"] })
            }
        }
    })
}

//================ UPDATE CATEGORY ============
export function useUpdateCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CategoryType) => updateCategory(data),
        onSuccess: (response) => {
            Notification({
                type: "success",
                message: response?.message,
            });
        },
        onSettled: async (_, error, variables) => {
            if (error) {
                Notification({
                    type: "error",
                    message: error?.message,
                });
            } else {
                await queryClient.invalidateQueries({ queryKey: ["category", { id: variables.id }] })
            }
        }
    })
}