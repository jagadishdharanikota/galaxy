/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_PROPS, UI_MODE_DESIGN } from '../constants';
import contextResolver from '../core/context/resolver';
import Requisite from '../core/Requisite';
import httpService from '../services';
import actions from '../statemgmt/actions/action-dispatcher';

const withAll = (WrappedComponent) => {
  class WithAll extends Component {
    constructor(props) {
      super(props);
      const { config, propsContext, mode } = this.props;
      const { propertyReference } = config;

      this.requisite = new Requisite(config, propsContext);

      // Don't resolve the properties while design time rendering of the control
      /* const value =
        mode === UI_MODE_DESIGN
          ? ''
          : contextResolver.getValue(propsContext, propertyReference) || '';
      */

      this.value =
        mode === UI_MODE_DESIGN
          ? ''
          : contextResolver.getValue(propsContext, propertyReference) || '';

      // Put resolved value property in properties object
      this.extendedProps = {
        ...this.props,
        [APP_PROPS.CONFIG]: {
          ...config,
          value: this.value,
        },
      };
    }

    render() {
      const {
        config: { propertyReference },
        propsContext,
        resolvedConfig = this.requisite.getResolvedConfig(),
        mode,
      } = this.props;

      this.value =
        mode === UI_MODE_DESIGN
          ? ''
          : contextResolver.getValue(propsContext, propertyReference) || '';

      return (
        <WrappedComponent
          {...this.extendedProps}
          resolvedConfig={{
            ...resolvedConfig,
            value: this.value,
          }}
          actions={actions}
          httpService={httpService}
          requisite={this.requisite}
          constants={{ APP_PROPS, UI_MODE_DESIGN }}
        />
      );
    }
  }

  /* eslint no-use-before-define: ["error", { "functions": false }] */
  WithAll.displayName = `WithAll(${getDisplayName(WrappedComponent)})`;

  WithAll.propTypes = {
    config: PropTypes.instanceOf(Object).isRequired,
    resolvedConfig: PropTypes.instanceOf(Object).isRequired,
    propsContext: PropTypes.instanceOf(Array).isRequired,
    mode: PropTypes.string,
  };

  WithAll.defaultProps = {
    mode: '',
  };

  const mapStateToProps = (state, props) => {
    const resolvedConfig = new Requisite(props.config, props.propsContext).getResolvedConfig();
    return {
      ...props,
      resolvedConfig: { ...resolvedConfig },
      // Temporary fix as controls are depending on value property
      value: resolvedConfig.propertyReference || '',
    };
  };

  return connect(mapStateToProps, null)(WithAll);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAll;
