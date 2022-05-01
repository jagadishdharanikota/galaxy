import constants from '../constants';

const RoutingManager = () => {
  const { SPECIAL_CHAR } = constants;
  let routesInfo;
  return {
    init: (routingMetadata) => {
      routesInfo = routingMetadata;
    },
    getRouteInfo: (key) => {
      return routesInfo[key];
    },
    getResolvedRoute: (key, params) => {
      const routeInfo = routesInfo[key];
      const { path } = routeInfo;
      const pathParts = path.split(SPECIAL_CHAR.FORWARD_SLASH);

      /* eslint-disable no-param-reassign */
      const resolvedPath = pathParts.reduce((tempPath, item, index) => {
        if (item) {
          const SEPERATION_CHAR = pathParts.length - 1 === index ? '' : SPECIAL_CHAR.FORWARD_SLASH;
          if (item.startsWith(SPECIAL_CHAR.COLON)) {
            const [, parameter] = item.split(SPECIAL_CHAR.COLON);
            tempPath += params[parameter] + SEPERATION_CHAR;
          } else {
            tempPath += item + SEPERATION_CHAR;
          }
        }
        return tempPath;
      }, SPECIAL_CHAR.FORWARD_SLASH);
      return {
        ...routeInfo,
        path: resolvedPath,
      };
    },
  };
};

export default RoutingManager();
