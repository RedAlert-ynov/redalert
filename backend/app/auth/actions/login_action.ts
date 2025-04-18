import User from '#auth/models/user'
import string from '@adonisjs/core/helpers/string'
import RefreshToken from '#auth/models/refresh_token'
import { DateTime } from 'luxon'

export const loginAction = async (email: string, password: string) => {
  const user = await User.verifyCredentials(email, password)

  // Génération du token d'accès
  const accessToken = await User.accessTokens.create(user, ['*'], { expiresIn: '15 minutes' })

  // Génération du refresh token
  const refreshTokenValue = string.generateRandom(64)
  await RefreshToken.create({
    userId: user.id,
    token: refreshTokenValue,
    expiresAt: DateTime.now().plus({ days: 30 }), // Expiration dans 30 jours
  })

  return {
    accessToken: accessToken.value!.release(),
    refreshToken: refreshTokenValue,
    user,
  }
}
