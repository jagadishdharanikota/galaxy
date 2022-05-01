import React from 'react';
import PropTypes from 'prop-types';
import categories from './BuilderInfo';

/**
 *
 * @param {*} props
 */
const UIBuilderToolbar = (props) => {
  const { onSelect } = props;
  function renderToolbar() {
    return Object.keys(categories).map((key) => {
      if (Array.isArray(categories[key])) {
        return renderListGroupItems(key, categories[key]);
      }
      console.info(
        `Category ${key} should be of type Array. Define it properly in BuilderInfo file to render the items`
      );
      return '';
    });
  }

  /**
   *
   * @param {*} category
   * @param {*} items
   */
  const renderListGroupItems = (category, items) => {
    return (
      <ul key={category} className="list-group list-group-flush">
        {items.map((item) => {
          return (
            <li
              key={item.identifier}
              className="list-group-item list-group-item-action"
              data-category={item.category}
              data-identifier={item.identifier}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  };

  /*
	let handleKeyUp = (event) => {
		var code = event.keyCode ? event.keyCode : event.which;
		if(code === 13) {
			props.onSelect(event);
		}
	}
	*/

  return (
    <div className="builder-toolbar" role="toolbar" onClick={onSelect}>
      {renderToolbar()}
    </div>
  );
};

UIBuilderToolbar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default UIBuilderToolbar;
