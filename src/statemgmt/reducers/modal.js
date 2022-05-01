import produce from 'immer';
import { HIDE_MODAL, SHOW_MODAL } from '../actions/types';

const modal = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case HIDE_MODAL:
      return produce(state, (draft) => {
        const { data } = payload;
        const tempDraft = draft;
        tempDraft.modal.open = false;
        tempDraft.modal.componentProps = data;
        return tempDraft;
      });

    case SHOW_MODAL:
      return produce(state, (draft) => {
        const { data } = payload;
        const tempDraft = draft;
        tempDraft.modal.open = true;
        tempDraft.modal.refId = data.metadata._id;
        tempDraft.modal.componentProps = data.metadata;
        return tempDraft;
      });

    default:
      return state;
  }
};

export default modal;
