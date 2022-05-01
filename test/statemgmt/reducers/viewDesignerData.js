import withActionsViewDesigner from '../../../src/components/custom/ViewDesigner';

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

export {
  initialState,
  getLayoutType1ActionAndAfterState,
  getLayoutType2ActionAndAfterState,
  getLayoutType3ActionAndAfterState,
  getContolType1ActionAndAfterState,
  getLayoutType1DeleteActionAndAfterState,
  getLayoutType2DeleteActionAndAfterState,
  getLayoutType1MoveActionAndAfterState,
  getLayoutType2MoveActionAndAfterState
};
