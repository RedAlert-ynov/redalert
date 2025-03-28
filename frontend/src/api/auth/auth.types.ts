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

type MessageResponse = {
    message: string
}

export type RegisterResponse = MessageResponse & {
    user: User,
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type LoginResponse = MessageResponse & {
    token: {
        accessToken: string;
        refreshToken: string;
    }
}

export type LogoutResponse = MessageResponse

export type RefreshResponse = MessageResponse & {
    accessToken: string;
}

export type UpdateData = Partial<{
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}>

export type UpdateResponse = MessageResponse & {
    user: {
        id: number,
        username: string,
        email: string,
        role: number,
        createdAt: string,
        updatedAt: string,
    }
}

export type DeleteResponse = MessageResponse

export type ResetPasswordResponse = MessageResponse