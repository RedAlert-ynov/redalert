import { useQuery } from "@tanstack/react-query";
import { jsonApi } from "../jsonApi";
import { ArticlesResponse } from "./articles.types";

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