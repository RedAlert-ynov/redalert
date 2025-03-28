import { User } from "../auth/auth.types"

export type Article = {
    id: number,
    userId: number,
    title: string,
    slug: string,
    imageUrl: string,
    sections: {
        title: string,
        body: string,
    }[],
    actionButtons: {
        title: string,
        link: string,
    }[],
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