import { Reducer } from 'redux'
import { ArticleState, ArticleAction, ArticlesActionTypes, IArticle } from './types'

const initialState: ArticleState = {
    articles: [],
    message: "",
    dbname: "TestRedux",

};
const reducer = (state: ArticleState = initialState, action: ArticleAction): ArticleState => {
//    const reducer: Reducer<ArticleState> = (state = initialState, action) => {
    console.log(`in reducerArticle ${JSON.stringify(state)}`)

    switch (action.type) {
        case ArticlesActionTypes.INITIALIZE_ARTICLES:
            const listArticles: IArticle[] = action.articles
            return {
                ...state,
                articles: listArticles,
                message: action.message,
                dbname: action.dbname,
            };

        case ArticlesActionTypes.ADD_ARTICLE:
            const newArticle: IArticle = {
            id: action.article.id,
            title: action.article.title,
            body: action.article.body,
            };
            return {
                ...state,
                articles: state.articles.concat(newArticle),
                message: action.message,
                dbname: action.dbname,
            };
        case ArticlesActionTypes.REMOVE_ARTICLE:
            const updatedArticles: IArticle[] = state.articles.filter(
            article => article.id !== action.article.id
            );
            return {
                ...state,
                articles: updatedArticles,
                message: action.message,
                dbname: action.dbname,
            };
        default: {
            return state
        }
    }
};
export { reducer as articlesReducer }
