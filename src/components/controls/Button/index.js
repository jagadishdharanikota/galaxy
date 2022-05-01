import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { className, mode, value } = props;
  const disabled = mode === 'design' ? 'disabled' : '';
  return (
    <button type="button" className={`btn btn-primary ${className}`} disabled={disabled}>
      {value || 'Button'}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
  mode: '',
};

export default Button;
