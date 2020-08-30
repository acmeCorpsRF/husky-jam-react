import {createStore, applyMiddleware} from 'redux';
import initReducers from './../reducers';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

const persistConfig = {
    key: 'Weather App',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['citiesReducer']
};

export const history = createBrowserHistory();

function initStore() {

    const innitialStore = {};
    const store = createStore(
        persistReducer(persistConfig, initReducers(history)),
        innitialStore
    );
    const persistor = persistStore(store);
    return {store, persistor};
}

export default initStore;