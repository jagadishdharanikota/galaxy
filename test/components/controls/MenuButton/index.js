import React, { useState } from 'react';

const MenuButton = () => {
  // const { actions } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getControl = () => {
    const menuClass = isMenuOpen ? 'show' : '';
    // style="position: absolute; transform: translate3d(0px, 38px, 0px); top: 0px; left: 0px; will-change: transform;"
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary btn-sm dropdown-toggle mr-1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          Action
        </button>
        <div className={`dropdown-menu dropdown-menu-right ${menuClass}`}>
          <a className="dropdown-item" href="!#">
            Refresh
          </a>
          <a className="dropdown-item" href="!#">
            Clone
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="!#">
            Close
          </a>
        </div>
      </div>
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return getControl();
};

export default MenuButton;
