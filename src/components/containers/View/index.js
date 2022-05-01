import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';

import { APP_PROPS, UI_MODE_DESIGN } from '../../../constants';

class View extends Component {
  renderChildren(viewModel) {
    const { propsContext, mode } = this.props;
    return viewModel[APP_PROPS.CHILDREN].map((componentData, index) => {
      switch (componentData.category) {
        case APP_PROPS.LAYOUT:
          return (
            <Layout
              category={componentData.category}
              type={componentData.type}
              key={componentData.key}
              component={componentData.component}
              columns={componentData.columns}
              propsContext={propsContext}
              row={index + 1}
              mode={mode}
            />
          );
        default:
          console.info("Didn't find a match for provided category to render in View component");
          return '';
      }
    });
  }

  render() {
    const { name, _id, config, mode } = this.props;
    if (mode === UI_MODE_DESIGN && config) {
      return this.renderChildren(config);
    } else if (config) {
      return (
        <div key={_id} className="container-fluid" data-viewname={name} data-viewkey={_id}>
          {this.renderChildren(config)}
        </div>
      );
    }

    console.info('Cannot render view component without configurations');
    return '';
  }
}

View.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  config: PropTypes.instanceOf(Object).isRequired,
  propsContext: PropTypes.instanceOf(Array).isRequired,
  mode: PropTypes.string,
};

View.defaultProps = {
  mode: '',
};

export default View;
