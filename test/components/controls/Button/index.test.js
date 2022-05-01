import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Button from './index';

describe('Button control', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render label with given props', () => {
    act(() => {
      ReactDOM.render(<Button className="button-class" value="Press Me" />, container);
    });
    const button = container.querySelector('button');
    expect(button).toBeDefined();
    expect(button.textContent).toBe('Press Me');
    expect(button.className.indexOf('button-class')).toBeGreaterThan(-1);
  });
});
