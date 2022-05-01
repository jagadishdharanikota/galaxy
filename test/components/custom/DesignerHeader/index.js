import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from '../../controls/MenuButton';

const Header = React.memo((props) => {
  const { name, description, save } = props;
  return (
    <header className="row" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="col-sm-8 my-2">
        <h6>{name}</h6>
        <p className="m-0">{description}</p>
      </div>
      <div className="col-sm-4 my-2 text-md-right">
        <button type="button" className="btn btn-primary btn-sm mr-2" onClick={save}>
          Save
        </button>
        <MenuButton />
      </div>
    </header>
  );
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default Header;
