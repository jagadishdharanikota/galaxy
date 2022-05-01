import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { APP_PROPS, UI_MODE_DESIGN } from '../../../constants';
import Autocomplete from './index';

jest.mock('../../../services');

describe('Autocomplete ', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  function createComponent(componentProps) {
    const httpService = () => {
      return new Promise(() => {});
    };
    act(() => {
      ReactDOM.render(
        <Autocomplete
          component={componentProps.component}
          key={componentProps.key}
          config={componentProps.config}
          propsContext={componentProps.propsContext}
          constants={componentProps.constants}
          httpService={httpService}
        />,
        container
      );
    });
  }

  test('should render properly with the give n props', () => {
    const componentProps = {
      component: 'Autocomplete',
      key: 3453455,
      config: {
        label: `Select View`,
        listKeyPropertyRef: '_id',
        listLabelPropertyRef: '_id',
        propertyReference: '.refId',
      },
      propsContext: [],
      constants: { APP_PROPS, UI_MODE_DESIGN },
    };

    createComponent(componentProps, container);

    expect(container.querySelector('.form-group')).not.toBeNull();
    /*
		expect(container.querySelector('.form-group label')).not.toBeNull();
		expect(container.querySelector('.form-group input')).not.toBeNull();
		expect(autoCompleteProps.httpService).toHaveBeenCalled();
		*/
  });
});
