import { ADD_CONTEXT_DATA, SET_VALUE } from './types';

export function setValue(data) {
  return {
    type: SET_VALUE,
    payload: data,
  };
}

export function addContextData(data) {
  return {
    type: ADD_CONTEXT_DATA,
    payload: data,
  };
}
