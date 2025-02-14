import { logoutAction } from '#auth/actions/logout_action'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  public async store({ auth, request, response }: HttpContext) {
    const refreshToken = request.input('refreshToken')

    // Vérifie si l'utilisateur est authentifié
    if (!auth.user) {
      return response.unauthorized({ message: 'User is not authenticated' })
    }

    // Appel de l'action pour supprimer les tokens
    await logoutAction(auth.user, refreshToken)

    return response.ok({
      message: 'Logout successful',
    })
  }
}
