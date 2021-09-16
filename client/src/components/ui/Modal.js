import React from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
  userPreview: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: 0,
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-900)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 435,
    },
  },
};

function Modal({ children, onRequestClose,...props }) {
  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      shouldCloseOnOverlayClick={false}
      style={customStyles['default']}
      onRequestClose={onRequestClose}
      {...props}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <button className="btn" onClick={() => onRequestClose()}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
}

export default Modal;
