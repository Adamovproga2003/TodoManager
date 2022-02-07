import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));

// then run the saga
sagaMiddleware.run(watcherSaga)

export default store;