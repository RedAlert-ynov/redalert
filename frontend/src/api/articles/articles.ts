import { useQuery } from "@tanstack/react-query";
import { jsonApi } from "../jsonApi";
import { ArticleResponse, ArticlesResponse } from "./articles.types";

const articlesEndpoint = "/api/articles"

export function getArticles(): Promise<ArticlesResponse> {
    return jsonApi.get({url: articlesEndpoint})
}

export function useArticles() {
    return useQuery({
        queryKey: ['articles'],
        queryFn: () => getArticles(),
        select: (response) => response.data
    })
}

export function getArticle(id: number): Promise<ArticleResponse> {
    return jsonApi.get({url: `${articlesEndpoint}/${id}`})
}

export function useArticle(articleId: number) {
    return useQuery({
        queryKey: ['articles', articleId],
        queryFn: () => getArticle(articleId),
        select: (response) => response.data
    })
}