import { createStore, combineReducers, applyMiddleware, compose, Reducer } from 'redux';

import loginReducers from 'src/client/reducers/login';

interface IStoreOptions {
	reducers: Reducer<any>[];
	middleware: Array<(s: any) => any>;
}

export default function createNewStore({middleware, reducers}: IStoreOptions) {
	const store = createStore(
		combineReducers({
			empty: s => null,
			login: loginReducers,
			/* todo: reducers */
		}),
		!SERVER ? window.__STATE__ : {},
		compose(
			applyMiddleware(/* todo: middleware */),
			(!SERVER && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f,
		),
	);

	return store;
}