import { deleteAction } from '#auth/actions/delete_action'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteController {
  public async destroy({ auth, response }: HttpContext) {
    const user = auth.user

    // Vérifie si l'utilisateur est connecté
    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to delete your account' })
    }

    // Appel de l'action pour supprimer l'utilisateur
    const result = await deleteAction({ userId: user.id })

    return response.ok(result)
  }
}
