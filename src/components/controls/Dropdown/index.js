import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = (props) => {
  const { component, constants, propsContext, requisite, mode } = props;
  const { APP_PROPS, UI_MODE_DESIGN } = constants;
  const { propertyReference, className } = props[APP_PROPS.CONFIG];
  const [actionHandler] = [requisite.getActionHandler()];
  const { dataSource, label, position, value } = props[APP_PROPS.RESOLVED_CONFIG];
  const [selectedValue, setSelectedValue] = useState(
    value || (dataSource?.length > 0 && dataSource[0].value)
  );

  /*
	useEffect(() => {
		// Setting initial value in redux state
		if (mode !== UI_MODE_DESIGN) {
			actions.setValue({
				contextPath: propsContext,
				property: propertyReference,
				value: selectedValue
			});
		}
	}, [actions, propsContext, propertyReference, selectedValue]);
	*/

  const getControl = () => {
    const controlId = propsContext ? `${propsContext.join('.')}${propertyReference}` : '';
    if (position === 'horizonatal') {
      return (
        <div className="form-group row" data-component={component} data-category="control">
          <label className="col-form-label col-sm-2" htmlFor={controlId}>
            {label}
          </label>
          <div className="col-sm-10">{getDropdown()}</div>
        </div>
      );
    }

    return (
      <div className="form-group" data-component={component} data-category="control">
        <label className="col-form-label" htmlFor={controlId}>
          {label}
        </label>
        {getDropdown()}
      </div>
    );
  };

  const getDropdown = (controlId) => {
    const disabled = mode === UI_MODE_DESIGN ? 'disabled' : '';
    return (
      <select
        id={controlId}
        className={`form-control ${className}`}
        value={selectedValue}
        disabled={disabled}
        onChange={changeHandler}
      >
        {getOptions()}
      </select>
    );
  };

  const getOptions = () => {
    if (typeof dataSource === 'object' && dataSource._id && dataSource._id.startsWith('List')) {
      return dataSource[APP_PROPS.DATA].map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ));
    }
    return '';
  };

  const changeHandler = (event) => {
    setSelectedValue(event.target.value);
    actionHandler.changeHandler(event);
  };

  return getControl();
};

Dropdown.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  /* value: PropTypes.any.isRequired, */
};

Dropdown.defaultProps = {
  className: '',
  mode: '',
};

export default Dropdown;
