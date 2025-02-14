import { updateUserValidator } from '#auth/validators/update_validator'
import { updateAction } from '#auth/actions/update_action'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateController {
  public async update({ request, response, auth }: HttpContext) {
    // Récupérer l'utilisateur authentifié
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    // Valider les données
    const payload = await request.validateUsing(updateUserValidator)

    // Appeler l'action pour mettre à jour l'utilisateur
    const updatedUser = await updateAction({ user, data: payload })

    return response.ok({
      message: 'Your profile has been updated successfully',
      user: updatedUser,
    })
  }
}
