import React, { useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { GenericModal } from './index';

const initialCreate = () => {
  return { close: () => {}, update: () => {} };
};

const ModalContext = React.createContext(initialCreate);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'create':
      return [...state, payload];
    case 'close':
      return state.filter((item) => item.id !== payload.id);
    default:
      return state;
  }
};

const ModalRenderer = ({ modals }) => {
  return modals.map((modal) => {
    const { id, props, methods } = modal;
    const { title, content, footer } = props;
    return (
      <GenericModal
        key={id}
        title={title}
        content={content}
        footer={footer}
        close={methods.close}
      />
    );
  });
};

const ModalManager = ({ children }) => {
  const [modals, dispatch] = useReducer(reducer, []);

  const providerValue = useMemo(() => ({
    create: ({ title, content, footer }) => {
      const id = new Date().getUTCMilliseconds();
      const methods = {
        close: () => dispatch({ type: 'close', payload: { id } }),
        update: (updatedProps) => dispatch({ type: 'update', payload: { id, updatedProps } }),
      };

      dispatch({
        type: 'create',
        payload: { id, status: 'open', props: { title, content, footer }, methods },
      });
      return methods;
    },
  }));

  const modalRoot = document.getElementById('modal-root');

  return modalRoot ? (
    <ModalContext.Provider value={providerValue}>
      {children}
      {ReactDOM.createPortal(React.createElement(ModalRenderer, { modals }), modalRoot)}
    </ModalContext.Provider>
  ) : (
    <h4>Could not find modal root to render in modal context</h4>
  );
};

ModalManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalContext };
export default ModalManager;
