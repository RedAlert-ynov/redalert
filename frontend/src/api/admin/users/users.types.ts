import { UpdateData } from './../../auth/auth.types';
import { User } from "../../auth/auth.types"
import { MessageResponse } from "../../common.types"

export type UsersResponse = {
    data: User[]
}

export type UpdateUserResponse = MessageResponse & {
    user: User
}

export type UpdateUserData = Partial<UpdateData & {
    role: number
}>

export type DeleteUserResponse = MessageResponse