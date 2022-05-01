import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import AppContainer from './index';

const mockStore = configureStore({});

describe('AppContainer ', () => {
  let container;
  let store;
  const appContainerMetaData = {
    _id: 'AppDesignerPortal',
    category: 'layout',
    type: 'portal',
    properties: {
      header: {
        children: [
          {
            type: 'ref',
            properties: {
              refType: 'view',
              refId: 'DesignerHeaderView',
            },
          },
        ],
      },
      sidebarLeft: {
        children: [],
      },
      main: {
        children: [
          {
            type: 'ref',
            properties: {
              refType: 'view',
              refId: 'DesignerMainTabView',
            },
          },
        ],
      },
    },
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = mockStore({});
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('should render', () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer config={appContainerMetaData} />
        </Provider>,
        container
      );
    });

    expect(container.children.length).toBe(2);
    expect(container.querySelector('header')).not.toBeNull();
    expect(container.querySelector('nav')).not.toBeNull();
    expect(container.querySelector('main')).not.toBeNull();
  });
});
