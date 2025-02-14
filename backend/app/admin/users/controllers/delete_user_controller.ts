import { deleteUser } from '#admin/users/actions/delete_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteUserController {
  public async destroy({ params, response }: HttpContext) {
    const userId = Number(params.id)

    if (Number.isNaN(userId)) {
      return response.badRequest({ message: 'Invalid user ID' })
    }

    try {
      const result = await deleteUser({ userId })
      return response.ok(result)
    } catch (error) {
      return response.notFound({ message: 'User not found' })
    }
  }
}
