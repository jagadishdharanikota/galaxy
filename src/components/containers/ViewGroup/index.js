import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewElement from './ViewElement';
import componentsMap from '../../../ComponentsMap';
import { removeViewGroupItem, switchViewGroupItem } from '../../../statemgmt/actions';
import { APP_PROPS, STORE } from '../../../constants';

const ViewGroup = (props) => {
  const showClasses = 'show active';
  const { activeTab, tabs } = props;

  const createTabItem = () => {
    return tabs.map((tab, index) => {
      const activeClass = index === parseInt(activeTab, 10) - 1 ? 'active' : '';
      const { key } = tab;
      return (
        <li key={key} className="nav-item" role="tab" onClick={onTabSelectHandler}>
          <a
            className={`nav-link rounded-0 px-2 py-1 ${activeClass}`}
            id={`pills-${key}-tab`}
            href={key}
            data-tabcontentid={`#pills-${key}`}
            data-toggle="pill"
            aria-controls={`pills-${key}`}
            data-index={index}
          >
            <span className="text-truncate">{key}</span>
            <button
              type="button"
              className="btn-sm btn-close ml-2"
              data-dismiss="tab"
              aria-label="Close"
              data-index={index}
              onClick={onCloseViewHandler}
            />
          </a>
        </li>
      );
    });
  };

  const createTabContent = () => {
    const { target } = props;
    return tabs.map((tab, index) => {
      const activeClass = index === parseInt(activeTab, 10) - 1 ? showClasses : '';
      const { key, component: componentName } = tab;
      if (componentName && componentsMap[componentName]) {
        const { component } = componentsMap[componentName];
        const componentProps = tab;
        const propsContext = [target, 'items', index];

        return (
          <div
            key={key}
            className={`tab-pane fade ${activeClass} container-fluid`}
            id={`pills-${key}`}
            aria-labelledby={`pills-${key}-tab`}
          >
            <ViewElement
              component={component}
              componentProps={componentProps}
              propsContext={propsContext}
              activeTab={activeTab}
              currentTab={index + 1}
            />
          </div>
        );
      }

      return <h3>{`Cannot find ${componentName} component in ComponentsMap.js file.`}</h3>;
    });
  };

  const onTabSelectHandler = (event) => {
    const { target } = event;
    let index = target.closest('.nav-item').querySelector('.nav-link').getAttribute('data-index');
    index = parseInt(index, 10) + 1;
    if (activeTab !== index) {
      props.switchViewGroupItem({ index });
    }
  };

  const onCloseViewHandler = (event) => {
    const { target } = event;
    const index = parseInt(
      target.closest('.nav-item').querySelector('.nav-link').getAttribute('data-index'),
      10
    );
    props.removeViewGroupItem({ index });
    event.stopPropagation();
  };

  if (!tabs) {
    return '';
  }

  return (
    <>
      <ul
        className="nav nav-pills"
        style={{ backgroundColor: '#394046' }}
        id="pills-tab"
        role="tablist"
      >
        {createTabItem()}
      </ul>
      <div className="tab-content vh-100" id="pills-tabContent">
        {createTabContent()}
      </div>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props[APP_PROPS.CONFIG],
    activeTab: state[STORE.TAB].activeItem,
    tabs: state[STORE.TAB].items,
    target: STORE.TAB,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeViewGroupItem: (data) => dispatch(removeViewGroupItem(data)),
    switchViewGroupItem: (data) => dispatch(switchViewGroupItem(data)),
  };
};

ViewGroup.defaultProps = {
  activeTab: 0,
  tabs: [],
};

ViewGroup.propTypes = {
  activeTab: PropTypes.number,
  tabs: PropTypes.instanceOf(Array),
  switchViewGroupItem: PropTypes.func.isRequired,
  removeViewGroupItem: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroup);
