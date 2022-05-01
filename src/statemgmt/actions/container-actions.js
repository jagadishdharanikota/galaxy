import { FETCH_DATA, HIDE_MODAL, SHOW_MODAL, SHOW_VIEW } from './types';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
export function showView(data) {
  return {
    type: FETCH_DATA,
    payload: {
      url: `${data.type}s/${data._id}`,
      method: 'GET',
      extraProps: { component: data.component },
      success: SHOW_VIEW,
      failure: '',
    },
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
    payload: {
      data: {},
    },
  };
}

export function showModal(payload) {
  return {
    type: SHOW_MODAL,
    payload,
  };
}
