import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { withAll } from '../../../HOCs';

// Reference:  https://codeburst.io/dynamic-imports-react-and-redux-29f6d2d88d77
export default class LazyLoadModule extends React.Component {
  constructor() {
    super();
    this.state = {
      module: null,
    };
  }

  async componentDidMount() {
    try {
      const { resolve, properties } = this.props;
      const { default: module } = await resolve();
      this.setState({ module, properties });
    } catch (error) {
      this.setState({ hasError: error });
    }
  }

  componentDidCatch(error) {
    this.setState({ hasError: error });
  }

  render() {
    const { module, properties, hasError } = this.state;

    if (hasError) {
      return <div>{hasError.message}</div>;
    }

    if (!module) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if (module) {
      // Creating components dynamically with withAll HOC.
      return React.createElement(withAll(module), properties);
    }
    return <div>Failed to load module</div>;
  }
}

LazyLoadModule.propTypes = {
  properties: PropTypes.instanceOf(Object).isRequired,
  resolve: PropTypes.func.isRequired,
};

export const LazyLoad = (props) => {
  const { resolve, properties } = props;
  const module = lazy(resolve);
  const fallbackComponent = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <Suspense fallback={fallbackComponent}>
      {React.createElement(withAll(module), properties)}
    </Suspense>
  );
};

LazyLoad.propTypes = {
  properties: PropTypes.instanceOf(Object).isRequired,
  resolve: PropTypes.func.isRequired,
};
