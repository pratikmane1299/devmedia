import React from 'react';
import { connect } from 'react-redux';

function Alert({ alerts }) {
  return (
    <>
      {alerts &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        ))}
    </>
  );
}

function mapStateToProps(store) {
  return { alerts: store.alert };
}

export default connect(mapStateToProps)(Alert);
