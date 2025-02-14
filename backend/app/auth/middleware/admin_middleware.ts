import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '#auth/enums/user_role'

export default class AdminMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    // Vérifie si l'utilisateur est connecté
    if (!auth.user) {
      return response.unauthorized({ message: 'You must be logged in to access this resource.' })
    }

    // Vérifie si le rôle de l'utilisateur est Admin
    if (auth.user.role !== UserRole.Admin) {
      return response.forbidden({ message: 'Access denied. Admins only.' })
    }

    // Passe au middleware suivant ou au contrôleur
    await next()
  }
}
