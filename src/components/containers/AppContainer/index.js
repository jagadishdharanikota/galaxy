import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoad } from '../../common/Lazy';
import AppBar from '../AppBar';
// import ModalContainer from '../Modal/ModalContainer';
import withActions from '../../../HOCs/withActions';
import componentsMap from '../../../ComponentsMap';
import './styles.css';

const AppContainer = (props) => {
  const { config } = props;
  function renderAppContainer() {
    const containerMarkup = [];
    if (config) {
      if (config.header) {
        containerMarkup.push(renderHeader(config.header));
      }
      containerMarkup.push(renderBody(config));
    }
    return containerMarkup;
  }

  function renderHeader(header) {
    return (
      <header key="header" className="sticky-top flex-md-nowrap">
        <AppBar title="Appinno" />
      </header>
    );
  }

  function renderBody(metadata) {
    const containerMarkup = [];
    const { main, sidebarLeft, sidebarRight } = metadata;
    if (sidebarLeft) {
      containerMarkup.push(renderSidebar(sidebarLeft));
    }

    if (main) {
      containerMarkup.push(renderMain(main));
    }

    if (sidebarRight) {
      containerMarkup.push(renderSidebar(sidebarRight));
    }

    return (
      /* container-fluid is introducing padding 16px on both sides and row is introducing margin -12px on both side resulting in 4px gap between container and row */
      <div key="body" className="container-fluid p-0">
        <div className="row m-0 no-gutters">{containerMarkup}</div>
      </div>
    );
  }

  function renderSidebar(sidebar) {
    const { children } = sidebar;
    return (
      <nav key="sidebar" className="col-md-2 p-0 d-none d-md-block bg-light sidebar">
        <div className="sticky-top sidebar-top">
          {children.map((componentProps) => {
            const { component: name } = componentProps;
            const { component } = componentsMap[name];
            return React.createElement(withActions(component), componentProps);
          })}
        </div>
      </nav>
    );
  }

  function renderMain(main) {
    /*
    const modalProps = {
      category: 'layout',
      type: 'component',
      component: 'Modal',
      config: {
        open: '.open',
        refId: '.refId',
        propertyReference: '.componentProps',
      },
      propsContext: ['modal'],
    };
    */
    const viewGroupProps = main.children[0];
    const { component } = viewGroupProps;
    return (
      <main key="main" role="main" className="col-md-10 p-0">
        {/* <ModalContainer {...modalProps} /> */}
        <LazyLoad
          resolve={() => {
            return import(/* webpackChunkName: "[request]" */ `../${component}`);
          }}
          properties={viewGroupProps}
        />
      </main>
    );
  }

  return renderAppContainer();
};

AppContainer.propTypes = {
  config: PropTypes.instanceOf(Object).isRequired,
};

export default withActions(AppContainer);
