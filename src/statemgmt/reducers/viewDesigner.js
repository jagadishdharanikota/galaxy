import produce from 'immer';

import { ADD_DESIGN_ITEM, REMOVE_DESIGN_ITEM, MOVE_DESIGN_ITEM } from '../actions/types';
import { APP_PROPS, OPERATION } from '../../constants';

const viewDesigner = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_DESIGN_ITEM:
      return produce(state, (draft) => {
        let tempDraft = draft;
        const { path, operation, componentState } = payload;

        // updateDateTime: new Date().toISOString(),
        // Base case
        if (path.length === 0) {
          tempDraft[APP_PROPS.CHILDREN].push(componentState);
        }

        path.forEach((key, index) => {
          // Last key in the object path
          if (index === path.length - 1) {
            if (operation === OPERATION.SIBLING_BELOW) {
              tempDraft.splice(key + 1, 0, componentState);
            } else if (operation === OPERATION.SIBLING_ABOVE) {
              tempDraft.splice(key - 1, 0, componentState);
            } else if (operation === OPERATION.CHILD) {
              tempDraft[key][APP_PROPS.CHILDREN].push(componentState);
            }
          } else {
            tempDraft = tempDraft[key];
          }
        });
      });

    case REMOVE_DESIGN_ITEM:
      return produce(state, (draft) => {
        let tempDraft = draft;
        const { path, operation } = payload;

        path.forEach((key, index) => {
          // Last key in the object path
          if (index === path.length - 1 && operation === OPERATION.REMOVE) {
            tempDraft.splice(key, 1);
          } else {
            tempDraft = tempDraft[key];
          }
        });
      });

    case MOVE_DESIGN_ITEM:
      return produce(state, (draft) => {
        let tempDraft = draft;
        const { path, operation } = payload;
        path.forEach((key, index) => {
          // Last key in the object path
          if (index === path.length - 1) {
            const currentItem = tempDraft[key];
            if (operation === OPERATION.MOVE_UP) {
              tempDraft.splice(key, 1);
              tempDraft.splice(key - 1, 0, currentItem);
            } else if (operation === OPERATION.MOVE_DOWN) {
              tempDraft.splice(key, 1);
              tempDraft.splice(key + 1, 0, currentItem);
            }
          } else {
            tempDraft = tempDraft[key];
          }
        });
      });
    default:
      return state;
  }
};

export default viewDesigner;
