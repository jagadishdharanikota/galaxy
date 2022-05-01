import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import UIBuilderToolbar from './Toolbar';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<UIBuilderToolbar />', () => {
  it('container should have one children', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<UIBuilderToolbar onSelect={onSelect} />, container);
    });
    expect(container.children.length).toBe(1);
    // expect(container.children.className).toBe('builder-toolbar');
  });

  it('component root should have .builder-toolbar class and 2 children', () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<UIBuilderToolbar onSelect={onSelect} />);
    expect(wrapper.hasClass('builder-toolbar')).toBe(true);
    expect(wrapper.children().length).toBe(2);
  });
});
