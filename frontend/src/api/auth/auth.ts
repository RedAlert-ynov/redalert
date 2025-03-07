import { useMutation } from "@tanstack/react-query"
import { jsonApi } from "../jsonApi"
import { LoginPayload, LoginResponse, LogoutResponse, RegisterPayload, RegisterResponse } from "./auth.types"
import { useStore } from "../../store/store"

const authEndpoint = "/api/auth"

export function register(payload: RegisterPayload): Promise<RegisterResponse> {
    return jsonApi.post({url: `${authEndpoint}/register`, content: payload})
}

export function useRegister() {
    return useMutation({
        mutationFn: (payload: RegisterPayload) => register(payload)
    })
}

export function login(payload: LoginPayload): Promise<LoginResponse> {
    return jsonApi.post({url: `${authEndpoint}/login`, content: payload})
}

export function useLogin() {
    const setLoggedIn = useStore((state) => state.setLoggedIn)
    const setAccessToken = useStore((state) => state.setAccessToken)
    const setRefreshToken = useStore((state) => state.setRefreshToken)
    return useMutation({
        mutationFn: (payload: LoginPayload) => login(payload),
        onSuccess(data) {
            setLoggedIn(true)
            setAccessToken(data.token.accessToken)
            setRefreshToken(data.token.refreshToken)
        },
    })
}

export function logout(bearerToken: string): Promise<LogoutResponse> {
    return jsonApi.post({url: `${authEndpoint}/logout`, bearerToken})
}

export function useLogout() {
    const accessToken = useStore((state) => state.accessToken)
    const setLoggedIn = useStore((state) => state.setLoggedIn)
    const setAccessToken = useStore((state) => state.setAccessToken)
    const setRefreshToken = useStore((state) => state.setRefreshToken)
    return useMutation({
        mutationFn: () => logout(accessToken),
        onSuccess() {
            setLoggedIn(false)
            setAccessToken("")
            setRefreshToken("")
        }
    })
}