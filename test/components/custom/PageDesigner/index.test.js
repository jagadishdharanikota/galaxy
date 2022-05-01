import React from 'react';
import { Provider } from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

// import Header from '../DesignerHeader';
import { PageDesigner } from './index';
import { APP_PROPS } from '../../../constants';

const mockStore = configureStore([]);

let container = null;
const designerProps = {
  _id: 'Page1',
  category: 'layout',
  type: 'page',
  [APP_PROPS.CONFIG]: {
    header: {
      type: 'ref',
      [APP_PROPS.CONFIG]: {
        refType: 'view',
        refId: '',
      },
    },
    content: {
      type: 'ref',
      [APP_PROPS.CONFIG]: {
        refType: 'view',
        refId: 'AppView1',
      },
    },
    footer: {
      type: 'ref',
      [APP_PROPS.CONFIG]: {
        refType: '',
        refId: '',
      },
    },
  },
};

let store;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  store = mockStore({
    myState: designerProps,
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<PageDesigner />', () => {
  it('should have node with one Header', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PageDesigner
          _id={designerProps._id}
          category={designerProps.category}
          type={designerProps.type}
          config={designerProps.config}
        />
      </Provider>
    );
    // expect(wrapper.find(Header).length).toBe(1);
    // expect(wrapper.find(Tabs).length).toBe(1);
    expect(wrapper.find('header').length).toBe(2);
    expect(wrapper.find('main').length).toBe(2);
    expect(wrapper.find('aside').length).toBe(1);
    // expect(wrapper.children().length).toBe(2);
  });
});
