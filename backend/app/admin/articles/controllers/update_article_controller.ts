import { updateArticle } from '#admin/articles/actions/update_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateArticleController {
  public async update({ request, response, params, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to update an article.' })
    }

    const articleId = Number(params.id)

    // Appeler l'action pour mettre à jour l'article

    const article = await updateArticle({ request, articleId })

    return response.ok({
      message: 'Article updated successfully!',
      data: article,
    })
  }
}
