import actions from '../statemgmt/actions/action-dispatcher';
import PropertyUtils from '../utils/property-utils';
import ActionHandler from './actions/action-handler';
import Context from './context';

const { resolver: contextResolver, utils: contextUtils } = Context;

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getContextResolver", "getActions"] }] */
class Requisite {
  constructor(config, context) {
    this.ignoreList = ['itemValue', 'itemLabel'];
    this.config = config;
    this.context = context;
    this.resolvedConfig = this.getResolvedConfigObject();
  }

  getContextResolver() {
    return contextResolver;
  }

  getResolvedConfigObject() {
    const resolvedConfig = {};
    for (const prop of Object.keys(this.config)) {
      if (
        Object.prototype.hasOwnProperty.call(this.config, prop) &&
        !this.ignoreList.includes(prop)
      ) {
        const propValue = this.config[prop];
        if (PropertyUtils.isSubproperty(propValue)) {
          const propertyPath = propValue.split('.');
          const context = propertyPath.slice(0, propertyPath.length - 1);
          const property = propertyPath[propertyPath.length - 1];
          resolvedConfig[prop] = contextResolver.getValue(context, property);
        } else if (PropertyUtils.isProperty(propValue)) {
          if (propValue) resolvedConfig[prop] = contextResolver.getValue(this.context, propValue);
        } else if (PropertyUtils.isListProperty(propValue)) {
          const contextName = contextUtils.getContextName(this.context);
          resolvedConfig[prop] = contextResolver.getContextObject(contextName, propValue);
        } else {
          resolvedConfig[prop] = propValue;
        }
      } else if (Object.prototype.hasOwnProperty.call(this.config, prop)) {
        const propValue = this.config[prop];
        if (typeof propValue === 'string' && propValue.startsWith('.')) {
          resolvedConfig[prop] = propValue.substring(1, propValue.length);
        }
      }
    }
    return resolvedConfig;
  }

  getResolvedConfig() {
    return this.resolvedConfig;
  }

  getActions() {
    return actions;
  }

  getActionHandler() {
    return new ActionHandler(this);
  }
}

const getRequisiteInstance = (config, context) => {
  if (!config) {
    return null;
  }
  return new Requisite(config, context);
};

export default Requisite;

export { getRequisiteInstance };
