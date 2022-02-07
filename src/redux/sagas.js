import { call, put, takeEvery } from 'redux-saga/effects'
import { addTodosFailure, addTodosSuccess, finishLoading, setLoading } from './actions';
import { REQUEST_FETCH_TODOS } from './types';

async function fetchTodos(page) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=4&_page=${page}`)
    return await response.json()
}

// worker Saga: will be fired on REQUEST_FETCH_TODOS actions
function* workerSaga(action) {
    try {
        yield put(setLoading())
        const data = yield call(fetchTodos, action.payload);
        yield put(addTodosSuccess(data));
    } catch (e) {
        yield put(addTodosFailure(e.message));
    } finally {
        yield put(finishLoading())
    }
}

/*
  Starts fetchUser on each dispatched `REQUEST_FETCH_TODOS` action.
  Allows concurrent fetches of user.
*/
function* watcherSaga() {
    yield takeEvery(REQUEST_FETCH_TODOS, workerSaga);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default watcherSaga;