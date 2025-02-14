import RefreshToken from '#auth/models/refresh_token'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#auth/models/user'

export default class RefreshTokenController {
  public async refresh({ request, response }: HttpContext) {
    // Récupère la valeur du refresh token dans la requête
    const refreshTokenValue: string = request.input('refreshToken')

    if (!refreshTokenValue) {
      return response.badRequest({ message: 'Refresh token is required' })
    }

    // Valide le refresh token
    const refreshToken = await RefreshToken.query()
      .where('token', refreshTokenValue)
      .andWhere('expires_at', '>', DateTime.now().toSQL())
      .preload('user')
      .first()

    if (!refreshToken) {
      return response.unauthorized({ message: 'Invalid or expired refresh token' })
    }

    // Récupère l'utilisateur depuis le refresh token
    const user = refreshToken.user

    if (!user) {
      return response.notFound({
        message: 'User not found for the given refresh token',
        code: 'E_USER_NOT_FOUND',
      })
    }

    // Génère un nouveau token d'accès
    const newAccessToken = await User.accessTokens.create(user, ['*'], { expiresIn: '15 minutes' })

    return response.ok({
      message: 'Access token refreshed successfully',
      accessToken: newAccessToken.value!.release(),
    })
  }
}
