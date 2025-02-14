import Article from '#articles/models/article'
import { updateArticleValidator } from '#admin/articles/validators/update_validator'
import { Infer } from '@vinejs/vine/types'

type Params = {
  request: any
  articleId: number
}

export async function updateArticle({ request, articleId }: Params) {
  // Valider les données entrantes
  const payload: Infer<typeof updateArticleValidator> =
    await request.validateUsing(updateArticleValidator)

  // Rechercher l'article existant
  const article = await Article.findOrFail(articleId)

  // Mettre à jour les champs
  article.merge({
    title: payload.title ?? article.title,
    imageUrl: payload.imageUrl ?? article.imageUrl,
    sections: payload.sections ?? article.sections,
    actionButtons: payload.actionButtons ?? article.actionButtons,
  })

  await article.save()

  return article
}
