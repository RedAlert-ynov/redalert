import Article from '#articles/models/article'

export async function listArticles() {
  return await Article.query().preload('user')
}
