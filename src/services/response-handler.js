import recordManager from '../core/record-manager';

function responseHandler(response) {
  const { data } = response;
  const { metadata } = data;

  if (metadata && metadata.type) {
    recordManager.addRecord(metadata._id, metadata);
  }
}

export default responseHandler;
