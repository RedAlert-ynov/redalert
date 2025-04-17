import { ActionButton, Article, Section } from "../../articles/articles.types"
import { MessageResponse } from "../../common.types"

export type ArticleCreationPayload = {
    title: string,
    imageUrl?: string,
    sections: Section[],
    actionButtons?: ActionButton[]
}

export type CreateArticleResponse = MessageResponse & {
    data: Omit<Article, "userId" | "user">
}

export type ArticleUpdatePayload = Partial<ArticleCreationPayload>

export type DeleteArticleResponse = MessageResponse