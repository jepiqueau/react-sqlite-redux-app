export enum CategoriesActionTypes {
    INITIALIZE_NEWS_CATEGORY = '@@categories/INITIALIZE_NEWS_CATEGORY',
    ADD_NEWS_CATEGORY = '@@categories/ADD_NEWS_CATEGORY',
    REMOVE_NEWS_CATEGORY = '@@categories/REMOVE_NEWS_CATEGORY',
    SQLITE_ERROR_NEWS_CATEGORY = '@@categories/SQLITE_ERROR_NEWS_CATEGORY',
}
export interface ICategory {
    id: number
    kind: string
}
  
export type CategoryState = {
    categories: ICategory[]
    message: string
    dbname: string
}
  
export type CategoryAction = {
    type: string
    category: ICategory
    categories: ICategory[]
    message: string
    dbname: string
}