/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import actions from '../statemgmt/actions/action-dispatcher';
import httpClient from '../services';

const withActions = (WrappedComponent) => {
  class WithActions extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} actions={actions} httpClient={httpClient} />;
    }
  }

  // Setting the display name for the components for clear visualization in react component tree in debug tools
  /* eslint no-use-before-define: ["error", { "functions": false }] */
  WithActions.displayName = `WithAll(${getDisplayName(WrappedComponent)})`;

  return WithActions;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withActions;
