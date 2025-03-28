export type RegisterPayload = {
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}

export type User = {
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    id: number,
}

export type RegisterResponse = {
    message: string,
    user: User,
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type LoginResponse = {
    message: string;
    token: {
        accessToken: string;
        refreshToken: string;
    }
}

export type LogoutResponse = {
    message: string;
}

export type RefreshResponse = {
    message: string;
    accessToken: string;
}

export type UpdateData = Partial<{
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}>

export type UpdateResponse = {
    message: string,
    user: {
        id: number,
        username: string,
        email: string,
        role: number,
        createdAt: string,
        updatedAt: string,
    }
}