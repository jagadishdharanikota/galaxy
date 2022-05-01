/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */
/*********************************************************************************************
 * Designer module to design UI for View component
 *
 * @author: Jagadish Dharanikota
 *********************************************************************************************/

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// import { Stack } from '@fluentui/react';

import Header from '../DesignerHeader';
import View from '../../containers/View';
import { withActions } from '../../../HOCs';
import { APP_PROPS } from '../../../constants';

import './styles.css';

const PageDesigner = (props) => {
  const { actions, httpClient, metadata, propsContext } = props;
  const { _id, name, description, type, category, config } = metadata;
  const { header, content, footer } = config;
  const [selectedRegion, setSelectedRegion] = useState('header');

  const [state, setState] = useState({
    showConfig: false,
    configState: null,
    propsContext: null,
  });

  const getPageDesigner = () => {
    return (
      <div>
        <Header name={name} description={description} save={saveConfiguration} />
        <main className="row h-100">
          <div className="col-sm-9">
            
            {/* <Stack
              horizontal
              horizontalAlign="center"
              data-pageregion="header"
              onClick={showConfig}
            >
              <Stack.Item>
                {header[APP_PROPS.CONFIG].refId || 'Click to add header view'}
              </Stack.Item>
            </Stack>
            <Stack
              horizontal
              horizontalAlign="center"
              data-pageregion="content"
              onClick={showConfig}
            >
              <Stack.Item>
                {content[APP_PROPS.CONFIG].refId || 'Click to add content view'}
              </Stack.Item>
            </Stack> */}

            <header
              className={`page-header text-center align-middle my-auto border ${
                selectedRegion === 'header' ? 'border-primary' : ''
              }`}
              role="presentation"
              data-pageregion="header"
              onClick={showConfig}
            >
              <p>
                {header[APP_PROPS.CONFIG].refType}
                <span>|</span>
                {header[APP_PROPS.CONFIG].refId || 'Click to add header view'}
              </p>
            </header>

            <main
              className={`page-content text-center align-middle my-auto border h-100 ${
                selectedRegion === 'content' ? 'border-primary' : ''
              }`}
              role="presentation"
              data-pageregion="content"
              onClick={showConfig}
            >
              <p className="my-auto">
                {content[APP_PROPS.CONFIG].refType}
                <span>|</span>
                {content[APP_PROPS.CONFIG].refId || 'Click to add content view'}
              </p>
            </main>
            <footer
              className={`page-footer text-center align-middle my-auto border ${
                selectedRegion === 'footer' ? 'border-primary' : ''
              }`}
              role="presentation"
              data-pageregion="footer"
              onClick={showConfig}
            >
              <p className="my-auto">
                ({footer[APP_PROPS.CONFIG].refType}
                <span>|</span>
                {footer[APP_PROPS.CONFIG].refId || 'Click to add footer view'})
              </p>
            </footer>
          </div>

          <div className="col-sm-3 bg-light p-2" data-path={state.propsContext}>
            <div className="container-fluid border-bottom">
              <h6>Configuration</h6>
            </div>
            {state.showConfig && state.configState && state.propsContext && (
              <View
                _id={state.configState._id}
                name={state.configState.name}
                config={state.configState.config}
                mode={state.configState.mode}
                propsContext={state.propsContext}
              />
            )}
          </div>
        </main>
      </div>
    );
  };

  const showConfig = useCallback(async (event) => {
    event.persist();
    const region = event.target.closest('[data-pageregion]').getAttribute('data-pageregion');
    const { data: response } = await httpClient({
      url: `views/PageConfiguration`,
      method: 'GET',
    });

    actions.addContextData({
      contextPath: [...propsContext, APP_PROPS.DATA],
      data: response.data,
    });

    setState((prevState) => {
      return {
        ...prevState,
        showConfig: true,
        /* currentSelectedItem: currentFocusedElement, */
        configState: response[APP_PROPS.METADATA],
        propsContext: [
          ...propsContext,
          APP_PROPS.METADATA,
          APP_PROPS.CONFIG,
          region,
          APP_PROPS.CONFIG,
        ],
      };
    });
  });

  const saveConfiguration = () => {
    actions.save({ routeName: 'pages', key: _id, postData: { _id, type, category, config } });
  };

  return getPageDesigner();
};

PageDesigner.propTypes = {
  metadata: PropTypes.instanceOf(Object).isRequired,
  propsContext: PropTypes.instanceOf(Array).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
};

export { PageDesigner };
export default withActions(PageDesigner);
