import React from 'react';
import { connect } from 'react-redux';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Alert({ alerts }) {
  return (
    <>
      <div className="toast-container">
        {alerts &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <div key={alert.id} className={`toast alert-${alert.type}`}>
              <div className="toast-image-container">
                {alert.type === "success" ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="toast-image"
                  />
                ) : alert.type === "danger" ? (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="toast-image"
                  />
                ) : null}
              </div>
              <div className="toast-content">{alert.message}</div>
            </div>
          ))}
      </div>
    </>
  );
}

function mapStateToProps(store) {
  return { alerts: store.alert };
}

export default connect(mapStateToProps)(Alert);
