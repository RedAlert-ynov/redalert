import { User } from "../auth/auth.types"

export type Section = {
    title: string,
    body: string,
}

export type ActionButton = {
    title: string,
    link: string,
}

export type Article = {
    id: number,
    userId: number,
    title: string,
    slug: string,
    imageUrl?: string,
    sections: Section[],
    actionButtons: ActionButton[],
    createdAt: string,
    updatedAt: string,
    user: User
}

export type ArticlesResponse = {
    data: Article[]
}

export type ArticleResponse = {
    data: Article
}