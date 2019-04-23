import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adReds from './reducers/adReducers';


export default function configureStore(initialState={}) {
    return createStore(
        adReds,
        initialState,
        applyMiddleware(thunk)
    );
}