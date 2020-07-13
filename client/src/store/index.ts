import createSagaMiddleware, { Task } from 'redux-saga';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import reducers, { AppState } from './reducers';
import sagas from './sagas';
import { isProd } from '../utils/global';

export interface ReduxStore extends Store<AppState> {
  run: Task;
}

export const configureStore: MakeStore<AppState> = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const enhancer = isProd ? applyMiddleware(sagaMiddleware) : composeWithDevTools(applyMiddleware(sagaMiddleware));

  const store = createStore(reducers, enhancer) as ReduxStore;

  // 3: Run your sagas on server
  store.run = sagaMiddleware.run(sagas);

  // 4: now return the store:
  return store;
};

export default createWrapper<AppState>(configureStore, { debug: !isProd });
