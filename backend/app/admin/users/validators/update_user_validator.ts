import vine from '@vinejs/vine'
import { UserRole } from '#auth/enums/user_role'

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4).maxLength(25).optional(),
    email: vine.string().email().unique({ table: 'users', column: 'email' }).optional(),
    password: vine.string().minLength(8).optional(),
    role: vine.enum(Object.values(UserRole)).optional(),
  })
)
