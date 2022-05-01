import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Label from './index';

describe('Label control', () => {
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
      ReactDOM.render(<Label className="label-class" value="Hello World" />, container);
    });
    const label = container.querySelector('p');
    expect(label).toBeDefined();
    expect(label.textContent).toBe('Hello World');
    expect(label.className).toMatch(/label-class/);
  });
});
