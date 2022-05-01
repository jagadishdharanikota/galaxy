import axios from 'axios';

class MetadataManager {
  constructor() {
    this.metadata = {
      root: {},
      pages: [],
      views: [],
    };
  }

  fetchApplicationMetadata(applicationName) {
    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return axios
      .request({
        url: `http://localhost:8000/portals/${applicationName}`,
        method: 'GET',
      })
      .then((response) => {
        const { data } = response;
        this.metadata = {
          root: data,
        };
        return Promise.resolve(data);
      })
      .catch((error) => console.error('Failed to get application metadata', error));
  }

  getMetadata() {
    return this.metadata;
  }
}

export default new MetadataManager();
