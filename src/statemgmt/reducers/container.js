import produce from 'immer';
import { ADD_CONTAINER_ITEM, REMOVE_CONTAINER_ITEM, SWITCH_CONTAINER_ITEM } from '../actions/types';

const container = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CONTAINER_ITEM:
      return produce(state, (draft) => {
        const tempDraft = draft;
        const {
          component,
          data,
          data: { metadata },
          target,
        } = payload;
        const { _id, name } = metadata;
        const { allowDuplicates, items } = draft[target];
        const itemCount = Object.keys(items).length;

        if (!allowDuplicates) {
          // Check if the tab is already opened and set it as activeTab so that it is focused in UI
          let itemIndex;
          for (itemIndex = 0; itemIndex < itemCount; itemIndex += 1) {
            if (Object.prototype.hasOwnProperty.call(items, itemIndex)) {
              const tab = items[itemIndex];
              if (tab.key === _id) {
                tempDraft[target].activeItem = parseInt(itemIndex, 10) + 1;
                return tempDraft;
              }
            }
          }
        }

        items.push({
          key: _id,
          label: name,
          component,
          ...data,
        });

        tempDraft[target].activeItem = items.length;
        return tempDraft;
      });

    case REMOVE_CONTAINER_ITEM:
      return produce(state, (draft) => {
        const tempDraft = draft;
        const { index, target } = payload;
        const { activeItem, items } = draft[target];
        const removedItem = index + 1;
        const { key } = draft[target].items[index];

        // Removing the item with passed index
        tempDraft[target].items.splice(index, 1);

        delete tempDraft[target][key];

        // Setting activeTab properly after item is removed from the open tabs list
        if (removedItem !== activeItem && activeItem > removedItem) {
          tempDraft[target].activeItem = activeItem - 1;
        } else if (removedItem === activeItem) {
          tempDraft[target].activeItem = items.length;
        }
      });

    case SWITCH_CONTAINER_ITEM:
      return produce(state, (draft) => {
        const tempDraft = draft;
        const { index, target } = payload;
        tempDraft[target].activeItem = index;
      });

    default:
      return state;
  }
};

export default container;
