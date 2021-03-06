/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */
/*********************************************************************************************
 * Designer module to design UI for View component
 *
 * @author: Jagadish Dharanikota
 *********************************************************************************************/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import componentsMap from '../../../ComponentsMap';
import { APP_PROPS, DOM_ATTRIBUTES, OPERATION, UI_MODE_DESIGN } from '../../../constants';
import { withActions, withAll } from '../../../HOCs';
import Tabs from '../../containers/Tabs';
import View from '../../containers/View';
import Input from '../../controls/Input';
import Header from '../DesignerHeader';
import ActionsToolbar from './ActionsToolbar';
import CtrlsToolbar from './CtrlsToolbar';
import './styles.css';

const DESIGNER_AREA_CLASS = 'designer-area';
const INSERTION_POINT = 'insertion-point';
const GAP_BETWEEN_ROWS = 4;

/**
 * Finds and return the right HTML elment having data-category attribute close to the passed target
 * @param {HTMLElement} target
 */
function getTargetedComponent(target) {
  let currentTarget = target;
  // Finding the right target element having data-category attribute by traversing the tree up
  while (currentTarget && !currentTarget.getAttribute(DOM_ATTRIBUTES.DATA_CATEGORY)) {
    currentTarget = currentTarget.parentElement;
  }
  return currentTarget;
}

/**
 * Removes focused element styling
 * @param {HTMLElement} currentFocusedElement Current focused element reference
 */
function removeFocusedElementStyles(currentFocusedElement) {
  if (currentFocusedElement) {
    // const highlistedElement = currentFocusedElement.closest(`div[${DOM_ATTRIBUTES.DATA_ROW}]`);
    const highlightedElements = [
      ...document.querySelectorAll(`.${DESIGNER_AREA_CLASS} .border.border-primary`),
    ];

    highlightedElements.forEach((element) => {
      element.classList.remove('active', 'border', 'border-primary');
    });
  }
}

const ViewDesigner = (props) => {
  const { actions, httpClient, propsContext, metadata } = props;
  const { _id, name, description } = metadata;
  const metaPropContext = [...propsContext, APP_PROPS.METADATA];
  const buildAreaID = _id;
  const blinkerID = `${buildAreaID}-${INSERTION_POINT}`;
  const currentFocusedElementRef = React.createRef(null);
  let currentFocusedElement = null;
  let blinkComponent = null;

  const [state, setState] = useState({
    showConfig: false,
    currentSelectedItem: null,
    configState: null,
    propsContext: null,
  });

  useEffect(() => {
    const insertionElement = document.getElementById(blinkerID);
    if (insertionElement && insertionElement.parentElement) {
      blinkComponent = insertionElement;
      insertionElement.parentElement.appendChild(insertionElement);
    } else if (!insertionElement) {
      const buildAreaElement = document.getElementById(buildAreaID);
      if (buildAreaElement) {
        buildAreaElement.appendChild(createBlinkElement());
      }
    }

    return () => {
      blinkComponent = null;
    };
  });

  useEffect(() => {
    currentFocusedElement = state.currentSelectedItem;
    currentFocusedElement = document.querySelector(`#${buildAreaID} .active`);
  });

  const showConfig = useCallback(async (path) => {
    const component = currentFocusedElement.getAttribute('data-component');
    const { designerView } = componentsMap[component];
    const { data: response } = await httpClient({ url: `views/${designerView}`, method: 'GET' });

    actions.addContextData({
      contextPath: [...propsContext, APP_PROPS.DATA],
      data: response.data,
    });

    setState((prevState) => {
      return {
        ...prevState,
        showConfig: true,
        currentSelectedItem: currentFocusedElement,
        configState: response[APP_PROPS.METADATA],
        propsContext: [...propsContext, APP_PROPS.METADATA, APP_PROPS.CONFIG, ...path],
      };
    });
  });

  /**
   * Handles mouse click on the designer area. Does following actions based on the click target
   * 1. If the target element is layout then blinker is inserted.
   * 2. If the target is a control its design time configuration is shown.
   * @param  {Event} event DOM event object
   */
  const handleDesignerAreaClick = (event) => {
    const { target } = event;
    const currentTarget = getTargetedComponent(target);
    removeFocusedElementStyles(currentFocusedElement);

    if (currentTarget) {
      currentFocusedElementRef.current = currentTarget;
      currentFocusedElement = currentTarget;
      const category = currentFocusedElement.getAttribute(DOM_ATTRIBUTES.DATA_CATEGORY);
      const highlistedElement = currentFocusedElement.closest(`div[${DOM_ATTRIBUTES.DATA_ROW}]`);
      const path = highlistedElement.getAttribute(DOM_ATTRIBUTES.DATA_ROW);
      const modelPath = getPath(path);

      modelPath.push(APP_PROPS.CONFIG);
      switch (category) {
        case APP_PROPS.LAYOUT:
          insertBlinkAtClickedLocation(event);
          break;
        case APP_PROPS.CONTROL:
          showConfig(modelPath);
          break;
        default:
          insertBlinkAtClickedLocation(event);
      }
      highlistedElement.classList.add('active', 'border', 'border-primary');
    } else {
      insertBlinkAtClickedLocation(event);
    }
  };

  /**
   * Insert the selected control from the controls toolbar
   * @param  {Event} event DOM event object
   */
  const insertItem = useCallback(
    async (event) => {
      const { target } = event;
      const info = getItemInfo(target);

      if (!info) {
        console.info("Couldn't get information where the item should be inserted");
        return;
      }

      if (blinkComponent) {
        const { operation, path } = getInsertionInfo(blinkComponent);
        const newPath = getPath(path);
        const componentState = await getComponentState(info);
        actions.addDesignItem({
          path: [...metaPropContext, APP_PROPS.CONFIG, ...newPath],
          operation,
          componentState,
        });
      }
    },
    [blinkComponent]
  );

  /**
   * Deletes current focused item from the design time
   */
  const deleteItem = useCallback(() => {
    if (currentFocusedElement) {
      let path = currentFocusedElement.getAttribute(DOM_ATTRIBUTES.DATA_ROW);
      if (!path) {
        path = currentFocusedElement.parentElement.getAttribute(DOM_ATTRIBUTES.DATA_ROW);
      }
      const newPath = getPath(path);

      actions.removeDesignItem({
        path: [...metaPropContext, APP_PROPS.CONFIG, ...newPath],
        operation: OPERATION.REMOVE,
      });
    }
  });

  /**
   * Moves current focused item up or down
   * @param  {Event} event DOM event object
   */
  const moveItem = useCallback((event) => {
    let { target } = event;
    target = target.closest(`button[${DOM_ATTRIBUTES.DATA_DIRECTION}]`);
    const direction = target.getAttribute(DOM_ATTRIBUTES.DATA_DIRECTION);
    if (
      currentFocusedElement &&
      APP_PROPS.LAYOUT === currentFocusedElement.getAttribute(DOM_ATTRIBUTES.DATA_CATEGORY)
    ) {
      const path = currentFocusedElement.getAttribute(DOM_ATTRIBUTES.DATA_ROW);
      const newPath = getPath(path);

      switch (direction) {
        case OPERATION.MOVE_UP:
          actions.moveDesignItem({
            path: [...metaPropContext, APP_PROPS.CONFIG, ...newPath],
            operation: OPERATION.MOVE_UP,
          });
          break;
        case OPERATION.MOVE_DOWN:
          actions.moveDesignItem({
            path: [...metaPropContext, APP_PROPS.CONFIG, ...newPath],
            operation: OPERATION.MOVE_DOWN,
          });
          break;
        default:
          console.info('Not matching direction found');
      }
    }
  });

  /**
   * Inserts blinking element in the clicked location. Blink is inserted at the nearest appropriate position
   * @param  {Event} event DOM event object
   */
  function insertBlinkAtClickedLocation(event) {
    const { target, clientX, clientY } = event;
    const { className, classList, parentElement } = target;
    const isTargetDesignerArea = classList.contains(DESIGNER_AREA_CLASS);
    const isTargetALayoutColumn =
      className.indexOf('col-') > -1 &&
      parentElement &&
      parentElement.getAttribute(DOM_ATTRIBUTES.DATA_CATEGORY) === APP_PROPS.LAYOUT;
    /*
		Mouse click inside DESIGNER_AREA_CLASS element but could be between gap present in existing rows
		______________________________________________________________
		______________________________________________________________ ---> Row1
							-> Mouse click location
		______________________________________________________________
		______________________________________________________________ ---> Row2
		*/

    if (isTargetDesignerArea || isTargetALayoutColumn) {
      const children = [...target.children];
      let gapBetweenRows = GAP_BETWEEN_ROWS;
      for (let index = 0; index < children.length; index += 1) {
        const currentElement = children[index];
        const currentBounds = currentElement.getBoundingClientRect();

        if (index + 1 < children.length) {
          const nextElement = children[index + 1];
          const nextBounds = nextElement.getBoundingClientRect();
          gapBetweenRows = nextBounds.y - (currentBounds.y + currentBounds.height);
        }

        /* Checking if the mouse click coordinates is closely below this element.
				   Different is checked for 4 as the margin gap between row's is 4.
				   // Useful API: elementFromPoints
				*/
        if (
          Math.abs(clientY - (currentBounds.y + currentBounds.height)) <= gapBetweenRows &&
          clientX > currentBounds.x &&
          clientX <= currentBounds.x + currentBounds.width
        ) {
          currentElement.insertAdjacentElement('afterend', blinkComponent);
          return;
        }
      }

      /* If none of the elements matched even after all elements are done, append the blink element at end. Click might be at the end. */
      target.append(blinkComponent);
    }
  }

  const saveConfiguration = () => {
    actions.save({
      routeName: 'views',
      key: buildAreaID,
      postData: metadata,
    });
  };

  /**
   * Get the state of the selected component
   * @param  {Object} info - Infomation of the selected component
   */
  async function getComponentState(info) {
    let componentState = {
      component: info.identifier,
      category: info.category,
      key: Date.now().toString(),
    };

    if (info.category === APP_PROPS.LAYOUT) {
      const columns = parseInt(info.identifier.split('*')[1], 10);
      // Creates an array filled with object {children: []}
      componentState.columns = Array(columns).fill({
        [APP_PROPS.CHILDREN]: [],
      });
    } else if (info.category === APP_PROPS.CONTROL) {
      const { data } = await httpClient({
        url: `componentproperties/${info.identifier}/properties`,
        method: 'GET',
      });
      componentState = data;
    } else {
      console.info("Didn't match with any category to return the state");
    }

    return componentState;
  }

  /**
   * Returns the info of the clicked item on the the designer
   * @param  {HTMLElement} target Clicked HTML element in the designer area
   */
  function getItemInfo(target) {
    if (!target) {
      console.info('Target is not available');
      return null;
    }
    const { category, identifier } = target.dataset;
    return category && identifier ? { category, identifier } : getItemInfo(target.parentElement);
  }

  /**
   * Determines the location where the new element should be create and return the insertion info with respect to blinker
   * @param  {DOMElement} insertionElement Info of the element to be inserted
   * @return {Object} Returns object with operation and path
   *  operation specifies the relative position where the new control should be insert with respect to blinker element
   * 	path is the data path to update the model
   */
  function getInsertionInfo(insertionElement) {
    // Destructuring the previousSibling and nextSibling of current DOM element
    const { parentElement, previousSibling, nextSibling } = insertionElement;

    if (!parentElement) {
      return null;
    }

    const { className, children } = parentElement;
    const targetAreaHasSiblings =
      (className.indexOf(DESIGNER_AREA_CLASS) > -1 || className.indexOf('col-') > -1) &&
      children.length > 1 &&
      previousSibling;

    // Drop location can be betweeen 2 rows or at the end below a row
    if (targetAreaHasSiblings) {
      if (previousSibling) {
        return {
          operation: OPERATION.SIBLING_BELOW,
          path: previousSibling.getAttribute(DOM_ATTRIBUTES.DATA_ROW),
        };
      } else if (nextSibling) {
        return {
          operation: OPERATION.SIBLING_ABOVE,
          path: nextSibling.getAttribute(DOM_ATTRIBUTES.DATA_ROW),
        };
      }
    } else if (parentElement.getAttribute(DOM_ATTRIBUTES.DATA_COLUMN)) {
      // Drop location is inside column which has class like col-md-* / col-sm-* etc
      return {
        operation: OPERATION.CHILD,
        path: parentElement.getAttribute(DOM_ATTRIBUTES.DATA_COLUMN),
      };
    }

    // This is the first item that is added to designer area
    return {
      operation: OPERATION.SIBLING_BELOW,
      path: '0',
    };
  }

  /**
   * Generates path
   * @param  {Array} path
   */
  function getPath(path) {
    const newPath = [];
    if (path) {
      path.split('.').forEach((item, index) => {
        const property = index % 2 === 0 ? APP_PROPS.CHILDREN : APP_PROPS.COLUMNS;
        // Pushing multiple items to array
        newPath.push(property, parseInt(item, 10) - 1);
      });
    }
    return newPath;
  }

  /**
   * Creates the design time UI for the given model
   * @param  {Object} designState
   */
  function buildDesignMarkup(designState) {
    if (designState) {
      return React.createElement(View, {
        ...designState,
        propsContext: [],
        mode: UI_MODE_DESIGN,
      });
    }
    return '';
  }

  /**
   * Creates blinker element
   */
  function createBlinkElement() {
    blinkComponent = document.createElement('div');
    blinkComponent.id = blinkerID;
    blinkComponent.className = 'blinker m-2';
    return blinkComponent;
  }

  const DesignerComponent = (
    <>
      <div className="row sticky-top" style={{ top: '56px', backgroundColor: 'fff' }}>
        <div className="col-md-10">
          <ActionsToolbar deleteItem={deleteItem} moveItem={moveItem} />
          <CtrlsToolbar onSelect={insertItem} />
        </div>
        <div className="col-md-2">
          <input className="form-control" type="text" placeholder="Search gadgets" />
        </div>
      </div>
      <div className="row border-top no-gutters">
        <div className="col-sm-9">
          <div
            id={buildAreaID}
            className={`${DESIGNER_AREA_CLASS} h-100`}
            aria-label="designer"
            role="presentation"
            onClick={handleDesignerAreaClick}
          >
            {buildDesignMarkup(metadata)}
          </div>
        </div>
        <div className="col-sm-3 bg-light p-2 " data-path={state.propsContext}>
          <div className="container-fluid border-bottom">
            <h6>Configuration</h6>
          </div>
          {state.showConfig && state.configState && state.propsContext ? (
            <View
              _id={state.configState._id}
              name={state.configState.name}
              config={state.configState.config}
              mode={state.configState.mode}
              propsContext={state.propsContext}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );

  const tabs = [
    {
      title: 'Designer',
      component: DesignerComponent,
    },
    {
      title: 'Data Source',
      component: <DataSource dataSource={metadata.dataSource} propsContext={metaPropContext} />,
    },
  ];

  return (
    <div className="view-designer">
      <Header name={name} description={description} save={saveConfiguration} />
      <main>
        <Tabs tabs={tabs} />
      </main>
    </div>
  );
};

ViewDesigner.propTypes = {
  propsContext: PropTypes.instanceOf(Array).isRequired,
  metadata: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
  httpClient: PropTypes.func.isRequired,
};

const DataSource = React.memo(
  (props) => {
    const { dataSource, propsContext } = props;

    const getDataSourceItems = () => {
      if (dataSource && Array.isArray(dataSource)) {
        return dataSource.map((item, index) => {
          const context = [...propsContext, 'dataSource', index];
          return (
            <div key={context.join('.')} className="row">
              <div className="col-sm-6">
                {React.createElement(withAll(Input), {
                  propsContext: context,
                  [APP_PROPS.CONFIG]: { type: 'text', propertyReference: '.name' },
                })}
              </div>
              <div className="col-sm-6">
                {React.createElement(withAll(Input), {
                  propsContext: context,
                  [APP_PROPS.CONFIG]: { type: 'text', propertyReference: '.key' },
                })}
              </div>
            </div>
          );
        });
      }
      return '';
    };

    return (
      <>
        <div className="row">
          <div className="col-sm-6">Name</div>
          <div className="col-sm-6">Key</div>
        </div>
        {getDataSourceItems()}
      </>
    );
  },
  (prevProps, nextProps) => prevProps !== nextProps
);

DataSource.propTypes = {
  propsContext: PropTypes.instanceOf(Array).isRequired,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Exporting ViewDesigner for jest unit tests as connected components are complex to test
export { ViewDesigner };
export default withActions(ViewDesigner);
