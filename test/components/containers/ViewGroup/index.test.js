import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import ViewGroup from './index';
import { APP_PROPS } from '../../../constants';

const mockStore = configureStore({});

function createComponent(componentProps, container, store) {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ViewGroup
          category={componentProps.category}
          type={componentProps.type}
          component={componentProps.component}
          config={componentProps.config}
        />
      </Provider>,
      container
    );
  });
}

describe('ViewGroup ', () => {
  let container;
  let store;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore({});
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should return "" with improper state object', () => {
    const componentProps = {
      category: 'layout',
      type: 'component',
      component: 'ViewGroup',
      [APP_PROPS.CONFIG]: {
        maxViews: '5',
        activeTab: 'ContainerGroup.activeTab',
        tabs: 'ContainerGroup.tabs',
        containersStateReference: 'ContainerGroupState',
      },
    };

    try {
      createComponent(componentProps, container, store);
    } catch (e) {
      console.error('Error in component creation');
    }
    expect(container.children.length).toBe(0);
  });
});

describe('ViewGroup ', () => {
  let container;
  let store;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    store = mockStore({
      ContainerGroup: {
        activeTab: 0,
        tabs: [],
      },
      ContainerGroupState: {},
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render the viewGroup wrapping divs with empty state object', () => {
    const componentProps = {
      category: 'layout',
      type: 'component',
      component: 'ViewGroup',
      [APP_PROPS.CONFIG]: {
        maxViews: '5',
        activeTab: 'ContainerGroup.activeTab',
        tabs: 'ContainerGroup.tabs',
        containersStateReference: 'ContainerGroupState',
      },
    };
    try {
      createComponent(componentProps, container, store);
    } catch (e) {
      console.error('Error in component creation');
    }
    expect(container.children.length).toBe(2);
  });
});

describe('ViewGroup ', () => {
  let container;
  let store;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore({
      ContainerGroup: {
        activeTab: 1,
        tabs: [
          {
            key: 'CreateViewTemplate',
            label: 'Creates new view',
            component: 'ViewDesigner',
          },
        ],
      },
      ContainerGroupState: {
        CreateViewTemplate: {
          metadata: {
            _id: 'CreateViewTemplate',
            name: 'Creates new view',
            description: 'View UI to create new view',
            type: 'view',
            category: 'layout',
            [APP_PROPS.CONFIG]: {
              children: [
                {
                  component: 'Layout_1*1',
                  category: 'layout',
                  key: '1588019505759',
                  columns: [
                    {
                      children: [
                        {
                          component: 'Input',
                          category: 'control',
                          key: '1588019605334',
                          [APP_PROPS.CONFIG]: {
                            label: 'Name',
                            propertyRef: '',
                            position: 'vertical',
                          },
                        },
                        {
                          component: 'Input',
                          category: 'control',
                          key: '1588019932019',
                          [APP_PROPS.CONFIG]: {
                            label: 'component',
                            propertyRef: '',
                            position: 'vertical',
                          },
                        },
                        {
                          component: 'TextArea',
                          category: 'control',
                          key: '1588019933863',
                          [APP_PROPS.CONFIG]: {
                            label: 'Description',
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
          },
        },
      },
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render the viewGroup tab and its content', () => {
    const componentProps = {
      category: 'layout',
      type: 'component',
      component: 'ViewGroup',
      [APP_PROPS.CONFIG]: {
        maxViews: '5',
        activeTabReference: 'ContainerGroup.activeTab',
        tabsReference: 'ContainerGroup.tabs',
        containersStateReference: 'ContainerGroupState',
      },
    };

    try {
      createComponent(componentProps, container, store);
    } catch (e) {
      console.error('Error in component creation');
    }
    expect(container.children.length).toBe(2);
    expect(container.children[0].tagName).toBe('UL');
    expect(container.children[1].tagName).toBe('DIV');
    // ul should have on li element which is a tab
    // expect(container.querySelector('ul').children.length).toBe(1);
    expect(container.querySelectorAll('li').length).toBe(1);
    // content div should have on div element which is a tab content
    expect(container.querySelector('div').children.length).toBe(1);
  });
});

describe('ViewGroup ', () => {
  let container;
  let store;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    store = mockStore({
      ContainerGroup: {
        activeTab: 1,
        tabs: [
          {
            key: 'CreateViewTemplate',
            label: 'Creates new view',
            component: 'Dummy',
          },
        ],
      },
      ContainerGroupState: {
        CreateViewTemplate: {
          _id: 'CreateViewTemplate',
          name: 'Creates new view',
          description: 'View UI to create new view',
          type: 'view',
          category: 'layout',
          [APP_PROPS.CONFIG]: {
            children: [
              {
                component: 'Layout_1*1',
                category: 'layout',
                key: '1588019505759',
                columns: [
                  {
                    children: [
                      {
                        component: 'Input',
                        category: 'control',
                        key: '1588019605334',
                        [APP_PROPS.CONFIG]: {
                          label: 'Name',
                          propertyRef: '',
                          position: 'vertical',
                        },
                      },
                      {
                        component: 'Input',
                        category: 'control',
                        key: '1588019932019',
                        [APP_PROPS.CONFIG]: {
                          label: 'component',
                          propertyRef: '',
                          position: 'vertical',
                        },
                      },
                      {
                        component: 'TextArea',
                        category: 'control',
                        key: '1588019933863',
                        [APP_PROPS.CONFIG]: {
                          label: 'Description',
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
        },
      },
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render the viewGroup tab and its content with message for component not mapped in componentMap', () => {
    const componentProps = {
      category: 'layout',
      type: 'component',
      component: 'ViewGroup',
      [APP_PROPS.CONFIG]: {
        maxViews: '5',
        activeTabReference: 'ContainerGroup.activeTab',
        tabsReference: 'ContainerGroup.tabs',
        containersStateReference: 'ContainerGroupState',
      },
    };

    try {
      createComponent(componentProps, container, store);
    } catch (e) {
      console.error('Error in component creation');
    }

    expect(container.children.length).toBe(2);
    expect(container.children[0].tagName).toBe('UL');
    expect(container.children[1].tagName).toBe('DIV');
    // ul should have on li element which is a tab
    expect(container.querySelector('ul').children.length).toBe(1);
    // content div should have on div element which is a tab content
    const contentDiv = container.querySelector('div');
    expect(contentDiv.children.length).toBe(1);
    expect(contentDiv.children[0].textContent).toBe(
      'Cannot find Dummy component in ComponentsMap.js file.'
    );
  });
});
