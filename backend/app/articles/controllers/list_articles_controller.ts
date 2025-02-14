import { listArticles } from '#articles/actions/list_articles'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListArticlesController {
  public async index({ response }: HttpContext) {
    try {
      const articles = await listArticles()
      return response.ok({ data: articles })
    } catch (error) {
      return response.internalServerError({ message: 'Unable to fetch articles', error })
    }
  }
}
