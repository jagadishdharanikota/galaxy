import React from 'react';
import { render } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
// import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ViewDesignerWithActions from '.';
import { APP_PROPS } from '../../../constants';

const mockStore = configureStore({});
const designerState = {
  ContainerGroupState: {
    NewView: {
      [APP_PROPS.METADATA]: {
        _id: 'NewView',
        name: 'New View',
        description: 'Creates new view',
        category: 'layout',
        type: 'view',
        [APP_PROPS.CONFIG]: {
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
      propsContext: ['ContainerGroupState', 'NewView'],
    },
  },
};

jest.mock('../../../statemgmt/store', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getStore: jest.fn(),
      getState: jest.fn(),
      getDispatch: jest.fn(),
    };
  });
});

describe('<ViewDesigner /> ', () => {
  let container;
  let store;
  let storeObject;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore(designerState);
    storeObject = store.getState();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  function createComponent() {
    render(
      <Provider store={store}>
        <ViewDesignerWithActions
          {...designerState.ContainerGroupState.NewView}
          propsContext={['ContainerGroupState', 'NewView']}
        />
      </Provider>,
      container
    );
  }

  test('store should be same as passed object for initializing the store', () => {
    expect(storeObject).toBe(designerState);
  });

  test('should render the designer component', () => {
    /*
    render(
      <Provider store={store}>
        <ViewDesignerWithActions
          {...designerState.ContainerGroupState.NewView}
          propsContext={['ContainerGroupState', 'NewView']}
        />
      </Provider>,
      container
    );
    */
    createComponent();
    const designerMainDiv = container.querySelector('.container-fluid');
    expect(designerMainDiv).toBeDefined();
    expect(designerMainDiv.children.length).toBe(2);
    const header = designerMainDiv.querySelector('header');
    const main = designerMainDiv.querySelector('main');
    expect(header).toBeDefined();
    expect(main).toBeDefined();
  });

  test('should add new 1*1 layout to designer', () => {
    /*
    render(
      <Provider store={store}>
        <ViewDesignerWithActions
          {...designerState.ContainerGroupState.NewView}
          propsContext={['ContainerGroupState', 'NewView']}
        />
      </Provider>,
      container
    );
    */
    createComponent();
    const designerMainDiv = container.querySelector('.container-fluid');
    expect(designerMainDiv).toBeDefined();
    const main = designerMainDiv.querySelector('main');
    const Button1By1 = main.querySelector('button[data-identifier="1*1"]');
    const designerDiv = container.querySelector('#NewView');
    expect(designerDiv).not.toBeNull();
    expect(designerDiv.children.length).toBe(3);
    act(() => {
      ReactTestUtils.Simulate.click(Button1By1);
    });
    // ToDo: Need to check that newly added layout is present in DOM
    expect(designerDiv.children.length).toBe(4);
  });
});
