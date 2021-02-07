import { combineReducers, Reducer } from 'redux';
import { articlesReducer } from './articles/reducer';
import { ArticleState, ArticleAction } from './articles/types';
import { categoriesReducer } from './categories/reducer';
import { CategoryState, CategoryAction } from './categories/types';

// The top-level state object
export interface ApplicationState {
    articles: ArticleState
    categories: CategoryState
};
export type ApplicationAction = ArticleAction | CategoryAction;
export type DispatchType = (args: ApplicationAction) => ApplicationAction;

// Create the combined reducer
export const rootReducer: Reducer<ApplicationState, ApplicationAction> = combineReducers<ApplicationState>({
    articles: articlesReducer,
    categories: categoriesReducer,
});

  