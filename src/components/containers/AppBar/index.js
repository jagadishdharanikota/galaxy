import React from 'react';
import PropTypes from 'prop-types';
import AdvAutocomplete from '../../controls/AdvAutocomplete';
import { withAll } from '../../../HOCs';
import './index.css';

const AppBar = ({ title }) => {
  const autoCompleteProps = {
    config: {
      label: '',
      listKeyPropertyRef: '_id',
      listLabelPropertyRef: 'name',
      propertyReference: '.refId',
      actions: [['addViewGroupItem', [{ component: 'PageDesigner', type: 'type', _id: '_id' }]]],
    },
    propsContext: [],
  };

  const EnhancedAdvAutocomplete = withAll(AdvAutocomplete);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {title}
        </a>
        <EnhancedAdvAutocomplete
          config={autoCompleteProps.config}
          propsContext={autoCompleteProps.propsContext}
        />
      </div>
    </nav>
  );
};

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppBar;
