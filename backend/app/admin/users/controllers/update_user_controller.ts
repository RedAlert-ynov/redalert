import { updateUser } from '#admin/users/actions/update_user'
import type { HttpContext } from '@adonisjs/core/http'
import { updateUserValidator } from '#admin/users/validators/update_user_validator'

export default class UpdateUserController {
  public async update({ request, params, response }: HttpContext) {
    const userId = Number(params.id)

    if (Number.isNaN(userId)) {
      return response.badRequest({ message: 'Invalid user ID' })
    }

    const data = await request.validateUsing(updateUserValidator)

    try {
      const user = await updateUser({ userId, data })
      return response.ok({ message: 'User updated successfully', data: user })
    } catch {
      return response.notFound({ message: 'User not found or could not be updated.' })
    }
  }
}
