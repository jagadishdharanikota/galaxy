import produce from 'immer';
import { ADD_CONTEXT_DATA, SET_VALUE } from '../actions/types';

const core = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CONTEXT_DATA:
      return produce(state, (draft) => {
        const { contextPath, data } = payload;
        let tempDraft = draft;
        if (contextPath && data) {
          contextPath.forEach((key, index) => {
            tempDraft = tempDraft[key];

            // Last key in the object path
            if (index === contextPath.length - 1) {
              // let property;
              Object.keys(data).forEach((property) => {
                tempDraft[property] = data[property];
              });
              /*
              for (property in data) {Object.keys(data)
                tempDraft[property] = data[property];
              }
              */
            }
          });
        } else {
          console.error(`Invalid parameters passed to setValue contextPath: ${contextPath}`);
        }
      });

    case SET_VALUE:
      return produce(state, (draft) => {
        const { contextPath, property, value } = payload;
        let tempDraft = draft;
        if (contextPath && property) {
          contextPath.forEach((key, index) => {
            // Last key in the object path
            if (index === contextPath.length - 1) {
              const propertyWithoutDot = property.split('.')[1];
              if (Object.prototype.hasOwnProperty.call(tempDraft[key], propertyWithoutDot)) {
                tempDraft[key][propertyWithoutDot] = value;
              } else {
                console.info(
                  `Couldn't find '${propertyWithoutDot}' properties to set in ${contextPath} path`
                );
              }
            } else {
              tempDraft = tempDraft[key];
            }
          });
        } else {
          console.error(
            `Invalid parameters passed to setValue contextPath: ${contextPath}, property: ${property}`
          );
        }
      });

    default:
      return state;
  }
};

export default core;
