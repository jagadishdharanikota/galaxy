import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { APP_PROPS } from '../../../constants';
import View from './index';

const mockStore = configureStore({});

describe('View ', () => {
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

  function createComponent(componentProps) {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <View
            _id={componentProps._id}
            name={componentProps.name}
            description={componentProps.description}
            type={componentProps.type}
            category={componentProps.category}
            config={componentProps.config}
            propsContext={[]}
          />
        </Provider>,
        container
      );
    });
  }

  test('should render with given props', () => {
    const viewProps = {
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
                      propertyReference: '',
                      position: 'vertical',
                    },
                  },
                  {
                    component: 'Input',
                    category: 'control',
                    key: '1588019932019',
                    [APP_PROPS.CONFIG]: {
                      label: 'component',
                      propertyReference: '',
                      position: 'vertical',
                    },
                  },
                  {
                    component: 'TextArea',
                    category: 'control',
                    key: '1588019933863',
                    [APP_PROPS.CONFIG]: {
                      label: 'Description',
                      propertyReference: '',
                      position: 'vertical',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    createComponent(viewProps);
  });
});
