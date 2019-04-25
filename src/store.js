import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adReds from './reducers/adReducers';


export default function configureStore(init = {adsList: []}) {
    return createStore(
        adReds,
        {...init},
        applyMiddleware(thunk)
    );
}