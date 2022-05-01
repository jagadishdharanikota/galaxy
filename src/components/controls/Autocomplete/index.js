import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Autocomplete = (props) => {
  const { actions, constants, component, httpService, propsContext, mode } = props;
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const config = props[APP_PROPS.CONFIG];
  const {
    actions: actionsData,
    label,
    itemValue,
    itemLabel,
    position,
    propertyReference,
    value: inputValue,
  } = props[APP_PROPS.RESOLVED_CONFIG];

  const [fieldValue, setFieldValue] = useState(inputValue);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (mode !== UI_MODE_DESIGN) {
      httpService({
        url: '/views',
        method: 'GET',
      })
        .then((response) => {
          setDataSource(response.data || []);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [httpService]);

  const getControl = () => {
    if (position === 'horizontal' && label) {
      return (
        <div className="form-group" data-component={component} data-category={APP_PROPS.CONTROL}>
          <label className="col-sm-6 col-form-label" htmlFor={propertyReference}>
            {label}
          </label>
          <div className="col-sm-6">{getAutocomplete()}</div>
        </div>
      );
    } else if (label) {
      return (
        <div className="form-group" data-component={component} data-category={APP_PROPS.CONTROL}>
          <label className="col-form-label" htmlFor={propertyReference}>
            {label}
          </label>
          {getAutocomplete()}
        </div>
      );
    }
    return <div>{getAutocomplete()}</div>;
  };

  const getAutocomplete = () => {
    const disabled = mode === UI_MODE_DESIGN;
    return (
      <>
        <input
          type="search"
          id={propertyReference}
          /* accessKey="s" */
          className="form-control"
          placeholder=""
          list="autocomplete-list"
          name="autocomplete-list"
          data-property={propertyReference}
          value={fieldValue}
          disabled={disabled}
          onChange={handleChange}
          onBlur={validateSelection}
        />

        <datalist id="autocomplete-list">
          {Array.isArray(dataSource) &&
            dataSource.map((item) => {
              return (
                <option key={item[itemValue]} value={item[itemValue]}>
                  {item[itemLabel]}
                </option>
              );
            })}
        </datalist>
      </>
    );
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (fieldValue !== value) {
      setFieldValue(value);

      if (propsContext && config.propertyReference) {
        actions.setValue({
          contextPath: propsContext,
          property: config.propertyReference,
          value,
        });
      }
    }
  };

  const validateSelection = (event) => {
    const { value } = event.target;
    let isValid = false;
    let selectedItem;

    for (let index = 0; index < Object.keys(dataSource).length; index += 1) {
      const item = dataSource[index];
      if (value === item[itemValue]) {
        isValid = true;
        selectedItem = item;
        break;
      }
    }

    // For invalid valid value clear the autocomplete
    if (!isValid) {
      setFieldValue('');
    } else if (actionsData) {
      // Process actions on selecting the item
      for (let index = 0; index < Object.keys(actionsData).length; index += 1) {
        const [actionName, actionParams] = actionsData[index];
        actionParams[0].component = selectedItem.type === 'view' ? 'ViewDesigner' : 'PageDesigner';
        actionParams[0].type = selectedItem.type;
        actionParams[0]._id = selectedItem._id;
        actions[actionName]({ ...actionParams[0] });
      }
    }
  };

  return getControl();
};

Autocomplete.propTypes = {
  propsContext: PropTypes.instanceOf(Array).isRequired,
  /* dataSource: PropTypes.instanceOf(Array).isRequired, */
  httpService: PropTypes.func.isRequired,
};

export default Autocomplete;
