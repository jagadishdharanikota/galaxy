// import { combineReducers } from 'redux';
// import app from './core';
import {
  ADD_CONTAINER_ITEM,
  ADD_CONTEXT_DATA,
  ADD_DESIGN_ITEM,
  MOVE_DESIGN_ITEM,
  REMOVE_CONTAINER_ITEM,
  REMOVE_DESIGN_ITEM,
  SET_PORTAL_DATA,
  SET_VALUE,
  SWITCH_CONTAINER_ITEM,
} from '../actions/types';
import app from './app';
import container from './container';
import viewDesigner from './viewDesigner';
// import modal from './modal';
// import viewGroup from './viewGroup';

/**
 * Reducer to handle portal actions
 * @param  {Object} state={}
 * @param  {Object} action
 * @returns returnstate
 */
function root(state = {}, action) {
  switch (action.type) {
    case SET_PORTAL_DATA:
      return {
        ...state,
        UIMetadata: action.payload.data,
      };

    case ADD_DESIGN_ITEM:
    case REMOVE_DESIGN_ITEM:
    case MOVE_DESIGN_ITEM:
      return viewDesigner(state, action);

    /*
    case ADD_VIEWGROUP_ITEM:
    case REMOVE_VIEWGROUP_ITEM:
    case SWITCH_VIEWGROUP_ITEM:
      return viewGroup(state, action);
      */

    case ADD_CONTAINER_ITEM:
    case REMOVE_CONTAINER_ITEM:
    case SWITCH_CONTAINER_ITEM:
      return container(state, action);

    case SET_VALUE:
    case ADD_CONTEXT_DATA:
      return app(state, action);

    // case HIDE_MODAL:
    // case SHOW_MODAL:
    // return modal(state, action);
    default:
      return state;
  }
}

export default root;

/*
export default combineReducers({
  'app/modal': modal,
  viewDesignerReducer,
  viewGroupReducer: viewGroup,
  app,
});
*/
