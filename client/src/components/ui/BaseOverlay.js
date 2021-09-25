import React from 'react'

function BaseOverlay({
  title,
  children,
  actionButton,
  onActionButtonClicked,
}) {
  return (
    <div className="base-overlay-container">
      {title && (
        <div className="base-overlay-title-wrapper">
          <h4>{title}</h4>
        </div>
      )}
      <div className="base-overlay-content">{children}</div>
      {actionButton && (
        <button
          className="base-overlay-action-btn"
          onClick={onActionButtonClicked}
        >
          {actionButton}
        </button>
      )}
    </div>
  );
}

export default BaseOverlay
