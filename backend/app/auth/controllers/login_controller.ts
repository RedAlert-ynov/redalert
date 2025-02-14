import { loginValidator } from '#auth/validators/login_validator'
import { loginAction } from '#auth/actions/login_action'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  public async store({ request, response }: HttpContext) {
    // Validation des données
    const payload = await request.validateUsing(loginValidator)

    // Appel de l'action pour tenter la connexion
    const token = await loginAction(payload.email, payload.password)

    return response.ok({
      message: 'Login successful',
      token: token,
    })
  }
}
