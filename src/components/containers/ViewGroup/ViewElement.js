import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundry from '../../common/ErrorBoundary';

const areEqual = (prevProps, nextProps) => {
  return prevProps.activeTab === nextProps.activeTab;
};

const ViewElement = React.memo(({ component, componentProps, propsContext }) => {
  return (
    <ErrorBoundry>
      {React.createElement(component, { ...componentProps, propsContext })}
    </ErrorBoundry>
  );
}, areEqual);

ViewElement.propTypes = {
  component: PropTypes.elementType.isRequired,
  componentProps: PropTypes.object.isRequired,
  propsContext: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ViewElement;
