import User from '#auth/models/user'
import { updateUserValidator } from '#admin/users/validators/update_user_validator'
import { Infer } from '@vinejs/vine/types'

type Params = {
  userId: number
  data: Infer<typeof updateUserValidator>
}

export async function updateUser({ userId, data }: Params) {
  const user = await User.findOrFail(userId)

  user.merge({
    username: data.username ?? user.username,
    email: data.email ?? user.email,
    password: data.password ?? user.password,
    role: data.role ?? user.role,
  })

  await user.save()
  return user
}
