import produce from 'immer';
import { ADD_VIEWGROUP_ITEM, REMOVE_VIEWGROUP_ITEM, SWITCH_VIEWGROUP_ITEM } from '../actions/types';

const viewGroup = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_VIEWGROUP_ITEM:
      return produce(state, (draft) => {
        const tempDraft = draft;
        const {
          component,
          data,
          data: { metadata },
        } = payload;
        const { _id, name } = metadata;
        const { tabs } = draft.ContainerGroup;
        const tabCount = Object.keys(tabs).length;

        // Check if the tab is already opened and set it as activeTab so that it is focused in UI
        let tabIndex;
        for (tabIndex = 0; tabIndex < tabCount; tabIndex += 1) {
          if (Object.prototype.hasOwnProperty.call(tabs, tabIndex)) {
            const tab = tabs[tabIndex];
            if (tab.key === _id) {
              tempDraft.ContainerGroup.activeTab = parseInt(tabIndex, 10) + 1;
              return tempDraft;
            }
          }
        }

        tabs.push({
          key: _id,
          label: name,
          component,
        });

        tempDraft.ContainerGroup.activeTab = tabs.length;
        // Latest Changes
        tempDraft.ContainerGroupState[_id] = data;
        return tempDraft;
      });

    case REMOVE_VIEWGROUP_ITEM:
      return produce(state, (draft) => {
        const tempDraft = draft;
        const { index } = payload;
        const { activeTab, tabs } = draft.ContainerGroup;
        const closingTab = index + 1;
        const { key } = draft.ContainerGroup.tabs[index];

        // Removing the item with passed index
        tempDraft.ContainerGroup.tabs.splice(index, 1);

        delete tempDraft.ContainerGroupState[key];

        // Setting activeTab properly after item is removed from the open tabs list
        if (closingTab !== activeTab && activeTab > closingTab) {
          tempDraft.ContainerGroup.activeTab = activeTab - 1;
        } else if (closingTab === activeTab) {
          tempDraft.ContainerGroup.activeTab = tabs.length;
        }
      });

    case SWITCH_VIEWGROUP_ITEM:
      return produce(state, (draft) => {
        const tempDraft = draft;
        const { index } = payload;
        tempDraft.ContainerGroup.activeTab = index;
      });

    default:
      return state;
  }
};

export default viewGroup;
