import { registerValidator } from '#auth/validators/register_validator'
import { registerAction } from '#auth/actions/register_action'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  public async store({ request, response }: HttpContext) {
    // Validation des données
    const payload = await request.validateUsing(registerValidator)

    // Appel de l'action pour créer l'utilisateur
    const user = await registerAction(payload)

    return response.created({
      message: 'User successfully registered',
      user,
    })
  }
}
