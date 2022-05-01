/**
 * Is proeprty a subproperty of object
 * @param {*} name
 * @returns
 */
const isSubproperty = (name) => {
  return (
    typeof name === 'string' &&
    /^[A-Z].*$/.test(name) &&
    name.includes('.') &&
    !name.startsWith('.')
  );
};

/**
 * Is direct property starting with .
 * @param {*} name
 * @returns
 */
const isProperty = (name) => {
  return typeof name === 'string' && name.startsWith('.');
};

/**
 * Is List type property
 * @param {*} name
 * @returns
 */
const isListProperty = (name) => {
  return typeof name === 'string' && name.startsWith('List_');
};

export default {
  isSubproperty,
  isProperty,
  isListProperty,
};
