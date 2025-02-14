import { createArticle } from '#admin/articles/actions/create_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateArticleController {
  public async store({ request, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to create an article.' })
    }

    // Appeler l'action pour créer l'article
    const article = await createArticle({ request, user })

    return response.created({
      message: 'Article created successfully!',
      data: article,
    })
  }
}
