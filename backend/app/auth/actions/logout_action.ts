import User from '#auth/models/user'
import RefreshToken from '#auth/models/refresh_token'

export const logoutAction = async (user: User, refreshTokenValue?: string) => {
  // Suppression du token d'accès actuel
  if (user.currentAccessToken) {
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  // Suppression du refresh token s'il est fourni
  if (refreshTokenValue) {
    await RefreshToken.query()
      .where('token', refreshTokenValue)
      .andWhere('user_id', user.id)
      .delete()
  }
}
