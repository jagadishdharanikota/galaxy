import viewDesignerReducer from './index';
import withActionsViewDesigner from '../../components/custom/ViewDesigner';

const initialState = {
  ContainerGroup: {
    activeTab: 1,
    tabs: [
      {
        key: 'NewView',
        label: 'New View',
        component: withActionsViewDesigner,
      },
    ],
  },
  ContainerGroupState: {
    NewView: {
      _id: 'NewView',
      name: 'New View',
      category: 'layout',
      type: 'view',
      description: 'Creates new view',
      configurations: {
        children: [],
        dataSource: [],
      },
    },
  },
};

const getLayoutType1ActionAndAfterState = () => {
  const action = {
    type: 'ADD_DESIGN_ITEM',
    payload: {
      path: ['ContainerGroupState', 'NewView', 'configurations', 'children', -1],
      operation: 'SIBLING_BELOW',
      componentState: {
        identifier: '1*1',
        category: 'layout',
        key: '1589301745073',
        columns: [{ children: [] }],
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589301745073',
              columns: [
                {
                  children: [],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getLayoutType2ActionAndAfterState = () => {
  const action = {
    type: 'ADD_DESIGN_ITEM',
    payload: {
      path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 1],
      operation: 'SIBLING_BELOW',
      componentState: {
        identifier: '1*1',
        category: 'layout',
        key: '1589305411735',
        columns: [{ children: [] }],
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589301745073',
              columns: [
                {
                  children: [],
                },
              ],
            },
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getLayoutType3ActionAndAfterState = () => {
  const action = {
    type: 'ADD_DESIGN_ITEM',
    payload: {
      path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 1, 'columns', 0],
      operation: 'CHILD',
      componentState: {
        identifier: '1*2',
        category: 'layout',
        key: '1589305929421',
        columns: [
          {
            children: [],
          },
          {
            children: [],
          },
        ],
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589301745073',
              columns: [
                {
                  children: [],
                },
              ],
            },
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [
                    {
                      identifier: '1*2',
                      category: 'layout',
                      key: '1589305929421',
                      columns: [
                        {
                          children: [],
                        },
                        {
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getContolType1ActionAndAfterState = () => {
  const action = {
    type: 'ADD_DESIGN_ITEM',
    payload: {
      path: [
        'ContainerGroupState',
        'NewView',
        'configurations',
        'children',
        1,
        'columns',
        0,
        'children',
        0,
        'columns',
        1,
      ],
      operation: 'CHILD',
      componentState: {
        identifier: 'Input',
        category: 'control',
        key: '1589306225434',
        configurations: {
          type: 'text',
          label: 'Input',
          propertyRef: '',
          position: 'vertical',
        },
      },
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589301745073',
              columns: [
                {
                  children: [],
                },
              ],
            },
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [
                    {
                      identifier: '1*2',
                      category: 'layout',
                      key: '1589305929421',
                      columns: [
                        {
                          children: [],
                        },
                        {
                          children: [
                            {
                              identifier: 'Input',
                              category: 'control',
                              key: '1589306225434',
                              configurations: {
                                type: 'text',
                                label: 'Input',
                                propertyRef: '',
                                position: 'vertical',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getLayoutType1DeleteActionAndAfterState = () => {
  const action = {
    type: 'REMOVE_DESIGN_ITEM',
    payload: {
      path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 0],
      operation: 'REMOVE',
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [
                    {
                      identifier: '1*2',
                      category: 'layout',
                      key: '1589305929421',
                      columns: [
                        {
                          children: [],
                        },
                        {
                          children: [
                            {
                              identifier: 'Input',
                              category: 'control',
                              key: '1589306225434',
                              configurations: {
                                type: 'text',
                                label: 'Input',
                                propertyRef: '',
                                position: 'vertical',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getLayoutType2DeleteActionAndAfterState = () => {
  const action = {
    type: 'REMOVE_DESIGN_ITEM',
    payload: {
      path: [
        'ContainerGroupState',
        'NewView',
        'configurations',
        'children',
        0,
        'columns',
        0,
        'children',
        0,
      ],
      operation: 'REMOVE',
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getLayoutType1MoveActionAndAfterState = () => {
  const action = {
    type: 'MOVE_DESIGN_ITEM',
    payload: {
      path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 1],
      operation: 'MOVE_UP',
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [
                    {
                      identifier: '1*2',
                      category: 'layout',
                      key: '1589305929421',
                      columns: [
                        {
                          children: [],
                        },
                        {
                          children: [
                            {
                              identifier: 'Input',
                              category: 'control',
                              key: '1589306225434',
                              configurations: {
                                type: 'text',
                                label: 'Input',
                                propertyRef: '',
                                position: 'vertical',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589301745073',
              columns: [
                {
                  children: [],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

const getLayoutType2MoveActionAndAfterState = () => {
  const action = {
    type: 'MOVE_DESIGN_ITEM',
    payload: {
      path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 0],
      operation: 'MOVE_DOWN',
    },
  };

  const afterState = {
    ContainerGroup: {
      activeTab: 1,
      tabs: [
        {
          key: 'NewView',
          label: 'New View',
          component: withActionsViewDesigner,
        },
      ],
    },
    ContainerGroupState: {
      NewView: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        configurations: {
          children: [
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589301745073',
              columns: [
                {
                  children: [],
                },
              ],
            },
            {
              identifier: '1*1',
              category: 'layout',
              key: '1589305411735',
              columns: [
                {
                  children: [
                    {
                      identifier: '1*2',
                      category: 'layout',
                      key: '1589305929421',
                      columns: [
                        {
                          children: [],
                        },
                        {
                          children: [
                            {
                              identifier: 'Input',
                              category: 'control',
                              key: '1589306225434',
                              configurations: {
                                type: 'text',
                                label: 'Input',
                                propertyRef: '',
                                position: 'vertical',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          dataSource: [],
        },
      },
    },
  };

  return { action, afterState };
};

describe('view reducer with ADD_DESIGN_ITEM action', () => {
  it('should add design item layout 1*1 as children to the designer', () => {
    const { action, afterState } = getLayoutType1ActionAndAfterState();
    expect(viewDesignerReducer(initialState, action)).toEqual(afterState);
  });

  it('should add design item layout 1*1 as sibiling below previou1 1*1 to the designer', () => {
    const { afterState: afterState1 } = getLayoutType1ActionAndAfterState();
    const { action, afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    expect(viewDesignerReducer(afterState1, action)).toEqual(afterState2);
  });

  it('should add design item layout 1*2 as children of second 1*1 layout', () => {
    const { afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    const { action, afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    expect(viewDesignerReducer(afterState2, action)).toEqual(afterState3);
  });

  it('should add design item text input as children of second column in 1*2 layout', () => {
    const { afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    const { action, afterState: afterState4 } = getContolType1ActionAndAfterState();
    expect(viewDesignerReducer(afterState3, action)).toEqual(afterState4);
  });
});

describe('view reducer with DELETE_DESIGN_ITEM action', () => {
  let afterSetupState;

  beforeAll(() => {
    const { action: action1, afterState: afterState1 } = getLayoutType1ActionAndAfterState();
    const { action: action2, afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    const { action: action3, afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    const { action: action4, afterState: afterState4 } = getContolType1ActionAndAfterState();
    viewDesignerReducer(initialState, action1);
    viewDesignerReducer(afterState1, action2);
    viewDesignerReducer(afterState2, action3);
    viewDesignerReducer(afterState3, action4);
    afterSetupState = afterState4;
  });

  it('should delete design item input field in second column of layout 1*2', () => {
    const {
      action,
      afterState: afterLayoutDeleteState,
    } = getLayoutType1DeleteActionAndAfterState();
    expect(viewDesignerReducer(afterSetupState, action)).toEqual(afterLayoutDeleteState);
  });

  it('should delete design item 1*2 layout inside the 1*1 layout', () => {
    const { afterState: afterLayout1DeleteState } = getLayoutType1DeleteActionAndAfterState();
    const {
      action,
      afterState: afterLayout2DeleteState,
    } = getLayoutType2DeleteActionAndAfterState();
    expect(viewDesignerReducer(afterLayout1DeleteState, action)).toEqual(afterLayout2DeleteState);
  });
});

describe('view reducer with MOVE_DESIGN_ITEM action', () => {
  let afterSetupState;

  beforeAll(() => {
    const { action: action1, afterState: afterState1 } = getLayoutType1ActionAndAfterState();
    const { action: action2, afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    const { action: action3, afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    const { action: action4, afterState: afterState4 } = getContolType1ActionAndAfterState();
    viewDesignerReducer(initialState, action1);
    viewDesignerReducer(afterState1, action2);
    viewDesignerReducer(afterState2, action3);
    viewDesignerReducer(afterState3, action4);
    afterSetupState = afterState4;
  });

  it('should move design item layout 1*1 above its sibling layout 1*1', () => {
    const { action, afterState: afterLayoutMoveState } = getLayoutType1MoveActionAndAfterState();
    expect(viewDesignerReducer(afterSetupState, action)).toEqual(afterLayoutMoveState);
  });

  it('should move design item layout 1*1 below its sibling layout 1*1', () => {
    const {
      action: action1,
      afterState: afterLayout1MoveState,
    } = getLayoutType1MoveActionAndAfterState();
    viewDesignerReducer(afterSetupState, action1);
    const {
      action: action2,
      afterState: afterLayout2MoveState,
    } = getLayoutType2MoveActionAndAfterState();
    expect(viewDesignerReducer(afterLayout1MoveState, action2)).toEqual(afterLayout2MoveState);
  });

  it('should do nothing when design item layout 1*1 which is last in the designer area is moved down', () => {
    const {
      action: action1,
      afterState: afterLayout1MoveState,
    } = getLayoutType1MoveActionAndAfterState();
    viewDesignerReducer(afterSetupState, action1);
    const {
      action: action2,
      afterState: afterLayout2MoveState,
    } = getLayoutType2MoveActionAndAfterState();
    expect(viewDesignerReducer(afterLayout1MoveState, action2)).toEqual(afterLayout2MoveState);

    const action3 = {
      type: 'MOVE_DESIGN_ITEM',
      payload: {
        path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 1],
        operation: 'MOVE_DOWN',
      },
    };

    // State should be same no change even after this action
    expect(viewDesignerReducer(afterLayout2MoveState, action3)).toEqual(afterLayout2MoveState);
  });
});
