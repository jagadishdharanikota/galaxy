import { call, put } from 'redux-saga/effects';
import routingManager from '../../core/routing-manager';
import httpClient from '../../services';
import { ADD_CONTAINER_ITEM, REMOVE_CONTAINER_ITEM, SWITCH_CONTAINER_ITEM } from '../actions/types';

function* addViewGroupItem(action) {
  try {
    const { component, _id, type, target } = action.payload;
    let routeAction;
    switch (type) {
      case 'page':
        routeAction = 'showPage';
        break;
      case 'view':
        routeAction = 'showView';
        break;
      default:
        console.error('Invalid type passed', type);
    }
    const { path: url, method } = routingManager.getResolvedRoute(routeAction, { _id });
    const { data } = yield call(httpClient, { url, method });
    const payload = { component, data, target };

    // yield put({ type: ADD_VIEWGROUP_ITEM, payload: response });
    yield put({ type: ADD_CONTAINER_ITEM, payload });
  } catch (e) {
    yield put({ type: 'FETCH_FAILED', message: e.message });
  }
}

function* removeViewGroupItem(action) {
  try {
    const { payload } = action;
    yield put({ type: REMOVE_CONTAINER_ITEM, payload });
  } catch (e) {
    console.error('Saga error: ', e);
  }
}

function* switchViewGroupItem(action) {
  try {
    const { payload } = action;
    yield put({ type: SWITCH_CONTAINER_ITEM, payload });
  } catch (e) {
    console.error('Saga error: ', e);
  }
}

function* showModal(action) {
  try {
    const { component, _id, type, target } = action.payload;
    let routeAction;
    switch (type) {
      case 'page':
        routeAction = 'showPage';
        break;
      case 'view':
        routeAction = 'showView';
        break;
      default:
        console.error('Invalid type passed', type);
    }
    const { path: url, method } = routingManager.getResolvedRoute(routeAction, { _id });
    const { data } = yield call(httpClient, { url, method });
    const payload = { component, data, target };

    yield put({ type: ADD_CONTAINER_ITEM, payload });
  } catch (e) {
    yield put({ type: 'FETCH_FAILED', message: e.message });
  }
}

export { addViewGroupItem, removeViewGroupItem, switchViewGroupItem, showModal };
