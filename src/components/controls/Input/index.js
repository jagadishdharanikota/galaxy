import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { component, constants, propsContext, requisite, mode } = props;
  const [actionHandler] = [requisite.getActionHandler()];
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const { className, key, label, propertyReference, placeholder = '', position, value } = props[
    APP_PROPS.CONFIG
  ];
  const [inputValue, setInputValue] = useState(value);

  const getControl = () => {
    if (position === 'horizontal') {
      return (
        <div className="form-group row" data-component={component} data-category="control">
          {getLabel()}
          <div className="col-md-6">{getInputField()}</div>
        </div>
      );
    }
    return (
      <div className="form-group" data-component={component} data-category="control">
        {getLabel()}
        {getInputField()}
      </div>
    );
  };

  const getLabel = () => {
    if (label && position === 'horizontal') {
      return (
        <label className="col-form-label col-md-6" htmlFor={propertyReference}>
          {label}
        </label>
      );
    } else if (label) {
      return (
        <label className="col-form-label" htmlFor={propertyReference}>
          {label}
        </label>
      );
    }
    return '';
  };

  const getInputField = () => {
    const disabled = mode === UI_MODE_DESIGN;

    return (
      <input
        type="text"
        id={key}
        className={`form-control ${className || ''}`}
        disabled={disabled}
        data-property={propertyReference}
        data-context-path={propsContext ? propsContext.join('.') : ''}
        placeholder={placeholder}
        value={inputValue}
        onChange={changeHandler}
      />
    );
  };

  const changeHandler = (event) => {
    setInputValue(event.target.value);
    actionHandler.changeHandler(event);
  };

  return getControl();
};

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
