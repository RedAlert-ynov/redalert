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

export function getArticle(slug: string): Promise<ArticleResponse> {
    return jsonApi.get({url: `${articlesEndpoint}/${slug}`})
}

export function useArticle(articleSlug: string) {
    return useQuery({
        queryKey: ['articles', articleSlug],
        queryFn: () => getArticle(articleSlug),
        select: (response) => response.data
    })
}