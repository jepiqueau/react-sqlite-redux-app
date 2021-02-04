import * as actionTypes from "./actionTypes"

const initialState: ArticleState = {
  articles: [],
  message: "",
  dbname: "TestRedux",

};
const reducer = (
    state: ArticleState = initialState,
    action: ArticleAction
  ): ArticleState => {
    switch (action.type) {
      case actionTypes.INITIALIZE_ARTICLES:
        const listArticles: IArticle[] = action.articles
        return {
          ...state,
          articles: state.articles.concat(listArticles),
          message: action.message,
          dbname: action.dbname,
        };

      case actionTypes.ADD_ARTICLE:
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
      case actionTypes.REMOVE_ARTICLE:
        const updatedArticles: IArticle[] = state.articles.filter(
          article => article.id !== action.article.id
        );
        return {
          ...state,
          articles: updatedArticles,
          message: action.message,
          dbname: action.dbname,
        };
    }
    return state;
  };
  
  export default reducer;
