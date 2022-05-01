import { STORE } from '../../constants';

import { SHOW_MODAL } from './types';

export default function showModal(payload) {
  return {
    type: SHOW_MODAL,
    payload: {
      ...payload,
      target: STORE.MODAL,
    },
  };
}
