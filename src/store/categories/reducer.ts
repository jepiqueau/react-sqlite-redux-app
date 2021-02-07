import { Reducer } from 'redux'
import { CategoryState, CategoryAction, CategoriesActionTypes, ICategory } from './types'

const initialState: CategoryState = {
    categories: [],
    message: "",
    dbname: "TestRedux",

};
const reducer = (state: CategoryState = initialState, action: CategoryAction): CategoryState => {
//const reducer: Reducer<CategoryState> = (state = initialState, action) => {
    console.log(`in reducerCategory ${JSON.stringify(state)}`)
    switch (action.type) {
        case CategoriesActionTypes.INITIALIZE_NEWS_CATEGORY:
          const listCategories: ICategory[] = action.categories
          return {
            ...state,
            categories: listCategories,
            message: action.message,
            dbname: action.dbname,
        };
  
        case CategoriesActionTypes.ADD_NEWS_CATEGORY:
          const newCategory: ICategory = {
            id: action.category.id,
            kind: action.category.kind,
        };
          return {
            ...state,
            categories: state.categories.concat(newCategory),
            message: action.message,
            dbname: action.dbname,
          };
        case CategoriesActionTypes.REMOVE_NEWS_CATEGORY:
          const updatedCategories: ICategory[] = state.categories.filter(
            category => category.id !== action.category.id
          );
          return {
            ...state,
            categories: updatedCategories,
            message: action.message,
            dbname: action.dbname,
          };
      }
  
    return state;
};
  
export { reducer as categoriesReducer }
