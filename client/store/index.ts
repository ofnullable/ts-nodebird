import createSagaMiddleware, { Task } from 'redux-saga';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import reducers, { AppState } from './reducers';
import sagas from './sagas';
import { isProd } from '../utils/global';

export interface ReduxStore extends Store<AppState> {
  sagaTask: Task;
}

export const makeStore: MakeStore<AppState> = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const enhancer = isProd ? applyMiddleware(sagaMiddleware) : composeWithDevTools(applyMiddleware(sagaMiddleware));

  const store = createStore(reducers, enhancer);

  // 3: Run your sagas on server
  (store as ReduxStore).sagaTask = sagaMiddleware.run(sagas);

  // 4: now return the store:
  return store;
};

export const wrapper = createWrapper<AppState>(makeStore, { debug: !isProd });
