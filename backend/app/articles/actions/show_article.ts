import Article from '#articles/models/article'

type Params = {
  slug: string
}

export async function showArticle({ slug }: Params) {
  // Rechercher l'article par slug
  return await Article.query().where('slug', slug).firstOrFail()
}
