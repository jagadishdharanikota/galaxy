import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const { component, constants, propsContext, requisite, mode } = props;
  // const {actions, component, constants, propsContext, requisite, mode} = props;
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const { propertyReference } = props[APP_PROPS.CONFIG];
  const [actionHandler] = [requisite.getActionHandler()];
  const { className, dataSource, label, position, value } = props[APP_PROPS.RESOLVED_CONFIG];
  const [checkedItems, setCheckedItems] = useState(value || new Set());

  const getControl = () => {
    if (position === 'horizontal') {
      return (
        <div
          className="form-check"
          data-component={component}
          data-path={propsContext}
          data-property={propertyReference}
          data-category="control"
        >
          <legend className={`col-form-label col-sm-6 ${className}`}>{label}</legend>
          <div className="col-sm-6">{getItems()}</div>
        </div>
      );
    }

    return (
      <div className="form-group" data-component={component} data-category="control">
        <legend className="col-form-label">{label}</legend>
        {getItems()}
      </div>
    );
  };

  const getItems = () => {
    const items = [];
    if (UI_MODE_DESIGN !== mode) {
      dataSource.forEach((item) => {
        items.push(
          <div key={item.value} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={item.value}
              name={item.value}
              value={item.value}
              checked={checkedItems.has(item.value)}
              onChange={changeHandler}
            />
            <label className="form-check-label" htmlFor={item.value}>
              {item.label}
            </label>
          </div>
        );
      });
    }
    return items;
  };

  const changeHandler = (event) => {
    setCheckedItems((prevState) => {
      prevState.add(event.target.value);
    });
    actionHandler.changeHandler(event);
  };

  return getControl();
};

Checkbox.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
  mode: '',
};

export default Checkbox;
