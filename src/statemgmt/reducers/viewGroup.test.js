import viewGroupReducer from './index';
import withActionsViewDesigner from '../../components/custom/ViewDesigner';
import { ADD_VIEWGROUP_ITEM, REMOVE_VIEWGROUP_ITEM, SWITCH_VIEWGROUP_ITEM } from '../actions/types';

let initialState;
beforeEach(() => {
  initialState = {
    ContainerGroup: {
      activeTab: 0,
      tabs: [],
    },
    ContainerGroupState: {},
  };
});

const getItemType1ActionAndAfterState = () => {
  const action = {
    type: ADD_VIEWGROUP_ITEM,
    payload: {
      component: withActionsViewDesigner,
      data: {
        metadata: {
          _id: 'CreateNewView',
          name: 'Create New View',
          configurations: {},
        },
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'CreateNewView',
          label: 'Create New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      CreateNewView: {
        metadata: {
          _id: 'CreateNewView',
          name: 'Create New View',
          configurations: {},
        },
      },
    },
  };

  return {
    action,
    afterState,
  };
};

const getItemType2ActionAndAfterState = () => {
  const action = {
    type: ADD_VIEWGROUP_ITEM,
    payload: {
      component: withActionsViewDesigner,
      data: {
        metadata: {
          _id: 'MyView1',
          name: 'My View One',
          configurations: {},
        },
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 2,
      tabs: [
        {
          key: 'CreateNewView',
          label: 'Create New View',
          component: withActionsViewDesigner,
        },
        {
          key: 'MyView1',
          label: 'My View One',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      CreateNewView: {
        metadata: {
          _id: 'CreateNewView',
          name: 'Create New View',
          configurations: {},
        },
      },
      MyView1: {
        metadata: {
          _id: 'MyView1',
          name: 'My View One',
          configurations: {},
        },
      },
    },
  };

  return {
    action,
    afterState,
  };
};

const getItemType3ActionAndAfterState = () => {
  const { afterState: afterState2 } = getItemType2ActionAndAfterState();

  const action = {
    type: ADD_VIEWGROUP_ITEM,
    payload: {
      component: withActionsViewDesigner,
      data: {
        metadata: {
          _id: 'MyView2',
          name: 'My View Two',
          configurations: {},
        },
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 3,
      tabs: [
        ...afterState2.ContainerGroup.tabs,
        {
          key: 'MyView2',
          label: 'My View Two',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      CreateNewView: { ...afterState2.ContainerGroupState.CreateNewView },
      MyView1: {
        metadata: {
          _id: 'MyView1',
          name: 'My View One',
          configurations: {},
        },
      },
      MyView2: {
        metadata: {
          _id: 'MyView2',
          name: 'My View Two',
          configurations: {},
        },
      },
    },
  };

  return {
    action,
    afterState,
  };
};

describe('view group reducer', () => {
  it('should return the initial state', () => {
    expect(viewGroupReducer(initialState, {})).toEqual(initialState);
  });
});

describe('view group reducer with ADD_VIEWGROUP_ITEM action', () => {
  it('should handle single addition of item', () => {
    const { action, afterState } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action)).toEqual(afterState);

    // Opening duplicate items in view group will focus that tab
    expect(viewGroupReducer(afterState, action)).toEqual(afterState);
  });

  it('should handle multiple addition of items', () => {
    const { action: action1, afterState: afterState1 } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action1)).toEqual(afterState1);

    const { action: action2, afterState: afterState2 } = getItemType2ActionAndAfterState();
    expect(viewGroupReducer(afterState1, action2)).toEqual(afterState2);
  });

  it('should focus the tab for with duplicate item key we tried to add', () => {
    const { action: action1, afterState: afterState1 } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action1)).toEqual(afterState1);

    const { action: action2, afterState: afterState2 } = getItemType2ActionAndAfterState();
    expect(viewGroupReducer(afterState1, action2)).toEqual(afterState2);

    const afterState3 = {
      ContainerGroup: {
        ...afterState2.ContainerGroup,
        activeTab: 1,
      },
      ContainerGroupState: {
        ...afterState2.ContainerGroupState,
      },
    };

    // Opening duplicate items in view group will focus that tab
    expect(viewGroupReducer(afterState2, action1)).toEqual(afterState3);
  });
});

describe('view group reducer with REMOVE_VIEWGROUP_ITEM action', () => {
  it('should handle single delete item', () => {
    const { action, afterState } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action)).toEqual(afterState);

    const deleteAction = {
      type: REMOVE_VIEWGROUP_ITEM,
      payload: {
        index: 0,
      },
    };

    expect(viewGroupReducer(afterState, deleteAction)).toEqual(initialState);
  });

  it('should handle multiple deletion of items', () => {
    const { action: action1, afterState: afterState1 } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action1)).toEqual(afterState1);

    const { action: action2, afterState: afterState2 } = getItemType2ActionAndAfterState();
    expect(viewGroupReducer(afterState1, action2)).toEqual(afterState2);

    const deleteAction = {
      type: REMOVE_VIEWGROUP_ITEM,
      payload: {
        index: 0,
      },
    };

    const deleteAfterState2 = {
      ContainerGroup: {
        activeTab: 1,
        tabs: [
          {
            key: 'MyView1',
            label: 'My View One',
            component: withActionsViewDesigner,
          },
        ],
      },
      ContainerGroupState: {
        MyView1: {
          metadata: {
            _id: 'MyView1',
            name: 'My View One',
            configurations: {},
          },
        },
      },
    };

    // Opening duplicate items in view group will focus that tab
    expect(viewGroupReducer(afterState2, deleteAction)).toEqual(deleteAfterState2);
    expect(viewGroupReducer(deleteAfterState2, deleteAction)).toEqual(initialState);
  });

  it('should handle deletion of item at middle in the tab list other than focused and maintain focused item as it is', () => {
    const { action: action1, afterState: afterState1 } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action1)).toEqual(afterState1);

    const { action: action2, afterState: afterState2 } = getItemType2ActionAndAfterState();
    expect(viewGroupReducer(afterState1, action2)).toEqual(afterState2);

    const { action: action3, afterState: afterState3 } = getItemType3ActionAndAfterState();
    expect(viewGroupReducer(afterState2, action3)).toEqual(afterState3);

    const deleteAction = {
      type: REMOVE_VIEWGROUP_ITEM,
      payload: {
        index: 1,
      },
    };

    const deleteAfterState2 = {
      ContainerGroup: {
        activeTab: 2,
        tabs: [afterState3.ContainerGroup.tabs[0], afterState3.ContainerGroup.tabs[2]],
      },
      ContainerGroupState: {
        CreateNewView: { ...afterState3.ContainerGroupState.CreateNewView },
        MyView2: {
          metadata: {
            _id: 'MyView2',
            name: 'My View Two',
            configurations: {},
          },
        },
      },
    };

    /* Added 3 items and activeTab is 3rd.
		   Deleting the 2nd items in the tabs list should retain the focus of the 3rd items as it becomes the 2nd items now */
    expect(viewGroupReducer(afterState3, deleteAction)).toEqual(deleteAfterState2);
  });

  it('should handle deletion of first item which is active and make next item as active', () => {
    const { action: action1, afterState: afterState1 } = getItemType1ActionAndAfterState();
    expect(viewGroupReducer(initialState, action1)).toEqual(afterState1);

    const { action: action2, afterState: afterState2 } = getItemType2ActionAndAfterState();
    expect(viewGroupReducer(afterState1, action2)).toEqual(afterState2);

    const { action: action3, afterState: afterState3 } = getItemType3ActionAndAfterState();
    expect(viewGroupReducer(afterState2, action3)).toEqual(afterState3);

    const switchAction = {
      type: SWITCH_VIEWGROUP_ITEM,
      payload: {
        index: 1,
      },
    };

    const afterSwitchActionState3 = {
      ContainerGroup: {
        activeTab: 1,
        tabs: [
          afterState3.ContainerGroup.tabs[0],
          afterState3.ContainerGroup.tabs[1],
          afterState3.ContainerGroup.tabs[2],
        ],
      },
      ContainerGroupState: {
        ...afterState3.ContainerGroupState,
      },
    };
    expect(viewGroupReducer(afterState3, switchAction)).toEqual(afterSwitchActionState3);

    /*
    const deleteAction = {
      type: REMOVE_VIEWGROUP_ITEM,
      payload: {
        index: 0,
      },
    };

    const deleteAfterState2 = {
      ContainerGroup: {
        activeTab: 2,
        tabs: [afterState3.ContainerGroup.tabs[1], afterState3.ContainerGroup.tabs[2]],
      },
      ContainerGroupState: {
        CreateNewView: { ...afterState2.ContainerGroupState.CreateNewView },
        MyView2: {
          metadata: {
            _id: 'MyView2',
            name: 'My View Two',
            configurations: {},
          },
        },
      },
    };
    */

    /* Deleting the 1st item which is currently active in the tabs list should focus the last item in the list */
    // expect(viewGroupReducer(afterSwitchActionState3, deleteAction)).toEqual(deleteAfterState2);
  });
});
