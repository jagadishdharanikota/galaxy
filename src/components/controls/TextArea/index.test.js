import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { APP_PROPS, UI_MODE_DESIGN } from '../../../constants';
import TextArea from './index';

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

describe('TextArea component ', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const createTextareaComponent = (componentProps) => {
    // const requisite = new Requisite(componentProps[APP_PROPS.CONFIG], componentProps.propsContext);
    const requisite = {
      getActionHandler: () => {
        return {
          changeHandler: jest.fn(),
        };
      },
    };
    const constants = {
      APP_PROPS,
      UI_MODE_DESIGN,
    };
    act(() => {
      ReactDOM.render(
        <TextArea
          requisite={requisite}
          config={componentProps.config}
          constants={constants}
          propsContext={componentProps.propertyReference}
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
      component: 'TextArea',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'horizontal',
        value: '',
      },
    };

    createTextareaComponent(componentProps);

    const label = container.querySelector('label');
    const textarea = container.querySelector('textarea');
    expect(label).toBeDefined();
    expect(label.textContent).toBe('First Name');
    expect(textarea).toBeDefined();
  });

  it('should have input as sibling to label with position vertical', () => {
    const componentProps = {
      actions: {},
      constants: {
        APP_PROPS,
        UI_MODE_DESIGN,
      },
      component: 'TextArea',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'vertical',
        value: '',
      },
    };

    createTextareaComponent(componentProps);

    const label = container.querySelector('label');
    const textarea = container.querySelector('textarea');

    expect(label.textContent).toBe('First Name');
    expect(label.nextSibling).toBe(textarea);
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
      component: 'TextArea',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'horizontal',
        value: 'hello',
      },
    };

    const requisite = createTextareaComponent(componentProps);
    const label = container.querySelector('label');
    const textarea = container.querySelector('textarea');
    expect(label.textContent).toBe('First Name');

    act(() => {
      textarea.value = 'hello world';
      ReactTestUtils.Simulate.change(textarea);
    });

    expect(textarea.value).toBe('hello world');
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
      component: 'TextArea',
      propsContext: [''],
      mode: 'design',
      [APP_PROPS.CONFIG]: {
        label: 'First Name',
        propertyReference: '.firstName',
        position: 'horizontal',
        value: '',
      },
    };

    createTextareaComponent(componentProps);

    const label = container.querySelector('label');
    const textarea = container.querySelector('textarea');
    expect(label.textContent).toBe('First Name');
    expect(textarea.hasAttribute('disabled')).toBe(true);
  });
});
