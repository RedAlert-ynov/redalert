import User from '#auth/models/user'

type Params = {
  id: string
}

export async function showUser({ id }: Params) {
  // Rechercher l'utilisateur par id
  return await User.query().where('id', id).firstOrFail()
}
