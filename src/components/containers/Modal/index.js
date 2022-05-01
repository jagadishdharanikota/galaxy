import React from 'react';
import PropTypes from 'prop-types';

/*
const Modal = (props) => {
  const { title, content, open } = props;
  const showClass = open ? 'show' : '';
  const close = function () {};

  return (
    <>
      <div
        className={`modal fade ${showClass}`}
        id="modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalCenterTitle"
        aria-hidden="true"
        style={open ? { display: 'block' } : {}}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body overflow-auto">{content}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={close}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {open ? <div className="modal-backdrop fade show" /> : ''}
    </>
  );
};

Modal.propTypes = {
  componentProps: PropTypes.instanceOf(Object),
  close: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  componentProps: {},
  close: () => {},
  open: false,
};

export default Modal;

*/

const GenericModal = (props) => {
  const { title, content, close, footer, key } = props;
  const closeModal = () => {
    close();
  };
  return (
    <>
      <div
        className="modal fade show d-block"
        id={`modal-${key}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">{footer}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

GenericModal.defaultProps = {
  title: null,
  footer: null,
  close: () => {},
  key: null,
};

GenericModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  footer: PropTypes.node,
  close: PropTypes.func,
  key: PropTypes.string,
};

export { GenericModal };
