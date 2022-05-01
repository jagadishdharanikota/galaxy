import React from 'react';
import PropTypes from 'prop-types';

function Label(props) {
  const { className, value } = props;
  return <p className={`h3 ${className}`}>{value || 'Label'}</p>;
}

Label.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
};

Label.defaultProps = {
  className: '',
  value: 'Label',
};

export default Label;
