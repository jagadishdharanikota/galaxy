import storeManager from '../../statemgmt/store';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getContextObject", "getResolvedPropertyValue"] }] */

class ContextResolver {
  /*
	Returns the resolved value for the contextPath and property passed. Reolves values in the context of passed Object.
	*/
  getResolvedValueFromObject(contextObject, contextPath, property) {
    return this.getResolvedPropertyValue(contextObject, contextPath, property);
  }

  /*
	Returns the resolve value for the contextPath and property passed. Reolves values in the context of redux store.
	*/
  getValue(contextPath, property) {
    const state = storeManager.getState();
    return this.getResolvedPropertyValue(state, contextPath, property);
  }

  getResolvedPropertyValue(contextObject, contextPath, property) {
    if (
      !contextObject ||
      !contextPath ||
      !Array.isArray(contextPath) ||
      contextPath.length === 0 ||
      !property
    ) {
      Error(`Invalid parameters passed contextPath: ${contextPath}, property: ${property}`);
      return '';
    }

    let draft = contextObject;
    let resolvedValue = '';

    /* eslint-disable consistent-return */
    contextPath.forEach((key, index) => {
      if ((key === undefined || key === null) && !(key instanceof Object)) {
        console.error(
          `Invalid key in contextPath. Couldn't resolve the value with the passed contextPath: ${contextPath}, property: ${property}`
        );
        return resolvedValue;
      }

      // Last key in the object path
      if (index === contextPath.length - 1 && draft && draft[key]) {
        const propertyWithoutDot = property.startsWith('.') ? property.split('.')[1] : property;
        resolvedValue = draft[key][propertyWithoutDot];
      } else if (draft) {
        draft = draft[key];
      } else {
        console.error(
          `Couldn't resolve the value with the passed contextPath: ${contextPath}, property: ${property}`
        );
      }
    });
    return resolvedValue;
  }

  getContextObject(contextName, objectName) {
    if (!contextName || !objectName) {
      Error(`Invalid parameters passed contextName: ${contextName}, property: ${objectName}`);
      return '';
    }

    const state = storeManager.getState();
    const { items, activeItem } = state[contextName];
    const activeItemObj = items[activeItem - 1];

    return activeItemObj?.data[objectName];
  }
}

const contextResolver = new ContextResolver();
export default contextResolver;
