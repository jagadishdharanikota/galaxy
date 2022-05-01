import React, { useState } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { DOM_ATTRIBUTES } from '../../../constants';

const TreeNavigation = (props) => {
  const { actions, config } = props;
  const [state, setState] = useState(config);

  function createNavigation(properties, depth = 0, path = '') {
    const { mode } = state;
    const navStyling = mode === 'vertical' ? 'flex-column' : '';
    if (properties.children.length > 0) {
      const className = depth > 0 && properties.collapsed ? 'd-none' : '';
      return (
        <ul className={`nav ${navStyling} ml-1 ${className}`} role="tree">
          {createNavigationItems(properties.children, depth, path)}
        </ul>
      );
    }
    return '';
  }

  function createNavigationItems(items, depth, path) {
    return items.map((item, index) => {
      const { actions: itemActions, children, collapsed, label } = item;
      const arrowAngle = collapsed ? '0' : '45';
      const realPath = path ? `${path}.${index}` : index;
      return (
        <li
          key={label}
          className="nav-item"
          role="treeitem"
          data-path={realPath}
          onClick={handleClick}
        >
          <a className="nav-link" href="#">
            {children.length > 0 ? (
              <i
                className="fa fa-angle-right fa-1x mr-2"
                aria-hidden="true"
                style={{ transform: `rotate(${arrowAngle}deg)` }}
                onClick={expandOrCollapse}
              />
            ) : (
              <i className="fa fa-caret-right mr-2 invisible" aria-hidden="true" />
            )}
            {label}
          </a>
          {createNavigation(item, depth + 1, realPath)}
        </li>
      );
    });
  }

  /**
   *
   * @param {HTMLElement} target
   */
  function getItemPath(target) {
    const li = target.closest(`li[${DOM_ATTRIBUTES.DATA_PATH}]`);
    if (li) {
      const pathString = li.getAttribute(DOM_ATTRIBUTES.DATA_PATH);
      const path = pathString.split('.');
      return path;
    }
    return [];
  }

  const expandOrCollapse = (event) => {
    const { target } = event;
    const path = getItemPath(target);

    setState((prevState) =>
      produce(prevState, (draft) => {
        let tempDraft = draft;
        path.forEach((item) => {
          tempDraft = tempDraft.children[item];
        });
        tempDraft.collapsed = !tempDraft.collapsed;
      })
    );

    // event.stopPropagation();
  };

  const handleClick = (event) => {
    const { target } = event;
    const path = getItemPath(target);
    let draft = state;

    path.forEach((item) => {
      draft = draft.children[item];
    });

    if (draft && Array.isArray(draft.actions)) {
      draft.actions.forEach((action) => {
        const [actionName, params] = action;
        actions[actionName](...params);
      });
    }

    // event.stopPropagation();
  };

  return createNavigation(state, 0, '');
};

TreeNavigation.propTypes = {
  config: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
};

export default TreeNavigation;
