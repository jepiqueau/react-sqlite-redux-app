import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApplicationState, ApplicationAction, DispatchType, rootReducer } from './store';


const configureStore = () => {
    const middlewareEnhancer = applyMiddleware(thunk);
    const composeEnhancers = composeWithDevTools(middlewareEnhancer);
    const store: Store<ApplicationState, ApplicationAction> & {
        dispatch: DispatchType
    } = createStore(rootReducer, composeEnhancers);   
    return store;
};
export default configureStore;
