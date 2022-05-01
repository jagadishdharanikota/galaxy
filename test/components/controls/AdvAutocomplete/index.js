import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const AdvAutocomplete = (props) => {
  const { actions, constants, component, httpService, propsContext, mode } = props;
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const {
    actions: actionsData,
    label,
    listKeyPropertyRef,
    listLabelPropertyRef,
    position,

    propertyReference,
    value: inputValue,
  } = props[APP_PROPS.CONFIG];
  const [fieldValue, setFieldValue] = useState(inputValue);
  const [dataSource, setDataSource] = useState(propsContext);

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
        <div className="form-group" data-component={component} data-category="control">
          <label className="col-sm-6 col-form-label" htmlFor={propertyReference}>
            {label}
          </label>
          <div className="col-sm-6">{getAutocomplete()}</div>
        </div>
      );
    } else if (label) {
      return (
        <div className="form-group border-none" data-component={component} data-category="control">
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
        <div className="has-search">
          <span className="fa fa-search form-control-feedback" />
          <input
            type="search"
            id={propertyReference}
            /* accessKey="s" */
            className="form-control"
            placeholder="Search"
            list="autocomplete-list"
            name="adv-autocomplete-list"
            data-property={propertyReference}
            value={fieldValue}
            disabled={disabled}
            onChange={handleChange}
            onBlur={validateSelection}
          />
        </div>

        <datalist id="autocomplete-list">
          {dataSource &&
            dataSource.map((item) => {
              const itemValue = item[listKeyPropertyRef];
              return (
                <option key={itemValue} value={itemValue}>
                  {item.description}
                  {'-'}
                  {item[listLabelPropertyRef]}
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

      if (propsContext && propertyReference) {
        actions.setValue({
          contextPath: propsContext,
          property: propertyReference,
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
      if (value === item[listKeyPropertyRef]) {
        isValid = true;
        selectedItem = item;
        break;
      }
    }

    // For invalid valid value clear the autocomplete
    if (!isValid) {
      setFieldValue('');
    } else {
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

AdvAutocomplete.propTypes = {
  propsContext: PropTypes.instanceOf(Array).isRequired,
  /* dataSource: PropTypes.instanceOf(Array).isRequired, */
  httpService: PropTypes.func.isRequired,
};

export default AdvAutocomplete;
