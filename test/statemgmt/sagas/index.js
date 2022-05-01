import { call, put, all, takeEvery } from 'redux-saga/effects';
/* eslint no-underscore-dangle: "error" */
import { FETCH_DATA } from '../actions/types';
import httpClient from '../../services';
import addViewGroupItem from './viewgroup-saga';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchData(action) {
  try {
    const { url, method, extraProps, success } = action.payload;
    const { data } = yield call(httpClient, { url, method });
    const response = { ...extraProps, data };

    yield put({ type: success, payload: response });
  } catch (e) {
    yield put({ type: 'FETCH_FAILED', message: e.message });
  }
}

function* saveData(action) {
  try {
    const { payload } = action;
    const { success } = payload;
    const { data } = yield call(httpClient, { ...payload });
    const response = { data };

    if (success) {
      yield put({ type: success, payload: response });
    }
  } catch (e) {
    console.error('Failed to fetch the data', e);
    yield put({ type: 'FETCH_FAILED', message: e.message });
  }
}

function* cloneData(action) {
  try {
    const { payload } = action;
    const { success } = payload;
    const { data } = yield call(httpClient, { ...payload });
    const response = { data };

    if (success) {
      yield put({ type: success, payload: response });
    }
  } catch (e) {
    console.error('Failed to fetch the data', e);
    yield put({ type: 'FETCH_FAILED', message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `FETCH_DATA` action.
  Allows concurrent fetches of user.

function* watchFetchData() {
  yield takeEvery("FETCH_DATA", fetchData);
}

function* watchSaveData() {
  yield takeEvery("SAVE_DATA", saveData);
}
export default watchFetchData;
*/

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_DATA, fetchData),
    takeEvery('CLONE_DATA', cloneData),
    takeEvery('SAVE_DATA', saveData),
    takeEvery('ADD_VIEWGROUP_ITEM_ACTION', addViewGroupItem),
  ]);
}
