import React from 'react';
import AppContainer from './components/containers/AppContainer';
import ModalManager from './components/containers/Modal/ModalContext';
// import { withActions } from './HOCs';

const App = (props) => {
  if (Object.keys(props).length > 0) {
    return <ModalManager>{React.createElement(AppContainer, props)}</ModalManager>;
  }
  return '';
};

export default App;
