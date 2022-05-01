import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Extension for enabling redux dev tools
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

// Using Saga instead of redux middleware
// import apiMiddleware from '../middleware';

const INITIAL_STATE = {
  app: {},
  modal: {},
  'app/modal': {
    open: false,
    refId: '',
    componentProps: {},
    allowDuplicates: true,
    activeItem: null,
    items: [],
  },
  'app/tab': {
    allowDuplicates: false,
    activeItem: null,
    items: [],
  },
  ContainerGroup: {
    activeTab: 0,
    tabs: [],
  },
  ContainerGroupState: {},
};

class StoreManager {
  constructor(initialState = {}) {
    this.initialState = initialState;
    this.store = null;
    this.init();
  }

  init() {
    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware();

    // Enabling redux devtools and tracing in development mode.
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
      this.store = createStore(
        rootReducer,
        this.initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
      );
    } else {
      this.store = createStore(rootReducer, this.initialState, applyMiddleware(sagaMiddleware));
    }

    /*
    this.store = createStore(
      rootReducer,
      this.initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    */

    // run the saga
    sagaMiddleware.run(rootSaga);
  }

  getStore() {
    return this.store;
  }

  getState() {
    return this.store.getState();
  }

  getDispatch() {
    return this.store.dispatch;
  }
}

export default new StoreManager(INITIAL_STATE);
