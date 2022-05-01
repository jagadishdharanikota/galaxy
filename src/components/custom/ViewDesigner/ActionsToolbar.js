import React from 'react';
import PropTypes from 'prop-types';
import { OPERATION } from '../../../constants';

const ActionsToolbar = React.memo((props) => {
  const { deleteItem, moveItem } = props;
  return (
    <div className="btn-toolbar mr-1" role="toolbar">
      <div className="btn-group" role="group" aria-label="toolbar controls">
        <button type="button" className="btn btn-light" title="Delete" onClick={deleteItem}>
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-light"
          title="Move up"
          data-direction={OPERATION.MOVE_UP}
          onClick={moveItem}
        >
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-light"
          title="Move down"
          data-direction={OPERATION.MOVE_DOWN}
          onClick={moveItem}
        >
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

ActionsToolbar.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
};

export default ActionsToolbar;
