import produce from 'immer';
import { SET_PAGE_VIEW } from '../actions/types';

const pageDesignerReducer = (state = [], action) => {
  const { type, payload } = action;
  // const { region, refID } = payload;

  switch (type) {
    case SET_PAGE_VIEW:
      return produce(state, (draft) => {
        const tempDraft = draft;
        tempDraft.viewGroup.tabs[draft.viewGroup.activeTab - 1].properties.properties;
      });
    default:
      return state;
  }
};

export default pageDesignerReducer;
