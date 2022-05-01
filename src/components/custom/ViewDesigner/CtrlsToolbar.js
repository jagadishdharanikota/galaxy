import React from 'react';
import PropTypes from 'prop-types';
import categories from './BuilderInfo';

const areEqual = (prevProps, nextProps) => {
  return prevProps.onSelect === nextProps.onSelect;
};

// Wrapping CtrlsToolbar in React.memo HOC as it shouldn't rerender when the items are added/removed from designer as props for CtrlsToolbar doesn't change.
const CtrlsToolbar = React.memo(({ onSelect }) => {
  const renderToolbar = () => {
    return Object.keys(categories).map((key) => {
      if (Array.isArray(categories[key])) {
        return renderToolbarItems(key, categories[key]);
      }
      console.info(
        `Category ${key} is should be of type Array. Define it properly in BuilderInfo file to render the items`
      );
      return '';
    });
  };

  const renderToolbarItems = (category, items) => {
    return (
      <div key={category} className="btn-group mr-1" role="group" aria-label="toolbar controls">
        {items.map(({ name, category: categoryName, imageType, image, identifier }) => (
          <button
            type="button"
            className="btn btn-light"
            title={`${name} ${categoryName}`}
            key={identifier}
            data-category={categoryName}
            data-identifier={identifier}
          >
            {imageType === 'svg' ? (
              <img alt={name} title={name} src={`data:image/svg+xml;utf8,${image}`} />
            ) : (
              <img alt={name} title={name} src={`data:image/png;base64,${image}`} />
            )}
            {/* <i className="fa fa-columns" aria-hidden="true"></i> */}
            {/* item.name */}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="builder-toolbar my-1" role="toolbar" onClick={onSelect} onKeyDown={onSelect}>
      {renderToolbar()}
    </div>
  );
}, areEqual);

CtrlsToolbar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default CtrlsToolbar;
