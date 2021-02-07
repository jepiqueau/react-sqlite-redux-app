export enum ArticlesActionTypes {
    INITIALIZE_ARTICLES = '@@articles/INITIALIZE_ARTICLES',
    ADD_ARTICLE = '@@articles/ADD_ARTICLE',
    REMOVE_ARTICLE = '@@articles/REMOVE_ARTICLE',
    SQLITE_ERROR_ARTICLE = '@@articles/SQLITE_ERROR_ARTICLE',
}
export interface IArticle {
    id: number
    title: string
    body: string
}
  
export type ArticleState = {
    articles: IArticle[]
    message: string
    dbname: string
}
  
export type ArticleAction = {
    type: string
    article: IArticle
    articles: IArticle[]
    message: string
    dbname: string
}