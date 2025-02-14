import { deleteArticle } from '#admin/articles/actions/delete_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteArticleController {
  public async destroy({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to delete an article.' })
    }

    const articleId = Number(params.id)

    try {
      await deleteArticle({ articleId })
      return response.ok({ message: 'Article deleted successfully!' })
    } catch {
      return response.notFound({ message: 'Article not found.' })
    }
  }
}
