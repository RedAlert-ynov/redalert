import { useQuery } from "@tanstack/react-query";
import { jsonApi } from "../../jsonApi";
import { UsersResponse } from "./users.types";
import { useStore } from "../../../store/store";

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
