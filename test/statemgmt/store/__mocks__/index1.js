// __mocks__/index.js

// Import this named export into your test file:
export const MockStoreManager = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {
    getStore() {},
    getState() {},
    getDispatch() {},
  };
});

export default mock;
