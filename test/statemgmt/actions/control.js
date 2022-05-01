import { SET_VALUE } from './types';

export default function setValue(data) {
  return {
    type: SET_VALUE,
    payload: data,
  };
}
