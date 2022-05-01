import React from 'react';
import PropTypes from 'prop-types';
import componentsMap from '../../../ComponentsMap';
import { LazyLoad } from '../../common/Lazy';
import { withAll } from '../../../HOCs';
import { APP_PROPS, UI_MODE_DESIGN } from '../../../constants';
import './styles.css';

const INDEX_ADJUSTMENT_VALUE = 1;
const MAX_COLUMNS = 12;

const Layout = React.memo((props) => {
  const { mode, propsContext } = props;
  const { LAYOUT, CONTROL, CHILDREN } = APP_PROPS;
  // Imp: m-2 Margin around control during design time is required as we need clickable area to insert cursor.
  const [rowClass, columnClass, controlClass] =
    mode === UI_MODE_DESIGN ? ['row row-height m-2', 'border', 'm-2'] : ['row', '', ''];

  const createChildren = (rowsState, row, isInitialCall) => {
    if (Array.isArray(rowsState)) {
      return React.Children.toArray(
        rowsState.map((rowData, index) => {
          const rowIdentifier = row
            ? `${row}.${index + INDEX_ADJUSTMENT_VALUE}`
            : index + INDEX_ADJUSTMENT_VALUE;
          switch (rowData.category) {
            case LAYOUT:
              return getRow(rowData, rowIdentifier);
            case CONTROL:
              return getControl(rowData, rowIdentifier);
            default:
              console.info("Couldn't find matching category");
              return '';
          }
        })
      );
    } else if (rowsState instanceof Object && rowsState.category === LAYOUT) {
      const rowIdentifier = row && !isInitialCall ? `${row}.${INDEX_ADJUSTMENT_VALUE}` : row;
      return getRow(rowsState, rowIdentifier);
    }
    return '';
  };

  const getRow = (rowData, rowIdentifier) => (
    <div
      key={rowIdentifier}
      className={rowClass}
      data-category={rowData.category}
      data-row={rowIdentifier}
    >
      {getColumns(rowData, rowIdentifier)}
    </div>
  );

  const getColumns = (layoutState, rowIdentifier) =>
    React.Children.toArray(
      layoutState.columns.map((columnState, index, input) => {
        const columnIdentifier = `${rowIdentifier}.${index + INDEX_ADJUSTMENT_VALUE}`;
        return (
          <div
            /* key={columnIdentifier} */
            className={`${columnClass} col-md-${MAX_COLUMNS / input.length}`}
            data-column={columnIdentifier}
          >
            {createChildren(columnState[CHILDREN], columnIdentifier)}
          </div>
        );
      })
    );

  const getControl = (rowData, rowIdentifier) => {
    const controlProps = {
      ...rowData,
      mode,
      propsContext,
    };
    const { key, component } = rowData;
    if (mode === UI_MODE_DESIGN) {
      return (
        <div key={key} className={`${controlClass}`} data-row={rowIdentifier}>
          <LazyLoad
            resolve={() =>
              import(/* webpackChunkName:  "[request]" */ `../../controls/${component}`)
            }
            properties={controlProps}
          />
        </div>
      );
    }

    return (
      <div key={key} className={`${controlClass}`} data-row={rowIdentifier}>
        {React.createElement(withAll(componentsMap[component].component), { ...controlProps })}
        {/* <Lazy resolve={() => import(`../../controls/${rowData.component}`)} properties={controlProps} /> */}
      </div>
    );
  };

  return createChildren(props, props.row, true);
});

Layout.propTypes = {
  mode: PropTypes.string,
  propsContext: PropTypes.arrayOf(PropTypes.any).isRequired,
  row: PropTypes.number.isRequired,
};

Layout.defaultProps = {
  mode: '',
};

export default Layout;
