import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import Input from './index';
import { APP_PROPS, UI_MODE_DESIGN } from '../../../constants';
import Requisite from '../../../core/Requisite';

jest.mock('../../../core/Requisite', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getActionHandler: () => {
        return {
          changeHandler: jest.fn(),
        };
      },
    };
  });
});

describe('Input component ', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const createInputComponent = (componentProps) => {
    const requisite = new Requisite(componentProps[APP_PROPS.CONFIG], componentProps.propsContext);
    act(() => {
      ReactDOM.render(
        <Input
          constants={componentProps.constants}
          component={componentProps.component}
          config={componentProps.config}
          propsContext={componentProps.propsContext}
          requisite={requisite}
          mode={componentProps.mode}
        />,
        container
      );
    });
    return requisite;
  };

  it('should have label and text tags', () => {
    const componentProps = {
      actions: {},
      constants: {
        APP_PROPS,
        UI_MODE_DESIGN,
      },
      component: 'Input',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'horizontal',
        value: '',
      },
    };

    createInputComponent(componentProps);

    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label.textContent).toBe('First Name');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('should have input as sibling to label with position vertical', () => {
    const componentProps = {
      actions: {},
      constants: {
        APP_PROPS,
        UI_MODE_DESIGN,
      },
      component: 'Input',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'vertical',
        value: '',
      },
    };

    createInputComponent(componentProps);

    const label = container.querySelector('label');
    const input = container.querySelector('input');

    expect(label.textContent).toBe('First Name');
    expect(input.getAttribute('type')).toBe('text');
    expect(label.nextSibling).toBe(input);
  });

  /*
  it('should call change handler on changing text', () => {
    const componentProps = {
      actions: {
        setValue: jest.fn(),
      },
      constants: {
        APP_PROPS,
        UI_MODE_DESIGN,
      },
      component: 'Input',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'horizontal',
        value: 'hello',
      },
    };

    const requisite = createInputComponent(componentProps);

    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label.textContent).toBe('First Name');
    expect(input.getAttribute('type')).toBe('text');

    act(() => {
      input.value = 'hello world';
      ReactTestUtils.Simulate.change(input);
    });

    expect(input.value).toBe('hello world');
    expect(requisite.getActionHandler().changeHandler).toHaveBeenCalled();
  });

  */

  it('should be disabled in design mode', () => {
    const componentProps = {
      actions: {},
      constants: {
        APP_PROPS,
        UI_MODE_DESIGN,
      },
      component: 'Input',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'horizontal',
        value: '',
      },
    };

    createInputComponent(componentProps);

    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label.textContent).toBe('First Name');
    expect(input.getAttribute('type')).toBe('text');
    expect(input.hasAttribute('disabled')).toBe(true);
  });
});
