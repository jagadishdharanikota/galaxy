import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storeManager from './statemgmt/store';
import routingManager from './core/routing-manager';

import './index.css';

fetch(`http://localhost:8000/routesmetadata`)
  .then((response) => response.json())
  .then((routesData) => {
    routingManager.init(routesData);
    const { path } = routingManager.getResolvedRoute('showPortal', { _id: 'AppDesignerPortal' });
    fetch(`http://localhost:8000${path}`)
      .then((response) => response.json())
      .then((data) => {
        window.UIMetadata = data;

        ReactDOM.render(
          <Provider store={storeManager.getStore()}>
            <React.StrictMode>
              <App {...data} storeManager={storeManager} />
            </React.StrictMode>
          </Provider>,
          document.getElementById('app-root')
        );
      })
      .catch((error) => {
        console.error('Failed to fetch portal', error);
      });
  })
  .catch((exception) => {
    console.error('Failed to fetch routing info', exception);
  });

/*
ReactDOM.render(
  <Provider store={storeManager.getStore()}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
