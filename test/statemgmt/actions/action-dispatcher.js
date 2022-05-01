import * as actions from './index';
import storeManager from '../store';

export default (() => {
  const dispatch = storeManager.getDispatch();
  /* eslint no-param-reassign: ["error", { "props": false }] */
  return Object.values(actions).reduce((result, action) => {
    result[action.name] = (data) => dispatch(action(data));
    return result;
  }, {});
})();
