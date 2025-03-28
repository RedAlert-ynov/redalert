import { useMutation } from "@tanstack/react-query";
import { jsonApi } from "../../jsonApi";
import { ArticleCreationPayload, ArticleUpdatePayload, CreateArticleResponse, DeleteArticleResponse } from "./articles.types";
import { useStore } from "../../../store/store";

const adminArticlesEndpoint = "/api/admin/articles"

export function createArticle(article: ArticleCreationPayload, bearerToken: string): Promise<CreateArticleResponse> {
    return jsonApi.post({url: adminArticlesEndpoint, bearerToken, content: article})
}

export function useCreateArticle() {
    const accessToken = useStore((state) => state.accessToken)
    return useMutation({
        mutationFn: (article: ArticleCreationPayload) => createArticle(article, accessToken)
    })
}

export function updateArticle(articleId: number, articleData: ArticleUpdatePayload, bearerToken: string): Promise<CreateArticleResponse> {
    return jsonApi.put({url: `${adminArticlesEndpoint}/${articleId}`, bearerToken, content: articleData})
}

export function useUpdateArticle() {
    const accessToken = useStore((state) => state.accessToken)
    return useMutation({
        mutationFn: ({articleId, articleData}: {articleId: number, articleData: ArticleUpdatePayload}) => updateArticle(articleId, articleData, accessToken)
    })
}

export function deleteArticle(articleId: number, bearerToken: string): Promise<DeleteArticleResponse> {
    return jsonApi.delete({url: `${adminArticlesEndpoint}/${articleId}`, bearerToken})
}

export function useDeleteArticle() {
    const accessToken = useStore((state) => state.accessToken)
    return useMutation({
        mutationFn: (articleId: number) => deleteArticle(articleId, accessToken)
    })
}