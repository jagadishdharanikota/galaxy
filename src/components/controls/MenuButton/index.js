import React, { useState } from 'react';

const MenuButton = ({ children, items }) => {
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
          {children}
        </button>
        <div className={`dropdown-menu dropdown-menu-right ${menuClass}`}>
          {items?.length > 0 &&
            items.map((item) => (
              <button type="button" key={item.id} className="dropdown-item" onClick={item.action}>
                {item.name}
              </button>
            ))}
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
