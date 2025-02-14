import User from '#auth/models/user'

type Params = {
  userId: number
}

export async function deleteUser({ userId }: Params) {
  const user = await User.findOrFail(userId)
  await user.delete()
  return { message: 'User deleted successfully' }
}
