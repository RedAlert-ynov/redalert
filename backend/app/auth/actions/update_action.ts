import User from '#auth/models/user'

type Params = {
  user: User
  data: { username?: string; email?: string; password?: string }
}

export async function updateAction({ user, data }: Params) {
  user.merge(data)
  await user.save()

  return user
}
