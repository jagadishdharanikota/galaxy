import React, { useState } from 'react';

const RadioButton = (props) => {
  const { actions, component, constants, mode } = props;
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const { className, dataSource, label, position, propsContext, propertyReference, value } = props[
    APP_PROPS.CONFIG
  ];
  const [selectedValue, setSelectedValue] = useState(value);

  const getItems = () => {
    const items = [];
    const disabled = mode === UI_MODE_DESIGN ? 'disabled' : '';
    if (!dataSource) {
      return items;
    }

    dataSource.forEach((item) => {
      items.push(
        <div key={item.label} className="form-check">
          <input
            type="radio"
            name={propertyReference}
            className="form-check-input"
            id="exampleRadios1"
            value={item.value}
            checked={selectedValue === item.value}
            disabled={disabled}
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            {item.label}
          </label>
        </div>
      );
    });
    return items;
  };

  const getControl = () => {
    if (position === 'horizontal') {
      return (
        <div
          className={`form-group ${className}`}
          data-component={component}
          data-category={APP_PROPS.CONTROL}
        >
          <legend className="col-form-label col-sm-6">{label}</legend>
          <div className="col-sm-6">{getItems()}</div>
        </div>
      );
    }
    return (
      <div className="form-group" data-component={component} data-category={APP_PROPS.CONTROL}>
        <legend className="col-form-label">{label}</legend>
        {getItems()}
      </div>
    );
  };

  const changeHandler = (event) => {
    setSelectedValue(event.target.value);
    actions.setValue({ propsContext, propertyReference, value });
  };

  return getControl();
};

export default RadioButton;
