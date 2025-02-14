import { showArticle } from '#articles/actions/show_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class ShowArticleController {
  public async show({ params, response }: HttpContext) {
    try {
      // Passe le slug depuis les paramètres de la route
      const article = await showArticle({ slug: params.slug })

      // Retourne l'article trouvé
      return response.ok({ data: article })
    } catch {
      // Retourne une erreur si l'article n'est pas trouvé
      return response.notFound({ message: 'Article not found.' })
    }
  }
}
