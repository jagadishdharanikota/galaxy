import React from 'react';
import PropTypes from 'prop-types';

const Page = (props) => {
  const { label, saveConfiguration } = props;
  return (
    <header className="row no-gutters" role="presentation" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="col-sm-8">
        <h4>{label}</h4>
      </div>
      <div className="col-sm-4 my-2 text-md-right">
        <button type="button" className="btn btn-primary btn-sm mr-2" onClick={saveConfiguration}>
          Save
        </button>
        {/* <MenuButton /> */}
      </div>
    </header>
  );
};

Page.propTypes = {
  label: PropTypes.string.isRequired,
  saveConfiguration: PropTypes.func.isRequired,
};

export default Page;
