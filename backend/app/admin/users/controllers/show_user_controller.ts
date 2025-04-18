import { showUser } from '#admin/users/actions/show_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ShowUserController {
  public async show({ params, response }: HttpContext) {
    try {
      // Passe le slug depuis les paramètres de la route
      const user = await showUser({ id: params.id })

      // Retourne l'utilisateur trouvé
      return response.ok({ data: user })
    } catch {
      // Retourne une erreur si l'utilisateur n'est pas trouvé
      return response.notFound({ message: 'User not found.' })
    }
  }
}
