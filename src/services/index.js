import axios from 'axios';
import responseHandler from './response-handler';

const httpClient = (action) => {
  const { url, method, data, accessToken, headers } = action;

  if (!url || !method) {
    throw Error(`Invalid parameters passed to the API, ${url}, ${method}`);
  }

  // axios default configs
  axios.defaults.baseURL = window.restAPIBaseURL || process.env.REACT_APP_SERVICE_BASE_URL || '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  axios.interceptors.response.use(
    (response) => {
      responseHandler(response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axios.request({
    url,
    method,
    headers,
    data,
  });
};

export { axios };
export default httpClient;
