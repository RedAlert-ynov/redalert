import { listUsers } from '#admin/users/actions/list_users'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListUsersController {
  public async index({ response }: HttpContext) {
    const users = await listUsers()
    return response.ok({ data: users })
  }
}
