import React from 'react';
import Modal from './index';
import View from '../View';

import { withAll } from '../../../HOCs';
import recordManager from '../../../core/record-manager';

const ModalContainer = (props) => {
  const { actions, resolvedConfig } = props;
  // const { hideModal } = actions;
  const { refId } = resolvedConfig;
  const modalProps = {
    category: 'layout',
    type: 'component',
    component: 'Modal',
    config: {
      open: '.open',
      viewName: '',
      propertyReference: '.componentProps',
    },
    propsContext: ['modal'],
  };

  if (refId) {
    const componentMetadata = recordManager.getRecord(refId);
    const componentProps = {
      open: true,
      title: 'Modal Title',
      content: (
        <View config={componentMetadata.config} propsContext={componentMetadata.propsContext} />
      ),
    };
    return React.createElement(Modal, componentProps);
  }
  return '';
};

export default withAll(ModalContainer);
