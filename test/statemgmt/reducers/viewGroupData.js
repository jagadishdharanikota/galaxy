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

export {getItemType1ActionAndAfterState, getItemType2ActionAndAfterState, getItemType3ActionAndAfterState};