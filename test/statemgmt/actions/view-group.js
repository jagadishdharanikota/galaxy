/* eslint no-underscore-dangle: "error" */
import {
  /*
  FETCH_DATA,
  ADD_VIEWGROUP_ITEM,
  */
  REMOVE_VIEWGROUP_ITEM,
  SWITCH_VIEWGROUP_ITEM,
} from './types';

/*
export function addViewGroupItem(data) {
  const { _id, component, type } = data;
  return {
    type: FETCH_DATA,
    payload: {
      url: `${type}s/${_id}`,
      method: 'GET',
      extraProps: { component },
      success: ADD_VIEWGROUP_ITEM,
      failure: '',
    },
  };
}

export function addViewGroupItem(data) {
  const { _id, component, type } = data;
  return {
    type: 'ADD_VIEWGROUP_ITEM_ACTION',
    payload: {
      url: `${type}s/${_id}`,
      method: 'GET',
      extraProps: { component },
      success: ADD_VIEWGROUP_ITEM,
      failure: '',
    },
  };
}
*/

export function addViewGroupItem(payload) {
  return {
    type: 'ADD_VIEWGROUP_ITEM_ACTION',
    payload,
  };
}

export function removeViewGroupItem(payload) {
  return {
    type: REMOVE_VIEWGROUP_ITEM,
    payload,
  };
}

export function switchViewGroupItem(payload) {
  return {
    type: SWITCH_VIEWGROUP_ITEM,
    payload,
  };
}
