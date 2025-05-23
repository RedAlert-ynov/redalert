import { useMutation, useQuery } from "@tanstack/react-query";
import { jsonApi } from "../../jsonApi";
import { DeleteUserResponse, UpdateUserData, UpdateUserResponse, UserResponse, UsersResponse } from "./users.types";
import { useStore } from "../../../store/store";
import { queryClient } from "../../client";

const adminUsersEndpoint = "/api/admin/users"

export function getUsers(bearerToken: string): Promise<UsersResponse> {
    return jsonApi.get({url: adminUsersEndpoint, bearerToken})
}

export function useUsers() {
    const accessToken = useStore((state) => state.accessToken)
    return useQuery({
        queryKey: ["admin", "users"],
        queryFn: () => getUsers(accessToken),
        select: (response) => response.data
    })
}

export function getUser(bearerToken: string, userId: number): Promise<UserResponse> {
    return jsonApi.get({url: `${adminUsersEndpoint}/${userId}`, bearerToken})
}

export function useUser(userId: number) {
    const accessToken = useStore((state) => state.accessToken)
    return useQuery({
        queryKey: ["admin", "users", userId],
        queryFn: () => getUser(accessToken, userId),
        select: (response) => response.data
    })
}

export function updateUser(userId: number, userData: UpdateUserData, bearerToken: string): Promise<UpdateUserResponse> {
    return jsonApi.put({url: `${adminUsersEndpoint}/${userId}`, bearerToken, content: userData})
}

export function useUpdateUser() {
    const accessToken = useStore((state) => state.accessToken)
    return useMutation({
        mutationFn: ({userId, userData}: {userId: number, userData: UpdateUserData}) => updateUser(userId, userData, accessToken)
    })
}

export function deleteUser(userId: number, bearerToken: string): Promise<DeleteUserResponse> {
    return jsonApi.delete({url: `${adminUsersEndpoint}/${userId}`, bearerToken})
}

export function useDeleteUser() {
    const accessToken = useStore((state) => state.accessToken)
    return useMutation({
        mutationFn: (userId: number) => deleteUser(userId, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin", "users"]})
        }
    })
}