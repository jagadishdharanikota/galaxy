import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  const { component, constants, propsContext, requisite, mode } = props;
  const [actionHandler] = [requisite.getActionHandler()];
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const { className, label, propertyReference, position, value } = props[APP_PROPS.CONFIG];

  const [inputValue, setInputValue] = useState(value);

  const getControl = () => {
    if (position === 'horizontal') {
      return (
        <div
          className="form-group row"
          data-component={component}
          data-category="control"
          data-context={propsContext}
        >
          <label className="col-form-label col-md-6" htmlFor={propertyReference}>
            {label}
          </label>
          <div className="col-md-6">{getInputField()}</div>
        </div>
      );
    }

    return (
      <div
        className="form-group border-none"
        data-component={component}
        data-category="control"
        data-context={propsContext}
      >
        <label className="col-form-label" htmlFor={propertyReference}>
          {label}
        </label>
        {getInputField()}
      </div>
    );
  };

  const getInputField = () => {
    const disabled = mode === UI_MODE_DESIGN;
    return (
      <textarea
        className={`form-control ${className || ''}`}
        id="exampleFormControlTextarea1"
        rows="3"
        value={inputValue}
        disabled={disabled}
        data-property={propertyReference}
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

TextArea.propTypes = {
  className: PropTypes.string,
};

TextArea.defaultProps = {
  className: '',
};

export default TextArea;
