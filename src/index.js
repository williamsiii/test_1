import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './store';


// получаемый сохранённое состояние или создаём пустое
const ads = localStorage.getItem('ads') ? JSON.parse(localStorage.getItem('ads')).ads : [];
const init = {adsList: ads};


ReactDOM.render(
    <Provider store={configureStore({...init})}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();
