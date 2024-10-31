import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from "@notification";
import { CategoryType } from '../types';
import { createCategory, deleteProduct, updateCategory } from '../service';

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

// ========== DELETE ==========
export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (response) => {
            console.log(response);
            
            // Notification('success', response?.message?)
        },
        onSettled: (_, error) => {
            if (error) {
                // Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_products"] })
            }
        }
    });
}