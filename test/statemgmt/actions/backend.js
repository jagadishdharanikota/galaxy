import { SAVE_DATA, CLONE_DATA } from './types';

function clone(data) {
  const { routeName, key } = data;
  return {
    type: CLONE_DATA,
    payload: {
      url: `${routeName}/${key}`,
      method: 'GET',
      success: '',
      failure: '',
    },
  };
}

function save(data) {
  const { routeName, key, postData } = data;
  return {
    type: SAVE_DATA,
    payload: {
      url: `${routeName}/${key}`,
      method: 'PUT',
      data: postData,
      success: '',
      failure: '',
    },
  };
}

export { clone, save };
