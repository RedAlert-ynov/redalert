import User from '#auth/models/user'

export const registerAction = async (data: {
  email: string
  password: string
  username: string
}) => {
  // Création de l'utilisateur
  const user = await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
  })

  return user
}
