import User from '#auth/models/user'

type Params = {
  userId: number
}

export async function deleteAction({ userId }: Params) {
  // Rechercher l'utilisateur à supprimer
  const user = await User.findOrFail(userId)

  // Supprimer l'utilisateur
  await user.delete()

  return { message: 'User deleted successfully' }
}
