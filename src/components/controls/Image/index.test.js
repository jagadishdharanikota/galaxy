import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Image from './index';
import { APP_PROPS } from '../../../constants';

describe('Image', () => {
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
    act(() => {
      ReactDOM.render(
        <Image
          key={componentProps.key}
          component={componentProps.component}
          category={componentProps.category}
          config={componentProps.config}
        />,
        container
      );
    });
  }

  test('should be rendered with given props', () => {
    const imageProps = {
      key: 35345535,
      component: Image,
      category: 'control',
      [APP_PROPS.CONFIG]: {
        imageUrl: 'myfolder/car.png',
        alternateText: 'Car Image',
      },
    };
    createComponent(imageProps);
    expect(container.querySelector('img')).not.toBeNull();
  });
});
