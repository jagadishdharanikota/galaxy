import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import Tab from './index';

describe('<Tab /> ', () => {
  let container;
  let componentProps;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('should render the tabs and it content with the given props', () => {
    componentProps = [
      {
        title: 'Tab1',
        component: React.createElement('div', { className: 'tab1-item' }),
      },
      {
        title: 'Tab2',
        component: React.createElement('div', { className: 'tab2-item' }),
      },
    ];

    act(() => {
      ReactDOM.render(<Tab tabs={componentProps} />, container);
    });

    expect(container.children.length).toBe(2);

    expect(container.querySelector('ul')).not.toBeNull();
    expect(container.querySelector('ul li[data-index="0"] > a').textContent).toBe('Tab1');
    expect(container.querySelector('ul li[data-index="1"] > a').textContent).toBe('Tab2');
  });

  test('should render the tabs and have first tab as active and its content is shown', () => {
    componentProps = [
      {
        title: 'Tab1',
        component: React.createElement('div', { className: 'tab1-item' }),
      },
      {
        title: 'Tab2',
        component: React.createElement('div', { className: 'tab2-item' }),
      },
    ];

    act(() => {
      ReactDOM.render(<Tab tabs={componentProps} />, container);
    });

    expect(container.children.length).toBe(2);
    expect(container.querySelector('ul')).not.toBeNull();
    // Check if the first tab is default or not
    const firstTab = container.querySelector('ul li[data-index="0"]');
    expect(firstTab.className).toMatch(/active/);
    const firstTabContent = container.querySelector('div.tab-content > #Tab1');
    expect(firstTabContent.className).toMatch(/show/);
    expect(firstTabContent.className).toMatch(/active/);
  });

  test('should make tab active on clicking it', () => {
    componentProps = [
      {
        title: 'Tab1',
        component: React.createElement('div', { className: 'tab1-item' }),
      },
      {
        title: 'Tab2',
        component: React.createElement('div', { className: 'tab2-item' }),
      },
    ];

    act(() => {
      ReactDOM.render(<Tab tabs={componentProps} />, container);
    });

    expect(container.children.length).toBe(2);
    expect(container.querySelector('ul')).not.toBeNull();
    const secondTab = container.querySelector('ul li[data-index="1"]');
    act(() => {
      ReactTestUtils.Simulate.click(secondTab);
    });
    // Check if the first tab is default or not
    expect(secondTab.className).toMatch(/active/);
    const secondTabContent = container.querySelector('div.tab-content > #Tab2');
    expect(secondTabContent.className).toMatch(/show/);
    expect(secondTabContent.className).toMatch(/active/);
  });
});
