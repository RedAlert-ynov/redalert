import Article from '#articles/models/article'

type Params = {
  articleId: number
}

export async function deleteArticle({ articleId }: Params) {
  const article = await Article.findOrFail(articleId)
  await article.delete()
  return { message: 'Article deleted successfully' }
}
