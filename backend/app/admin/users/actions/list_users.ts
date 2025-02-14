import User from '#auth/models/user'

export async function listUsers() {
  return await User.query()
}
