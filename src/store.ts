import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import adReds from './reducers/adReducers';
import {AdType} from './App';

export interface IStoreState {
    adsList: Array<AdType>,
    page: number,
    pageSize: number,
    totalPages: number
}

const defaultState: IStoreState = {
    adsList: [],
    page: 0,
    pageSize: 0,
    totalPages: 0
};

export default function configureStore(init: any | IStoreState = defaultState): Store<IStoreState> {
return createStore(
        adReds,
        init,
        applyMiddleware(thunk)
    );
}