import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Layout from './index';

import { APP_PROPS } from '../../../constants';

const mockStore = configureStore({});
describe('Layout ', () => {
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

  test('should render the layout', () => {
    const componentProps = {
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
      propsContext: [],
      mode: 'design',
    };
    ReactDOM.render(
      <Provider store={store}>
        <Layout
          component={componentProps.component}
          category={componentProps.category}
          key={componentProps.key}
          columns={componentProps.columns}
          propsContext={componentProps.propsContext}
          mode={componentProps.mode}
        />
      </Provider>,
      container
    );
    expect(container.children.length).toBe(1);
    // [data-row="1"]
    const layoutDiv = container.querySelector('div.row');
    expect(layoutDiv).toBeDefined();
    expect(layoutDiv.getAttribute('data-category')).toBe('layout');
    // expect(layoutDiv.getAttribute('data-row')).toBe('1');
  });

  test.todo('should add more tests here');
});
