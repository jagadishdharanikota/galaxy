import { call, put } from 'redux-saga/effects';
import httpClient from '../../services';

import routingManager from '../../core/routing-manager';
import { ADD_VIEWGROUP_ITEM } from '../actions/types';

function* addViewGroupItem(action) {
  try {
    const { component, _id, type } = action.payload;
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
    const response = { component, data };

    yield put({ type: ADD_VIEWGROUP_ITEM, payload: response });
  } catch (e) {
    yield put({ type: 'FETCH_FAILED', message: e.message });
  }
}

export default addViewGroupItem;
