// __mocks__/index.js

// Import this named export into your test file:
export const MockActionHandler = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {
    changeHandler() {},
  };
});

export default mock;
