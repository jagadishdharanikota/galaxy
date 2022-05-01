import { ADD_DESIGN_ITEM, REMOVE_DESIGN_ITEM, MOVE_DESIGN_ITEM } from './types';

/*
 * action creators
 */
export function addDesignItem(data) {
  return { type: ADD_DESIGN_ITEM, payload: data };
}

export function removeDesignItem(data) {
  return { type: REMOVE_DESIGN_ITEM, payload: data };
}

export function moveDesignItem(data) {
  return { type: MOVE_DESIGN_ITEM, payload: data };
}
