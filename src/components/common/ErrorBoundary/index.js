import React, { Component } from 'react';
import PropTypes from 'prop-types';

// https://stackoverflow.com/questions/52096804/react-still-showing-errors-after-catching-with-errorboundary

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error while rendering component:', error, errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h3>Something went wrong</h3>;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
