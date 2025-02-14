import Article from '#articles/models/article'
import { createArticleValidator } from '#admin/articles/validators/create_validator'
import { Infer } from '@vinejs/vine/types'
import User from '#auth/models/user'

type Params = {
  request: any
  user: User
}

export async function createArticle({ request, user }: Params) {
  // Valider les données
  const payload: Infer<typeof createArticleValidator> =
    await request.validateUsing(createArticleValidator)

  // Créer un nouvel article
  const article = await Article.create({
    userId: user.id,
    title: payload.title,
    imageUrl: payload.imageUrl,
    sections: payload.sections,
    actionButtons: payload.actionButtons,
  })

  return article
}
